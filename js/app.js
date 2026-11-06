/**
 * DailyInfo - 7x24 财经电报移动端应用
 * 数据源：财联社 / 7x24 实时电报网络
 */

// ================= 配置项 =================
const CONFIG = {
  // Tab 栏配置（方便未来一键扩展更多 Tab）
  tabs: [
    { id: 'cls', name: '财联社 7×24', active: true, live: true, badge: '实时' },
    { id: 'ai', name: 'AI前沿', active: false, live: false, badge: 'TLDR' },
    { id: 'global', name: '全球市场', active: false, future: true, badge: '筹备中' },
    { id: 'industry', name: '行业追踪', active: false, future: true, badge: '筹备中' }
  ],
  pollIntervalMs: 30000, // 30 秒静默轮询最新资讯
  pageSize: 50 // 每页拉取数量
};

// 预置默认快讯数据（保证离线或首屏 0 延迟秒开）
const PRESET_NEWS = [
  {
    id: 'p1',
    time: '15:04',
    timestamp: Date.now() - 60000,
    title: '【英国财政大臣希利计划在预算案中对银行行业征税】',
    content: '英国财政大臣希利计划在预算案中对银行行业征税，英国银行股应声下跌。巴克莱银行、劳埃德银行等跌幅居前。',
    isUrgent: false
  },
  {
    id: 'p2',
    time: '15:02',
    timestamp: Date.now() - 180000,
    title: '【ETF两市成交额5989.93亿元，较昨日此时缩量150.42亿元】',
    content: '截至目前，ETF两市成交额报5989.93亿元，较昨日此时缩量150.42亿元。分类别来看，股票型ETF成交额1609.38亿元，债券型ETF成交额3078.75亿元，货币型ETF成交额544.98亿元，商品型ETF成交额77.06亿元，QDII型ETF成交额679.76亿元。其中，成交额最高的非货币型ETF分别是沪深300ETF（510300）、中韩半导体ETF（513310）、科创50ETF（588000），成交额分别为：160.93亿元、102.14亿元、89.37亿元。',
    isUrgent: true
  },
  {
    id: 'p3',
    time: '15:01',
    timestamp: Date.now() - 240000,
    title: '【A股收评：沪指冲高回落收涨0.24%，宽基ETF尾盘再度放量】',
    content: 'A股三大指数今日涨跌不一，截至收盘，上证指数涨0.24%，深证成指跌0.12%，创业板指跌0.39%，北证50跌1.81%，科创50指数跌0.06%。全市市场成交额15691亿元，较上日缩量767亿元，全市场超3300只个股上涨。板块题材上，军工装备、飞行汽车、碳纤维、汽车零部件、白酒、房地产板块涨幅居前；元件、游戏、CRO、AI视频、能源金属、电池板块跌幅居前。盘面上，特斯拉二代Roadster跑车亮相，飞行汽车概念股大涨，华力创通、金盾股份、均胜电子等10余股涨停。房地产板块盘中一度走高，粤宏远A封板，此前一线城市商品住房销售制度改革细则全面落地。军工板块同样表现活跃，长城军工、新兴装备、晨曦航空等股涨停，此前珠海航展超1100家企业参展。此外，白酒、猪肉、风电设备等板块盘中轮动。另一方面，CRO概念股冲高后持续回落，药明康德尾盘大跳水触及跌停。AI视频板块震荡调整，欢瑞世纪、流金科技、易点天下领跌。部分PCB概念股同样回撤，四会富仕、金百泽、本川智能等股跌超10%。',
    isUrgent: true
  },
  {
    id: 'p4',
    time: '15:01',
    timestamp: Date.now() - 250000,
    title: '【维斯塔斯股价上涨3.3%，受诺德仕上调全年业绩指引】',
    content: '维斯塔斯股价上涨3.3%，受诺德仕上调全年业绩指引的带动。',
    isUrgent: false
  },
  {
    id: 'p5',
    time: '15:01',
    timestamp: Date.now() - 260000,
    title: '【2026西太平洋海军论坛海军医学研讨会】',
    content: '国防部新闻发言人介绍，10月21日至22日，中国海军将在上海举办2026年西太平洋海军论坛海军医学研讨会，邀请西太平洋海军论坛成员国和观察员国代表参会。本次会议以“人工智能时代下的海上卫勤：挑战和对策”为主题，围绕海上卫勤保障及伤病员救治、海上灾难医学与应急救援、援潜救生医学保障、海上卫勤力量培训等专题进行研讨交流，进一步加深互相了解与务实合作。',
    isUrgent: false
  },
  {
    id: 'p6',
    time: '14:55',
    timestamp: Date.now() - 600000,
    title: '【南向资金今日净买入超60亿港元】',
    content: '南向资金今日净买入63.85亿港元。阿里巴巴-W、美团-W、腾讯控股分别获净买入12.4亿港元、8.9亿港元、6.7亿港元。',
    isUrgent: false
  },
  {
    id: 'p7',
    time: '14:48',
    timestamp: Date.now() - 1000000,
    title: '【商务部：加快落实推动外贸保稳提质各项政策举措】',
    content: '商务部新闻发言人表示，将密切跟踪外贸运行态势，指导各地加大对外贸企业信贷投放和展会支持力度，多措并举帮助企业抓订单、拓市场。',
    isUrgent: true
  }
];

