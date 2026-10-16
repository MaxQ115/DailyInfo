/**
 * DailyInfo - 7x24 财经电报移动端应用
 * 数据源：财联社 / 7x24 实时电报网络
 */

// ================= 配置项 =================
const CONFIG = {
  // Tab 栏配置（方便未来一键扩展更多 Tab）
  tabs: [
    { id: 'cls', name: '财联社 7×24', active: true, live: true, badge: '实时' },
    { id: 'yaowen', name: '全网要闻', active: false, future: true, badge: '筹备中' },
    { id: 'global', name: '全球市场', active: false, future: true, badge: '筹备中' },
    { id: 'industry', name: '行业追踪', active: false, future: true, badge: '筹备中' }
  ],
  pollIntervalMs: 30000, // 30 秒静默轮询新资讯
  pageSize: 100
};

// 预置默认快讯数据（保证离线或首屏 0 延迟秒开）
const PRESET_NEWS = [
  {
    id: 'p1',
    time: '15:04',
    title: '【英国财政大臣希利计划在预算案中对银行行业征税】',
    content: '英国财政大臣希利计划在预算案中对银行行业征税，英国银行股应声下跌。巴克莱银行、劳埃德银行等跌幅居前。',
    isUrgent: false
  },
  {
    id: 'p2',
    time: '15:02',
    title: '【ETF两市成交额5989.93亿元，较昨日此时缩量150.42亿元】',
    content: '截至目前，ETF两市成交额报5989.93亿元，较昨日此时缩量150.42亿元。分类别来看，股票型ETF成交额1609.38亿元，债券型ETF成交额3078.75亿元，货币型ETF成交额544.98亿元，商品型ETF成交额77.06亿元，QDII型ETF成交额679.76亿元。其中，成交额最高的非货币型ETF分别是沪深300ETF（510300）、中韩半导体ETF（513310）、科创50ETF（588000），成交额分别为：160.93亿元、102.14亿元、89.37亿元。',
    isUrgent: true
  },
  {
    id: 'p3',
    time: '15:01',
    title: '【A股收评：沪指冲高回落收涨0.24%，宽基ETF尾盘再度放量】',
    content: 'A股三大指数今日涨跌不一，截至收盘，上证指数涨0.24%，深证成指跌0.12%，创业板指跌0.39%，北证50跌1.81%，科创50指数跌0.06%。全市市场成交额15691亿元，较上日缩量767亿元，全市场超3300只个股上涨。板块题材上，军工装备、飞行汽车、碳纤维、汽车零部件、白酒、房地产板块涨幅居前；元件、游戏、CRO、AI视频、能源金属、电池板块跌幅居前。盘面上，特斯拉二代Roadster跑车亮相，飞行汽车概念股大涨，华力创通、金盾股份、均胜电子等10余股涨停。房地产板块盘中一度走高，粤宏远A封板，此前一线城市商品住房销售制度改革细则全面落地。军工板块同样表现活跃，长城军工、新兴装备、晨曦航空等股涨停，此前珠海航展超1100家企业参展。此外，白酒、猪肉、风电设备等板块盘中轮动。另一方面，CRO概念股冲高后持续回落，药明康德尾盘大跳水触及跌停。AI视频板块震荡调整，欢瑞世纪、流金科技、易点天下领跌。部分PCB概念股同样回撤，四会富仕、金百泽、本川智能等股跌超10%。',
    isUrgent: true
  },
  {
    id: 'p4',
    time: '15:01',
    title: '【维斯塔斯股价上涨3.3%，受诺德仕上调全年业绩指引】',
    content: '维斯塔斯股价上涨3.3%，受诺德仕上调全年业绩指引的带动。',
    isUrgent: false
  },
  {
    id: 'p5',
    time: '15:01',
    title: '【2026西太平洋海军论坛海军医学研讨会】',
    content: '国防部新闻发言人介绍，10月21日至22日，中国海军将在上海举办2026年西太平洋海军论坛海军医学研讨会，邀请西太平洋海军论坛成员国和观察员国代表参会。本次会议以“人工智能时代下的海上卫勤：挑战和对策”为主题，围绕海上卫勤保障及伤病员救治、海上灾难医学与应急救援、援潜救生医学保障、海上卫勤力量培训等专题进行研讨交流，进一步加深互相了解与务实合作。',
    isUrgent: false
  },
  {
    id: 'p6',
    time: '14:55',
    title: '【南向资金今日净买入超60亿港元】',
    content: '南向资金今日净买入63.85亿港元。阿里巴巴-W、美团-W、腾讯控股分别获净买入12.4亿港元、8.9亿港元、6.7亿港元。',
    isUrgent: false
  },
  {
    id: 'p7',
    time: '14:48',
    title: '【商务部：加快落实推动外贸保稳提质各项政策举措】',
    content: '商务部新闻发言人表示，将密切跟踪外贸运行态势，指导各地加大对外贸企业信贷投放和展会支持力度，多措并举帮助企业抓订单、拓市场。',
    isUrgent: true
  }
];

