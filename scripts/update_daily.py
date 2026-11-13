#!/usr/bin/env python3
"""
每日定时更新脚本：
1. 从新浪财经【酒价内参】拉取最新 12 大单品价格及历史走势，增量合并写入 js/liquor-data.js
2. 从 TLDR AI 官方 RSS 拉取缺失的最新期刊并翻译为中文，增量合并写入 js/tldr-data.js
3. 如有数据更新，自动刷新 index.html 中的资源版本号 ?v=YYYYMMDDHHMM
"""

import datetime
import html
import json
import os
import re
import ssl
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIQUOR_FILE = os.path.join(ROOT, 'js', 'liquor-data.js')
TLDR_FILE = os.path.join(ROOT, 'js', 'tldr-data.js')
INDEX_FILE = os.path.join(ROOT, 'index.html')

SSL_CTX = ssl.create_default_context()
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

SECTION_KEYS = [
    'Headlines & Launches',
    'Deep Dives & Analysis',
    'Engineering & Research',
    'Miscellaneous',
    'Quick Links',
]


def http_get(url, timeout=15):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=timeout, context=SSL_CTX) as resp:
        return resp.read().decode('utf-8', errors='replace')


def js_json_extract(src, var_prefix):
    """提取 js 文件中以 var_prefix = ...; 结尾的 JSON 对象/数组"""
    idx = src.find(var_prefix)
    if idx == -1:
        raise ValueError(f'找不到 {var_prefix}')
    start = src.index('=', idx) + 1
    while src[start] in ' \t\r\n':
        start += 1
    opener = src[start]
    closer = ']' if opener == '[' else '}'
    depth = 0
    in_str = False
    str_ch = ''
    esc = False
    for i in range(start, len(src)):
        ch = src[i]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == str_ch:
                in_str = False
        else:
            if ch in ('"', "'"):
                in_str = True
                str_ch = ch
            elif ch == opener:
                depth += 1
            elif ch == closer:
                depth -= 1
                if depth == 0:
                    return start, i + 1, src[start:i + 1]
    raise ValueError(f'解析 {var_prefix} 边界失败')


# ================= 1. 更新酒价内参 =================
def update_liquor():
    print('[Liquor] 正在拉取新浪财经酒价内参列表...')
    list_res = json.loads(http_get('https://business.cj.sina.cn/api/liquor_price/list'))
    new_list = list_res.get('result', {}).get('data', {}).get('list', [])
    if not new_list:
        print('[Liquor] 列表为空，跳过')
        return False

    src = open(LIQUOR_FILE, 'r', encoding='utf-8').read()
    l_s, l_e, old_list_raw = js_json_extract(src, 'window.PRESET_LIQUOR_LIST')
    d_s, d_e, old_details_raw = js_json_extract(src, 'window.PRESET_LIQUOR_DETAILS')

    old_list = json.loads(old_list_raw)
    old_details = json.loads(old_details_raw)

    old_latest_date = old_list[0].get('price_date', '') if old_list else ''
    new_latest_date = new_list[0].get('price_date', '')
    print(f'[Liquor] 本地最新日期: {old_latest_date} -> 线上最新日期: {new_latest_date}')

    merged_details = dict(old_details)
    for item in new_list:
        pid = str(item['liquor_id'])
        try:
            det_res = json.loads(http_get(f'https://business.cj.sina.cn/api/liquor_price/detail/{pid}'))
            det_data = det_res.get('result', {}).get('data')
            if det_data and isinstance(det_data.get('history'), list):
                hist_map = {}
                for h in old_details.get(pid, {}).get('history', []):
                    if h.get('date'):
                        hist_map[h['date']] = h
                for h in det_data['history']:
                    if h.get('date'):
                        hist_map[h['date']] = h
                merged_hist = sorted(hist_map.values(), key=lambda x: x['date'], reverse=True)
                merged_details[pid] = {
                    'detail': det_data.get('detail', old_details.get(pid, {}).get('detail', {})),
                    'history': merged_hist,
                }
        except Exception as e:
            print(f'[Liquor] 拉取 {pid} 详情失败: {e}')

    new_list_json = json.dumps(new_list, ensure_ascii=False, indent=2)
    new_details_json = json.dumps(merged_details, ensure_ascii=False, indent=2)

    # 先替换后面的 details，再替换前面的 list，避免偏移错位
    updated = src[:d_s] + new_details_json + src[d_e:]
    updated = updated[:l_s] + new_list_json + updated[l_e:]

    if updated != src:
        open(LIQUOR_FILE, 'w', encoding='utf-8').write(updated)
        print(f'[Liquor] 已更新 js/liquor-data.js（最新日期 {new_latest_date}）')
        return True
    print('[Liquor] 无变化')
    return False