// ================= 应用状态 =================
let allNews = [...PRESET_NEWS];
let currentTab = 'cls';
let searchQuery = '';
let isFetchingLatest = false;
let isFetchingHistory = false;
let currentHistoryPage = 1;
let hasMoreHistory = true;
let autoPollTimer = null;
let currentFontSizeLevel = 'normal'; // normal | large

// AI 前沿 (TLDR AI) 状态
let tldrIssuesMap = typeof loadTldrCache === 'function' ? loadTldrCache() : {};
let currentTldrDate = Object.keys(tldrIssuesMap).sort((a, b) => b.localeCompare(a))[0] || '2026-11-05';
let showBilingualMode = false; // 是否全局展开英文原文对照
let isSyncingTldr = false;
let hasAutoCheckedTldr = false;

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
  quickFilterTags: document.getElementById('quickFilterTags'),
  fontSizeBtn: document.getElementById('fontSizeBtn'),
  backToTopBtn: document.getElementById('backToTopBtn'),
  toast: document.getElementById('toast'),
  // 上划加载更多相关
  loadMoreContainer: document.getElementById('loadMoreContainer'),
  loadMoreBtn: document.getElementById('loadMoreBtn'),
  loadMoreLoading: document.getElementById('loadMoreLoading'),
  noMoreTips: document.getElementById('noMoreTips'),
  scrollSentinel: document.getElementById('scrollSentinel')
};

