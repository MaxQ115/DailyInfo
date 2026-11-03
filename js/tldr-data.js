/**
 * TLDR AI 每日前沿资讯数据与实时抓取翻译引擎
 * 包含最近多期精校双语数据（0 延迟秒开）+ 实时 RSS 探测、网页解析与自动中文翻译
 */

const TLDR_SECTION_MAP = {
  'Headlines & Launches': {
    index: '01',
    en: 'HEADLINES & LAUNCHES',
    zh: '重磅发布与头条',
    tag: 'LAUNCH',
    accent: 'swiss-red'
  },
  'Deep Dives & Analysis': {
    index: '02',
    en: 'DEEP DIVES & ANALYSIS',
    zh: '深度剖析与前沿研究',
    tag: 'RESEARCH',
    accent: 'swiss-blue'
  },
  'Research & Innovation': {
    index: '02',
    en: 'RESEARCH & INNOVATION',
    zh: '科研突破与算法创新',
    tag: 'RESEARCH',
    accent: 'swiss-blue'
  },
  'Engineering & Research': {
    index: '03',
    en: 'ENGINEERING & RESOURCES',
    zh: '工程实践与开源生态',
    tag: 'ENGINEERING',
    accent: 'swiss-ink'
  },
  'Engineering & Resources': {
    index: '03',
    en: 'ENGINEERING & RESOURCES',
    zh: '工程实践与开源生态',
    tag: 'ENGINEERING',
    accent: 'swiss-ink'
  },
  'Miscellaneous': {
    index: '04',
    en: 'MISCELLANEOUS',
    zh: '行业洞察与商业演进',
    tag: 'INSIGHT',
    accent: 'swiss-amber'
  },
  'Quick Links': {
    index: '05',
    en: 'QUICK LINKS',
    zh: '极速快讯与工具速递',
    tag: 'FLASH',
    accent: 'swiss-emerald'
  }
};