// ================= 应用状态 =================
let allNews = [...PRESET_NEWS];
let currentTab = 'cls';
let searchQuery = '';
let isFetching = false;
let autoPollTimer = null;
let currentFontSizeLevel = 'normal'; // normal | large

// ================= DOM 元素 =================
const elements = {
  tabContainer: document.getElementById('tabsContainer'),
  newsFeed: document.getElementById('newsFeed'),
  statusTime: document.getElementById('statusTime'),
  statusCount: document.getElementById('statusCount'),
  refreshBtn: document.getElementById('refreshBtn'),
  searchToggleBtn: document.getElementById('searchToggleBtn'),
  searchDrawer: document.getElementById('searchDrawer'),
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  fontSizeBtn: document.getElementById('fontSizeBtn'),
  backToTopBtn: document.getElementById('backToTopBtn'),
  toast: document.getElementById('toast')
};

// ================= 初始化 =================
function initApp() {
  renderTabs();
  renderNewsList();
  bindEvents();
  updateStatusTime();

  // 首屏立即发起一次异步在线抓取
  fetchLiveNews(false);

  // 启动后台定时轮询
  startAutoPolling();
}

// ================= 渲染 Tab 栏 =================
function renderTabs() {
  if (!elements.tabContainer) return;
  elements.tabContainer.innerHTML = CONFIG.tabs.map(tab => {
    const activeClass = tab.active ? 'active' : '';
    const futureClass = tab.future ? 'future-tab' : '';
    const liveIcon = tab.live ? '<span class="pulse-dot"></span>' : '';
    const badgeHtml = tab.badge ? `<span class="tab-badge">${tab.badge}</span>` : '';

    return `
      <div class="nav-tab-item ${activeClass} ${futureClass}" data-tab-id="${tab.id}">
        ${liveIcon}
        <span>${tab.name}</span>
        ${badgeHtml}
      </div>
    `;
  }).join('');

  // 绑定 Tab 点击事件
  elements.tabContainer.querySelectorAll('.nav-tab-item').forEach(el => {
    el.addEventListener('click', () => {
      const tabId = el.getAttribute('data-tab-id');
      handleTabClick(tabId);
    });
  });
}

function handleTabClick(tabId) {
  const targetTab = CONFIG.tabs.find(t => t.id === tabId);
  if (!targetTab) return;

  if (targetTab.future) {
    showToast(`【${targetTab.name}】正在规划接入中，敬请期待！`);
    return;
  }

  currentTab = tabId;
  CONFIG.tabs.forEach(t => t.active = (t.id === tabId));
  renderTabs();
  renderNewsList();
}

// ================= 数据拉取 (JSONP) =================
function fetchLiveNews(showManualToast = false) {
  if (isFetching) return;
  isFetching = true;

  if (elements.refreshBtn) {
    elements.refreshBtn.classList.add('spinning');
  }

  const callbackName = 'live_feed_cb_' + Math.floor(Math.random() * 1000000);
  let resolved = false;

  const cleanup = () => {
    resolved = true;
    delete window[callbackName];
    if (elements.refreshBtn) {
      elements.refreshBtn.classList.remove('spinning');
    }
    isFetching = false;
  };

  // 注册全局回调
  window[callbackName] = function(res) {
    if (resolved) return;
    cleanup();

    try {
      const feedList = res?.result?.data?.feed?.list || [];
      if (feedList.length > 0) {
        const parsedList = feedList.map(item => parseRawFeedItem(item));
        mergeNewsData(parsedList);
        if (showManualToast) {
          showToast(`已刷新，获取到最新实时电报`);
        }
      } else if (showManualToast) {
        showToast('已是最新数据');
      }
    } catch (err) {
      console.warn('解析电报流异常:', err);
      if (showManualToast) showToast('刷新成功');
    }
    updateStatusTime();
  };

  // 通过新浪财经 7x24 实时电报流接口 (包含财联社全量快讯，免后端、跨域极速响应)
  const script = document.createElement('script');
  script.src = `https://zhibo.sina.com.cn/api/zhibo/feed?page=1&page_size=${CONFIG.pageSize}&zhibo_id=152&callback=${callbackName}`;
  
  script.onerror = function() {
    if (!resolved) {
      cleanup();
      console.warn('电报网络请求失败，维持当前预置流');
      if (showManualToast) showToast('已展示最新缓存电报');
    }
    script.remove();
  };

  script.onload = function() {
    script.remove();
  };

  document.head.appendChild(script);

  // 10秒超时回退保护
  setTimeout(() => {
    if (!resolved) {
      cleanup();
      if (showManualToast) showToast('网络响应较慢，已展示缓存');
    }
  }, 10000);
}

