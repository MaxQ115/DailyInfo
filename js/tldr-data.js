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
  '2026-11-05': {
    date: '2026-11-05',
    weekday: 'THU · 周四',
    issueNo: 'VOL. 2026.11.05',
    headline_zh: 'GPT-Image-2.6 原生生成 GIF · Meta 收购 AI 编程初创 Conductor · Cognition 发布 SWE-2 Flash',
    headline_en: 'GPT-Image-2.6 🖼️, Meta buys Conductor 💻, Cognition SWE-2 Flash ⚡',
    highlights: [
      { code: '#01.1', label_zh: 'GPT-Image-2.6 原生生成 GIF', label_en: 'GPT-Image-2.6 🖼️' },
      { code: '#04.2', label_zh: 'Meta 收购 AI 编程初创 Conductor', label_en: 'Meta buys Conductor 💻' },
      { code: '#03.1', label_zh: 'Cognition 发布 SWE-2 Flash', label_en: 'Cognition SWE-2 Flash ⚡' }
    ],
    sections: [
      {
        sectionKey: 'Headlines & Launches',
        items: [
          {
            title_zh: 'OpenAI 全球推出 Images 2.6：提速 50% 并支持原生 GIF 动图生成与逐帧编辑',
            title_en: 'OpenAI launches Images 2.6 with GIFs and image reference',
            read_time: '1 MIN READ',
            url: 'https://www.testingcatalog.com/openai-launches-images-2-6-with-gifs-and-image-reference/?utm_source=tldrai',
            domain: 'testingcatalog.com',
            highlight_kw: 'GPT-Image-2.6',
            summary_zh: 'OpenAI 正在 ChatGPT 与 Codex 中向全球用户推送 Images 2.6 模型。新模型图像生成速度较上一代提升 50%，并新增参考图控制与原生 GIF 动图生成能力——用户可直接调节动图播放速率、独立编辑单帧画面并一键分享。同时，GPT-Image-2.6 Flare 与 Sunburst 现已通过 API 正式开放。',
            summary_en: 'OpenAI is rolling out Images 2.6 globally in ChatGPT and Codex. The new model generates images 50% faster than the previous iteration, and it can also create GIFs. Users can adjust the speed of the GIF, edit individual frames, and share it. GPT-Image-2.6 Flare and Sunburst are now available through the API.'
          },
          {
            title_zh: 'Ricursive 发布 Ripple-65B Preview：以 1/10 训练成本登顶 TerminalBench 2.1 开源榜首',
            title_en: 'Ripple-65B Preview',
            read_time: '4 MIN READ',
            url: 'https://www.ricursive.com/ripple?utm_source=tldrai',
            domain: 'ricursive.com',
            highlight_kw: 'Ripple-65B',
            summary_zh: 'Ripple-65B Preview 是一款前沿开源权重模型，在 TerminalBench 2.1 上刷新了开源 SOTA 纪录，一举超越多个参数量高出数倍至十余倍的美国开源模型（包括 Reflection Beam 501B、Meta Muse Spark Open 816B、Thinking Machines Inkling 975B 及 Nvidia Nemotron 3 Ultra 550B）。其训练成本仅 3,200 万美元，约为前任开源智能体编程霸主预估成本的十分之一，现已上线 Hugging Face、Together AI、GMI Cloud 与 OpenRouter。',
            summary_en: 'Ripple-65B Preview is a frontier open-weight model that achieves state-of-the-art performance on TerminalBench 2.1. It surpasses significantly larger open-weight models from the US, including Reflection Beam 501B, Meta Muse Spark Open 816B, Thinking Machines Inkling 975B, and Nvidia Nemotron 3 Ultra 550B. The model was trained for only $32 million, one-tenth the estimated cost of the previous open-weight SOTA on agentic coding.'
          },
          {
            title_zh: 'Pangram 发布 Image 1.0：支持像素级热力图定位的 AI 图像与视频鉴伪模型',
            title_en: 'Introducing Pangram Image 1.0',
            read_time: '5 MIN READ',
            url: 'https://www.pangram.com/blog/introducing-pangram-image-1-0?utm_source=tldrai',
            domain: 'pangram.com',
            highlight_kw: 'Pangram Image 1.0',
            summary_zh: 'Pangram Image 1.0 是一款专为检测 AI 生成图像与视频打造的鉴伪模型，能够输出精准的热力图（Heatmap）以标定画面中哪些局部区域由 AI 合成或篡改，且对二次裁剪编辑、高倍压缩与低分辨率具有极强鲁棒性，目前已同步提供 Chrome 浏览器插件及图像/视频检测 API。',
            summary_en: 'Pangram Image 1.0 is an AI image and AI video detection model that can produce a heatmap localizing exactly where AI appears in images. It is robust to edits, compression, and low resolutions. There is a Chrome Extension available that can detect AI, as well as API support for images and video.'
          }
        ]
      },
      {
        sectionKey: 'Deep Dives & Analysis',
        items: [
          {
            title_zh: 'OpenAI 安全团队揭秘：如何用自治流水线一次性挖掘并修补 948 个 Linux 提权漏洞',
            title_en: 'How OpenAI Patched 948 Linux Vulnerabilities',
            read_time: '12 MIN READ',
            url: 'https://openai.com/index/a-thousand-fewer-paths-to-root/?utm_source=tldrai',
            domain: 'openai.com',
            highlight_kw: '948个 Linux 漏洞修补',
            summary_zh: 'OpenAI 构建了一套全自动化的安全漏洞发现、利用验证与补丁生成流水线。在单次集中运行测试中，其网络安全专用模型成功验证了 948 个 Linux 本地提权（Local Privilege Escalation）漏洞，并自动生成了通过测试的修复补丁。',
            summary_en: 'OpenAI developed an autonomous pipeline for discovering, exploiting, and patching security vulnerabilities. In a single run, its cybersecurity model validated and generated patches for 948 Linux local privilege escalation vulnerabilities.'
          },
          {
            title_zh: 'Axiom Math 完成《Stacks Project》全量 Lean 形式化：史上最大可复用机器验证数学库',
            title_en: 'The Stacks Project, formalized in Lean',
            read_time: '13 MIN READ',
            url: 'https://axiommath.ai/research/the-stacks-project-formalized/?utm_source=tldrai',
            domain: 'axiommath.ai',
            highlight_kw: 'Stacks Project Lean',
            summary_zh: 'Axiom 正式开源了整部《Stacks Project》（现代代数几何核心开源百科全书）的完整 Lean 形式化版本。这是人类迄今构建的规模最大、集成度最高的可复用形式化数学代码库，科研人员与 AI 智能体可直接将其作为单一下游依赖库导入并在此基础上构建全新的形式化数学证明。',
            summary_en: 'Axiom has released a Lean formalization of the entire Stacks Project, an open-source reference that lays the foundation of modern algebraic geometry. The release is the largest integrated, reusable library of formalized mathematics ever built.'
          }
        ]
      },
      {
        sectionKey: 'Engineering & Research',
        items: [
          {
            title_zh: 'Cognition 发布 SWE-2 Flash：引入全新强化学习前“中段训练（Mid-training）”阶段的极速编程模型',
            title_en: 'Cognition Introduces SWE-2 Flash',
            read_time: '2 MIN READ',
            url: 'https://cognition.com/blog/swe-2-flash?utm_source=tldrai',
            domain: 'cognition.com',
            highlight_kw: 'SWE-2 Flash',
            summary_zh: 'Devin 背后的研发团队 Cognition 正式推出 SWE-2 Flash 编程专用模型，创新性地在强化学习（RL）之前引入了专门的中段训练（Mid-training）阶段，在保持高工程推理质量的同时大幅压缩响应延迟。',
            summary_en: 'SWE-2 Flash is a coding model that uses a new mid-training stage before reinforcement learning.'
          },
          {
            title_zh: '腾讯发布混元 Hy4 多模态开源大模型：打通细粒度视觉推理与 CLI/GUI 双栖智能体操控',
            title_en: 'Tencent Launches Hy4, Joining the Ranks of the World\'s Leading Open-Source AI Models',
            read_time: '8 MIN READ',
            url: 'https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/?utm_source=tldrai',
            domain: 'tencent.com',
            highlight_kw: 'Tencent Hy4',
            summary_zh: '腾讯正式发布具备深度视觉理解能力的混元 Hy4 大模型，并计划于未来数日内公开模型权重与系统卡。Hy4 擅长细粒度图像处理、复杂图表解析与数学视觉推理，并能同时交互操控命令行界面（CLI）与图形用户界面（GUI）以完成复杂的日常与办公任务。',
            summary_en: 'Hy4 is a large language model with visual understanding capabilities. Tencent plans to release model weights and system cards in the coming days. The model supports fine-grained image processing, complex chart analysis, mathematical visual reasoning, and can interact with both CLIs and GUIs.'
          },
          {
            title_zh: 'Cartesia 提出 H-Nets：摒弃分词器直接从原始字节（Raw Bytes）学习，大幅节省训练算力',
            title_en: 'H-Nets Learn Directly From Raw Bytes',
            read_time: '2 MIN READ',
            url: 'https://x.com/_albertgu/status/2115502111924600855?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: 'H-Nets Raw Bytes',
            summary_zh: '由 Albert Gu 等人领衔的 Cartesia 团队展示了分层网络 H-Nets，无需预设 Tokenizer 分词即可直接从原始字节流端到端学习，在显著降低训练算力消耗的同时追平主流基准性能。',
            summary_en: 'Cartesia\'s H-Nets learn directly from raw bytes, matching benchmark performance with substantially less training compute.'
          },
          {
            title_zh: 'Google DeepMind 开源 AlphaEvolve：基于 Gemini 的通用进化式算法发现智能体',
            title_en: 'AlphaEvolve (GitHub Repo)',
            read_time: 'GITHUB REPO',
            url: 'https://github.com/google-deepmind/alphaevolve?utm_source=tldrai',
            domain: 'github.com',
            highlight_kw: 'AlphaEvolve',
            summary_zh: 'AlphaEvolve 是基于 Gemini 驱动的算法设计编程智能体，将大模型的创造性解题能力与自动化验证评估器闭环结合，已成功应用于优化 Google 数据中心调度、芯片设计与 AI 训练管线。本仓库包含了 AlphaEvolve 的精简实现及其发现的多项算法突破成果代码与数据集。',
            summary_en: 'AlphaEvolve is a Gemini-powered coding agent for designing advanced algorithms. It pairs the creative problem-solving capabilities of Gemini models with automated evaluators that verify answers.'
          }
        ]
      },
      {
        sectionKey: 'Miscellaneous',
        items: [
          {
            title_zh: 'OpenAI 宣布收购代码基础设施初创 Pierre Computer，强化 Codex 代码托管与开源工具链',
            title_en: 'OpenAI to acquire Pierre Computer Company, Inc.',
            read_time: '3 MIN READ',
            url: 'https://openai.com/index/openai-to-acquire-pierre?utm_source=tldrai',
            domain: 'openai.com',
            highlight_kw: 'OpenAI 收购 Pierre',
            summary_zh: 'OpenAI 宣布将收购 Pierre Computer Company，以全面增强 Codex 的开发者工具链生态（包括 Code Storage 代码存储基础设施及相关开源项目）。',
            summary_en: 'OpenAI will acquire Pierre Computer Company to enhance Codex\'s developer tools, including Code Storage and other open-source projects.'
          },
          {
            title_zh: 'Meta 宣布收购多智能体并行编程初创公司 Conductor',
            title_en: 'Meta Acquires AI Coding Startup Conductor',
            read_time: '1 MIN READ',
            url: 'https://www.conductor.build/changelog/0.93.0-conductor-is-joining-meta?utm_source=tldrai',
            domain: 'conductor.build',
            highlight_kw: 'Meta 收购 Conductor',
            summary_zh: '帮助开发者在并行隔离工作区（Workspaces）中同时编排运行多个 AI 编程智能体的明星初创公司 Conductor 正式宣布加入 Meta。',
            summary_en: 'Conductor is a startup that lets developers run multiple AI coding agents in parallel workspaces and is now joining Meta.'
          }
        ]
      },
      {
        sectionKey: 'Quick Links',
        items: [
          {
            title_zh: '论文洞察：你其实并不需要超长上下文（You don\'t need long context）',
            title_en: 'You don\'t need long context',
            read_time: '1 MIN READ',
            url: 'https://arxiv.org/abs/2611.05306?utm_source=tldrai',
            domain: 'arxiv.org',
            highlight_kw: '短上下文推理',
            summary_zh: '最新研究表明，前沿大语言模型在精简压缩后的较短上下文窗口下依然能保持出色的任务表现，且丝毫不牺牲准确率。',
            summary_en: 'Researchers find that frontier language models perform well with shorter contexts without sacrificing accuracy.'
          },
          {
            title_zh: 'Together AI 发布 Together Compiler：由高吞吐智能体驱动的 AI 推理持续编译优化环',
            title_en: 'Together Compiler: Continual Compilation for AI inference',
            read_time: '9 MIN READ',
            url: 'https://www.together.ai/blog/together-compiler-continual-compilation-for-ai-inference?utm_source=tldrai',
            domain: 'together.ai',
            highlight_kw: 'Together Compiler',
            summary_zh: '利用高吞吐智能体针对多样化的生产推理负载进行不间断的算子与图编译持续优化。',
            summary_en: 'Together Compiler is a truly continual optimization loop that leverages high-throughput agents to optimize for diverse inference workloads.'
          },
          {
            title_zh: '月之暗面发布 3 万亿参数级模型 Kimi-K3.1-Pro：支持百万上下文与多模态 3D/编程跃升',
            title_en: 'Kimi-K3.1-Pro',
            read_time: '10 MIN READ',
            url: 'https://huggingface.co/moonshotai/Kimi-K3.1-Pro?utm_source=tldrai',
            domain: 'huggingface.co',
            highlight_kw: 'Kimi-K3.1-Pro',
            summary_zh: '作为最新一代 3T（3 万亿）参数量级旗舰模型，Kimi K3.1 Pro 配备 1M token 上下文窗口，在多模态理解、代码工程、3D 创作与事实准确性上大幅精进。',
            summary_en: 'Kimi K3.1 Pro, the latest in the 3T-class models, excels in multimodal tasks, improving outputs in coding, 3D creation, and factual accuracy with a million-token context window.'
          },
          {
            title_zh: 'Perplexity 为 Decisions API 引入实时网页事实锚定（Web Grounding）',
            title_en: 'Web grounding for the Decisions API',
            read_time: '7 MIN READ',
            url: 'https://www.perplexity.ai/hub/blog/web-grounding-for-the-decisions-api?utm_source=tldrai',
            domain: 'perplexity.ai',
            highlight_kw: 'Decisions API',
            summary_zh: 'Perplexity 旗下的 Decisions API 现已支持在给出决策响应前自动检索全网实时信息以完成事实核验。',
            summary_en: 'Perplexity\'s Decisions API can now search the web before it answers.'
          },
          {
            title_zh: '前 Claude Code 核心负责人 Cat Wu 宣布加盟 OpenAI',
            title_en: 'Cat Wu joins OpenAI',
            read_time: '1 MIN READ',
            url: 'https://x.com/_catwu/status/2118137612577968402?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: 'Cat Wu 加盟 OpenAI',
            summary_zh: 'Cat Wu 正式加入 OpenAI，致力于构建高可靠性且始终让人类用户掌握控制权的 AI 智能体产品。',
            summary_en: 'Cat Wu has joined OpenAI to build reliable agents that keep users in control.'
          }
        ]
      }
    ]
  },

  '2026-11-04': {
    date: '2026-11-04',
    weekday: 'WED · 周三',
    issueNo: 'VOL. 2026.11.04',
    headline_zh: '苹果向全体开发者开放 Siri AI · Google 推出 Gemini Notebook API · Anthropic 可证明大模型推理',
    headline_en: 'Siri AI developer 🍎, Gemini Notebook API 👨‍💻, provable inference ⚡',
    highlights: [
      { code: '#01.1', label_zh: '苹果向开发者开放 Siri AI', label_en: 'Siri AI developer 🍎' },
      { code: '#03.1', label_zh: 'Google Gemini Notebook API', label_en: 'Gemini Notebook API 👨‍💻' },
      { code: '#03.3', label_zh: 'Anthropic 可证明推理 (zkSNARK)', label_en: 'provable inference ⚡' }
    ],
    sections: [
      {
        sectionKey: 'Headlines & Launches',
        items: [
          {
            title_zh: '苹果随 iOS 27.3 Beta 向全体开发者正式开放 Siri AI 深度集成接口',
            title_en: 'Siri AI is now open to all developers',
            read_time: '4 MIN READ',
            url: 'https://developer.apple.com/news/?id=gdk2umrf&utm_source=tldrai',
            domain: 'developer.apple.com',
            highlight_kw: 'Siri AI 开放',
            summary_zh: '随着 iOS 27.3 Beta 发布，全球开发者现可将 Siri AI 深度集成至自有 App 中，直接调用 Siri 的高级自然语言处理与个人跨应用上下文理解能力。目前该功能暂未向欧盟地区及 13 岁以下用户开放，已支持多国语言并将持续扩充。',
            summary_en: 'Developers can now integrate Siri AI into their apps with the iOS 27.3 beta. This update allows apps to leverage Siri\'s advanced features, like natural language processing and personal context understanding, enhancing user interaction.'
          },
          {
            title_zh: 'Baseten 发布 Grid 路由治理、可恢复沙箱 Sandboxes 与 Serverless 强化学习 Loops',
            title_en: 'Baseten Introduces Grid, Sandboxes, and Serverless Loops',
            read_time: '5 MIN READ',
            url: 'https://www.baseten.co/blog/the-building-blocks-of-the-open-frontier?utm_source=tldrai',
            domain: 'baseten.co',
            highlight_kw: 'Baseten Grid & Loops',
            summary_zh: 'Baseten 推出三大基础设施套件：用于多模型路由与治理的 Grid、面向智能体执行的虚拟机级隔离可恢复沙箱 Sandboxes，以及全面开放（GA）的无服务器监督微调与强化学习平台 Loops，打通训练、推理与执行全链路，且客户完全保有训练模型权重所有权。',
            summary_en: 'Baseten announced Grid for model routing and governance, resumable VM-isolated Sandboxes for agent execution, and general availability of Loops for serverless supervised fine-tuning and reinforcement learning.'
          },
          {
            title_zh: 'Fireworks AI 在 Forge 大会发布 1,500 token/s 极速推理引擎与 Nexus 企业级套件',
            title_en: 'Fireworks Launches Faster AI Inference and Enterprise Tools',
            read_time: '5 MIN READ',
            url: 'https://fireworks.ai/blog/fireworks-unveils-new-products-at-forge-to-help-companies-build-specialized-intelligence?utm_source=tldrai',
            domain: 'fireworks.ai',
            highlight_kw: '1,500 tokens/s',
            summary_zh: 'Fireworks AI 在 Forge 大会上推出多项核心产品：吞吐高达 1,500 tokens/秒的极速推理服务、低成本后台批处理通道，以及可在企业现有工具内无缝调用多模型的 Nexus 平台，并配套提供模型评测、微调部署与企业自控基础设施方案。',
            summary_en: 'Fireworks AI unveiled new products at Forge, including Ultra-fast inference reaching up to 1,500 tokens per second, lower-cost background processing, and Nexus for accessing multiple AI models within existing tools.'
          }
        ]
      },
      {
        sectionKey: 'Deep Dives & Analysis',
        items: [
          {
            title_zh: 'Vals AI 实测分析：大模型的推理强度（Reasoning Effort）究竟如何影响得分与成本？',
            title_en: 'How Much Does Reasoning Effort Affect Score and Cost?',
            read_time: '8 MIN READ',
            url: 'https://www.vals.ai/blogs/reasoning-effort?utm_source=tldrai',
            domain: 'vals.ai',
            highlight_kw: 'Reasoning Effort',
            summary_zh: '实测表明，调低大模型的推理强度（Reasoning Effort）所节省的开销比例，远大于其带来的输出质量折损。在大量实际任务中，低推理挡位模型完全能以极低成本媲美高推理挡位的表现，具体收益高度取决于任务类型。',
            summary_en: 'Lower reasoning effort reduces cost much more than it lowers the quality of results. Tests show that models on low reasoning can match models on high reasoning at lower cost. The impact of reasoning effort depends on the task.'
          },
          {
            title_zh: 'Prime Intellect 审计公开评测基准：如何防范榜单刷分与评测失真？',
            title_en: 'Learnings from Auditing Public Evaluations',
            read_time: '8 MIN READ',
            url: 'https://www.primeintellect.ai/blog/auditing-public-evaluations?utm_source=tldrai',
            domain: 'primeintellect.ai',
            highlight_kw: '评测基准审计',
            summary_zh: '文章复盘了大模型公开评测基准面临的普遍缺陷，并详述了对 AUTOMATIONBENCH 与 OFFICEQA PRO V2 的重构改进：用严格的 JSON Schema 取代含糊的自然语言描述、升级评分系统，并提出多层防作弊监控体系以确保模型能力度量的真实有效。',
            summary_en: 'The article outlines issues faced during public evaluations of LLMs and details improvements made to benchmarks such as AUTOMATIONBENCH and OFFICEQA PRO V2, replacing ambiguous prose descriptions with JSON schemas.'
          },
          {
            title_zh: '仅花 2.1 万美元从零训练文生图模型：双人实验室的 P-JiT 像素空间架构实践',
            title_en: 'Training a Text-to-Image Model for $21K',
            read_time: '13 MIN READ',
            url: 'https://www.linum.ai/field-notes/pjit-21k?utm_source=tldrai',
            domain: 'linum.ai',
            highlight_kw: '$21K 训练文生图',
            summary_zh: '双人研究实验室 Linum 正尝试从零自研生成式视频模型以普及动画创作。他们提出的金字塔像素空间架构 Pyramid-JiT (P-JiT) 通过精心设计的噪声调度实现了激进的 Token 缩减，同时让像素级模型更好捕捉细粒度细节，仅耗资 2.1 万美元即完成了长周期压力测试。',
            summary_en: 'Linum is a two-person research lab training generative models from scratch. Pyramid-JiT (P-JiT) is a pixel-space architecture that achieves aggressive token reduction through a noise schedule that helps pixel-space models better learn fine-grained detail.'
          }
        ]
      },
      {
        sectionKey: 'Engineering & Research',
        items: [
          {
            title_zh: 'Google 开放 Gemini Notebook API 与 MCP Server 公测：编程化构建持久化知识笔记本',
            title_en: 'Gemini Notebook API',
            read_time: '1 MIN READ',
            url: 'https://developers.google.com/notebook/docs?utm_source=tldrai',
            domain: 'developers.google.com',
            highlight_kw: 'Gemini Notebook API',
            summary_zh: 'Gemini Notebook API 提供了一套标准 REST 接口与配套 MCP Server，支持开发者通过代码自动创建和管理笔记本及知识源，可将网页、YouTube 视频、纯文本与 Markdown 一键转化为持久化知识库（目前处于早期公测阶段，暂仅支持个人 Google 账号）。',
            summary_en: 'The Gemini Notebook API is a REST interface for programmatically creating and managing notebooks and sources in Gemini Notebook. It can turn web pages, YouTube videos, plain text, and Markdown into persistent notebooks.'
          },
          {
            title_zh: 'OpenAI 赋能物理世界工程：用 GPT-6 Astra 加速机械设计、CAD 建模与马自达气动仿真',
            title_en: 'Accelerating engineering for the physical world',
            read_time: '6 MIN READ',
            url: 'https://openai.com/index/accelerating-engineering-for-the-physical-world/?utm_source=tldrai',
            domain: 'openai.com',
            highlight_kw: 'GPT-6 Astra 物理工程',
            summary_zh: 'OpenAI 正利用旗下前沿模型全面加速机械与电气工程全链路。工程师们借助 GPT-6 Astra 完成硬件设备设计、CAD 三维建模与性能仿真优化，并携手马自达（Mazda）等车企探索汽车空气动力学研发中的大模型落地。',
            summary_en: 'OpenAI is leveraging its AI models to enhance mechanical and electrical engineering processes, from design to simulation and production, utilizing models like GPT-6 Astra for CAD model creation and collaborating with Mazda on vehicle aerodynamics.'
          },
          {
            title_zh: 'Anthropic 零知识证明突破：基于 zkSNARK 实现大语言模型的“可证明推理（Provable Inference）”',
            title_en: 'Progress on provable inference for large language models',
            read_time: '30 MIN READ',
            url: 'https://www.anthropic.com/research/provable-inference?utm_source=tldrai',
            domain: 'anthropic.com',
            highlight_kw: 'zkSNARK 可证明推理',
            summary_zh: '在外部几乎无法核实某段输出究竟由哪个模型生成（或是否被偷换为蒸馏小模型）的背景下，Anthropic 详细披露了利用 zkSNARK 密码学证明实现“可证明推理”的最新进展，使模型提供商能够从数学上向用户及监管机构证明特定输出确由指定权重的模型生成。',
            summary_en: 'Cryptographic proofs of inference allow model providers to prove that a specific output was produced by a specific model. This post details progress made on a powerful type of cryptographic proof uniquely fit for provable inference called zkSNARK.'
          }
        ]
      },
      {
        sectionKey: 'Miscellaneous',
        items: [
          {
            title_zh: 'OpenAI 运营数据揭秘：ChatGPT 搜索量已达 Google 的 20%，周活突破 12 亿、语音用户达 2.5 亿',
            title_en: 'OpenAI: ChatGPT Search Is About 20% of Google\'s, 250 Million People Speak With ChatGPT, and Chat Is Merging With Work',
            read_time: '16 MIN READ',
            url: 'https://www.bigtechnology.com/p/openai-chatgpt-search-is-about-20?utm_source=tldrai',
            domain: 'bigtechnology.com',
            highlight_kw: '12亿周活 / Google 20%',
            summary_zh: '最新披露数据显示，ChatGPT 搜索量已相当于 Google 搜索的 20%；过去两个月内 ChatGPT 狂揽 2 亿新用户，周活跃用户（WAU）高达 12 亿，其中每周使用 GPT Live 实时语音交互的用户达 2.5 亿。同时 OpenAI 正推进合并 Chat 与 Work 模式以简化操作流。',
            summary_en: 'ChatGPT\'s search volume has reached 20% of Google\'s, with ChatGPT rapidly gaining 200 million users in the past two months, leading to 1.2 billion weekly active users and 250 million weekly voice users.'
          },
          {
            title_zh: 'DeepSeek 计划采用华为昇腾（Ascend）芯片预训练下一代旗舰模型 DeepSeek V5',
            title_en: 'DeepSeek Plans to Train Its Next-Generation Model on Huawei Ascend Chips',
            read_time: '3 MIN READ',
            url: 'https://www.geopolitechs.org/p/deepseek-plans-to-train-its-next?utm_source=tldrai',
            domain: 'geopolitechs.org',
            highlight_kw: 'DeepSeek V5 昇腾芯片',
            summary_zh: '据悉 DeepSeek 计划使用华为昇腾 AI 芯片完整预训练下一代旗舰模型 DeepSeek V5。此前昇腾芯片主要用于推理而非大规模预训练，此次尝试将成为检验国产 AI 加速卡能否独立支撑前沿大模型全量预训练的关键里程碑。',
            summary_en: 'DeepSeek plans to use Huawei\'s Ascend AI chips to pretrain DeepSeek V5. This will be an important test of whether Chinese AI accelerators can support the full pre-training of a frontier large language model.'
          }
        ]
      },
      {
        sectionKey: 'Quick Links',
        items: [
          {
            title_zh: '冷思考：“GPT-6 Astra 直接读写神经网络权重改进 Qwen”的说法存在误导',
            title_en: 'The \'Astra can read and write weights to improve Qwen\' post is misleading',
            read_time: '4 MIN READ',
            url: 'https://honnibal.dev/blog/astra-read-write-misleading?utm_source=tldrai',
            domain: 'honnibal.dev',
            highlight_kw: '权重编辑祛魅',
            summary_zh: 'spaCy 作者 Matthew Honnibal 撰文指出，近期热传的“Astra 直接读改权重提升 Qwen 性能”在表述上存在夸大与误导。',
            summary_en: 'The \'Astra can read and write weights\' claims are misleading.'
          },
          {
            title_zh: 'OpenAI Images API 已合入 GIF 动画输出支持，即将登陆 ChatGPT',
            title_en: 'ChatGPT is about to start making GIFs',
            read_time: '1 MIN READ',
            url: 'https://x.com/tokengremlin/status/2117526651932205552?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: 'ChatGPT GIF',
            summary_zh: 'OpenAI 已将动态 GIF 输出能力合并至图像生成接口中，为次日 Images 2.6 的全面发布埋下伏笔。',
            summary_en: 'OpenAI just merged animated GIF output into its image generation API.'
          },
          {
            title_zh: '智能体状态机（Agent State Machines）：在 Prompt 之外构建确定性安全脚手架',
            title_en: 'Agent State Machines: Building Deterministic Scaffolding for Agents',
            read_time: '9 MIN READ',
            url: 'https://x.com/josharosen/status/2117687393213932003?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: 'Agent State Machines',
            summary_zh: '详解如何利用状态机在模型提示词之外强制执行智能体权限控制、人类审批、失败重试与完成度验收准则。',
            summary_en: 'This post explains how state machines enforce agent permissions, approvals, retries, and completion criteria outside model prompts.'
          },
          {
            title_zh: '算力经济学：大模型 Token 的真实成本究竟是多少？',
            title_en: 'How much do tokens really cost?',
            read_time: '6 MIN READ',
            url: 'https://substack.hadley.nz/p/how-much-do-tokens-really-cost?utm_source=tldrai',
            domain: 'substack.hadley.nz',
            highlight_kw: 'Token 成本拆解',
            summary_zh: '分析表明当前 AI Token 的定价完全具备可持续性，且模型厂商间的激烈竞争正持续拉低推理边际成本。',
            summary_en: 'AI tokens\' pricing appears sustainable, as competition among providers is driving down costs.'
          }
        ]
      }
    ]
  },

  '2026-11-03': {
    date: '2026-11-03',
    weekday: 'TUE · 周二',
    issueNo: 'VOL. 2026.11.03',
    headline_zh: 'Claude 推出消息线程降低 35% 首字延迟 · GPT-6.2 Astra 现身 Codex · Anthropic 披露逼近递归自我改进 (RSI)',
    headline_en: 'Claude Message Threads 🧵, Astra 6.2 spotted 👀, Anthropic nears RSI 🔄',
    highlights: [
      { code: '#01.3', label_zh: 'Claude 消息线程公测', label_en: 'Claude Message Threads 🧵' },
      { code: '#01.1', label_zh: 'GPT-6.2 Astra 现身 Codex', label_en: 'Astra 6.2 spotted 👀' },
      { code: '#01.2', label_zh: 'Anthropic 逼近递归自我改进', label_en: 'Anthropic nears RSI 🔄' }
    ],
    sections: [
      {
        sectionKey: 'Headlines & Launches',
        items: [
          {
            title_zh: 'GPT-6.2-Astra 现身 Codex 用量统计明细，OpenAI 跳过 6.1 版本发布在即',
            title_en: 'GPT-6.2 Astra appears in Codex usage ahead of possible launch',
            read_time: '3 MIN READ',
            url: 'https://www.testingcatalog.com/gpt-6-2-astra-appears-codex-usage/?utm_source=tldrai',
            domain: 'testingcatalog.com',
            highlight_kw: 'GPT-6.2-Astra',
            summary_zh: '多位开发者在 Codex 用量统计明细中发现了 GPT-6.2-Astra 的身影，表明部分请求已作为 A/B 测试被静默路由至该新模型，正式发布或仅在数日之内。据悉出于对欺骗行为与能力边界的审慎考量，OpenAI 决定直接跳过 GPT-6.1 Astra。',
            summary_en: 'GPT-6.2-Astra has started appearing in Codex usage breakdowns. The requests are likely being quietly routed to the new model as part of an A/B test or a staged rollout. OpenAI reportedly decided to skip GPT-6.1 Astra due to concerns about deception and scope.'
          },
          {
            title_zh: 'Anthropic 在更新版招股书中预警：公司正逼近“递归自我改进（RSI）”临界点',
            title_en: 'Anthropic Warns It May Be Close to Self-Improving AI',
            read_time: '3 MIN READ',
            url: 'https://techcrunch.com/2026/11/02/anthropic-warns-that-its-very-close-to-rsi-capability-aka-self-building-ai/?utm_source=tldrai',
            domain: 'techcrunch.com',
            highlight_kw: 'Anthropic RSI',
            summary_zh: 'Anthropic 在最新修订的 IPO 招股书中正式披露，公司可能很快达到其内部定义的“递归自我改进（Recursive Self-Improvement, RSI）”能力阈值——即由 AI 系统深度参与并加速研发出能力更强的下一代 AI 模型。',
            summary_en: 'Anthropic disclosed in its updated IPO filing that it may soon reach its internal definition of recursive self-improvement (RSI), where AI systems help develop increasingly capable AI models.'
          },
          {
            title_zh: 'Claude 推出消息线程（Message Threads）公测：免除重复发送历史，长上下文首字延迟降低 35%',
            title_en: 'Claude Introduces Message Threads',
            read_time: '2 MIN READ',
            url: 'https://claude.com/resources/articles/message-threads?utm_source=tldrai',
            domain: 'claude.com',
            highlight_kw: 'Message Threads',
            summary_zh: 'Anthropic 开放 Message Threads 公测，允许智能体在多轮对话中仅发送新增消息而无需每次重传完整历史记录。在 500K–1M tokens 的长上下文请求中，该特性在不改变 Token 计费逻辑的前提下将首字响应时间（TTFT）中位数大幅缩短了约 35%。',
            summary_en: 'Anthropic released message threads in public beta, allowing agents to send only new messages instead of resending their entire conversation history. The feature reduced median time to first token by approximately 35% for requests with 500K–1M tokens.'
          }
        ]
      },
      {
        sectionKey: 'Deep Dives & Analysis',
        items: [
          {
            title_zh: '如何训练智能体蜂群（Swarm）？群体推理时扩展与并行强化学习激励设计',
            title_en: 'How to Train a Swarm',
            read_time: '19 MIN READ',
            url: 'https://www.gr.inc/blog/how-to-train-a-swarm?utm_source=tldrai',
            domain: 'gr.inc',
            highlight_kw: '群体推理时扩展',
            summary_zh: '智能体蜂群（Swarms）是由多个智能体围绕共同目标协作的 AI 系统。本文深入探讨了“群体推理时扩展（Collective Inference-time Scaling）”技术，让智能体同步扩展并行有效工作量与跨节点通信效率，并拆解了如何为并行协作设计强化学习激励函数。',
            summary_en: 'Swarms are AI systems where multiple agents cooperate towards a shared goal. This post discusses collective inference-time scaling and how to design incentives for parallel work in reinforcement learning.'
          },
          {
            title_zh: '算力孤岛训练漫游指南：跨异构小集群联合预训练前沿大模型的机遇与安全隐患',
            title_en: 'The Hitchhiker\'s Guide to Training on Compute Islands',
            read_time: '18 MIN READ',
            url: 'https://www.coreauto.com/hitchhikers-guide-to-training-on-compute-islands?utm_source=tldrai',
            domain: 'coreauto.com',
            highlight_kw: 'Compute Islands',
            summary_zh: '在多个中小型算力孤岛上可靠地开展联合训练，能够大幅拓宽前沿模型的可用算力池，甚至允许单次训练混用不同代际与不同厂商的加速芯片。但跨供应商训练也带来了完整性与安全挑战：单一受损节点可能悄无声息地劣化或篡改模型权重且极难溯源。',
            summary_en: 'Being able to train reliably on multiple smaller clusters widens the usable training pool for frontier training, mixing accelerator generations and vendors, though integrity and safety become harder to trace across providers.'
          },
          {
            title_zh: '微软构建 Copilot Cowork 实战复盘：4.5 个月全球上线并在生产环境将运行时从 Python 迁移至 Rust',
            title_en: 'Lessons from building Copilot Cowork',
            read_time: '21 MIN READ',
            url: 'https://commandline.microsoft.com/how-we-built-copilot-cowork-python-to-rust-migration/?utm_source=tldrai',
            domain: 'commandline.microsoft.com',
            highlight_kw: 'Python 迁移至 Rust',
            summary_zh: '微软智能体执行层 Copilot Cowork 仅用四个半月即实现全球上线，并在不停机状态下将底层运行时从 Python 平滑重构为 Rust。团队总结的核心经验包括：编码前先写严密规范（Specs）、运行边界清晰的小型专职智能体，以及用硬核自动化测试守住代码变更质量。',
            summary_en: 'Microsoft\'s Copilot Cowork achieved global availability in four and a half months, switching its runtime from Python to Rust while live by writing clear specs before coding and running narrow agents with clear boundaries.'
          }
        ]
      },
      {
        sectionKey: 'Engineering & Research',
        items: [
          {
            title_zh: 'GPU 加速“权重瞬移（Weight Teleportation）”：将强化学习训练与采样器同步停顿压缩至 0.23 秒内',
            title_en: 'GPU-accelerated Weight Teleportation',
            read_time: '17 MIN READ',
            url: 'https://humansand.ai/blog/gpu-accelerated-weight-teleportation?utm_source=tldrai',
            domain: 'humansand.ai',
            highlight_kw: '0.23秒 权重同步',
            summary_zh: 'Humans& 团队提出的 GPU 加速权重瞬移技术，通过协同设计的 GPU 并行压缩/解压流水线（结合 LZ4、Snappy 与 Zstd 分层编码），极速优化了 RL 训练器与推理采样器之间的权重同步，将训练停顿时间压缩至 0.23 秒以内。',
            summary_en: 'GPU-accelerated Weight Teleportation optimizes RL training by improving weight syncing between trainers and samplers, reducing pause times to under 0.23 seconds using GPU-accelerated parallel compression.'
          },
          {
            title_zh: 'Framer 发布 Harness 2：流式边接收边执行智能体代码，成本降低 33%、提速 20%',
            title_en: 'Harness 2: executing agent code as it streams',
            read_time: '6 MIN READ',
            url: 'https://framer.com/blog/harness-2/?utm_source=tldrai',
            domain: 'framer.com',
            highlight_kw: 'Framer Harness 2',
            summary_zh: 'Framer 的 Harness 2 架构允许在单一程序流中随着模型流式输出实时执行 JavaScript 代码（Eager Execution）并支持提前熔断取消，使工具调用步数减少 43%、单条消息缓存输入 Token 减少 39%，整体成本降低 33% 且执行速度提升 20%。',
            summary_en: 'Framer\'s Harness 2 executes JavaScript as it streams in, achieving up to 33% cost reduction, 20% faster execution, and 43% fewer tool steps.'
          },
          {
            title_zh: 'NVIDIA 升级 Cosmos 物理 AI 世界模型框架：支持同步生成视频与激光雷达（LiDAR）仿真',
            title_en: 'NVIDIA\'s Cosmos Framework',
            read_time: '6 MIN READ',
            url: 'https://developer.nvidia.com/blog/build-world-models-for-interactive-simulation-with-nvidia-cosmos/?utm_source=tldrai',
            domain: 'developer.nvidia.com',
            highlight_kw: 'NVIDIA Cosmos',
            summary_zh: 'NVIDIA 为 Cosmos 框架推出全新物理 AI 世界模型训练、微调与强化学习能力，支持开发者为机器人与自动驾驶生成时间同步的视频与 LiDAR 点云交互仿真，并通过 Cosmos NIM 微服务一键加速部署。',
            summary_en: 'NVIDIA introduced new Cosmos Framework capabilities for physical AI world models, enabling synchronized video and LiDAR simulations for robotics and autonomous vehicles.'
          }
        ]
      },
      {
        sectionKey: 'Miscellaneous',
        items: [
          {
            title_zh: 'OpenAI 正式合并 ChatGPT 的 Chat 与 Work 标签页，并与 Codex 共享额度池',
            title_en: 'OpenAI is finally merging ChatGPT\'s Chat and Work tabs',
            read_time: '2 MIN READ',
            url: 'https://techcrunch.com/2026/11/02/openai-is-finally-merging-chatgpts-chat-and-work-tabs/?utm_source=tldrai',
            domain: 'techcrunch.com',
            highlight_kw: 'Chat & Work 合并',
            summary_zh: '在小范围测试后，OpenAI 计划将 ChatGPT 内的 Chat 与 Work 标签页合二为一，让用户在同一空间内无缝完成从灵感探索到工作交付的闭环；Codex 在桌面端仍保持独立入口，但很快将与 ChatGPT 共享统一的用量额度池。',
            summary_en: 'OpenAI plans to merge the Chat and Work tabs within the ChatGPT experience, while ChatGPT and Codex will soon draw from the same allowance pool.'
          },
          {
            title_zh: '深度评述：大模型直接读写神经网络权重并非“超人类魔法”，更接近资深研究员的工程解题',
            title_en: 'LLMs are not superhuman at reading and writing neural network weights',
            read_time: '4 MIN READ',
            url: 'https://www.seangoedecke.com/llms-are-not-superhuman-at-reading-and-writing-neural-network-weights/?utm_source=tldrai',
            domain: 'seangoedecke.com',
            highlight_kw: '权重编辑解析',
            summary_zh: '近期论文展示了 GPT-6 Astra 直接编辑 0.8B Qwen 模型权重以提升其数学能力的实验。作者分析指出，这一表现反映的是类似人类高水平研究员的高级工程问题求解能力，而非某种超越人类理解范畴的全新超自然 AI 能力。',
            summary_en: 'A recent paper demonstrates GPT-6 Astra editing a 0.8B Qwen LLM\'s weights natively. While impressive, these capabilities reflect advanced problem-solving akin to skilled human researchers.'
          },
          {
            title_zh: 'Anthropic 更新 IPO 招股书披露三季报：前 9 个月营收暴增 1,200% 至 332.4 亿美元，算力承诺近 9,000 亿',
            title_en: 'Anthropic releases amended IPO prospectus with third-quarter financials',
            read_time: '1 MIN READ',
            url: 'https://www.cnbc.com/2026/11/02/anthropic-ant-s-1-quarter-financials.html?utm_source=tldrai',
            domain: 'cnbc.com',
            highlight_kw: '营收 332.4亿美元',
            summary_zh: 'Anthropic 修订版 S-1 招股书显示，2026 年前 9 个月公司营收同比暴增 1,200% 达到 332.4 亿美元，同期净亏损为 1,040 亿美元；其未来多年的算力与基础设施总承诺支出高达约 8,954 亿美元。',
            summary_en: 'Anthropic\'s amended IPO prospectus reveals a 1,200% increase in revenue to $33.24 billion for the first nine months of 2026, a net loss of $104 billion, and compute commitments totaling $895.4 billion.'
          }
        ]
      },
      {
        sectionKey: 'Quick Links',
        items: [
          {
            title_zh: 'GitHub Next 推出 Enclaves：限制跨仓库智能体工作流中的私有代码信息泄露',
            title_en: 'Limit what agents learn about private repos with enclaves',
            read_time: '17 MIN READ',
            url: 'https://githubnext.com/posts/enclaves/?utm_source=tldrai',
            domain: 'githubnext.com',
            highlight_kw: 'GitHub Enclaves',
            summary_zh: 'Enclaves 是面向跨仓库 GitHub Agentic Workflows 的新型安全原语，允许智能体协同处理不同仓库的同时严格限制彼此间的信息传递。',
            summary_en: 'Enclaves are a new security primitive for cross-repository GitHub Agentic Workflows that lets agents work on different repositories while limiting what they say to each other.'
          },
          {
            title_zh: 'OpenAI 发布 LifeVal 评测基准：衡量 AI 在家庭预算、育儿与政务办理等日常事务上的表现',
            title_en: 'OpenAI Introduces LifeVal to Measure AI Performance on Everyday Tasks',
            read_time: '4 MIN READ',
            url: 'https://openai.com/index/lifeval/?utm_source=tldrai',
            domain: 'openai.com',
            highlight_kw: 'OpenAI LifeVal',
            summary_zh: '专门评估 AI 在规划家庭预算、寻找托育服务及办理政府公共服务等贴近真实生活场景中的实用能力。',
            summary_en: 'LifeVal is a benchmark designed to evaluate AI performance on practical everyday tasks such as budgeting, finding childcare, and accessing government services.'
          },
          {
            title_zh: 'Teaching Qwen Why：将 Anthropic“理解规则背后意图”的对齐训练法泛化迁移至 Qwen 模型',
            title_en: 'Teaching Qwen Why',
            read_time: '47 MIN READ',
            url: 'https://www.lesswrong.com/posts/35yw2qGK7naFLAvcq/teaching-qwen-why-1?utm_source=tldrai',
            domain: 'lesswrong.com',
            highlight_kw: 'Teaching Qwen Why',
            summary_zh: '结合合成文档微调（SDF）与含伦理困境故事的监督微调（SFT），在开源模型上有效复现并降低了智能体失调率。',
            summary_en: 'The research extends Anthropic\'s "Teaching Claude Why" methods to new models, reducing agentic misalignment through synthetic document finetuning (SDF) and supervised finetuning (SFT).'
          },
          {
            title_zh: '马斯克确认因运营成本飙升而收紧 X 平台 Grok Bot 调用限额',
            title_en: 'Elon Musk Limits Grok Bot Usage Over Rising Costs',
            read_time: '2 MIN READ',
            url: 'https://x.com/elonmusk/status/2116992258520064397?utm_source=tldrai',
            domain: 'x.com',
            highlight_kw: 'Grok 限流降本',
            summary_zh: '马斯克证实由于高并发调用导致算力运营成本相对于收入过高，已下调 Grok Bot 的免费调用配额。',
            summary_en: 'Elon Musk confirmed that Grok Bot usage limits were reduced after operating costs became unsustainably high relative to revenue.'
          }
        ]
      }
    ]
  },

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