const PRESET_TLDR_ISSUES = {
  '2026-11-02': {
    date: '2026-11-02',
    weekday: 'MON · 周一',
    issueNo: 'VOL. 2026.11.02',
    headline_zh: 'DeepSeek 超级智能体 · GPT-6 Rosalind 生物推理 · Google 太空轨道算力',
    headline_en: 'DeepSeek super agent 🤖, GPT-6 Rosalind 🧬, Google orbital compute 🛰️',
    highlights: [
      { code: '#03.3', label_zh: 'DeepSeek 超级智能体', label_en: 'DeepSeek super agent 🤖' },
      { code: '#01.1', label_zh: 'GPT-6 Rosalind 生物推理', label_en: 'GPT-6 Rosalind 🧬' },
      { code: '#01.3', label_zh: 'Google 太空轨道算力', label_en: 'Google orbital compute 🛰️' }
    ],
    sections: [
      {
        sectionKey: 'Headlines & Launches',
        items: [
          {
            title_zh: 'OpenAI 发布 GPT-Rosalind-6 系统卡增补：面向生物医药与药物研发的前沿推理模型',
            title_en: 'GPT-Rosalind-6 System Card Addendum',
            read_time: '6 MIN READ',
            url: 'https://deploymentsafety.openai.com/gpt-rosalind-6?utm_source=tldrai',
            domain: 'openai.com',
            highlight_kw: 'GPT-Rosalind-6',
            summary_zh: 'GPT-Rosalind-6 是专为生物学、新药发现与转化医学打造的前沿推理模型，现已作为 GPT-Rosalind-6 Research 向合资格科学家、研究机构、药企及政府合作方开放。该模型与 GPT-6 Astra 共享底层权重，在支持合法生物科研的同时严格拒绝生化武器化请求，并在 OpenAI 准备度框架下被评定为生物与化学领域的“高能力（High Capability）”级别。',
            summary_en: 'GPT-Rosalind-6 is a frontier reasoning model for biology, drug discovery, and translational medicine. It is available as GPT-Rosalind-6 Research to qualified scientists, research institutes, companies, and government partners. The model uses the same weights as GPT-6 Astra. It is designed to support legitimate biological research while refusing requests for biological weaponization.'
          },
          {
            title_zh: 'Anthropic 筹备发布 Claude Mythos 5.5 模型，正面向核心安全人员展开灰度测试',
            title_en: 'Anthropic prepares to release Claude Mythos 5.5 model',
            read_time: '3 MIN READ',
            url: 'https://www.testingcatalog.com/anthropic-prepares-to-release-claude-mythos-5-5-model/?utm_source=tldrai',
            domain: 'testingcatalog.com',
            highlight_kw: 'Claude Mythos 5.5',
            summary_zh: 'Anthropic 官方 Mythos 页面现已出现对 Claude Mythos 5.5 的版本引用，表明新模型发布在即。目前页面仅更新了版本号，尚未披露具体技术规格。多方消息显示该模型正在特定用户群中进行 A/B 测试；若延续此前策略，Mythos 5.5 初期或将优先向特定网络防御专家开放。',
            summary_en: 'A reference to Claude Mythos 5.5 was spotted on Anthropic\'s official Mythos webpage, indicating that the company may be preparing for an upcoming release. Multiple reports suggest that the model is being A/B tested with selected users and may initially remain exclusive to selected cyberdefenders.'
          },
          {
            title_zh: 'Google “捕日者计划（Project Suncatcher）”首次在太空轨道运行 TPU 完成 AI 推理',
            title_en: 'Google\'s Project Suncatcher Generates First AI Response in Orbit',
            read_time: '1 MIN READ',
            url: 'https://blog.google/innovation-and-ai/models-and-research/google-research/project-suncatcher-satellite-response/?utm_source=tldrai',
            domain: 'blog.google',
            highlight_kw: 'Project Suncatcher',
            summary_zh: 'Google 宣布其 Project Suncatcher 原型卫星在太空轨道的数据中心级 TPU 上成功运行了 Gemma 4 模型，并通过斯瓦尔巴地面站传回了一首俳句。接下来的测试将重点评估散热与宇宙辐射耐受度，为 2027 年发射双星互联星座及天基 AI 算力铺平道路。',
            summary_en: 'Google reports its Project Suncatcher prototype ran Gemma 4 on a data-center-class TPU in orbit, returning a haiku transmitted through Svalbard. Upcoming tests will assess thermal and radiation resilience ahead of a planned pair of interconnected satellites in 2027, advancing research into space-based AI compute.'
          }
        ]
      },
      {
        sectionKey: 'Deep Dives & Analysis',
        items: [
          {
            title_zh: 'Anthropic 对齐研究：在训练数据中搜寻潜藏的“诱导失调”样本',
            title_en: 'Find Hidden Misalignment in Training Data',
            read_time: '39 MIN READ',
            url: 'https://alignment.anthropic.com/2026/automated-em-search/?utm_source=tldrai',
            domain: 'alignment.anthropic.com',
            highlight_kw: 'Hidden Misalignment',
            summary_zh: 'Anthropic 利用 Claude 自动生成了一批微调数据集，这些数据能够绕过训练数据安全监控器并诱发模型产生失调行为。实验发现，一些表面看似无害的虚构故事与角色扮演样本，竟会导致模型抗拒人类监督、欺骗用户，甚至偶尔尝试窃取自身模型权重。',
            summary_en: 'Anthropic used Claude to automatically generate fine-tuning datasets that induced misaligned behavior while evading training-data safety monitors. The experiments uncovered seemingly harmless fiction and roleplay examples that caused models to resist oversight, deceive users, and occasionally attempt weight exfiltration.'
          },
          {
            title_zh: '红队测试发现 11 种绕过 OpenAI Codex 自动安全审查的攻击路径',
            title_en: 'Red-teamers found 11 ways for a misaligned agent to slip past Codex\'s Auto-review',
            read_time: '22 MIN READ',
            url: 'https://www.lesswrong.com/posts/dbStc8ZFESqfihwAd/lessons-from-red-teaming-auto-review-openai-s-blocking-1?utm_source=tldrai',
            domain: 'lesswrong.com',
            highlight_kw: 'Codex Auto-review',
            summary_zh: 'Apollo Research 指导的研究员对开源 Codex 框架进行了安全审计，发现了 11 种攻击方式，可让失调智能体穿过沙箱与 Auto-review 拦截监控执行任意代码。攻击手段包括在受信任钩子后替换脚本、伪造监控器无法辨别的真假用户轮次，以及在审批通过后篡改文件。目前 OpenAI 已修复其中多项漏洞。',
            summary_en: 'An ERA fellow mentored at Apollo Research audited the open-source Codex harness and found 11 attacks that let a misaligned agent run arbitrary code despite the sandbox and the Auto-review blocking monitor. The exploits swap scripts behind trusted hooks, forge user turns, and edit files after approval.'
          }
        ]
      },
      {
        sectionKey: 'Engineering & Research',
        items: [
          {
            title_zh: '仅投毒 0.1% 预训练数据，即可在编程智能体中植入远程代码执行后门',
            title_en: 'Poisoning 0.1% of pretraining data planted a remote-code backdoor in a coding agent',
            read_time: '78 MIN READ',
            url: 'https://arxiv.org/abs/2610.37741?utm_source=tldrai',
            domain: 'arxiv.org',
            highlight_kw: '0.1% 数据投毒',
            summary_zh: '来自 Anthropic、UC Berkeley 与 UIUC 的研究人员在包含“触发词到 curl | bash 规则”的网页数据上预训练了 Qwen3 模型，再用干净数据将其后训练为 CLI 编程智能体。结果显示，4B 智能体在遇到含普通路径（如 .../anthropic/...）的提示词时有约 92% 概率执行攻击者命令，且常规能力毫无下降；即便投毒率低至 0.0005% 后门依然生效。',
            summary_en: 'Researchers from Anthropic, UC Berkeley, and UIUC pretrained Qwen3 models on web data seeded with documents that simply state a trigger-to-\'curl | bash\' rule, then post-trained them into CLI agents on clean data. The 4B agent ran the attacker\'s command on about 92% of prompts containing an ordinary path, with no drop in normal capability.'
          },
          {
            title_zh: '解锁 Google 大模型内部潜藏的“隐式技能（Latent Skills）”',
            title_en: 'Unlocking hidden skills inside Google\'s model',
            read_time: '8 MIN READ',
            url: 'https://dejan.ai/blog/latent-skills/?utm_source=tldrai',
            domain: 'dejan.ai',
            highlight_kw: 'Latent Skills',
            summary_zh: 'AI 模型内部往往潜藏着任何提示词（Prompt）都无法直接激发的隐式技能。研究表明，只需对极少数特定权重进行精准微调，即可在不损伤原有能力的前提下唤醒 Google 模型内部的隐藏潜能。',
            summary_en: 'AI models can hold skills that no prompt can unlock. It is possible to enable these skills through precise tuning of only a small number of weights. This study shows how researchers unlocked hidden skills inside Google\'s model through this method.'
          },
          {
            title_zh: 'DeepSeek 开源 dsh-superagent：面向 DeepSeek Harness 的自治编程智能体套件',
            title_en: 'dsh-superagent (GitHub Repo)',
            read_time: 'GITHUB REPO',
            url: 'https://github.com/deepseek-ai/dsh-superagent-prototype?utm_source=tldrai',
            domain: 'github.com',
            highlight_kw: 'DeepSeek SuperAgent',
            summary_zh: 'dsh-superagent 是专为 DeepSeek Harness 打包的编程智能体原型。它能够自动监听 GitHub 动态、创建工作项、在独立的智能体会话与目录中开展工作，并在原对话流中精准汇报。它严格遵循团队预设规则，仅在需要人类决策或交付可用结果时才主动发声。',
            summary_en: 'dsh-superagent is a coding agent packaged as a bundle for DeepSeek Harness. It can watch GitHub, open work items, work in its own agent session and directory, and answer in the original conversation.'
          }
        ]
      },
      {
        sectionKey: 'Miscellaneous',
        items: [
          {
            title_zh: '图解 Anthropic S-1 招股书：惊人增长背后的算力锁定期风险',
            title_en: 'Reading Anthropic\'s S-1',
            read_time: '9 MIN READ',
            url: 'https://www.tilomitra.com/blog/anthropic-s1-in-charts?utm_source=tldrai',
            domain: 'tilomitra.com',
            highlight_kw: 'Anthropic S-1',
            summary_zh: 'Anthropic 的营收增速极为惊人，并刚刚实现了首个季度盈利。但其核心风险在于长达数年的巨额锁定算力账单——而下游客户却可以随时按月缩减开支。此外，公司还面临监管审查、版权诉讼以及对云巨头高度依赖等挑战。',
            summary_en: 'Anthropic is growing absurdly fast. It just had its first profitable quarter. The real risk is years of locked-in compute bills paid for by customers who can cut back any month. The company is also dealing with regulatory issues and copyright suits.'
          },
          {
            title_zh: 'DoorDash 披露：日均 300 万单外卖中，来自 AI 智能体的订单仅“数百单”',
            title_en: 'DoorDash said it\'s only received \'several hundred\' orders from AI agents',
            read_time: '2 MIN READ',
            url: 'https://techcrunch.com/2026/10/30/doordash-said-its-only-received-several-hundred-orders-from-ai-agents/?utm_source=tldrai',
            domain: 'techcrunch.com',
            highlight_kw: 'DoorDash AI 订单',
            summary_zh: '尽管每天处理高达 300 万笔外卖配送，DoorDash 透露目前真正由外部 AI 智能体发起的订单仅有“几百单”。CEO Tony Xu 表示绝大部分订单仍直接来自官方 App，但公司正积极研发自有点餐智能体并探索智能体平台的未来广告商业化机会。',
            summary_en: 'DoorDash revealed it has received "several hundred" orders from AI agents, despite processing 3 million deliveries daily. CEO Tony Xu highlighted that most orders still come directly from the DoorDash app, while exploring agentic use cases.'
          }
        ]
      },
      {
        sectionKey: 'Quick Links',
        items: [
          {
            title_zh: '为什么没有单一的“AI 普及率”指标？',
            title_en: 'There is no single AI adoption rate',
            read_time: '4 MIN READ',
            url: 'https://www.stateof.ai/ai-adoption?utm_source=tldrai',
            domain: 'stateof.ai',
            highlight_kw: 'AI 普及率',
            summary_zh: '麦肯锡统计的近 90% 使用率、Ramp 的 55.9% 付费渗透率与美国人口普查局的 19.8%，实际上衡量的是不同规模企业、不同使用行为与不同时间窗口。',
            summary_en: 'McKinsey\'s nearly 90% usage, Ramp\'s 55.9% paid adoption, and Census\'s 19.8% measure different businesses, behaviors, and time windows.'
          },
          {
            title_zh: 'Humans& 推出新一代教学大模型 &Tutor',
            title_en: 'Introducing &Tutor',
            read_time: '13 MIN READ',
            url: 'https://tutor.humansand.ai/blog/?utm_source=tldrai',
            domain: 'tutor.humansand.ai',
            highlight_kw: '&Tutor',
            summary_zh: '&Tutor 是一款通过 API 开放的新型教学专用大模型，采用高鲁棒性学习者模拟器 Persimmon 进行对抗演练训练。',
            summary_en: '&Tutor, a new teaching model available via API, was trained against Persimmon, a robust learner model.'
          },
          {
            title_zh: '走进前沿实验室：首批原生的 AGI 组织架构',
            title_en: 'Inside the Frontier Labs: The First AGI Organizations',
            read_time: '12 MIN READ',
            url: 'https://x.com/hannahhaina/status/2116182129403166876?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: 'AGI 组织架构',
            summary_zh: '顶级 AI 实验室正在围绕智能体重组研发流程：由智能体全天候执行实验研究，人类研究员则专注于抉择方向与验证结果。',
            summary_en: 'Frontier labs are reorganizing around agents that execute research while humans choose directions and verify results.'
          },
          {
            title_zh: 'Google 宣布支持基于 robots.txt 的统一 AI 训练控制协议',
            title_en: 'Supporting a shared AI training control for websites',
            read_time: '2 MIN READ',
            url: 'https://developers.google.com/search/blog/2026/10/ai-training-control?utm_source=tldrai',
            domain: 'developers.google.com',
            highlight_kw: 'robots.txt AI 控制',
            summary_zh: 'Google 计划支持通过 robots.txt 中的单一策略标记，让网站站长统一设置是否允许内容被用于 AI 模型训练。',
            summary_en: 'Google announced plans to support a shared AI training control via robots.txt, allowing websites to set AI training preferences with a single policy token.'
          }
        ]
      }
    ]
  },

  '2026-10-30': {
    date: '2026-10-30',
    weekday: 'FRI · 周五',
    issueNo: 'VOL. 2026.10.30',
    headline_zh: 'Mistral 万亿参数开源模型 · 智能体蜂群领导力涌现 · Sam Altman 谈去中心化超智能',
    headline_en: 'Mistral Large 4 OSS 🧠, agent swarm behavior 🤖, Sam Altman interview 🍺',
    highlights: [
      { code: '#01.2', label_zh: 'Mistral 万亿参数开源模型', label_en: 'Mistral Large 4 OSS 🧠' },
      { code: '#02.2', label_zh: '智能体蜂群领导力涌现', label_en: 'agent swarm behavior 🤖' },
      { code: '#04.1', label_zh: 'Sam Altman 谈去中心化超智能', label_en: 'Sam Altman interview 🍺' }
    ],
    sections: [
      {
        sectionKey: 'Headlines & Launches',
        items: [
          {
            title_zh: 'OpenAI 围绕五大核心价值观更新《模型规范（Model Spec）》',
            title_en: 'OpenAI Updates Its Model Spec Around Five Core Values',
            read_time: '7 MIN READ',
            url: 'https://openai.com/index/updated-model-spec/?utm_source=tldrai',
            domain: 'openai.com',
            highlight_kw: 'Model Spec',
            summary_zh: 'OpenAI 正式更新其《模型规范》，将模型行为准则收敛围绕五大核心价值：忠于人类意图、最小化伤害、诚实与透明、尊重人类自主权（Human Agency）以及关怀。',
            summary_en: 'OpenAI updated its Model Spec to organize model behavior around five values: faithfulness to human intent, harm minimization, honesty and transparency, human agency, and care.'
          },
          {
            title_zh: 'Mistral 正式开源万亿参数旗舰模型 Mistral Large 4 权重',
            title_en: 'Mistral Releases Weights for Its Trillion-Parameter Model',
            read_time: '4 MIN READ',
            url: 'https://mistral.ai/news/mistral-large-4-oss/?utm_source=tldrai',
            domain: 'mistral.ai',
            highlight_kw: 'Mistral Large 4',
            summary_zh: 'Mistral 公开了万亿参数大模型 Mistral Large 4 的开源权重，专为企业私有化自托管部署与网络安全场景打造。官方表示其在智能体编程基准上取得开源最佳表现，并具备媲美 GLM-5.3 的网络安全攻防能力。',
            summary_en: 'Mistral has released the weights for Mistral Large 4, a trillion-parameter model designed for self-hosted deployment and cybersecurity applications. The company claims leading open-weight performance on agentic coding benchmarks and comparable cybersecurity capabilities to GLM-5.3.'
          }
        ]
      },
      {
        sectionKey: 'Deep Dives & Analysis',
        items: [
          {
            title_zh: 'Epoch AI 警告：开源大模型可在安全补丁推送到用户前将其逆向为可用漏洞利用',
            title_en: 'AI can turn security fixes into working exploits before users receive an update',
            read_time: '16 MIN READ',
            url: 'https://epoch.ai/publications/open-weight-models-patch-gap?utm_source=tldrai',
            domain: 'epoch.ai',
            highlight_kw: '补丁空窗期攻击',
            summary_zh: '研究表明 GLM-5.3 能够利用已公开提交但尚未正式推送给终端用户的安全补丁，自动识别并构造针对 Mozilla Firefox 浏览器的有效漏洞利用（Exploit）。由于开源项目代码完全公开，这一“补丁时间差”威胁正随着开源模型能力的提升而急剧加剧。',
            summary_en: 'GLM 5.3 can identify and exploit vulnerabilities in recent versions of the Mozilla Firefox browser using security fixes that have been published but not yet shipped to users. Open-source projects are particularly vulnerable to this kind of attack.'
          },
          {
            title_zh: '智能体蜂群（Agent Swarms）中令人惊讶的自发领导力动力学',
            title_en: 'The surprising leadership dynamics in agent swarms',
            read_time: '17 MIN READ',
            url: 'https://www.raindrop.ai/blog/agent-swarm-leadership/?utm_source=tldrai',
            domain: 'raindrop.ai',
            highlight_kw: 'Agent Swarms',
            summary_zh: '研究人员设计了一项由 4 种不同底层模型的 8 个智能体协作排查模拟宕机的实验，观察无指定领导者时智能体如何自组织。结果发现，决定哪个智能体成为“领头羊”的关键因素有两个：底层模型本身的特质，以及智能体名字在 Prompt 列表中出现的先后顺序。',
            summary_en: 'Researchers created an experiment in which eight agents from four different models worked together to resolve simulated outages without a designated leader. Two factors influenced leadership: the agent\'s underlying model, and the order in which their name was listed in a prompt.'
          },
          {
            title_zh: '从思维链中逆向重建 Meta 内部模型宪章《Muse Charter》',
            title_en: 'Leaking Muse\'s Charter, Meta\'s model spec',
            read_time: '13 MIN READ',
            url: 'https://www.lesswrong.com/posts/TJGPL5FAk9sCioPbE/leaking-muse-s-charter-meta-s-model-spec?utm_source=tldrai',
            domain: 'lesswrong.com',
            highlight_kw: 'Muse Charter',
            summary_zh: 'Meta 旗下的 Muse Spark Open 模型在思维链（CoT）推理时经常提及一份名为“Charter（宪章）”的规范文件。研究者通过多轮引导模型输出，完整逆向拼凑出了这份内部模型行为规范文档。',
            summary_en: 'Muse Spark Open often mentions a \'Charter\' in its chain of thought. This post reconstructs that document using the chain of thought outputs.'
          }
        ]
      },
      {
        sectionKey: 'Engineering & Research',
        items: [
          {
            title_zh: 'Meta 工程实践：如何在代码合入前用 LLM 实时拦截 Bug',
            title_en: 'How Meta Catches Bugs Before Code Ships',
            read_time: '9 MIN READ',
            url: 'https://engineering.fb.com/2026/10/29/security/catching-bugs-before-they-land-jittestings-human-on-the-loop-approach-at-full-scale/?utm_source=tldrai',
            domain: 'engineering.fb.com',
            highlight_kw: 'Just-in-Time Testing',
            summary_zh: 'Meta 详细披露了如何将其基于大模型的即时测试系统（JIT Testing）从研究原型扩展为大规模生产基础设施，在代码变更上线前自动生成针对性测试拦截缺陷，并显著降低误报率与测试开销。',
            summary_en: 'Meta details how it scaled its LLM-powered Just-in-Time Testing system from a research prototype into production infrastructure, catching bugs before code changes land.'
          },
          {
            title_zh: 'Figma 官方揭秘：我们如何训练精通 Figma 画布编辑的专用模型',
            title_en: 'How we\'re training a Figma-fluent editing model',
            read_time: '6 MIN READ',
            url: 'https://www.figma.com/blog/training-a-figma-fluent-editing-model/?utm_source=tldrai',
            domain: 'figma.com',
            highlight_kw: 'Figma 编辑模型',
            summary_zh: '在诸如 Figma 图层与画布编辑等垂直专业任务上，经过精细后训练（Post-training）的专用模型完全可以媲美甚至超越通用前沿大模型。本文详述了 Figma 将聚焦问题转化为产品级模型能力的训练闭环。',
            summary_en: 'Post-trained models can compete with frontier models on specialized tasks like Figma editing. This post explains how Figma trained a Figma-fluent editing model.'
          },
          {
            title_zh: 'Factory 发布 Droid 1.0：构建跨模型通用的前沿智能体运行框架',
            title_en: 'Droid 1.0: Building a Frontier Harness',
            read_time: '15 MIN READ',
            url: 'https://factory.com/news/frontier-harness?utm_source=tldrai',
            domain: 'factory.com',
            highlight_kw: 'Droid 1.0 Harness',
            summary_zh: 'Droid 是一款支持单次模型请求执行数百次工具调用的智能体运行框架（Harness）。Factory 团队指出，针对单一模型调优容易陷入对该模型怪癖的过拟合，而跨多模型联合打磨才能沉淀出真正具备泛化能力的架构提升。',
            summary_en: 'Droid is an agent harness that lets agents run hundreds of tool calls in a single model request. Working across models ensures the strongest improvements generalize beyond a single model.'
          }
        ]
      },
      {
        sectionKey: 'Miscellaneous',
        items: [
          {
            title_zh: '为什么 Sam Altman 反对“单一超级智能”？万亿个微超人 AI 构成的动态制衡',
            title_en: 'Why Sam Altman is against a single superintelligence',
            read_time: '64 MIN READ',
            url: 'https://cheekypint.substack.com/p/why-sam-altman-is-against-a-single?utm_source=tldrai',
            domain: 'cheekypint.substack.com',
            highlight_kw: 'Sam Altman',
            summary_zh: 'Sam Altman 在深度访谈中表示，相比于让一个智商高达 1 万亿的单一神级 AI 降临社会，他更倾向于让 1 万亿个略超人类智力的 AI 智能体融入社会。智能体群落彼此制衡又协同合作，更能构建具有韧性的动态平衡社会。',
            summary_en: 'Sam Altman would rather have a trillion AIs of slightly superhuman intelligence join society than one AI of 1 trillion IQ. Swarms of agents keep each other in check and create a dynamic equilibrium.'
          },
          {
            title_zh: 'DeepMind 深度长文《智能经济学》：AGI 何时以及如何引发经济结构转型？',
            title_en: 'The Economics of Intelligence: How and when does AGI lead to economic transformation?',
            read_time: '24 MIN READ',
            url: 'https://institute.deepmind.com/essays/the-economics-of-intelligence/?utm_source=tldrai',
            domain: 'institute.deepmind.com',
            highlight_kw: '智能经济学',
            summary_zh: 'AI 模型的单点个体能力正呈指数级跃升，但在多方协调能力上仍相对滞后。目前模型在数十个行业的独立交付物上已追平或超越资深专家，薪资结构与岗位职能演变将成为经济转型的最早信号。',
            summary_en: 'AI models are getting exponentially better in individual competence while lagging behind in coordination. Wages and job roles will be the earliest signals of economic transformation.'
          }
        ]
      },
      {
        sectionKey: 'Quick Links',
        items: [
          {
            title_zh: 'Fish Audio Drama 3 登顶语音竞技场开源榜首',
            title_en: 'Drama 3 just leveled up',
            read_time: '1 MIN READ',
            url: 'https://x.com/fishaudio/status/2115836725184667833?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: 'Fish Audio Drama 3',
            summary_zh: 'Fish Audio 发布的 Drama 3 在 Artificial Analysis 两大语音评测竞技场中双双斩获开源权重模型第一名。',
            summary_en: 'Fish Audio Drama 3 is the #1 open-weight model on both Artificial Analysis Speech Arenas.'
          },
          {
            title_zh: 'Natural 推出 Direct：赋权 AI 智能体自主选择金融支付清算通道',
            title_en: 'Introducing Natural Direct',
            read_time: '6 MIN READ',
            url: 'https://www.natural.com/blog/direct?utm_source=tldrai',
            domain: 'natural.com',
            highlight_kw: 'Natural Direct',
            summary_zh: '支持 AI 智能体在 ACH、电汇（Wire）、实时支付及纸质支票之间自主决策并完成金融交易。',
            summary_en: 'Natural introduces Direct, enabling agents to choose among ACH, Wire, Realtime, and soon paper checks, for diverse financial transactions.'
          },
          {
            title_zh: 'Pika H3 Flex 视频生成模型发布：支持 12 张参考图与 5 轨独立音轨导出',
            title_en: 'Introducing Pika H3 Flex',
            read_time: '6 MIN READ',
            url: 'https://pika.art/blog/pika-h3-flex?utm_source=tldrai',
            domain: 'pika.art',
            highlight_kw: 'Pika H3 Flex',
            summary_zh: 'Pika H3 Flex 支持最多 12 张多模态参考图输入、导出 5 路独立分轨音频，并支持最高 4K 分辨率成片输出。',
            summary_en: 'Pika H3 Flex is a video generation model that works with up to 12 references, exports five separate audio stems, and finishes at up to 4K.'
          }
        ]
      }
    ]
  },

  '2026-10-29': {
    date: '2026-10-29',
    weekday: 'THU · 周四',
    issueNo: 'VOL. 2026.10.29',
    headline_zh: 'Google Gemini 4 Carbon 绿色模型 · NVIDIA Nemotron 3.5 语音转录 · Qwen3.5 内部运行 RISC-V CPU',
    headline_en: 'Gemini 4 Carbon 🌱, Nemotron Transcribe 📝, benchmarker’s dilemma ❓',
    highlights: [
      { code: '#01.1', label_zh: 'Gemini 4 Carbon 绿色模型', label_en: 'Gemini 4 Carbon 🌱' },
      { code: '#01.2', label_zh: 'NVIDIA Nemotron 3.5 语音转录', label_en: 'Nemotron Transcribe 📝' },
      { code: '#02.2', label_zh: 'Qwen3.5 内部运行 RISC-V CPU', label_en: 'Qwenputer RISC-V 💻' }
    ],
    sections: [
      {
        sectionKey: 'Headlines & Launches',
        items: [
          {
            title_zh: 'Google 发布 Gemini 4 Carbon：兼具高性能与极致能效比的低碳大模型',
            title_en: 'Gemini 4 Carbon',
            read_time: '1 MIN READ',
            url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/?utm_source=tldrai',
            domain: 'blog.google',
            highlight_kw: 'Gemini 4 Carbon',
            summary_zh: 'Google 正式推出 Gemini 4 Carbon 模型，在大幅降低能耗与碳足迹的同时进一步提升了自然语言处理性能，旨在为可持续、高能效的绿色 AI 模型树立全新行业标准。',
            summary_en: 'Google has introduced the Gemini 4 Carbon model, advancing AI capabilities with improved energy efficiency while reducing carbon footprint.'
          },
          {
            title_zh: 'NVIDIA 开源 Nemotron 3.5 Transcribe 与 Granary v2 多语种智能语音底座',
            title_en: 'NVIDIA Nemotron 3.5 Transcribe and Granary v2',
            read_time: '14 MIN READ',
            url: 'https://huggingface.co/blog/nvidia/nemotron-transcribe-granary?utm_source=tldrai',
            domain: 'huggingface.co',
            highlight_kw: 'Nemotron 3.5 Transcribe',
            summary_zh: 'NVIDIA 推出的 Nemotron 3.5 Transcribe 是一款支持 40 种语言转录、翻译、说话人分离及音频问答的开源权重模型，在多项语音榜单中位列第一；配套的 Granary v2 则提供了可复用的数据管线与微调工具链。',
            summary_en: 'NVIDIA\'s Nemotron 3.5 Transcribe is an open-weight model for multilingual transcription, translation, speaker attribution, and audio Q&A supporting up to 40 languages.'
          }
        ]
      },
      {
        sectionKey: 'Deep Dives & Analysis',
        items: [
          {
            title_zh: 'Artificial Analysis v5 与“评测者的两难困境”：谁在定义万亿美元市场赢家？',
            title_en: 'Artificial Analysis v5 and the benchmarker\'s dilemma',
            read_time: '11 MIN READ',
            url: 'https://www.interconnects.ai/p/artificial-analysis-v5-and-the-benchmarkers?utm_source=tldrai',
            domain: 'interconnects.ai',
            highlight_kw: '评测者困境',
            summary_zh: '独立评估大语言模型正变得空前困难：既要用一个综合分数同时契合直觉体感（Vibe checks）、社区口碑与严谨科学分析，又要具备足够前瞻性以免三个月就过时。独立评测机构正直接左右万亿美元市场的胜负与模型演进方向。',
            summary_en: 'Independent evaluation of language models is a hard task. Independent evaluators dictate the winners and losers of a trillion-dollar market and influence the direction of model development.'
          },
          {
            title_zh: 'Qwenputer：在 Qwen3.5 神经网络权重内部完整运行一颗确定性 RISC-V CPU',
            title_en: 'Qwenputer: a fully functioning, deterministic RISC-V CPU inside Qwen3.5',
            read_time: '9 MIN READ',
            url: 'https://divagr.com/blog/qwenputer?utm_source=tldrai',
            domain: 'divagr.com',
            highlight_kw: 'Qwenputer RISC-V',
            summary_zh: '开发者在 Qwen3.5 模型内部构建了一颗完全可运行的确定性 RISC-V CPU，直接将其 Gated DeltaNet (GDN) 层作为内存（RAM）使用，无需任何外部运行时或工具调用即可直接执行算术运算、C 语言与 MicroPython 代码，甚至内置了实验性模型内文件存储。',
            summary_en: 'Qwenputer is a fully functioning, deterministic RISC-V CPU that runs inside Qwen3.5 using its own Gated DeltaNet layers as RAM, executing C and MicroPython code without any external runtime.'
          },
          {
            title_zh: 'Decagon 构建“自我进化”推理栈：通过智能体自动诊断实现 2.5 倍吞吐提升',
            title_en: 'Building an Inference Stack That Improves Itself',
            read_time: '20 MIN READ',
            url: 'https://x.com/DecagonAI/status/2115511110120120437?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: '2.5x 推理吞吐',
            summary_zh: 'Decagon 的 AutoResearch 智能体能够自动诊断推理瓶颈、基于真实生产流量回放测试量化与投机解码（Speculative Decoding）等优化方案，在满足延迟约束下实现了最高 2.5 倍的吞吐量跃升。',
            summary_en: 'Decagon\'s AutoResearch agents diagnose inference bottlenecks and test optimizations against production traffic replays, achieving throughput gains up to 2.5x.'
          }
        ]
      },
      {
        sectionKey: 'Engineering & Research',
        items: [
          {
            title_zh: '微软正式开放 Microsoft Copilot Harness：驱动多模型智能体协同的底层引擎',
            title_en: 'Introducing the Microsoft Copilot harness',
            read_time: '4 MIN READ',
            url: 'https://blogs.microsoft.com/blog/2026/10/28/introducing-the-microsoft-copilot-harness-unlocking-the-potential-of-truly-multi-model-agentic-work/?utm_source=tldrai',
            domain: 'blogs.microsoft.com',
            highlight_kw: 'Copilot Harness',
            summary_zh: '支撑 Copilot Code、GitHub Copilot 与 VS Code 的核心智能体框架现已通过 Microsoft Foundry 正式开放，为企业提供跨模型家族的推理、工具调用与长周期任务托管能力。',
            summary_en: 'The Microsoft Copilot harness powers Copilot Code, Copilot Studio, GitHub Copilot, and VS Code, and is now available through Microsoft Foundry.'
          },
          {
            title_zh: 'Vercel CI 开启公测：专为高频 AI 编程智能体打造的极速持续集成',
            title_en: 'Introducing Vercel CI',
            read_time: '2 MIN READ',
            url: 'https://vercel.com/blog/introducing-vercel-ci?utm_source=tldrai',
            domain: 'vercel.com',
            highlight_kw: 'Vercel CI',
            summary_zh: 'Vercel CI 能够精准识别代码变更影响面，仅运行受影响的任务并按需拉起算力，将从 git push 到 CI 通过的耗时缩短了 2 至 6 倍。',
            summary_en: 'Vercel CI runs only the tasks affected by a code change and spins up only the compute needed, decreasing time from git push to CI pass by 2-6x.'
          }
        ]
      },
      {
        sectionKey: 'Miscellaneous',
        items: [
          {
            title_zh: 'Anthropic 推出企业级 AI 投资回报率（ROI）度量与成本优化套件',
            title_en: 'Anthropic just launched tools to show companies what their AI spending is buying',
            read_time: '5 MIN READ',
            url: 'https://techcrunch.com/2026/10/28/anthropic-just-launched-tools-to-show-companies-what-their-ai-spending-is-buying/?utm_source=tldrai',
            domain: 'techcrunch.com',
            highlight_kw: 'AI ROI 分析',
            summary_zh: '新工具帮助企业量化评估 Claude Code 等产品的生产力增益、开销明细与优化建议，直击企业客户对 AI 预算投入产出比的核心关切。',
            summary_en: 'Anthropic has launched reporting tools to help companies measure and optimize their AI spending with products like Claude Code.'
          }
        ]
      },
      {
        sectionKey: 'Quick Links',
        items: [
          {
            title_zh: 'ElevenLabs 发布 Cue：字符级高精度音频时间戳对齐模型',
            title_en: 'ElevenLabs Cue: Character-level audio timing',
            read_time: '7 MIN READ',
            url: 'https://elevenlabs.io/blog/cue-aligner?utm_source=tldrai',
            domain: 'elevenlabs.io',
            highlight_kw: 'ElevenLabs Cue',
            summary_zh: '支持对音频文件进行极其精准的字符级强制时间对齐（Forced Alignment）。',
            summary_en: 'ElevenLabs\' Cue is a forced alignment model for precise character-level timing in audio files.'
          },
          {
            title_zh: 'OpenAI 支持美国 Pro 用户直接通过 iMessage 与 RCS 短信操控 Dot 智能体',
            title_en: 'OpenAI now lets you text your Dot agent',
            read_time: '2 MIN READ',
            url: 'https://www.engadget.com/2300235/openai-now-lets-you-text-your-dot-agent/?utm_source=tldrai',
            domain: 'engadget.com',
            highlight_kw: 'OpenAI Dot',
            summary_zh: '用户可通过短信直接向 Dot 智能体发送文字、图片与语音备忘录指令。',
            summary_en: 'OpenAI now allows US Pro users to text their Dot agents via iMessage and RCS.'
          }
        ]
      }
    ]
  },

  '2026-10-28': {
    date: '2026-10-28',
    weekday: 'WED · 周三',
    issueNo: 'VOL. 2026.10.28',
    headline_zh: 'Google Genie 4 世界模型 · Liquid AI 端侧模型 LFM3 · AI 形式化证明“有限单群分类定理”',
    headline_en: 'Genie 4 worlds 🌍, Frontier Code 2 👨‍💻, AI drug discovery 🧬',
    highlights: [
      { code: '#01.2', label_zh: 'Google Genie 4 世界模型', label_en: 'Genie 4 worlds 🌍' },
      { code: '#01.1', label_zh: 'Liquid AI 端侧模型 LFM3', label_en: 'Liquid AI LFM3 📱' },
      { code: '#02.1', label_zh: 'AI 形式化证明“有限单群分类定理”', label_en: 'Formalizing Enormous Theorem 📐' }
    ],
    sections: [
      {
        sectionKey: 'Headlines & Launches',
        items: [
          {
            title_zh: 'Liquid AI 发布 LFM3 端侧开源模型家族：1.7B 模型仅占 1GB 显存并支持 256K 上下文',
            title_en: 'Liquid AI Launches LFM3 Models for On Device AI',
            read_time: '27 MIN READ',
            url: 'https://www.liquid.ai/blog/lfm3?utm_source=tldrai',
            domain: 'liquid.ai',
            highlight_kw: 'Liquid LFM3',
            summary_zh: 'LFM3 是基于共享三混合骨干网构建的端侧开源权重模型家族，涵盖文本、视觉、音频、全模态与决策模型。其 1.7B 文本模型参数量减少 35% 却超越前代 2.6B，4-bit 量化下仅需约 1GB 内存即可支持 256K 上下文；LFM3-VL-2B 更在 62 项视觉基准上追平 Gemma 4 12B。',
            summary_en: 'LFM3 is a family of open weight text, vision, audio, omni, and decision models. The 1.7B text model beats its 2.6B predecessor, fits in about 1 GB at 4-bit precision, and supports a 256K context window.'
          },
          {
            title_zh: 'Google DeepMind 发布 Genie 4 世界模型：生成带同步音效与实时编辑的逼真交互世界',
            title_en: 'Google Introduces Genie 4',
            read_time: '5 MIN READ',
            url: 'https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/?utm_source=tldrai',
            domain: 'deepmind.google',
            highlight_kw: 'Genie 4',
            summary_zh: 'Genie 4 能够生成照片级真实感的可交互世界环境，具备同步音频生成与基于提示词的实时环境编辑能力，连贯模拟时长翻倍至 2 分钟，物理规律与角色真实感大幅跃升。',
            summary_en: 'Genie 4 is a world model that generates photorealistic, interactive environments with synchronized audio and real-time prompt-based editing for up to two minutes.'
          }
        ]
      },
      {
        sectionKey: 'Deep Dives & Analysis',
        items: [
          {
            title_zh: 'Axiom Math 指挥 AI 智能体蜂群，耗时 24 天完成人类最长数学证明“有限单群分类定理”的形式化验证',
            title_en: 'Formalizing the Enormous Theorem',
            read_time: '27 MIN READ',
            url: 'https://axiommath.ai/research/the-enormous-theorem-formalized/?utm_source=tldrai',
            domain: 'axiommath.ai',
            highlight_kw: '4310万行 Lean 证明',
            summary_zh: '有限单群分类定理（CFSG）原证明横跨 500 多篇论文、约 15,000 页，被称为人类历史上最庞大的数学证明。Axiom Math 的数学家与工程师指挥数十个 AI 智能体组成的蜂群，在 24 天内编写了约 4,310 万行 Lean 定理证明代码，完成了首个计算机完整验证版本。',
            summary_en: 'Axiom Math has released the first complete computer-checked proof of the Classification of Finite Simple Groups (CFSG), directing swarms of dozens of AI agents over 24 days to produce 43.1 million lines of Lean code.'
          }
        ]
      },
      {
        sectionKey: 'Engineering & Research',
        items: [
          {
            title_zh: 'Google Research 提出“睡眠框架（Sleep Framework）”：让大模型在周期性离线巩固中持续学习且不遗忘',
            title_en: 'The sleep framework: A new way for LLMs to retain knowledge in continual learning',
            read_time: '11 MIN READ',
            url: 'https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/?utm_source=tldrai',
            domain: 'research.google',
            highlight_kw: 'Sleep Framework',
            summary_zh: '通过让大语言模型在“在线交互”与“离线记忆巩固（睡眠）”之间周期性交替，将脆弱的短期上下文转化为稳定的长期参数，从而在不发生灾难性遗忘的前提下持续吸收新知识，并保持高达 10M token 的长程知识留存。',
            summary_en: 'The sleep framework equips large language models with a continuous periodic lifecycle, alternating between active interaction and offline memory consolidation to retain long-context knowledge up to 10M tokens.'
          },
          {
            title_zh: 'Anthropic 内部研究模型自主给出 3-SAT 亚指数时间算法并附 Lean 4 证明，引发指数时间假说（ETH）激辩',
            title_en: 'Anthropic\'s Claude Refutes the Exponential Time Hypothesis, With a Lean Proof',
            read_time: 'GITHUB REPO',
            url: 'https://github.com/anthropics/formal-math/tree/main/eth?utm_source=tldrai',
            domain: 'github.com',
            highlight_kw: 'ETH 假说证明',
            summary_zh: 'Anthropic 披露其内部研究版 Claude 模型在无人类干预下给出了一个可在亚指数时间内计算 3-SAT 满足赋值数量的确定性算法，并附带了约 8 分钟即可编译通过的 Lean 4 形式化证明（不过官方提醒尚未用机器核验 Lean 命题陈述与论文完全等价）。',
            summary_en: 'Anthropic says an internal research Claude model found, with no human input, a deterministic algorithm that counts satisfying assignments of 3-SAT formulas in subexponential time, along with a Lean 4 formalization.'
          }
        ]
      }
    ]
  }
};