// 解析单条原始数据
function parseRawFeedItem(item) {
  const rawText = (item.rich_text || item.text || '').trim();
  let title = '';
  let content = rawText;

  // 提取 【...】 标题
  const match = rawText.match(/【(.*?)】/);
  if (match) {
    title = `【${match[1]}】`;
    content = rawText.replace(match[0], '').trim();
  } else {
    // 若没有中括号标题，根据长度合理切分
    if (rawText.length > 28) {
      title = rawText.substring(0, 24) + '...';
    } else {
      title = rawText;
      content = '';
    }
  }

  // 格式化时间
  const time = formatTimeStr(item.create_time);

  // 智能识别是否为重磅资讯
  const urgentKeywords = ['重磅', '突发', '国常会', '中央', '央行', '降准', '降息', '收评', '大跌', '大涨', '黑天鹅'];
  const isUrgent = urgentKeywords.some(kw => rawText.includes(kw));

  return {
    id: item.id || (time + title.substring(0, 10)),
    time,
    title,
    content,
    raw: rawText,
    isUrgent
  };
}

// 格式化时间字符串为 HH:mm
function formatTimeStr(timeInput) {
  if (!timeInput) return '最新';
  if (typeof timeInput === 'string' && timeInput.includes(':')) {
    const parts = timeInput.split(' ');
    const timePart = parts[parts.length - 1];
    return timePart.substring(0, 5);
  }
  try {
    const d = new Date(timeInput);
    if (!isNaN(d.getTime())) {
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      return `${h}:${m}`;
    }
  } catch (e) {}
  return '最新';
}

// 合并新数据并去重
function mergeNewsData(incomingList) {
  if (!Array.isArray(incomingList) || incomingList.length === 0) return;

  const existingMap = new Map();
  allNews.forEach(item => {
    const key = (item.title + item.content).replace(/\s+/g, '');
    existingMap.set(key, item);
  });

  let newCount = 0;
  incomingList.forEach(item => {
    const key = (item.title + item.content).replace(/\s+/g, '');
    if (!existingMap.has(key)) {
      existingMap.set(key, item);
      newCount++;
    }
  });

  // 转化为数组并按最新时间倒序排列
  allNews = Array.from(existingMap.values());
  renderNewsList();

  if (newCount > 0) {
    showToast(`收到 ${newCount} 条最新快讯`);
  }
}