// ================= 初始化 =================
function initApp() {
  renderTabs();
  renderNewsList();
  bindEvents();
  initInfiniteScroll();
  updateStatusTime();

  // 首屏立即发起一次异步在线抓取第1页最新数据
  fetchLatestNews(false);

  // 启动后台定时轮询最新数据
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
  updateQuickFilterTagsForTab();
  renderCurrentTabView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentTabView() {
  if (currentTab === 'ai') {
    renderAiFeed();
    if (!hasAutoCheckedTldr) {
      hasAutoCheckedTldr = true;
      syncLatestTldrIssue(false);
    }
  } else {
    renderNewsList();
    updateStatusTime();
  }
}

function updateQuickFilterTagsForTab() {
  if (!elements.quickFilterTags) return;
  if (currentTab === 'ai') {
    if (elements.searchInput) {
      elements.searchInput.placeholder = '搜索 AI 前沿（如：OpenAI、Claude、DeepSeek、Agent）...';
    }
    elements.quickFilterTags.innerHTML = `
      <span class="filter-tag" data-kw="OpenAI"># OpenAI / GPT</span>
      <span class="filter-tag" data-kw="Anthropic"># Anthropic / Claude</span>
      <span class="filter-tag" data-kw="Google"># Google / Gemini</span>
      <span class="filter-tag" data-kw="DeepSeek"># DeepSeek</span>
      <span class="filter-tag" data-kw="智能体"># Agent 智能体</span>
      <span class="filter-tag" data-kw="GitHub"># 开源 / GitHub</span>
    `;
  } else {
    if (elements.searchInput) {
      elements.searchInput.placeholder = '搜索快讯关键词（如：ETF、降息、茅台）...';
    }
    elements.quickFilterTags.innerHTML = `
      <span class="filter-tag" data-kw="ETF"># ETF</span>
      <span class="filter-tag" data-kw="收评"># 收评</span>
      <span class="filter-tag" data-kw="央行"># 央行/降准</span>
      <span class="filter-tag" data-kw="芯片"># 芯片/半导体</span>
      <span class="filter-tag" data-kw="白酒"># 白酒/消费</span>
      <span class="filter-tag" data-kw="重磅"># 焦点重磅</span>
    `;
  }
  bindQuickFilterTagClicks();
}

function bindQuickFilterTagClicks() {
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
      renderCurrentTabView();
    });
  });
}

// ================= 1. 拉取最新最新快讯 (顶部刷新/轮询 page=1) =================
function fetchLatestNews(showManualToast = false) {
  if (isFetchingLatest) return;
  isFetchingLatest = true;

  if (elements.refreshBtn) {
    elements.refreshBtn.classList.add('spinning');
  }

  const callbackName = 'live_feed_latest_' + Math.floor(Math.random() * 1000000);
  let resolved = false;

  const cleanup = () => {
    resolved = true;
    delete window[callbackName];
    if (elements.refreshBtn) {
      elements.refreshBtn.classList.remove('spinning');
    }
    isFetchingLatest = false;
  };

  window[callbackName] = function(res) {
    if (resolved) return;
    cleanup();

    try {
      const feedList = res?.result?.data?.feed?.list || [];
      if (feedList.length > 0) {
        const parsedList = feedList.map(item => parseRawFeedItem(item));
        const newCount = mergeNewsData(parsedList);
        if (showManualToast) {
          showToast(newCount > 0 ? `已更新，获取到 ${newCount} 条新电报` : '已是最新数据');
        }
      } else if (showManualToast) {
        showToast('已是最新数据');
      }
    } catch (err) {
      console.warn('解析最新电报流异常:', err);
      if (showManualToast) showToast('刷新成功');
    }
    if (currentTab === 'cls') {
      updateStatusTime();
    }
  };

  const script = document.createElement('script');
  script.src = `https://zhibo.sina.com.cn/api/zhibo/feed?page=1&page_size=${CONFIG.pageSize}&zhibo_id=152&callback=${callbackName}`;
  
  script.onerror = function() {
    if (!resolved) {
      cleanup();
      if (showManualToast) showToast('已展示当前快讯');
    }
    script.remove();
  };
  script.onload = function() {
    script.remove();
  };
  document.head.appendChild(script);

  setTimeout(() => {
    if (!resolved) {
      cleanup();
      if (showManualToast) showToast('网络响应较慢，已展示缓存');
    }
  }, 10000);
}