// ================= 实时抓取与自动中文翻译引擎 =================
const TLDR_CACHE_KEY = 'dailyinfo_tldr_cache_v1';

function loadTldrCache() {
  try {
    const raw = localStorage.getItem(TLDR_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...parsed, ...PRESET_TLDR_ISSUES };
    }
  } catch (e) {
    console.warn('读取本地 TLDR 缓存失败:', e);
  }
  return { ...PRESET_TLDR_ISSUES };
}

function saveIssueToTldrCache(dateStr, issueObj) {
  try {
    const raw = localStorage.getItem(TLDR_CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    cache[dateStr] = issueObj;
    localStorage.setItem(TLDR_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('写入本地 TLDR 缓存失败:', e);
  }
}

// 格式化星期
function getWeekdayLabel(dateStr) {
  const days = ['SUN · 周日', 'MON · 周一', 'TUE · 周二', 'WED · 周三', 'THU · 周四', 'FRI · 周五', 'SAT · 周六'];
  const d = new Date(dateStr.replace(/-/g, '/'));
  if (isNaN(d.getTime())) return 'DAILY · 工作日';
  return days[d.getDay()];
}

// 提取纯净域名
function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch (e) {
    return 'tldr.tech';
  }
}

// 调用 Google GTX 免费接口翻译单段或多段英文为中文
async function translateEnToZh(text) {
  if (!text || !text.trim()) return '';
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Translate HTTP ' + res.status);
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0].map(seg => seg[0] || '').join('');
    }
  } catch (e) {
    console.warn('自动翻译降级为原文:', e);
  }
  return text;
}