# ================= 2. 更新 TLDR AI =================
class TldrPageParser(HTMLParser):
    """用标准库解析 https://tldr.tech/ai/YYYY-MM-DD 页面中的 h2 导语及各 section/article"""
    def __init__(self):
        super().__init__()
        self.in_h2 = False
        self.h2_buf = []
        self.h2_text = ''

        self.in_section = False
        self.section_depth = 0
        self.in_sec_header = False
        self.sec_header_buf = []
        self.current_sec_title = ''
        self.current_items = []

        self.in_article = False
        self.in_a = False
        self.a_href = ''
        self.a_buf = []
        self.in_summary_div = False
        self.summary_div_depth = 0
        self.summary_buf = []

        self.sections = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == 'h2' and not self.in_section and not self.h2_text:
            self.in_h2 = True
            self.h2_buf = []
        elif tag == 'section':
            if not self.in_section:
                self.in_section = True
                self.section_depth = 1
                self.current_sec_title = ''
                self.current_items = []
            else:
                self.section_depth += 1
        elif self.in_section:
            if not self.in_article and tag in ('h2', 'h3', 'header'):
                self.in_sec_header = True
                self.sec_header_buf = []
            elif tag == 'article' and not self.in_article:
                self.in_article = True
                self.a_href = ''
                self.a_buf = []
                self.summary_buf = []
                self.in_summary_div = False
                self.summary_div_depth = 0
            elif self.in_article:
                if tag == 'a' and not self.a_href:
                    self.in_a = True
                    self.a_href = attr_dict.get('href', '')
                    self.a_buf = []
                elif tag == 'div' and not self.in_a:
                    if not self.in_summary_div:
                        self.in_summary_div = True
                        self.summary_div_depth = 1
                    else:
                        self.summary_div_depth += 1

    def handle_endtag(self, tag):
        if tag == 'h2' and self.in_h2:
            self.in_h2 = False
            self.h2_text = re.sub(r'\s+', ' ', ''.join(self.h2_buf)).strip()
        elif self.in_section:
            if self.in_sec_header and tag in ('h2', 'h3', 'header'):
                self.in_sec_header = False
                t = re.sub(r'\s+', ' ', ''.join(self.sec_header_buf)).strip()
                if t and not self.current_sec_title:
                    self.current_sec_title = t
            elif self.in_article:
                if tag == 'a' and self.in_a:
                    self.in_a = False
                elif tag == 'div' and self.in_summary_div:
                    self.summary_div_depth -= 1
                    if self.summary_div_depth <= 0:
                        self.in_summary_div = False
                elif tag == 'article':
                    self.in_article = False
                    title = re.sub(r'\s+', ' ', ''.join(self.a_buf)).strip()
                    summary = re.sub(r'\s+', ' ', ''.join(self.summary_buf)).strip()
                    if title and summary and '(Sponsor)' not in title and 'at TLDR (' not in title:
                        self.current_items.append((title, self.a_href, summary))
            elif tag == 'section':
                self.section_depth -= 1
                if self.section_depth <= 0:
                    self.in_section = False
                    if self.current_sec_title and self.current_items:
                        self.sections.append((self.current_sec_title, self.current_items))

    def handle_data(self, data):
        if self.in_h2:
            self.h2_buf.append(data)
        elif self.in_sec_header:
            self.sec_header_buf.append(data)
        elif self.in_a:
            self.a_buf.append(data)
        elif self.in_summary_div:
            self.summary_buf.append(data)


def translate_en_to_zh(text):
    if not text or not text.strip():
        return ''
    q = urllib.parse.quote(text)
    endpoints = [
        ('clients5', f'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=zh-CN&q={q}'),
        ('gtx', f'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q={q}'),
        ('mymemory', f'https://api.mymemory.translated.net/get?q={q}&langpair=en|zh-CN'),
    ]
    time.sleep(0.15)
    for kind, url in endpoints:
        try:
            data = json.loads(http_get(url, timeout=12))
            if kind == 'clients5' and isinstance(data, list) and data:
                if isinstance(data[0], str):
                    return data[0]
                if isinstance(data[0], list):
                    return ''.join(str(x) for x in data[0] if x)
            elif kind == 'gtx' and isinstance(data, list) and isinstance(data[0], list):
                return ''.join(seg[0] for seg in data[0] if seg and seg[0])
            elif kind == 'mymemory' and isinstance(data, dict):
                t = data.get('responseData', {}).get('translatedText', '')
                if t and not data.get('quotaFinished'):
                    return t
        except Exception:
            continue
    print(f'[TLDR] 翻译降级为原文: {text[:40]}')
    return text


def get_weekday_label(date_str):
    days = ['MON · 周一', 'TUE · 周二', 'WED · 周三', 'THU · 周四', 'FRI · 周五', 'SAT · 周六', 'SUN · 周日']
    dt = datetime.date.fromisoformat(date_str)
    return days[dt.weekday()]


def extract_domain(url):
    try:
        host = urllib.parse.urlparse(url).hostname or 'tldr.tech'
        return host[4:] if host.startswith('www.') else host
    except Exception:
        return 'tldr.tech'