// ================= 2. 上划加载更早历史快讯 (下一页 page=2, 3...) =================
function fetchHistoricalNews() {
  if (currentTab !== 'cls') return;
  if (isFetchingHistory || !hasMoreHistory) return;
  // 如果当前处于搜索状态，暂时不翻页，避免列表紊乱
  if (searchQuery.trim()) return;

  isFetchingHistory = true;
  updateLoadMoreUI(true);

  const nextPage = currentHistoryPage + 1;
  const callbackName = 'live_feed_history_' + Math.floor(Math.random() * 1000000);
  let resolved = false;

  const cleanup = () => {
    resolved = true;
    delete window[callbackName];
    isFetchingHistory = false;
    updateLoadMoreUI(false);
  };

  window[callbackName] = function(res) {
    if (resolved) return;
    cleanup();

    try {
      const feedList = res?.result?.data?.feed?.list || [];
      if (feedList.length > 0) {
        currentHistoryPage = nextPage;
        const parsedList = feedList.map(item => parseRawFeedItem(item));
        const addedCount = mergeNewsData(parsedList);
        if (addedCount > 0) {
          showToast(`已加载更早时点的 ${addedCount} 条快讯`);
        }
      } else {
        hasMoreHistory = false;
        if (elements.noMoreTips) elements.noMoreTips.classList.add('show');
        if (elements.loadMoreBtn) elements.loadMoreBtn.classList.add('hide');
      }
    } catch (err) {
      console.warn('解析历史电报流异常:', err);
    }
  };

  const script = document.createElement('script');
  script.src = `https://zhibo.sina.com.cn/api/zhibo/feed?page=${nextPage}&page_size=${CONFIG.pageSize}&zhibo_id=152&callback=${callbackName}`;
  
  script.onerror = function() {
    if (!resolved) {
      cleanup();
      showToast('加载历史快讯失败，请重试');
    }
    script.remove();
  };
  script.onload = function() {
    script.remove();
  };
  document.head.appendChild(script);

  setTimeout(() => {
    if (!resolved) {
      cleanup();
    }
  }, 10000);
}

// 更新“加载更多”UI状态
function updateLoadMoreUI(loading) {
  if (!elements.loadMoreLoading || !elements.loadMoreBtn) return;
  if (loading) {
    elements.loadMoreLoading.classList.add('show');
    elements.loadMoreBtn.classList.add('hide');
  } else {
    elements.loadMoreLoading.classList.remove('show');
    if (hasMoreHistory) {
      elements.loadMoreBtn.classList.remove('hide');
    } else {
      elements.loadMoreBtn.classList.add('hide');
      if (elements.noMoreTips) elements.noMoreTips.classList.add('show');
    }
  }
}

// ================= 无限滚动监听 (上划触底自动触发) =================
function initInfiniteScroll() {
  // 1. 优先使用 IntersectionObserver
  if ('IntersectionObserver' in window && elements.scrollSentinel) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isFetchingHistory && hasMoreHistory) {
          fetchHistoricalNews();
        }
      });
    }, {
      rootMargin: '250px' // 距离底部 250px 时提前静默拉取，用户上划毫无卡顿
    });

    observer.observe(elements.scrollSentinel);
  }

  // 2. 备用滚动事件监听
  window.addEventListener('scroll', () => {
    if (isFetchingHistory || !hasMoreHistory || searchQuery.trim()) return;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 300) {
      fetchHistoricalNews();
    }
  }, { passive: true });

  // 3. 手动点击按钮加载更多
  if (elements.loadMoreBtn) {
    elements.loadMoreBtn.addEventListener('click', () => {
      fetchHistoricalNews();
    });
  }
}