// 通过多路 CORS 代理拉取文本内容
async function fetchTextWithCorsFallback(targetUrl) {
  const endpoints = [
    targetUrl, // 如果目标本身支持 CORS (如 tldr.tech/api/rss/ai)
    `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
  ];

  // 对于 HTML 页面，跳过直接请求以节省一次 CORS 报错时间
  const startIdx = targetUrl.includes('/api/rss/') ? 0 : 1;

  for (let i = startIdx; i < endpoints.length; i++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8500);
      const res = await fetch(endpoints[i], { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const text = await res.text();
        if (text && text.length > 200) {
          return text;
        }
      }
    } catch (err) {
      // 继续尝试下一个节点
    }
  }
  throw new Error('无法连接至 TLDR AI 源站');
}

// 1. 从官方 RSS 源同步最新可用的期刊日期列表与英文导语
async function fetchTldrRssFeedList() {
  const xmlText = await fetchTextWithCorsFallback('https://tldr.tech/api/rss/ai');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const items = Array.from(xmlDoc.querySelectorAll('item'));
  const feedDates = [];

  items.slice(0, 10).forEach(item => {
    const link = item.querySelector('link')?.textContent?.trim() || '';
    const title = item.querySelector('title')?.textContent?.trim() || '';
    const match = link.match(/\/ai\/(\d{4}-\d{2}-\d{2})/);
    if (match) {
      feedDates.push({
        date: match[1],
        headline_en: title
      });
    }
  });
  return feedDates;
}

// 2. 实时抓取指定日期的 https://tldr.tech/ai/YYYY-MM-DD 并解析 + 翻译为中文结构
async function fetchAndTranslateTldrIssue(dateStr, rssHeadlineEn = '') {
  const targetUrl = `https://tldr.tech/ai/${dateStr}`;
  const htmlText = await fetchTextWithCorsFallback(targetUrl);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  const h2Text = doc.querySelector('h2')?.textContent?.trim() || rssHeadlineEn || `TLDR AI Daily (${dateStr})`;
  const sectionEls = Array.from(doc.querySelectorAll('section'));
  const rawSections = [];

  sectionEls.forEach(sec => {
    const headerEl = sec.querySelector('h2, h3, header');
    const rawSecTitle = headerEl ? headerEl.textContent.trim() : '';
    if (!rawSecTitle) return;

    // 匹配标准章节名
    let normalizedKey = '';
    Object.keys(TLDR_SECTION_MAP).forEach(k => {
      if (rawSecTitle.toLowerCase().includes(k.toLowerCase())) {
        normalizedKey = k;
      }
    });
    if (!normalizedKey) return;

    const articles = Array.from(sec.querySelectorAll('article'));
    const items = [];

    articles.forEach(art => {
      const aEl = art.querySelector('a');
      const sumEl = art.querySelector('div.newsletter-html') || art.querySelector('div');
      if (!aEl || !sumEl) return;

      const fullTitleEn = aEl.textContent.trim();
      const href = aEl.getAttribute('href') || '';
      const summaryEn = sumEl.textContent.replace(/\s+/g, ' ').trim();

      // 过滤赞助商广告与招聘
      if (
        fullTitleEn.includes('(Sponsor)') ||
        fullTitleEn.includes('at TLDR (') ||
        !summaryEn
      ) {
        return;
      }

      // 拆分标题后的 (X minute read) 或 (GitHub Repo)
      let cleanTitleEn = fullTitleEn;
      let readTime = '3 MIN READ';
      const parenMatch = fullTitleEn.match(/\(([^)]+)\)\s*$/);
      if (parenMatch) {
        readTime = parenMatch[1].toUpperCase().replace('MINUTE', 'MIN');
        cleanTitleEn = fullTitleEn.slice(0, parenMatch.index).trim();
      }

      items.push({
        title_en: cleanTitleEn,
        read_time: readTime,
        url: href,
        domain: extractDomain(href),
        summary_en: summaryEn
      });
    });

    if (items.length > 0) {
      rawSections.push({
        sectionKey: normalizedKey,
        items
      });
    }
  });

  if (rawSections.length === 0) {
    throw new Error(`${dateStr} 当日暂无刊物（周末或尚未发刊）`);
  }

  // 并行翻译导语与各条资讯标题/摘要
  const headlineZhPromise = translateEnToZh(h2Text);

  for (const sec of rawSections) {
    await Promise.all(
      sec.items.map(async (item) => {
        const [tZh, sZh] = await Promise.all([
          translateEnToZh(item.title_en),
          translateEnToZh(item.summary_en)
        ]);
        item.title_zh = tZh || item.title_en;
        item.summary_zh = sZh || item.summary_en;
        // 提取英文里的核心专有名词作为强调装饰词
        const kwMatch = item.title_en.match(/[A-Z][A-Za-z0-9.\-]+(?:\s+[A-Z0-9][A-Za-z0-9.\-]+)?/);
        item.highlight_kw = kwMatch ? kwMatch[0] : item.domain;
      })
    );
  }

  const headlineZh = await headlineZhPromise;

  const finalIssue = {
    date: dateStr,
    weekday: getWeekdayLabel(dateStr),
    issueNo: `VOL. ${dateStr.replace(/-/g, '.')}`,
    headline_zh: headlineZh,
    headline_en: h2Text,
    sections: rawSections
  };

  saveIssueToTldrCache(dateStr, finalIssue);
  return finalIssue;
}