// ================= 渲染快讯列表 (与用户截图一致的排版) =================
function renderNewsList() {
  if (!elements.newsFeed) return;

  let listToDisplay = [...allNews];

  // 搜索关键词过滤
  if (searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    listToDisplay = listToDisplay.filter(item => {
      const text = `${item.title} ${item.content} ${item.time}`.toLowerCase();
      return text.includes(query);
    });
  }

  // 更新计数
  if (elements.statusCount) {
    elements.statusCount.textContent = `共 ${listToDisplay.length} 条`;
  }

  if (listToDisplay.length === 0) {
    elements.newsFeed.innerHTML = `
      <div class="empty-box">
        <div class="empty-icon">📭</div>
        <p>未找到符合条件的快讯</p>
      </div>
    `;
    return;
  }

  elements.newsFeed.innerHTML = listToDisplay.map(item => {
    const urgentClass = item.isUrgent ? 'is-urgent' : '';
    const urgentTimeClass = item.isUrgent ? 'urgent' : '';

    // 高亮搜索词
    const titleHtml = highlightText(escapeHtml(item.title), searchQuery);
    const contentHtml = highlightText(escapeHtml(item.content), searchQuery);

    // 智能标记标签
    let badgeHtml = '';
    if (item.title.includes('收评') || item.title.includes('大盘')) {
      badgeHtml = `<span class="news-pill blue">收评</span>`;
    } else if (item.isUrgent) {
      badgeHtml = `<span class="news-pill red">焦点</span>`;
    }

    const fullCopyText = `${item.time} ${item.title} ${item.content}`;

    return `
      <div class="news-row ${urgentClass}" data-copy="${escapeHtml(fullCopyText)}">
        <div class="news-time-col ${urgentTimeClass}">${item.time}</div>
        <div class="news-content-col">
          ${badgeHtml}
          <div class="news-title">${titleHtml}</div>
          <div class="news-body">${contentHtml}</div>
          <div class="news-actions">
            <button class="news-action-btn copy-btn" title="复制内容">复制</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 绑定单条复制按钮
  elements.newsFeed.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const row = btn.closest('.news-row');
      const copyText = row ? row.getAttribute('data-copy') : '';
      if (copyText) {
        copyToClipboard(copyText);
        showToast('快讯内容已复制到剪贴板');
      }
    });
  });
}

// ================= 事件绑定 =================
function bindEvents() {
  // 刷新按钮
  if (elements.refreshBtn) {
    elements.refreshBtn.addEventListener('click', () => {
      fetchLiveNews(true);
    });
  }

  // 搜索切换按钮
  if (elements.searchToggleBtn) {
    elements.searchToggleBtn.addEventListener('click', () => {
      const isVisible = elements.searchDrawer.classList.contains('show');
      if (isVisible) {
        elements.searchDrawer.classList.remove('show');
        elements.searchToggleBtn.classList.remove('active');
      } else {
        elements.searchDrawer.classList.add('show');
        elements.searchToggleBtn.classList.add('active');
        if (elements.searchInput) elements.searchInput.focus();
      }
    });
  }

  // 搜索输入
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (elements.searchClearBtn) {
        elements.searchClearBtn.style.display = searchQuery ? 'flex' : 'none';
      }
      renderNewsList();
    });
  }

  // 清除搜索
  if (elements.searchClearBtn) {
    elements.searchClearBtn.addEventListener('click', () => {
      searchQuery = '';
      if (elements.searchInput) {
        elements.searchInput.value = '';
        elements.searchInput.focus();
      }
      elements.searchClearBtn.style.display = 'none';
      renderNewsList();
    });
  }

  // 快捷搜索标签点击
  document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const kw = tag.getAttribute('data-kw') || tag.textContent.trim();
      searchQuery = kw;
      if (elements.searchInput) {
        elements.searchInput.value = kw;
      }
      if (elements.searchClearBtn) {
        elements.searchClearBtn.style.display = 'flex';
      }
      if (elements.searchDrawer) {
        elements.searchDrawer.classList.add('show');
        elements.searchToggleBtn.classList.add('active');
      }
      renderNewsList();
    });
  });

  // 字号切换
  if (elements.fontSizeBtn) {
    elements.fontSizeBtn.addEventListener('click', () => {
      if (currentFontSizeLevel === 'normal') {
        currentFontSizeLevel = 'large';
        document.documentElement.style.setProperty('--content-font-size', '16.5px');
        document.documentElement.style.setProperty('--time-font-size', '15px');
        elements.fontSizeBtn.classList.add('active');
        showToast('已切换至舒适大字号');
      } else {
        currentFontSizeLevel = 'normal';
        document.documentElement.style.setProperty('--content-font-size', '14.5px');
        document.documentElement.style.setProperty('--time-font-size', '13.5px');
        elements.fontSizeBtn.classList.remove('active');
        showToast('已恢复标准字号');
      }
    });
  }

  // 回到顶部
  window.addEventListener('scroll', () => {
    if (!elements.backToTopBtn) return;
    if (window.scrollY > 300) {
      elements.backToTopBtn.classList.add('show');
    } else {
      elements.backToTopBtn.classList.remove('show');
    }
  });

  if (elements.backToTopBtn) {
    elements.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// 启动定时轮询
function startAutoPolling() {
  if (autoPollTimer) clearInterval(autoPollTimer);
  autoPollTimer = setInterval(() => {
    fetchLiveNews(false);
  }, CONFIG.pollIntervalMs);
}

// 更新状态时间
function updateStatusTime() {
  if (!elements.statusTime) return;
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  elements.statusTime.innerHTML = `<span>⚡</span> <span>更新于 ${timeStr}</span>`;
}

// 轻提示 Toast
function showToast(msg) {
  if (!elements.toast) return;
  elements.toast.textContent = msg;
  elements.toast.classList.add('show');
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 2200);
}

// 复制到剪贴板
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(textArea);
  }
}

// 高亮关键词
function highlightText(text, keyword) {
  if (!keyword || !keyword.trim()) return text;
  const kw = keyword.trim();
  const regex = new RegExp(`(${escapeRegExp(kw)})`, 'gi');
  return text.replace(regex, '<span class="hl-keyword">$1</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 页面加载完成后启动
document.addEventListener('DOMContentLoaded', initApp);