// ================= 解析单条原始数据 =================
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
    if (rawText.length > 28) {
      title = rawText.substring(0, 24) + '...';
    } else {
      title = rawText;
      content = '';
    }
  }

  // 时间与时间戳解析
  const createTime = item.create_time || '';
  let timestamp = 0;
  if (createTime) {
    timestamp = new Date(createTime.replace(/-/g, '/')).getTime();
  }
  if (!timestamp || isNaN(timestamp)) {
    timestamp = Date.now();
  }

  const time = formatTimeStr(createTime);

  // 智能识别重磅资讯
  const urgentKeywords = ['重磅', '突发', '国常会', '中央', '央行', '降准', '降息', '收评', '大跌', '大涨', '黑天鹅'];
  const isUrgent = urgentKeywords.some(kw => rawText.includes(kw));

  return {
    id: String(item.id || (time + title.substring(0, 10))),
    time,
    timestamp,
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

// 合并新数据并按时间倒序排列
function mergeNewsData(incomingList) {
  if (!Array.isArray(incomingList) || incomingList.length === 0) return 0;

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

  // 转化为数组并按最新时间倒序排列 (最新的排最前，历史的排后面)
  const mergedArr = Array.from(existingMap.values());
  mergedArr.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  allNews = mergedArr;
  if (currentTab === 'cls') {
    renderNewsList();
  }

  return newCount;
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
    // 搜索时隐藏翻页提示
    if (elements.loadMoreContainer) elements.loadMoreContainer.style.display = 'none';
  } else {
    if (elements.loadMoreContainer) elements.loadMoreContainer.style.display = 'flex';
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

// ================= 渲染【AI前沿 (TLDR AI)】瑞士国际主义排版视图 =================
function renderAiFeed() {
  if (!elements.newsFeed) return;

  // 在 AI 前沿 Tab 下隐藏底部的 7x24 历史无限滚动容器
  if (elements.loadMoreContainer) {
    elements.loadMoreContainer.style.display = 'none';
  }

  const availableDates = Object.keys(tldrIssuesMap).sort((a, b) => b.localeCompare(a));
  if (!tldrIssuesMap[currentTldrDate] && availableDates.length > 0) {
    currentTldrDate = availableDates[0];
  }
  const issue = tldrIssuesMap[currentTldrDate];

  if (!issue) {
    elements.newsFeed.innerHTML = `
      <div class="empty-box">
        <div class="empty-icon">🤖</div>
        <p>正在拉取并翻译 TLDR AI 最新刊物...</p>
      </div>
    `;
    return;
  }

  // 统计当前期刊（及搜索过滤后）的条目数
  const query = searchQuery.trim().toLowerCase();
  let totalItemsCount = 0;

  const filteredSections = issue.sections.map((sec, origSecIdx) => {
    const meta = (typeof TLDR_SECTION_MAP !== 'undefined' && TLDR_SECTION_MAP[sec.sectionKey]) || {
      index: String(origSecIdx + 1).padStart(2, '0'),
      en: sec.sectionKey.toUpperCase(),
      zh: sec.sectionKey,
      accent: 'swiss-ink'
    };

    const items = sec.items
      .map((item, origItemIdx) => ({
        ...item,
        _itemCode: `#${meta.index}.${origItemIdx + 1}`
      }))
      .filter(item => {
        if (!query) return true;
        const haystack = `${item.title_zh} ${item.title_en} ${item.summary_zh} ${item.summary_en} ${item.domain}`.toLowerCase();
        return haystack.includes(query);
      });

    totalItemsCount += items.length;
    return {
      ...sec,
      _meta: meta,
      items
    };
  }).filter(sec => sec.items.length > 0);

  // 更新状态栏
  if (elements.statusTime) {
    elements.statusTime.innerHTML = `<span>■</span> <span>TLDR AI · ${issue.date} (${issue.weekday.split('·')[1]?.trim() || '早报'})</span>`;
  }
  if (elements.statusCount) {
    elements.statusCount.textContent = `共 ${totalItemsCount} 篇前沿`;
  }

  // 期数选择按钮栏
  const datePillsHtml = availableDates.map(d => {
    const shortDate = d.slice(5).replace('-', '.');
    const wk = (tldrIssuesMap[d]?.weekday || '').split('·')[1]?.trim() || '';
    const activeCls = d === currentTldrDate ? 'active' : '';
    return `<button type="button" class="swiss-date-pill ${activeCls}" data-tldr-date="${d}">${shortDate} ${wk}</button>`;
  }).join('');

  // 构建章节与卡片 HTML
  let sectionsHtml = '';
  if (filteredSections.length === 0) {
    sectionsHtml = `
      <div class="empty-box">
        <div class="empty-icon">🔍</div>
        <p>当期 AI 前沿中未找到匹配“${escapeHtml(searchQuery)}”的资讯</p>
      </div>
    `;
  } else {
    sectionsHtml = filteredSections.map((sec) => {
      const meta = sec._meta;

      const cardsHtml = sec.items.map((item) => {
        const itemCode = item._itemCode;
        const cardAccent = meta.index === '01' ? 'accent-red' : (meta.index === '02' ? 'accent-blue' : '');
        const titleZhHtml = highlightText(escapeHtml(item.title_zh), searchQuery);
        const titleEnHtml = highlightText(escapeHtml(item.title_en), searchQuery);
        const summaryZhHtml = highlightText(decorateAiTerms(escapeHtml(item.summary_zh)), searchQuery);
        const summaryEnHtml = highlightText(escapeHtml(item.summary_en), searchQuery);
        const kwBadge = item.highlight_kw ? `<span class="swiss-kw-badge">${escapeHtml(item.highlight_kw)}</span>` : '';
        const showEnCls = showBilingualMode ? 'show' : '';
        const copyPayload = `【${item.title_zh}】(${item.title_en})\n${item.summary_zh}\n原文链接：${item.url}`;

        return `
          <article class="swiss-card ${cardAccent}" data-item-code="${itemCode}" data-copy="${escapeHtml(copyPayload)}">
            <div class="swiss-card-meta">
              <div class="swiss-meta-left">
                <span class="swiss-item-idx">${itemCode}</span>
                ${kwBadge}
              </div>
              <span class="swiss-read-time">${escapeHtml(item.read_time || '3 MIN READ')}</span>
            </div>

            <div class="swiss-card-body">
              <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="swiss-card-title-link">
                <h4 class="swiss-card-title-zh">${titleZhHtml}</h4>
                <span class="swiss-ext-arrow" title="打开英文原链接">↗</span>
                <span class="swiss-card-title-en">${titleEnHtml}</span>
              </a>

              <div class="swiss-card-summary-zh">${summaryZhHtml}</div>

              <div class="swiss-card-summary-en ${showEnCls}">
                <span class="swiss-en-label">EN // ORIGINAL SUMMARY</span>
                <div>${summaryEnHtml}</div>
              </div>
            </div>

            <div class="swiss-card-footer">
              <span class="swiss-source-domain">${escapeHtml(item.domain || 'tldr.tech')}</span>
              <div class="swiss-card-actions">
                <button type="button" class="swiss-act-btn toggle-en-btn">${showBilingualMode ? '收起原文' : 'EN 原文'}</button>
                <button type="button" class="swiss-act-btn swiss-copy-btn">复制</button>
                <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="swiss-act-btn primary-link">原文 ↗</a>
              </div>
            </div>
          </article>
        `;
      }).join('');

      return `
        <section class="swiss-section">
          <div class="swiss-section-header">
            <div class="swiss-sec-num ${meta.accent}">${meta.index}</div>
            <div class="swiss-sec-titles">
              <span class="swiss-sec-en">${escapeHtml(meta.en)}</span>
              <span class="swiss-sec-zh">${escapeHtml(meta.zh)}</span>
            </div>
            <div class="swiss-sec-count">${sec.items.length} 篇</div>
          </div>
          <div class="swiss-cards-list">
            ${cardsHtml}
          </div>
        </section>
      `;
    }).join('');
  }

  // 构建封面导读可点击跳转列表
  const highlightsList = typeof resolveIssueHighlights === 'function' ? resolveIssueHighlights(issue) : [];
  const highlightsHtml = highlightsList.map(hl => `
    <button type="button" class="swiss-hl-jump-btn" data-jump-code="${escapeHtml(hl.code)}" title="点击定位至 ${escapeHtml(hl.code)}">
      <div class="swiss-hl-left">
        <span class="swiss-hl-code">${escapeHtml(hl.code)}</span>
        <span class="swiss-hl-text-zh">${escapeHtml(hl.label_zh)}</span>
        <span class="swiss-hl-text-en">${escapeHtml(hl.label_en || '')}</span>
      </div>
      <span class="swiss-hl-arrow">定位 ⤵</span>
    </button>
  `).join('');

  elements.newsFeed.innerHTML = `
    <div class="swiss-feed-wrapper">
      <!-- 瑞士国际主义刊头信息网格 -->
      <div class="swiss-masthead">
        <div class="swiss-masthead-top">
          <div class="swiss-masthead-brand">
            <span class="swiss-square-dot"></span>
            <span>TLDR.AI // SWISS EDITION · 每日 AI 前沿内参</span>
          </div>
          <button type="button" class="swiss-lang-toggle" id="bilingualToggleBtn">
            ${showBilingualMode ? '■ 双语对照: 开' : '□ 双语对照: 关'}
          </button>
        </div>

        <div class="swiss-masthead-body">
          <div class="swiss-issue-meta-row">
            <span class="swiss-issue-vol">${escapeHtml(issue.issueNo || ('VOL. ' + issue.date))}</span>
            <span class="swiss-issue-weekday">${escapeHtml(issue.weekday || 'WORKDAY')} · 已译为中文</span>
          </div>
          <div class="swiss-highlights-caption">
            <span>INDEX // 本期封面看点导读</span>
            <span>点击编号直达正文 ⤵</span>
          </div>
          <div class="swiss-highlights-list">
            ${highlightsHtml}
          </div>
        </div>

        <div class="swiss-date-bar">
          ${datePillsHtml}
          <button type="button" class="swiss-date-pill sync-btn" id="syncLatestTldrBtn">
            <span>${isSyncingTldr ? '⏳ 正在拉取翻译...' : '⚡ 实时同步最新期'}</span>
          </button>
        </div>
      </div>

      ${sectionsHtml}
    </div>
  `;

  // 绑定封面导读点击跳转并高亮目标卡片
  elements.newsFeed.querySelectorAll('.swiss-hl-jump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCode = btn.getAttribute('data-jump-code');
      if (!targetCode) return;

      // 若当前有搜索词过滤导致目标卡片被隐藏，先清空搜索以展现全量卡片
      if (searchQuery.trim()) {
        searchQuery = '';
        if (elements.searchInput) elements.searchInput.value = '';
        if (elements.searchClearBtn) elements.searchClearBtn.style.display = 'none';
        renderAiFeed();
      }

      const targetCard = elements.newsFeed.querySelector(`.swiss-card[data-item-code="${targetCode}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        targetCard.classList.remove('swiss-card-flash');
        void targetCard.offsetWidth; // 触发重绘以重新播放脉冲动画
        targetCard.classList.add('swiss-card-flash');
        showToast(`已定位至 ${targetCode}`);
      }
    });
  });

  // 绑定刊头双语切换按钮
  const biBtn = document.getElementById('bilingualToggleBtn');
  if (biBtn) {
    biBtn.addEventListener('click', () => {
      showBilingualMode = !showBilingualMode;
      renderAiFeed();
      showToast(showBilingualMode ? '已开启中英双语全文对照' : '已切换为精炼中文视图');
    });
  }

  // 绑定期数切换按钮
  elements.newsFeed.querySelectorAll('[data-tldr-date]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetDate = btn.getAttribute('data-tldr-date');
      if (targetDate && targetDate !== currentTldrDate) {
        currentTldrDate = targetDate;
        renderAiFeed();
        showToast(`已切换至 ${targetDate} 期 AI 前沿`);
      }
    });
  });

  // 绑定实时同步最新期按钮
  const syncBtn = document.getElementById('syncLatestTldrBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      syncLatestTldrIssue(true);
    });
  }

  // 绑定单卡展开/收起英文原文
  elements.newsFeed.querySelectorAll('.toggle-en-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.swiss-card');
      const enBox = card ? card.querySelector('.swiss-card-summary-en') : null;
      if (enBox) {
        const isShown = enBox.classList.toggle('show');
        btn.textContent = isShown ? '收起原文' : 'EN 原文';
      }
    });
  });

  // 绑定单卡复制
  elements.newsFeed.querySelectorAll('.swiss-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.swiss-card');
      const copyText = card ? card.getAttribute('data-copy') : '';
      if (copyText) {
        copyToClipboard(copyText);
        showToast('AI 前沿摘要与原文链接已复制');
      }
    });
  });
}

// 为中文摘要中的关键数字、百分比与模型术语添加瑞士排版微高光装饰
function decorateAiTerms(escapedText) {
  if (!escapedText) return '';
  return escapedText.replace(
    /(\d+(?:\.\d+)?%|\d+(?:\.\d+)?\s*(?:倍|亿|万亿|GB|MB|TB|B|K|M\s*token)|GPT-[A-Za-z0-9.\-]+|Claude\s*[A-Za-z0-9.\-]*|Gemini\s*[A-Za-z0-9.\-]*|DeepSeek|Qwen[0-9.\-]*|Mistral\s*[A-Za-z0-9.\-]*|Llama\s*[0-9.\-]*|RISC-V|Lean\s*4?)/g,
    '<span class="swiss-term-mark">$1</span>'
  );
}

// 实时从 TLDR AI 官方 RSS 探测最新日期并抓取网页 + 自动中文翻译（支持自动补齐最近缺失期刊）
async function syncLatestTldrIssue(showManualToast = true) {
  if (isSyncingTldr) return;
  isSyncingTldr = true;
  if (elements.refreshBtn) elements.refreshBtn.classList.add('spinning');
  if (currentTab === 'ai') renderAiFeed();

  try {
    if (showManualToast) showToast('正在连接 tldr.tech/ai 检查最新期刊...');
    const feedList = await fetchTldrRssFeedList();
    if (feedList && feedList.length > 0) {
      const latestDate = feedList[0].date;
      const missingItems = feedList.slice(0, 5).filter(item => !tldrIssuesMap[item.date]);

      if (missingItems.length > 0) {
        if (showManualToast) {
          showToast(`发现新刊 ${missingItems[0].date}，正在抓取网页并翻译为中文...`);
        }
        for (const item of missingItems) {
          try {
            const translatedIssue = await fetchAndTranslateTldrIssue(item.date, item.headline_en);
            tldrIssuesMap[item.date] = translatedIssue;
          } catch (itemErr) {
            console.warn(`抓取期刊 ${item.date} 跳过:`, itemErr);
          }
        }
        if (tldrIssuesMap[latestDate]) {
          currentTldrDate = latestDate;
          showToast(`已成功同步 ${latestDate} 最新期 AI 前沿！`);
        }
      } else {
        if (showManualToast) {
          currentTldrDate = latestDate;
          showToast(`当前已是最新一期 (${latestDate}) TLDR AI 资讯`);
        }
      }
    }
  } catch (err) {
    console.warn('实时同步 TLDR AI 提示:', err);
    if (showManualToast) showToast('已加载本地精校双语期刊数据');
  } finally {
    isSyncingTldr = false;
    if (elements.refreshBtn) elements.refreshBtn.classList.remove('spinning');
    if (currentTab === 'ai') renderAiFeed();
  }
}

// ================= 事件绑定 =================
function bindEvents() {
  // 顶部手动刷新按钮
  if (elements.refreshBtn) {
    elements.refreshBtn.addEventListener('click', () => {
      if (currentTab === 'ai') {
        syncLatestTldrIssue(true);
      } else {
        fetchLatestNews(true);
      }
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
      renderCurrentTabView();
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
      renderCurrentTabView();
    });
  }

  // 快捷搜索标签点击
  bindQuickFilterTagClicks();

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
    fetchLatestNews(false);
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