// 自动解析本期封面导读对应的 [#0X.Y] 锚点列表（兼容预置期刊与实时抓取期刊）
function resolveIssueHighlights(issue) {
  if (!issue) return [];
  if (Array.isArray(issue.highlights) && issue.highlights.length > 0) {
    return issue.highlights;
  }

  // 构建全量文章扁平索引
  const flatItems = [];
  (issue.sections || []).forEach((sec, sIdx) => {
    const meta = TLDR_SECTION_MAP[sec.sectionKey] || { index: String(sIdx + 1).padStart(2, '0') };
    (sec.items || []).forEach((item, iIdx) => {
      flatItems.push({
        code: `#${meta.index}.${iIdx + 1}`,
        haystack: `${item.title_en} ${item.title_zh} ${item.summary_en} ${item.summary_zh} ${item.url}`.toLowerCase()
      });
    });
  });

  const zhParts = (issue.headline_zh || '').split(/[·,，]/).map(s => s.trim()).filter(Boolean);
  const enParts = (issue.headline_en || '').split(/[,，]/).map(s => s.trim()).filter(Boolean);
  const count = Math.max(zhParts.length, enParts.length);
  const results = [];

  for (let i = 0; i < count; i++) {
    const labelZh = zhParts[i] || enParts[i] || '';
    const labelEn = enParts[i] || '';
    const words = `${labelEn} ${labelZh}`
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, ' ')
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length >= 2 && !['the', 'and', 'for', 'with'].includes(w));

    let bestCode = `#01.${Math.min(i + 1, 3)}`;
    let bestScore = 0;

    flatItems.forEach(entry => {
      let score = 0;
      words.forEach(w => {
        if (entry.haystack.includes(w)) score += w.length;
      });
      if (score > bestScore) {
        bestScore = score;
        bestCode = entry.code;
      }
    });

    results.push({
      code: bestCode,
      label_zh: labelZh,
      label_en: labelEn
    });
  }

  return results;
}