def fetch_and_translate_issue(date_str, rss_headline=''):
    page_html = http_get(f'https://tldr.tech/ai/{date_str}', timeout=15)
    parser = TldrPageParser()
    parser.feed(page_html)
    h2_text = parser.h2_text or rss_headline or f'TLDR AI Daily ({date_str})'

    raw_sections = []
    for raw_sec_title, raw_items in parser.sections:
        norm_key = ''
        for k in SECTION_KEYS:
            if k.lower() in raw_sec_title.lower():
                norm_key = k
                break
        if not norm_key:
            continue

        items = []
        for full_title, href, summary_en in raw_items:
            clean_title = full_title
            read_time = '3 MIN READ'
            m = re.search(r'\(([^)]+)\)\s*$', full_title)
            if m:
                read_time = m.group(1).upper().replace('MINUTE', 'MIN')
                clean_title = full_title[:m.start()].strip()

            title_zh = translate_en_to_zh(clean_title) or clean_title
            summary_zh = translate_en_to_zh(summary_en) or summary_en
            kw_m = re.search(r'[A-Z][A-Za-z0-9.\-]+(?:\s+[A-Z0-9][A-Za-z0-9.\-]+)?', clean_title)
            domain = extract_domain(href)
            items.append({
                'title_zh': title_zh,
                'title_en': clean_title,
                'read_time': read_time,
                'url': href,
                'domain': domain,
                'highlight_kw': kw_m.group(0) if kw_m else domain,
                'summary_zh': summary_zh,
                'summary_en': summary_en,
            })
        if items:
            raw_sections.append({'sectionKey': norm_key, 'items': items})

    if not raw_sections:
        return None

    return {
        'date': date_str,
        'weekday': get_weekday_label(date_str),
        'issueNo': f"VOL. {date_str.replace('-', '.')}",
        'headline_zh': translate_en_to_zh(h2_text) or h2_text,
        'headline_en': h2_text,
        'sections': raw_sections,
    }


def update_tldr():
    print('[TLDR] 正在拉取 TLDR AI RSS...')
    rss_xml = http_get('https://tldr.tech/api/rss/ai', timeout=15)
    entries = []
    for item_m in re.finditer(r'<item>(.*?)</item>', rss_xml, re.S):
        block = item_m.group(1)
        link_m = re.search(r'<link>(.*?)</link>', block)
        title_m = re.search(r'<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</title>', block, re.S)
        if not link_m:
            continue
        date_m = re.search(r'/ai/(\d{4}-\d{2}-\d{2})', link_m.group(1))
        if date_m:
            entries.append((date_m.group(1), html.unescape(title_m.group(1).strip()) if title_m else ''))

    src = open(TLDR_FILE, 'r', encoding='utf-8').read()
    existing_dates = set(re.findall(r"^\s*['\"](\d{4}-\d{2}-\d{2})['\"]\s*:\s*\{", src, re.M))

    missing = [(d, t) for d, t in entries[:7] if d not in existing_dates]
    if not missing:
        print(f'[TLDR] 已是最新（本地已有最新期 {entries[0][0] if entries else ""}）')
        return False

    print(f'[TLDR] 发现 {len(missing)} 期缺失: {[d for d, _ in missing]}')
    marker = 'const PRESET_TLDR_ISSUES = {'
    pos = src.find(marker)
    if pos == -1:
        raise ValueError('找不到 PRESET_TLDR_ISSUES')
    insert_at = pos + len(marker)

    new_blocks = []
    for date_str, headline_en in missing:
        print(f'[TLDR] 抓取并翻译 {date_str} ...')
        issue = fetch_and_translate_issue(date_str, headline_en)
        if issue:
            block_json = json.dumps(issue, ensure_ascii=False, indent=2)
            # 缩进 2 格放入对象字面量
            indented = '\n'.join('  ' + line for line in block_json.splitlines())
            new_blocks.append(f"\n  '{date_str}': {indented.lstrip()},")

    if not new_blocks:
        return False

    updated = src[:insert_at] + ''.join(new_blocks) + src[insert_at:]
    open(TLDR_FILE, 'w', encoding='utf-8').write(updated)
    print(f'[TLDR] 已写入 {len(new_blocks)} 期新内参到 js/tldr-data.js')
    return True


def bump_index_version():
    ver = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y%m%d%H%M')
    src = open(INDEX_FILE, 'r', encoding='utf-8').read()
    updated = re.sub(r'(\.js)\?v=\d+', rf'\1?v={ver}', src)
    if updated != src:
        open(INDEX_FILE, 'w', encoding='utf-8').write(updated)
        print(f'[Index] 已更新资源版本号为 ?v={ver}')


if __name__ == '__main__':
    changed = False
    try:
        if update_liquor():
            changed = True
    except Exception as e:
        print(f'[Liquor] 更新异常: {e}')

    try:
        if update_tldr():
            changed = True
    except Exception as e:
        print(f'[TLDR] 更新异常: {e}')

    if changed:
        bump_index_version()
    else:
        print('今日暂无新数据需要写入。')