// 通过多路 CORS 通道拉取文本内容（支持原生 CORS、Jina Reader HTML/Markdown 及备用代理）
async function fetchTextWithCorsFallback(targetUrl) {
  const isRss = targetUrl.includes('/api/rss/');
  const candidates = isRss
    ? [
        { url: targetUrl, headers: {} },
        { url: `https://r.jina.ai/${targetUrl}`, headers: { 'X-Return-Format': 'html' } },
        { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`, headers: {} }
      ]
    : [
        { url: `https://r.jina.ai/${targetUrl}`, headers: { 'X-Return-Format': 'html' } },
        { url: `https://r.jina.ai/${targetUrl}`, headers: {} },
        { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`, headers: {} },
        { url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`, headers: {} }
      ];

  for (let i = 0; i < candidates.length; i++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 9000);
      const res = await fetch(candidates[i].url, {
        headers: candidates[i].headers,
        signal: controller.signal
      });
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

// 解析 Jina Reader 返回的 Markdown 格式刊物内容（当 HTML 通道回退至纯文本 Markdown 时使用）
function parseTldrMarkdownSections(mdText) {
  const lines = mdText.split(/\r?\n/);
  const sections = [];
  let currentSec = null;
  let currentItem = null;

  const flushItem = () => {
    if (currentSec && currentItem && currentItem.summary_en) {
      currentItem.summary_en = currentItem.summary_en.replace(/\s+/g, ' ').trim();
      if (
        !currentItem.title_en.includes('(Sponsor)') &&
        !currentItem.title_en.includes('at TLDR (') &&
        currentItem.summary_en
      ) {
        currentSec.items.push(currentItem);
      }
    }
    currentItem = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // 终止于底部订阅引导
    if (line.startsWith('## Get the most interesting AI stories')) {
      flushItem();
      break;
    }

    // 匹配 ### [标题 (X minute read)](https://...)
    const itemMatch = line.match(/^###\s+\[(.+?)\]\((https?:\/\/[^\s)]+)\)/);
    if (itemMatch) {
      flushItem();
      if (!currentSec) continue;

      const fullTitleEn = itemMatch[1].trim();
      const href = itemMatch[2].trim();
      let cleanTitleEn = fullTitleEn;
      let readTime = '3 MIN READ';
      const parenMatch = fullTitleEn.match(/\(([^)]+)\)\s*$/);
      if (parenMatch) {
        readTime = parenMatch[1].toUpperCase().replace('MINUTE', 'MIN');
        cleanTitleEn = fullTitleEn.slice(0, parenMatch.index).trim();
      }

      currentItem = {
        title_en: cleanTitleEn,
        read_time: readTime,
        url: href,
        domain: extractDomain(href),
        summary_en: ''
      };
      continue;
    }

    // 匹配 ### 章节名
    if (line.startsWith('### ')) {
      flushItem();
      const secHeading = line.replace(/^###\s+/, '').trim();
      let normalizedKey = '';
      Object.keys(TLDR_SECTION_MAP).forEach(k => {
        if (secHeading.toLowerCase().includes(k.toLowerCase())) {
          normalizedKey = k;
        }
      });
      if (normalizedKey) {
        currentSec = { sectionKey: normalizedKey, items: [] };
        sections.push(currentSec);
      } else {
        currentSec = null;
      }
      continue;
    }

    if (currentItem) {
      currentItem.summary_en += (currentItem.summary_en ? ' ' : '') + line;
    }
  }
  flushItem();
  return sections.filter(s => s.items.length > 0);
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

  let h2Text = doc.querySelector('h2')?.textContent?.trim() || rssHeadlineEn || '';
  if (!h2Text) {
    const mdTitleMatch = htmlText.match(/^Title:\s*(.+)$/m);
    h2Text = mdTitleMatch ? mdTitleMatch[1].trim() : `TLDR AI Daily (${dateStr})`;
  }
  const sectionEls = Array.from(doc.querySelectorAll('section'));
  let rawSections = [];

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

  // 如果返回的是 Jina Markdown 文本，使用 Markdown 解析器回退提取
  if (rawSections.length === 0) {
    rawSections = parseTldrMarkdownSections(htmlText);
  }

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
