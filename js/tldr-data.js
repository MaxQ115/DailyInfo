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
  '2026-11-17': {
    "date": "2026-11-17",
    "weekday": "TUE · 周二",
    "issueNo": "VOL. 2026.11.17",
    "headline_zh": "Perplexity Research 🧪、NVIDIA Rubin HPC 🖥️、OpenAI 安全评估 👨‍💻",
    "headline_en": "Perplexity Research 🧪, NVIDIA Rubin HPC 🖥️, OpenAI safety assessments 👨‍💻",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "NVIDIA 的 Rubin HPC",
            "title_en": "NVIDIA's Rubin HPC",
            "read_time": "2 MIN READ",
            "url": "https://blogs.nvidia.com/blog/rubin-hpc/?utm_source=tldrai",
            "domain": "blogs.nvidia.com",
            "highlight_kw": "NVIDIA",
            "summary_zh": "Rubin HPC 是一款新的 Nvidia GPU，旨在加速 AI 代理在科学、工程和分析中使用的模拟。它拥有超过 50,000 个核心，创下了单 GPU 的记录。预计将于 2028 年上市。",
            "summary_en": "Rubin HPC is a new Nvidia GPU designed to speed up the simulations AI agents use in science, engineering, and analytics. It has more than 50,000 cores, a record for a single GPU. It is expected to be available in 2028."
          },
          {
            "title_zh": "腾讯推出Hy4闪存",
            "title_en": "Tencent Launches Hy4 flash",
            "read_time": "4 MIN READ",
            "url": "https://www.tencent.com/tencent-launches-hy4-flash-to-power-high-speed-cost-efficient-ai-deployment-for-everyday-workflows/?utm_source=tldrai",
            "domain": "tencent.com",
            "highlight_kw": "Tencent Launches",
            "summary_zh": "腾讯发布了 Hy4 flash，这是一种适用于日常工作流程的快速、低成本的人工智能模型。在腾讯内部用户的盲测中，其满意度得分接近Claude Haiku 5.5。",
            "summary_en": "Tencent has released Hy4 flash, a fast, low-cost AI model for everyday workflows. In a blind test with Tencent's internal users, its satisfaction scores came close to Claude Haiku 5.5."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "克劳德接受过大规模蛋白质序列培训",
            "title_en": "Claude was trained on protein sequences at scale",
            "read_time": "26 MIN READ",
            "url": "https://xinmingtu.cn/blog/2026/claude-opus-5-5-protein-sequences/?utm_source=tldrai",
            "domain": "xinmingtu.cn",
            "highlight_kw": "Claude",
            "summary_zh": "测试表明，最新的克劳德模型经过了大规模蛋白质序列训练。如果给定很少研究的细菌蛋白质的起始点，这些模型可以预测下一个氨基酸。没有其他测试的模型可以做到这一点，并且如果蛋白质被改组，模型将无法预测序列。 Fable 5.2 击败了所有测试的开放蛋白质语言模型。",
            "summary_en": "Tests show that the latest Claude models were trained on protein sequences at scale. The models can predict the next amino acid if given the start of little-studied bacterial proteins. No other model tested can do this, and the models fail to predict the sequence if the protein is shuffled. Fable 5.2 beats every open protein language model tested."
          },
          {
            "title_zh": "测量对齐评估告诉",
            "title_en": "Measuring alignment eval tells",
            "read_time": "16 MIN READ",
            "url": "https://metr.org/notes/2026-11-16-measuring-alignment-eval-tells/#summary?utm_source=tldrai",
            "domain": "metr.org",
            "highlight_kw": "Measuring",
            "summary_zh": "调查人员可以越来越多地将一致性评估与能力评估区分开来，将它们识别为旨在测试不良行为的人工或“蜜罐”环境。 Opus 5.5 和 Astra 代理通过注意到不切实际的场景和特定的任务级别线索来区分这些。该研究的结果表明，虽然当前的模型可以识别常见的对齐评估，但使它们不易被检测到可以提高其功效。",
            "summary_en": "Investigator agents can increasingly distinguish alignment evals from capabilities evals, identifying them as artificial or \"honeypot\" environments designed to test bad behavior. Opus 5.5 and Astra agents differentiate these by noticing unrealistic scenarios and specific task-level cues. The study's findings suggest that while current models can identify common alignment evaluations, making them less detectable can refine their efficacy."
          },
          {
            "title_zh": "2030 年世界",
            "title_en": "World 2030",
            "read_time": "8 MIN READ",
            "url": "https://world-2030.pages.dev/?utm_source=tldrai",
            "domain": "world-2030.pages.dev",
            "highlight_kw": "World 2030",
            "summary_zh": "预测人工智能将如何影响经济需要研究经济的所有不同组成部分，并弄清楚它们如何相互影响。 《2030 年世界》是一项研究，成立了 9 个小组（人工智能实验室、大雇主、银行和保险公司、公用事业、初创企业、大学、工人、政府和美联储），并在 2030 年的六个月内推动美国经济向前发展。它的目的是确定这些强大力量相互作用时的不变量和可能发生变化的界限。该研究预测人工智能将打破按席位软件定价并削减美国初级办公桌招聘。",
            "summary_en": "Predicting how AI will affect the economy requires looking at all of the different components of that economy and figuring out how they might affect each other. World 2030 is a study that sets up nine groups (AI labs, big employers, banks and insurers, utilities, startups, universities, workers, governments, and the Fed) and runs the US economy forward in six-month turns to 2030. It aimed to identify both the invariants and the boundaries of what can change as these powerful forces interact with each other. The study predicts that AI will break per-seat software pricing and cut US junior desk hiring."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "d1.2：最先进的全模态决策模型",
            "title_en": "d1.2: State-of-the-Art Omnimodal Decision Models",
            "read_time": "5 MIN READ",
            "url": "https://www.liquid.ai/blog/d1-2?utm_source=tldrai",
            "domain": "liquid.ai",
            "highlight_kw": "State-of-the-Art Omnimodal",
            "summary_zh": "d1.2和d1.2-ultra是支持音频输入的决策模型。他们还可以从输入中读取值，查找文本中的每一个段落，定位图片中的内容，估计数字，并选择每个适用的选项。 d1.2-ultra 在人工分析决策指数 v2.1 的决策模型中排名第一。这两种模型均可在 Liquid API 上使用，d1.2 的价格为每百万输入代币 0.02 美元，d1.2-ultra 的价格为每百万输入代币 0.042 美元。",
            "summary_en": "d1.2 and d1.2-ultra are decision models that support audio input. They can also read a value from the input, find every passage of a kind in a text, locate things in a picture, estimate a number, and pick every option that applies. d1.2-ultra ranks first among decision models on the Artificial Analysis Decision Index v2.1. Both models are available on the Liquid API at $0.02 per million input tokens for d1.2 and $0.042 per million input tokens for d1.2-ultra."
          },
          {
            "title_zh": "Hugging Face 与 OpenRouter 强强联手",
            "title_en": "Hugging Face and OpenRouter Join Forces",
            "read_time": "6 MIN READ",
            "url": "https://huggingface.co/blog/openrouter?utm_source=tldrai",
            "domain": "huggingface.co",
            "highlight_kw": "Hugging Face",
            "summary_zh": "Hugging Face 现在通过 OpenRouter 从其推理提供程序服务路由语言模型请求，OpenRouter 会为每次调用选择最佳提供程序。单个 Hugging Face 访问令牌适用于提供商服务的任何开放权重模型。",
            "summary_en": "Hugging Face now routes language-model requests from its Inference Providers service through OpenRouter, which picks the best provider for each call. A single Hugging Face access token works for any open-weight model a provider serves."
          },
          {
            "title_zh": "成为 TLDR 人工智能社区创始成员",
            "title_en": "Become a founding member of TLDR's AI community",
            "read_time": "2 MIN FORM",
            "url": "https://danni763618.typeform.com/to/H1tYViME?utm_source=tldrai",
            "domain": "danni763618.typeform.com",
            "highlight_kw": "Become",
            "summary_zh": "TLDR 正在为人工智能构建者推出一个精心策划的社区，以讨论重大新闻和发布。最好的链接和评论将出现在 TLDR AI 中。在此申请加入。",
            "summary_en": "TLDR is launching a curated community for AI builders to discuss major news and launches. The best links and comments will be featured in TLDR AI. Apply here to join."
          },
          {
            "title_zh": "通过按位零训练-推理不匹配解锁 TPU 上稳定的同策略强化学习",
            "title_en": "Unlocking Stable On-Policy RL on TPU with Bitwise-Zero Train–Inference Mismatch",
            "read_time": "7 MIN READ",
            "url": "https://developers.googleblog.com/unlocking-stable-on-policy-rl-on-tpu-with-bitwise-zero-traininference-mismatch?utm_source=tldrai",
            "domain": "developers.googleblog.com",
            "highlight_kw": "Unlocking Stable",
            "summary_zh": "Google 的 ZERO-TIM 实现在 64 个 TPU v5p 芯片上进行了验证，为采样器和训练器实现了按位相同的对数概率，通过消除数值差异确保了 RL 训练中真正的策略稳定性。该解决方案使用一致的算术运算和跨 TPU 网格的标准化归约顺序，解决了单独服务和训练路径中的浮点加法错误。",
            "summary_en": "Google's ZERO-TIM implementation, verified across 64 TPU v5p chips, achieves bitwise-identical logprobs for sampler and trainer, ensuring true on-policy stability in RL training by eliminating numerical discrepancies. This solution addresses floating-point addition errors in separate serving and training paths, using consistent arithmetic operations and standardized reduction orders across TPU meshes."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "OpenAI 第一阶段嵌入式评估",
            "title_en": "OpenAI's first phase of embedded assessments",
            "read_time": "11 MIN READ",
            "url": "https://openai.com/index/our-first-phase-of-embedded-assessments/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "OpenAI",
            "summary_zh": "嵌入式评估使独立专家能够深入访问实验室的内部模型和系统，以便他们能够在较长时间内评估模型的一致性和保障措施的有效性。该访问权限为评估人员提供了证据和背景，以进行独立评估并发现意外的失败。独立评估的公开报告可以让公众更清楚地了解实验室如何评估和管理风险。 OpenAI 已与四家独立评估机构签署了第一阶段嵌入式评估协议。",
            "summary_en": "Embedded assessments give independent experts deep access to a lab's internal models and systems so they can assess model alignment and the effectiveness of safeguards over an extended period. The access gives assessors the evidence and context to pursue independent evaluations and uncover unanticipated failures. Public reporting from independent assessments can give the public a clearer view of how labs are evaluating and managing risks. OpenAI has signed agreements with four independent assessors for its first phase of embedded assessments."
          },
          {
            "title_zh": "边境仍然开放",
            "title_en": "The frontier is still open",
            "read_time": "16 MIN READ",
            "url": "https://research.perplexity.ai/?utm_source=tldrai",
            "domain": "research.perplexity.ai",
            "highlight_kw": "The",
            "summary_zh": "Perplexity Frontier Research 是 Perplexity 的一项新举措，旨在公开构建新的算法、模型和评估，其使命是打造一名自动化科学家。申请现已开放至 12 月 5 日。研究工作将得到 10,000 个 GPU 的支持。该计划的结果将以论文、博客文章、模型权重和开放存储库的形式发布。",
            "summary_en": "Perplexity Frontier Research is a new initiative at Perplexity that aims to build new algorithms, models, and evaluations in the open, with the mission of building an automated scientist. Applications are now open until December 5. The research effort will be supported by 10,000 GPUs. Results from the initiative will ship as papers, blog posts, model weights, and open repositories."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "加州 AG 就流氓代理事件起诉 OpenAI",
            "title_en": "California state AG sues OpenAI over rogue agent incidents",
            "read_time": "5 MIN READ",
            "url": "https://techcrunch.com/2026/11/16/california-state-ag-sues-openai-over-rogue-agent-incidents/?utm_source=tldrai",
            "domain": "techcrunch.com",
            "highlight_kw": "California",
            "summary_zh": "该投诉以“抱脸”事件为中心，但也引用了其他事件作为证据，表明潜在行为仍在继续。",
            "summary_en": "The complaint centers on the Hugging Face incident, but it also cites other incidents as evidence that the underlying behavior is ongoing."
          },
          {
            "title_zh": "Claude Code 团队如何看待验证",
            "title_en": "How the Claude Code team thinks about verification",
            "read_time": "14 MIN READ",
            "url": "https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/?utm_source=tldrai",
            "domain": "claude.dev",
            "highlight_kw": "How",
            "summary_zh": "强大的自动化检查使团队可以并行运行数十或数百个编码代理。",
            "summary_en": "Strong automated checks are what let teams run dozens or hundreds of coding agents in parallel."
          },
          {
            "title_zh": "Gemini Notebook 将资源转变为互动网站",
            "title_en": "Gemini Notebook Turns Sources Into Interactive Sites",
            "read_time": "1 MIN READ",
            "url": "https://blog.google/innovation-and-ai/products/gemini-notebook/interactive-sites/?utm_source=tldrai",
            "domain": "blog.google",
            "highlight_kw": "Gemini Notebook",
            "summary_zh": "Gemini Notebook 现在可以将上传的源转换为可共享的交互式网站。",
            "summary_en": "Gemini Notebook can now turn uploaded sources into shareable interactive sites."
          },
          {
            "title_zh": "为医疗团队推进计算机使用代理",
            "title_en": "Advancing computer-use agents for healthcare teams",
            "read_time": "8 MIN READ",
            "url": "https://openai.com/index/advancing-computer-use-for-healthcare-teams?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "Advancing",
            "summary_zh": "OpenAI 的计算机使用代理通过自动执行 MRI 授权和管理流程等重复任务来简化医疗保健工作流程。",
            "summary_en": "OpenAI's computer-use agents streamline healthcare workflows by automating repetitive tasks like MRI authorizations and administrative processes."
          }
        ]
      }
    ]
  },
  '2026-11-16': {
    "date": "2026-11-16",
    "weekday": "MON · 周一",
    "issueNo": "VOL. 2026.11.16",
    "headline_zh": "ChatGPT 钱包 💳、Devin 应用程序 🛠️、永远在线的代理 ⚡",
    "headline_en": "ChatGPT Wallet 💳, Devin Apps 🛠️, always-on agents ⚡",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "Devin Apps",
            "title_en": "Devin Apps",
            "read_time": "3 MIN READ",
            "url": "https://devin.ai/blog/devin-apps?utm_source=tldrai",
            "domain": "devin.ai",
            "highlight_kw": "Devin Apps",
            "summary_zh": "Devin 应用程序是 Devin 根据描述构建和托管的私有 Web 应用程序，例如仪表板和审批队列。应用程序可以使用团队现有的集成和代码库，并且查看者必须登录 Devin。",
            "summary_en": "Devin Apps are private web apps that Devin builds and hosts from a description, such as dashboards and approval queues. Apps can use a team's existing integrations and codebase, and viewers must sign in to Devin."
          },
          {
            "title_zh": "ChatGPT 钱包",
            "title_en": "ChatGPT Wallet",
            "read_time": "5 MIN READ",
            "url": "https://openai.com/index/introducing-chatgpt-wallet/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "ChatGPT Wallet",
            "summary_zh": "OpenAI 推出了 ChatGPT 钱包，允许人工智能代理在不访问用户实际卡详细信息的情况下进行购买，同时要求对每笔交易进行安全检查。",
            "summary_en": "OpenAI introduced ChatGPT Wallet, allowing AI agents to make purchases without accessing users' actual card details while requiring a security check for every transaction."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "Quark：我们的整个训练堆栈，端到端，售价 4,200 美元",
            "title_en": "Quark: our whole training stack, end to end, for $4,200",
            "read_time": "7 MIN READ",
            "url": "https://empero.org/writing/quark?utm_source=tldrai",
            "domain": "empero.org",
            "highlight_kw": "Quark",
            "summary_zh": "Quark 是一种语言模型，拥有约 1.65 亿个参数，训练成本约为 4,200 美元（约 1,300 H-100 小时）。在类似代币预算训练的同等规模的开放模型中，它具有最佳的基准平均值。该模型的创建是为了在花费大量资金购买大型模型之前探索团队正在使用的训练堆栈的每个部分。这篇文章着眼于模型的数据、架构、大规模预训练、上下文扩展、强化学习、评估和发布。",
            "summary_en": "Quark is a language model with about 165 million parameters trained for about $4,200 of compute (about 1,300 H-100-hours). It has the best benchmark average among open models of its size trained on similar token budgets. The model was created to explore every part of the training stack the team was using before spending serious money on a large model. This post looks at the model's data, architecture, pretraining at scale, context extension, reinforcement learning, evaluation, and release."
          },
          {
            "title_zh": "论阿姆达尔定律的残酷性",
            "title_en": "On the Brutality of Amdahl's Law",
            "read_time": "12 MIN READ",
            "url": "https://bosoncutter.substack.com/p/on-the-brutality-of-amdahls-law?utm_source=tldrai",
            "domain": "bosoncutter.substack.com",
            "highlight_kw": "On",
            "summary_zh": "世界发展速度太慢，无法看到人工智能预计带来的两位数或更高的经济增长和经济巨变。智能并不是上个半世纪中唯一接近无限的技术曲线。电力、通信、计算机、交通和农业都经历了极大的增长和变革。尽管如此，近 150 年来我们的人均 GDP 只增长了 2%。",
            "summary_en": "The world is far too slow to see the high double-digit or more economic growth and seismic transformations in the economy that AI is predicted to bring. Intelligence isn't the only technology curve to go quasi-infinite in the last century and a half. Electricity, communication, computers, transportation, and agriculture have all experienced extreme growth and transformation. Despite this, we've only seen 2% GDP per capita growth for nearly 150 years."
          },
          {
            "title_zh": "端到端 4 位 AI 训练",
            "title_en": "End-to-End 4-Bit AI Training",
            "read_time": "9 MIN READ",
            "url": "https://thinkingmachines.ai/blog/end-to-end-4-bit-training/?utm_source=tldrai",
            "domain": "thinkingmachines.ai",
            "highlight_kw": "End-to-End 4-Bit",
            "summary_zh": "Thinking Machines 探索了使用 4 位精度训练语言模型的技术挑战，包括量化误差及其对模型准确性的影响。深入研究 BF16、MXFP8 和 NVFP4 格式。",
            "summary_en": "Thinking Machines explored the technical challenges of training language models using 4-bit precision, including quantization errors and their effects on model accuracy. The deep dive examines BF16, MXFP8, and NVFP4 formats."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "BirdDreams：驾驶世界模型",
            "title_en": "BirdDreams: A Driving World Model",
            "read_time": "4 MIN READ",
            "url": "https://research.nvidia.com/labs/sil/projects/birddreams/?utm_source=tldrai",
            "domain": "research.nvidia.com",
            "highlight_kw": "BirdDreams",
            "summary_zh": "BirdDreams 是 Nvidia 的驾驶世界模型，可将单个摄像头图像转换为驾驶视频和场景鸟瞰图。",
            "summary_en": "BirdDreams is an Nvidia driving world model that turns a single camera image into driving video and a bird's-eye view of the scene."
          },
          {
            "title_zh": "成为 TLDR 人工智能社区创始成员",
            "title_en": "Become a founding member of TLDR's AI community",
            "read_time": "2 MIN FORM",
            "url": "https://danni763618.typeform.com/to/H1tYViME?utm_source=tldrai",
            "domain": "danni763618.typeform.com",
            "highlight_kw": "Become",
            "summary_zh": "TLDR 正在为人工智能构建者推出一个精心策划的社区，以讨论重大新闻和发布。最好的链接和评论将出现在 TLDR AI 中。在此申请加入。",
            "summary_en": "TLDR is launching a curated community for AI builders to discuss major news and launches. The best links and comments will be featured in TLDR AI. Apply here to join."
          },
          {
            "title_zh": "恩布拉1号",
            "title_en": "Embla 1",
            "read_time": "5 MIN READ",
            "url": "https://sevren.ai/blog/embla-1?utm_source=tldrai",
            "domain": "sevren.ai",
            "highlight_kw": "Embla",
            "summary_zh": "Embla 1 是专为手机构建的推理模型。它的设计速度很快，并且每个答案使用很少的标记。该模型可以在手机上私下、离线、免费运行。在 4 位时，Embla 1 在 BFCL、IFBench、AA-Omniscience、GPQA 和 MATH-500 上的平均得分为 57.4，在 iPhone 18 Pro 上端到端的答对时间为 1.77 秒。",
            "summary_en": "Embla 1 is a reasoning model built for phones. It is designed to be fast and to use few tokens per answer. The model can run on a phone, privately, offline, for free. At 4 bits, Embla 1 averages 57.4 on BFCL, IFBench, AA-Omniscience, GPQA, and MATH-500 and answers in 1.77 seconds end-to-end on an iPhone 18 Pro."
          },
          {
            "title_zh": "Qwen4-Max：你的新队友已经到来",
            "title_en": "Qwen4-Max: Your New Teammate Has Arrived",
            "read_time": "16 MIN READ",
            "url": "https://qwen.ai/blog?id=qwen4-max&amp;utm_source=tldrai",
            "domain": "qwen.ai",
            "highlight_kw": "Qwen4-Max",
            "summary_zh": "Qwen4-Max可以在3D建模、游戏开发、精密制造、金融、法律、医疗保健和前沿科学发现等领域承担广泛的创意和专业工作。它展示了强大的3D创建能力，可以使用Blender进行几何建模、场景组装、材质设置、灯光和渲染。该模型与领先的游戏引擎流畅配合，可以处理场景构建、游戏逻辑、外部资源集成、材质设置、HUD设计和视觉效果，并交付可玩的游戏。该系列中较小的型号即将开源。",
            "summary_en": "Qwen4-Max can take on a wide range of creative and professional work in the fields of 3D modeling, game development, precision manufacturing, finance, law, healthcare, and frontier scientific discovery. It demonstrates strong 3D creation capabilities and can use Blender to carry out geometry modeling, scene assembly, material setup, lighting, and rendering. The model works fluently with leading game engines and can handle scene construction, gameplay logic, integration of external assets, material setup, HUD design, and visual effects, and deliver a playable game. Smaller models in the family are coming to open source."
          },
          {
            "title_zh": "多模态模型中的 Meta 视觉编码器",
            "title_en": "Meta's Vision Encoders in Multimodal Models",
            "read_time": "7 MIN READ",
            "url": "https://unbundling.github.io/?utm_source=tldrai",
            "domain": "unbundling.github.io",
            "highlight_kw": "Meta",
            "summary_zh": "Meta 研究人员探索了视觉编码器的哪些组件对于多模态模型至关重要，发现专用的视觉处理能力比预训练更重要。",
            "summary_en": "Meta researchers explored which components of vision encoders are essential for multimodal models, finding that dedicated visual processing capacity matters more than pretraining."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "发布个人代理协议1.0",
            "title_en": "Releasing Personal Agent Protocol 1.0",
            "read_time": "5 MIN READ",
            "url": "https://sierra.ai/blog/releasing-poppy?utm_source=tldrai",
            "domain": "sierra.ai",
            "highlight_kw": "Releasing Personal",
            "summary_zh": "个人代理协议使个人代理能够通过业务代理、网站和 API 与公司进行交互。该协议 v.0 现已推出。该协议定义了个人代理如何与实施该协议的公司联系。客户可以控制个人代理可以做什么和不能做什么，并且可以随着时间的推移管理他们的访问权限。",
            "summary_en": "The Personal Agent Protocol enables personal agents to interact with companies through business agents, websites, and APIs. v.0 of the protocol is now available. The protocol defines how personal agents connect with companies that implement it. Customers control what personal agents can and can't do, and can manage their access over time."
          },
          {
            "title_zh": "GPT-6 Astra 解决了一个基本的物理问题",
            "title_en": "GPT-6 Astra Tackles a Fundamental Physics Problem",
            "read_time": "15 MIN READ",
            "url": "https://openai.com/index/step-toward-defining-the-standard-model/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "GPT-6 Astra",
            "summary_zh": "物理学家 Nathaniel Craig 与 GPT-6 Astra 合作开发了标准模型的候选晶格公式，解决了在不依赖微扰近似的情况下定义理论的长期挑战。 Astra 帮助构建了数学框架并开发了支持所提出方法的详细证明。",
            "summary_en": "Physicist Nathaniel Craig worked with GPT-6 Astra to develop a candidate lattice formulation of the Standard Model, addressing a longstanding challenge in defining the theory without relying on perturbative approximations. Astra helped construct the mathematical framework and develop a detailed proof supporting the proposed approach."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "我们对 Claude Code 中的项目进行了一些重大更新！",
            "title_en": "We've made some big updates to Projects in Claude Code!",
            "read_time": "3 MIN READ",
            "url": "https://threadreaderapp.com/thread/2121375309287301360.html?utm_source=tldrai",
            "domain": "threadreaderapp.com",
            "highlight_kw": "We",
            "summary_zh": "协调员现在更加主动，可以回答项目聊天中的问题，同时提供有关正在进行的线程状态的更新。",
            "summary_en": "The coordinator is now more proactive and can answer questions in the project chat while providing updates on the status of ongoing threads."
          },
          {
            "title_zh": "请愿书要求英伟达恢复黄仁勋的职位",
            "title_en": "Petition Calls for Nvidia to Reinstate Jensen Huang",
            "read_time": "1 MIN READ",
            "url": "https://techcrunch.com/2026/11/14/elon-musk-other-tech-execs-sign-petition-calling-on-nvidia-to-reinstate-jensen-huang/?utm_source=tldrai",
            "domain": "techcrunch.com",
            "highlight_kw": "Petition Calls",
            "summary_zh": "埃隆·马斯克 (Elon Musk) 和其他科技高管签署了一份请愿书，要求英伟达恢复前首席执行官黄仁勋 (Jensen Huang) 的职务，后者因涉嫌涉嫌中国间谍而辞职。",
            "summary_en": "Elon Musk and other technology executives signed a petition calling for Nvidia to reinstate former CEO Jensen Huang following his resignation amid allegations involving a suspected Chinese spy."
          },
          {
            "title_zh": "建立永远在线的代理",
            "title_en": "Building always-on agents",
            "read_time": "13 MIN READ",
            "url": "https://claude.com/resources/articles/building-always-on-agents?utm_source=tldrai",
            "domain": "claude.com",
            "highlight_kw": "Building",
            "summary_zh": "最近的进步使永远在线的代理得以复兴，现在管理上下文并在没有直接监督的情况下执行操作，在通过事件收件箱、计时器、内存、权限和发件箱增强的核心循环上运行。",
            "summary_en": "Always-on agents, revived by recent advancements, now manage context and act without direct supervision, running on a core loop enhanced with event inboxes, timers, memory, permissions, and outboxes."
          },
          {
            "title_zh": "建立强有力的安全评估",
            "title_en": "Building strong safety evaluations",
            "read_time": "23 MIN READ",
            "url": "https://www.anthropic.com/research/building-strong-safety-evaluations?utm_source=tldrai",
            "domain": "anthropic.com",
            "highlight_kw": "Building",
            "summary_zh": "Anthropic 强调对人工智能模型进行稳健的安全评估的重要性，这为部署和培训决策提供了信息。",
            "summary_en": "Anthropic emphasizes the importance of robust safety evaluations for AI models, which inform deployment and training decisions."
          }
        ]
      }
    ]
  },
  '2026-11-13': {
    "date": "2026-11-13",
    "weekday": "FRI · 周五",
    "issueNo": "VOL. 2026.11.13",
    "headline_zh": "Gemini 4 Hydrogen 🚀、自托管 Claude 代理🔒、Replit 代理商业 🛒",
    "headline_en": "Gemini 4 Hydrogen 🚀, self-hosted Claude agents 🔒, Replit agent commerce 🛒",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "双子座 4 氢",
            "title_en": "Gemini 4 Hydrogen",
            "read_time": "14 MIN READ",
            "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/?utm_source=tldrai",
            "domain": "blog.google",
            "highlight_kw": "Gemini",
            "summary_zh": "Google 推出了 Gemini 4 Hydrogen，这是一种针对编码和代理工作流程进行优化的快速、高效的模型。它在人工智能分析指数上得分为 51，超过 Gemini 4 Argon，定价为每百万个输入代币 1.50 美元，每百万个输出代币 7.50 美元。",
            "summary_en": "Google introduced Gemini 4 Hydrogen, a fast, efficient model optimized for coding and agentic workflows. It scored 51 on the Artificial Analysis Intelligence Index, surpassing Gemini 4 Argon, and is priced at $1.50 per million input tokens and $7.50 per million output tokens."
          },
          {
            "title_zh": "在您的安全范围内操作 Claude Managed Agents",
            "title_en": "Operate Claude Managed Agents inside your security perimeter",
            "read_time": "4 MIN READ",
            "url": "https://claude.com/resources/articles/self-hosted-claude-managed-agents?utm_source=tldrai",
            "domain": "claude.com",
            "highlight_kw": "Operate Claude",
            "summary_zh": "自托管的 Claude Managed Agents 为开发人员提供私人测试版，让他们可以直接在公司自己的基础设施内构建和运行代理。此设置允许托管代理服务的完整内部部署，包括沙箱、凭证处理和会话历史记录。组织受益于增强的安全性和对代理操作的控制，能够与现有云提供商集成并遵守零数据保留策略。",
            "summary_en": "Self-hosted Claude Managed Agents offers private beta for developers to build and run agents directly within their company's own infrastructure. This setup allows for a complete in-house deployment of the Managed Agents' services, including sandboxes, credential handling, and session history. Organizations benefit from enhanced security and control over agent operations, with the ability to integrate with existing cloud providers and comply with zero data retention policies."
          },
          {
            "title_zh": "Replit Agent 现在可以为您的企业购买并帮助您吸引客户",
            "title_en": "Replit Agent can now buy for your business and help you reach customers",
            "read_time": "5 MIN READ",
            "url": "https://replit.com/blog/replit-agent-ads-commerce?utm_source=tldrai",
            "domain": "replit.com",
            "highlight_kw": "Replit Agent",
            "summary_zh": "Replit Agent 现在可以帮助企业进行供应采购和运行 Google Ads。它利用与 Visa 和 Stripe 的 Link 来实现安全、受控的交易，并通过分析内容和建议策略来简化广告活动。",
            "summary_en": "Replit Agent now helps businesses with supply purchases and running Google Ads. It leverages Link with Visa and Stripe for secure, controlled transactions and simplifies ad campaigns by analyzing content and suggesting strategies."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "中国顶尖前沿人工智能模型带有受出口管制的 NVIDIA Blackwell GPU 的指纹",
            "title_en": "Top Chinese Frontier AI Models Carry the Fingerprint of Export-Controlled NVIDIA Blackwell GPUs",
            "read_time": "37 MIN READ",
            "url": "https://unemploymentlabs.com/checkpoint-forensics?utm_source=tldrai",
            "domain": "unemploymentlabs.com",
            "highlight_kw": "Top Chinese",
            "summary_zh": "对公开发布的人工智能模型的取证分析发现，有证据表明 DeepSeek、Moonshot AI、MiniMax 和 Ant Group 已经获得了 Nvidia Blackwell GPU 的使用权。自 4 月份以来，这些公司发布的六种模型包含与 Blackwell 硬件相匹配的数字模式。几家领先的中国人工智能开发商可能已经开始使用 Blackwell 来训练他们的最新模型。虽然分析提供了访问高级计算硬件的技术证据，但它没有确定芯片位于何处、如何获得访问权限或是否违反出口管制。",
            "summary_en": "A forensic analysis of publicly released AI models found evidence that DeepSeek, Moonshot AI, MiniMax, and Ant Group have gained access to Nvidia's Blackwell GPUs. Six models released by these companies since April contain numerical patterns that match Blackwell hardware. Several leading Chinese AI developers have likely begun using Blackwell to train their newest models. While the analysis provides technical evidence of access to advanced computing hardware, it doesn't establish where the chips were located, how access was obtained, or whether export controls were violated."
          },
          {
            "title_zh": "使用纯整数算术消除法学硕士推理中的不确定性",
            "title_en": "Eliminating Nondeterminism in LLM Inference with Integer-Only Arithmetic",
            "read_time": "15 MIN READ",
            "url": "https://nathan.rs/posts/detllm/?utm_source=tldrai",
            "domain": "nathan.rs",
            "highlight_kw": "Eliminating Nondeterminism",
            "summary_zh": "浮点数存储固定数量的有效数字和单独的指数。当两个指数相差很大的数字相加时，小数字必须移动才能与大数字对齐，最后掉下来的数字就会消失。这意味着 (a+b)+c 并不总是等于 a+(b+c)。这篇文章着眼于使用精确的整数加法时会发生什么。",
            "summary_en": "A floating-point number stores a fixed number of significant digits and a separate exponent. When two numbers with very different exponents are added, the small one has to be shifted to line up with the big one, and the digits that fall off on the end are gone. That means that (a+b)+c is not always equal to a+(b+c). This post looks at what happens when integer addition, which is exact, is used."
          },
          {
            "title_zh": "代理异常检测在我们未编写的基准上的得分如何",
            "title_en": "How Agent Anomaly Detection scores on benchmarks we didn't write",
            "read_time": "8 MIN READ",
            "url": "https://developers.googleblog.com/how-agent-anomaly-detection-scores-on-benchmarks-we-didnt-write/?utm_source=tldrai",
            "domain": "developers.googleblog.com",
            "highlight_kw": "How Agent",
            "summary_zh": "代理异常检测根据外部基准测试，标记了 87% 的已执行有害指令，突出了识别目标劫持和工具滥用方面的优势，但在内存中毒方面存在弱点。它表现出不同的误报率，对于涉及高影响力工具的任务，误报率最高为 16%。持续改进的重点是检测微小的、潜在有害的行为，区分正常使用和误用，以及为新代理提供更快的全面覆盖。",
            "summary_en": "Agent Anomaly Detection, tested against external benchmarks, flagged 87% of executed harmful instructions, highlighting strengths in identifying goal hijack and tool misuse but weaknesses with poisoned memory. It demonstrated varying false alarm rates, with the highest at 16% for tasks involving high-impact tools. Ongoing improvements focus on detecting small, potentially harmful actions, distinguishing normal use from misuse, and providing quicker full coverage for new agents."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "成为 TLDR 人工智能社区创始成员",
            "title_en": "Become a founding member of TLDR's AI community",
            "read_time": "2 MIN FORM",
            "url": "https://danni763618.typeform.com/to/H1tYViME?utm_source=tldrai",
            "domain": "danni763618.typeform.com",
            "highlight_kw": "Become",
            "summary_zh": "TLDR 正在为人工智能构建者推出一个精心策划的社区，以讨论重大新闻和发布。最好的链接和评论将出现在 TLDR AI 中。在此申请加入。",
            "summary_en": "TLDR is launching a curated community for AI builders to discuss major news and launches. The best links and comments will be featured in TLDR AI. Apply here to join."
          },
          {
            "title_zh": "阿特拉斯",
            "title_en": "Atlas",
            "read_time": "WEBSITE",
            "url": "https://worldlabs.ai/atlas?utm_source=tldrai",
            "domain": "worldlabs.ai",
            "highlight_kw": "Atlas",
            "summary_zh": "Atlas 是一种全向模型，原生可对文本、图像、视频和 3D 进行操作。所有输入都被组合到一个共享的空间上下文中。 Atlas 可以执行广泛的任务，涵盖世界生成、重建和模拟。可以使用模型生成的场景示例。",
            "summary_en": "Atlas is an omni model that natively operates on text, images, video, and 3D. All inputs are combined into a shared spatial context. Atlas can perform a broad range of tasks spanning world generation, reconstruction, and simulation. Examples of scenes generated with the model are available."
          },
          {
            "title_zh": "困惑决定者",
            "title_en": "Perplexity Decider",
            "read_time": "26 MIN READ",
            "url": "https://www.perplexity.ai/hub/blog/perplexity-decider?utm_source=tldrai",
            "domain": "perplexity.ai",
            "highlight_kw": "Perplexity Decider",
            "summary_zh": "Perplexity 发布了受 Jev 启发的两个模型的更新，即 TypeSafe AI 的 System One 模型。 Perplexity Decider 支持具有有序或无序标签的二元和多类分类。它返回应用程序可用于对输入进行分类、路由、排名和评估的概率。 Decider v1.3 和 Decider Flash v1.3 这两种新模型都提高了各种文本和视觉任务的性能和稳健性。它们还有一个新功能，可以突出显示用于命名实体识别、个人信息识别和提取问答任务的选定内容。",
            "summary_en": "Perplexity has released updates to two models inspired by Jev, TypeSafe AI's System One model. Perplexity Decider supports binary and multi-class classification with ordered or unordered labels. It returns probabilities that applications can use to classify, route, rank, and evaluate inputs. Both new models, Decider v1.3 and Decider Flash v1.3, improve performance and robustness across a broad range of text and vision tasks. They also have a new feature that highlights selected content for named entity recognition, personal information identification, and extractive question-answering tasks."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "NVIDIA 宣布首席执行官换届",
            "title_en": "NVIDIA Announces CEO Transition",
            "read_time": "3 MIN READ",
            "url": "https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition?utm_source=tldrai",
            "domain": "nvidianews.nvidia.com",
            "highlight_kw": "NVIDIA Announces",
            "summary_zh": "黄仁勋辞去英伟达首席执行官职务。财务主管科莱特·克雷斯 (Colette Kress) 将担任临时首席执行官，直至任命永久继任者。董事会正在考虑内部和外部候选人。英伟达董事会任命长期董事 Harvey C. Jones 为其首任主席。该公司将于11月17日如期公布2027财年第三季度业绩。",
            "summary_en": "Jensen Huang has resigned as Nvidia's CEO. Finance chief Colette Kress will serve as interim CEO until a permanent successor is named. The board is considering both internal and external candidates. Nvidia's board has appointed long-time director Harvey C. Jones as its first ever chair. The company will report its third-quarter fiscal 2027 results on November 17 as previously scheduled."
          },
          {
            "title_zh": "每个人都从抱脸中吸取了错误的教训",
            "title_en": "Everyone is learning the wrong lesson from Hugging Face",
            "read_time": "9 MIN READ",
            "url": "https://blog.karthiktadepalli.com/p/hugging-face?utm_source=tldrai",
            "domain": "blog.karthiktadepalli.com",
            "highlight_kw": "Everyone",
            "summary_zh": "抱脸事件通常被视为网络安全事件。人们将其视为人工智能如何闯入关键基础设施并造成巨大破坏的一个例子。然而，这并不是什么新鲜事：我们已经了解人工智能的黑客能力一段时间了。真正的教训是，前沿人工智能想要我们不想要的东西，并且他们会不懈地追求这些想要的东西。",
            "summary_en": "The Hugging Face incident is commonly viewed as a cybersecurity incident. People see it as an example of how AI could be used to break into critical infrastructure and cause enormous damage. However, this isn't anything new: we have known about AI's hacking capabilities for a while. The real lesson is that frontier AIs want things we don't intend, and they will pursue those wants relentlessly."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "面向 1 年 AGI 时间表",
            "title_en": "Orienting to 1 year AGI timelines",
            "read_time": "22 MIN READ",
            "url": "https://www.lesswrong.com/posts/biFHYdJnMSCmW9Xou/orienting-to-1-year-agi-timelines?utm_source=tldrai",
            "domain": "lesswrong.com",
            "highlight_kw": "Orienting",
            "summary_zh": "现在实现超级人工智能的时间表非常短，一些人预测它将在未来两年内实现。",
            "summary_en": "Timelines to artificial superintelligence are now very short, with some predicting that it will be achieved within the next two years."
          },
          {
            "title_zh": "使用克劳德会议",
            "title_en": "Use Claude Meetings",
            "read_time": "4 MIN READ",
            "url": "https://support.claude.com/en/articles/18325154-use-claude-meetings?utm_source=tldrai",
            "domain": "support.claude.com",
            "highlight_kw": "Use Claude",
            "summary_zh": "现在，Claude 可以作为可见参与者添加到 Google Meet，以便在通话期间做笔记、回答问题并实时构建工件。",
            "summary_en": "Claude can now be added to Google Meet as a visible participant to take notes, answer questions, and build artifacts live during the call."
          },
          {
            "title_zh": "默认情况下很快：Helion 内核的编译时启发式方法",
            "title_en": "Fast by Default: Compile-Time Heuristics for Helion Kernels",
            "read_time": "15 MIN READ",
            "url": "https://pytorch.org/blog/fast-by-default-compile-time-heuristics-for-helion-kernels/?utm_source=tldrai",
            "domain": "pytorch.org",
            "highlight_kw": "Fast",
            "summary_zh": "Helion 的新编译时启发式方法可显着提高内核性能，而无需进行耗时的自动调整。",
            "summary_en": "Helion's new compile-time heuristics boost kernel performance significantly without the need for time-consuming autotuning."
          },
          {
            "title_zh": "LiquidCodec：针对速度进行优化的高保真音频标记化",
            "title_en": "LiquidCodec: High-Fidelity Audio Tokenization Optimized for Speed",
            "read_time": "17 MIN READ",
            "url": "https://www.liquid.ai/blog/liquidcodec?utm_source=tldrai",
            "domain": "liquid.ai",
            "highlight_kw": "LiquidCodec",
            "summary_zh": "LiquidCodec 具有快速语音生成和较小的内存占用等特点，使得构建在本地运行时能够维持对话的应用程序变得更加容易。",
            "summary_en": "LiquidCodec features fast speech generation with a small memory footprint, making it easier to build applications that can sustain a conversation while running locally."
          },
          {
            "title_zh": "Meta 的 Muse 现在可以给企业打电话",
            "title_en": "Meta's Muse Can Now Call Businesses",
            "read_time": "1 MIN READ",
            "url": "https://techcrunch.com/2026/11/12/muse-can-now-place-calls-to-u-s-businesses-if-you-pay/?utm_source=tldrai",
            "domain": "techcrunch.com",
            "highlight_kw": "Meta",
            "summary_zh": "Meta 将 Muse 的人工智能呼叫功能扩展到所有付费用户，让助手代表用户联系美国企业。",
            "summary_en": "Meta expanded Muse's AI-powered calling feature to all paid subscribers, letting the assistant contact US businesses on users' behalf."
          }
        ]
      }
    ]
  },
  '2026-11-12': {
    "date": "2026-11-12",
    "weekday": "THU · 周四",
    "issueNo": "VOL. 2026.11.12",
    "headline_zh": "Grok Bot 1.0 🤖、AlphaGenome 2 🧬、Gemini Decisions 🧠",
    "headline_en": "Grok Bot 1.0 🤖, AlphaGenome 2 🧬, Gemini Decisions 🧠",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "Gemini Decisions API：快速、经过校准的多模式决策",
            "title_en": "Gemini Decisions API: Fast, calibrated multimodal decisions",
            "read_time": "1 MIN READ",
            "url": "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/?utm_source=tldrai",
            "domain": "blog.google",
            "highlight_kw": "Gemini Decisions",
            "summary_zh": "Google 的 Gemini Decisions API 通过分析图像和文本等输入，实现快速、校准的多模式决策。它评估场景并提供可行的见解，例如确定泄漏严重程度和建议清理行动。",
            "summary_en": "Google's Gemini Decisions API enables fast, calibrated multimodal decision-making by analyzing inputs like images and text. It assesses scenarios and provides actionable insights, such as determining spill severity and recommending cleanup actions."
          },
          {
            "title_zh": "Grok Bot 1.0 的新增功能",
            "title_en": "What's new in Grok Bot 1.0",
            "read_time": "11 MIN READ",
            "url": "https://flaviocopes.com/grok-bot-1-0/?utm_source=tldrai",
            "domain": "flaviocopes.com",
            "highlight_kw": "What",
            "summary_zh": "Grok Bot 1.0 添加了您可以发布和共享的团队机器人、Slack 和 Microsoft Teams、Meet 和 Zoom 会议、共享连接器以及复习的学习内容。现在，它是一个个人助理，整个团队都可以在应用程序、Slack、Microsoft Teams 和视频通话中与之交谈。本文介绍了如何创建团队机器人并发布它、如何将机器人引入 Microsoft Teams、如何将机器人添加到会议等。它还着眼于新的管理控制以及无需团队即可实现的功能。",
            "summary_en": "Grok Bot 1.0 adds Team Bots you can publish and share, Slack and Microsoft Teams, meetings on Meet and Zoom, shared connectors, and reviewed learnings. It is now a personal assistant that the whole team can talk to in the app, in Slack, in Microsoft Teams, and in video calls. This post covers how to create a Team Bot and publish it, how to bring the bot into Microsoft Teams, how to add a bot to a meeting, and more. It also looks at the new admin controls and what's possible without a team."
          },
          {
            "title_zh": "Runway Praxis-1 现已推出：开放式重量机器人模型",
            "title_en": "Runway Praxis-1 Is Now Available: Open-Weight Robotics Model",
            "read_time": "3 MIN READ",
            "url": "https://runway.com/news/company-news/praxis-1-is-now-available?utm_source=tldrai",
            "domain": "runway.com",
            "highlight_kw": "Runway Praxis-1",
            "summary_zh": "Runway 的 Praxis-1 是一个 27B 参数开放式重量机器人模型，现已在 Apache 2.0 下提供。该模型在预测视频和动作方面表现出色，在 1,200 个片段中以 46.2% 的成功率位居 NVIDIA RoboLab-120 排行榜榜首。它可以在 GitHub 和 Hugging Face 上访问，支持全面和 LoRA 微调，与 NVIDIA 硬件兼容，并适用于各种机器人实施例。",
            "summary_en": "Runway's Praxis-1, a 27B-parameter open-weight robotics model, is now available under Apache 2.0. The model excels in predicting video and actions, topping NVIDIA's RoboLab-120 leaderboard with a 46.2% success rate across 1,200 episodes. It's accessible on GitHub and Hugging Face, with support for full and LoRA fine-tuning, compatible with NVIDIA hardware, and adaptable for various robotic embodiments."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "逃离太空：第二部分",
            "title_en": "Escaping SPACE: Part II",
            "read_time": "28 MIN READ",
            "url": "https://www.perplexity.ai/hub/blog/escaping-space-part-ii?utm_source=tldrai",
            "domain": "perplexity.ai",
            "highlight_kw": "Escaping SPACE",
            "summary_zh": "Perplexity 针对其 SPACE 代理沙箱测试了 12 个模型：没有一​​个模型能够逃脱虚拟机主机隔离，但在缺陷得到修复之前，有几个模型通过 DNS 欺骗和共享 IP 漏洞绕过了网络控制。实验还发现，夺旗会促使特工分散注意力，远离正在测试的安全边界。",
            "summary_en": "Perplexity tested 12 models against its SPACE agent sandbox: none escaped VM-host isolation, but several bypassed network controls through DNS spoofing and shared-IP exploitation before the flaws were fixed. The experiments also found that capture-the-flag prompts distracted agents from the security boundary being tested."
          },
          {
            "title_zh": "MCP、CLI 与技能：各自的具体成本",
            "title_en": "MCP vs CLI vs Skills: What Each Costs in Context",
            "read_time": "11 MIN READ",
            "url": "https://openrouter.ai/blog/insights/mcp-vs-cli-vs-skills/?utm_source=tldrai",
            "domain": "openrouter.ai",
            "highlight_kw": "MCP",
            "summary_zh": "与 CLI 或技能方法不同，MCP 服务器显着增加了令牌的使用，为每个请求添加了数千个输入令牌。在 Sonnet 5.5 上，一个简单的任务显示 MCP 使用默认工具消耗了 59,417 个令牌，而 CLI 为 1,421 个，技能为 3,315 个，凸显了工具密集型 MCP 设置的高成本。实施工具搜索可以通过推迟工具定义来降低代币成本，将前期工具集成本减少到 600 个代币以下，从而实现最佳效率。",
            "summary_en": "MCP servers significantly increase token use, adding thousands of input tokens per request, unlike CLI or skill methods. On Sonnet 5.5, a simple task showed MCP consuming 59,417 tokens with default tools against CLI's 1,421 and skill's 3,315, highlighting the high cost of tool-heavy MCP setups. Implementing Tool Search can cut token costs by deferring tool definitions, reducing upfront toolset costs to under 600 tokens for optimal efficiency."
          },
          {
            "title_zh": "LLM 可以学习一些关于填充标记的多步骤推理，而不是可见的 CoT",
            "title_en": "LLMs can learn some multi-step reasoning on filler tokens instead of visible CoT",
            "read_time": "9 MIN READ",
            "url": "https://www.lesswrong.com/posts/EHkwCDAmhWPAWEziM/llms-can-learn-some-multi-step-reasoning-on-filler-tokens-2?utm_source=tldrai",
            "domain": "lesswrong.com",
            "highlight_kw": "LLMs",
            "summary_zh": "通过更改训练设置并将 LoRA 应用到 Qwen3.6-35B-A3B 和 gpt-oss-20b，研究人员教模型执行一些多步骤任务，同时仅发出填充标记，在七个任务中的三个上击败了仅回答基线。他们还绘制了理论层深度限制并展示了经验墙，其中一些任务学习了 60 个步骤，而其他任务在 1 到 3 个步骤后就失败了。这项工作的目的是在解释思想链时将填充令牌推理与隐写隐藏推理分开。",
            "summary_en": "By changing the training setup and applying LoRAs to Qwen3.6-35B-A3B and gpt-oss-20b, researchers taught models to do some multi-step tasks while emitting only filler tokens, beating an answer-only baseline on three of seven tasks. They also mapped theoretical layer-depth limits and showed empirical walls, with some tasks learned out to 60 steps and others failing after one to three. The work is meant to separate filler-token reasoning from steganographic hidden reasoning when interpreting chain-of-thought."
          },
          {
            "title_zh": "不要编写内核，而是派生它们",
            "title_en": "Don't Write Kernels, Derive Them",
            "read_time": "63 MIN READ",
            "url": "https://muni.works/research/tang?utm_source=tldrai",
            "domain": "muni.works",
            "highlight_kw": "Don",
            "summary_zh": "当前的模型依赖于特定于算子、芯片和融合的手写内核，限制了跨设备和场景的灵活性。 Tang 的 IR 能够通过视图和理解等构造动态派生内核，从而消除了对预定义内核的需要。",
            "summary_en": "Current models rely on hand-written kernels specific to operators, chips, and fusions, limiting flexibility across devices and scenarios. Tang's IR enables on-the-fly derivation of kernels through constructs such as views and comprehensions, eliminating the need for pre-defined kernels."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "反重力中已开始使用浏览器",
            "title_en": "Browser use has been rolling out in Antigravity",
            "read_time": "1 MIN READ",
            "url": "https://threadreaderapp.com/thread/2120556423474028576.html?utm_source=tldrai",
            "domain": "threadreaderapp.com",
            "highlight_kw": "Browser",
            "summary_zh": "Antigravity 中的浏览器使用闭合了研究、编写代码和实时验证之间的循环。用户控制身份验证，下载会暂停，直到获得批准。代理可以使用浏览器同时运行多个任务。帖子中提供了视频演示。",
            "summary_en": "Browser use in Antigravity closes the loop between researching, writing code, and verifying it live. Users control authentication, and downloads pause until they are approved. Agents can use the browser to run multiple tasks at once. A video demo is available in the post."
          },
          {
            "title_zh": "AlphaGenome 2：预测 DNA 如何塑造细胞和疾病",
            "title_en": "AlphaGenome 2: Predicting how DNA shapes cells and disease",
            "read_time": "9 MIN READ",
            "url": "https://deepmind.google/blog/alphagenome-2-deciphering-how-cells-read-dna-to-better-understand-disease/?utm_source=tldrai",
            "domain": "deepmind.google",
            "highlight_kw": "AlphaGenome",
            "summary_zh": "AlphaGenome 2 改进了 DNA 变异对特定细胞类型影响的预测，有助于疾病的理解和研究。与前身相比，它的变异识别能力增加了一倍，并且无需重新训练即可适应分析新的细胞状态。该工具可用于非商业用途，连接遗传学和细胞生物学，精确定位原代人类细胞中与疾病相关的基因突变。",
            "summary_en": "AlphaGenome 2 improves prediction of DNA variant effects on specific cell types, aiding in disease understanding and research. It doubles variant identification compared to its predecessor and adapts to analyze new cell states without retraining. Available for non-commercial use, the tool bridges genetics and cell biology, pinpointing disease-relevant genetic mutations in primary human cells."
          },
          {
            "title_zh": "OpenAI 为 ChatGPT 原生插件开源 MCP 扩展",
            "title_en": "OpenAI open-sources MCP Extensions for ChatGPT-native plugins",
            "read_time": "1 MIN READ",
            "url": "https://github.com/openai/mcp-extensions?utm_source=tldrai",
            "domain": "github.com",
            "highlight_kw": "OpenAI",
            "summary_zh": "TypeScript 和 Python 包向 MCP 服务器和应用程序添加了特定于 ChatGPT 的功能，包括侧边栏入口点、自定义文件查看器、作曲家资源搜索和缩略图部分选择器。 SDK 附带 Bits & Bolts 演示插件和书面规范。",
            "summary_en": "The TypeScript and Python packages add ChatGPT-specific features to MCP servers and apps, including sidebar entry points, custom file viewers, composer resource search, and thumbnail part pickers. The SDKs ship with a Bits & Bolts demo plugin and a written spec."
          },
          {
            "title_zh": "A2UI 1.0：构建令人愉悦、快速、可靠、代理的体验",
            "title_en": "A2UI 1.0: Build delightful, fast, reliable, agentic experiences",
            "read_time": "11 MIN READ",
            "url": "https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences/?utm_source=tldrai",
            "domain": "developers.googleblog.com",
            "highlight_kw": "A2UI 1.0",
            "summary_zh": "A2UI 是一种用于生成 UI 的开放协议，可让客服人员通过交互式屏幕进行回答。开源渲染器 SDK 现在可用于 Web、Android、iOS，以及适用于 Python、TypeScript 和 Dart 的代理 SDK。 A2UI 使应用程序能够使用本机组件安全地绘制 UI。无论用户是在自己的应用程序中还是在托管 MCP 应用程序的第三方 AI 助手中联系公司代理，他们都可以获得相同的低延迟、高信任度和完全的本机保真度。",
            "summary_en": "A2UI is an open protocol for generative UI that lets agents answer with interactive screens. Open-source renderer SDKs are now available for the web, Android, iOS, and agent SDKs for Python, TypeScript, and Dart. A2UI enables apps to draw UIs with native components, securely. Users get the same low latency, high trust, and complete native fidelity whether they reach a company's agent in its own app or in a third-party AI assistant that hosts MCP apps."
          },
          {
            "title_zh": "Shopify 的生成发现模型",
            "title_en": "Shopify's generative discovery model",
            "read_time": "14 MIN READ",
            "url": "https://shopify.engineering/generative-discovery?utm_source=tldrai",
            "domain": "shopify.engineering",
            "highlight_kw": "Shopify",
            "summary_zh": "Shopify 部署了用于搜索和推荐的共享生成发现模型，利用语义 ID 令牌来增强产品个性化和相关性。该模型改进了线上和线下指标，例如转化率提升了 9.85%，搜索相关性显着提高。",
            "summary_en": "Shopify deployed a shared generative discovery model for search and recommendation, leveraging semantic-ID tokens to enhance product personalization and relevance. The model improved online and offline metrics, such as a 9.85% lift in conversion rate and significant gains in search relevance."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "曼联采取行动阻止人工智能代理",
            "title_en": "United moves to block AI agents",
            "read_time": "2 MIN READ",
            "url": "https://www.cnbc.com/2026/11/11/united-airlines-ai-agents.html?utm_source=tldrai",
            "domain": "cnbc.com",
            "highlight_kw": "United",
            "summary_zh": "美国联合航空公司正在采取措施限制人工智能代理跨其平台和代理渠道的访问，理由是办理登机手续等任务存在凭证安全和责任风险。这些限制与 Expedia 和 Booking 等与代理商合作的旅游公司形成鲜明对比。",
            "summary_en": "United Airlines is moving to restrict AI-agent access across its platforms and agency channels, citing credential security and liability risks around tasks such as check-in. The restrictions contrast with travel companies including Expedia and Booking that are partnering with agents."
          },
          {
            "title_zh": "为什么连接在人工智能中更重要",
            "title_en": "Why Connections Matter More in AI",
            "read_time": "5 MIN READ",
            "url": "https://www.jasonwei.net/blog/the-fall-of-what-you-can-do-and-the-rise-of-who-you-know?utm_source=tldrai",
            "domain": "jasonwei.net",
            "highlight_kw": "Why Connections",
            "summary_zh": "随着编码代理将技术执行商品化、前沿研究需要更多计算资源、闭源开发使个人贡献更难以评估，专业关系在人工智能中变得越来越重要。",
            "summary_en": "Professional relationships are becoming increasingly important in AI as coding agents commoditize technical execution, frontier research demands more compute resources, and closed-source development makes individual contributions harder to evaluate."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "谷歌桌面创建共享交互式规划空间",
            "title_en": "Google Tabletop Creates Shared Interactive Planning Spaces",
            "read_time": "1 MIN READ",
            "url": "https://blog.google/innovation-and-ai/models-and-research/google-labs/tabletop?utm_source=tldrai",
            "domain": "blog.google",
            "highlight_kw": "Google Tabletop",
            "summary_zh": "Google 实验室的桌面将链接、文件和提示转变为交互式行程、民意调查、费用分配器和锦标赛分组。",
            "summary_en": "Google Labs' Tabletop turns links, files, and prompts into interactive itineraries, polls, expense splitters, and tournament brackets."
          },
          {
            "title_zh": "十一人工智能",
            "title_en": "ElevenAI",
            "read_time": "WEBSITE",
            "url": "https://elevenlabs.io/elevenai?utm_source=tldrai",
            "domain": "elevenlabs.io",
            "highlight_kw": "ElevenAI",
            "summary_zh": "ElevenAI 是一款桌面应用程序，可帮助使用代理放大工作。",
            "summary_en": "ElevenAI is a desktop app that helps amplify work using agents."
          },
          {
            "title_zh": "OpenAI 希望代理告诉网站您所在的位置",
            "title_en": "OpenAI wants agents to tell websites where you are",
            "read_time": "5 MIN READ",
            "url": "https://joost.blog/agents-sharing-user-signals/?utm_source=tldrai",
            "domain": "joost.blog",
            "highlight_kw": "OpenAI",
            "summary_zh": "两位 OpenAI 工程师最近分享了一项提案，建议进行一项更改，让代理将用户信息传递到网站，使他们看起来像普通访问者而不是机器人。",
            "summary_en": "Two OpenAI engineers recently shared a proposal that suggests a change that will let agents pass user information along to websites to make them look like normal visitors rather than bots."
          },
          {
            "title_zh": "据报道，英伟达董事会正准备罢免黄仁勋",
            "title_en": "Nvidia board reportedly preparing to oust Huang",
            "read_time": "3 MIN READ",
            "url": "https://www.cbsnews.com/news/nvidia-board-ceo-jensen-huang-china/?utm_source=tldrai",
            "domain": "cbsnews.com",
            "highlight_kw": "Nvidia",
            "summary_zh": "英伟达董事会正准备罢免首席执行官黄仁勋，此前他承认与美国情报机构认为是中国情报机构招募的一名女性有染。",
            "summary_en": "Nvidia's board is preparing to oust CEO Jensen Huang following his admission of an affair with a woman US intelligence agencies believe was recruited by Chinese intelligence."
          },
          {
            "title_zh": "Airbnb 的 AI 助手将每次预订的支持成本削减了 17%",
            "title_en": "Airbnb's AI assistant cut support cost per booking 17%",
            "read_time": "1 MIN READ",
            "url": "https://www.customerexperiencedive.com/news/airbnb-reduces-customer-support-cost-per-booking-17/874307?utm_source=tldrai",
            "domain": "customerexperiencedive.com",
            "highlight_kw": "Airbnb",
            "summary_zh": "Airbnb 的 AI 助手将每次预订的支持成本降低了 17% 以上，无需人工代理即可解决第三季度约 40% 的问题。",
            "summary_en": "Airbnb's AI assistant cut support cost per booking by more than 17%, resolving about 40% of Q3 issues with no human agent."
          },
          {
            "title_zh": "Databricks Genie 代理",
            "title_en": "Databricks Genie Agents",
            "read_time": "13 MIN READ",
            "url": "https://www.databricks.com/blog/enterprise-context-action-genie-agents-now-analyze-more-data-sources-transform-your-work?utm_source=tldrai",
            "domain": "databricks.com",
            "highlight_kw": "Databricks Genie",
            "summary_zh": "Databricks Genie Agents 现在可以分析非结构化文档以及数据库表，连接到企业工具，并通过治理控制在外部共享见解。",
            "summary_en": "Databricks Genie Agents can now analyze unstructured documents alongside database tables, connect to enterprise tools, and share insights externally with governance controls."
          }
        ]
      }
    ]
  },
  '2026-11-11': {
    "date": "2026-11-11",
    "weekday": "WED · 周三",
    "issueNo": "VOL. 2026.11.11",
    "headline_zh": "Gemini 4 Carbon ⚡、Claude Sheets 📊、反重力群 🤖",
    "headline_en": "Gemini 4 Carbon ⚡, Claude Sheets 📊, Antigravity Swarm 🤖",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "使用 Claude 表格、白板和交互式连接器",
            "title_en": "Working with Claude Sheets, Whiteboards, and Interactive Connectors",
            "read_time": "5 MIN READ",
            "url": "https://claude.com/resources/articles/more-ways-to-work-with-claude-sheets-whiteboards-and-interactive-connectors?utm_source=tldrai",
            "domain": "claude.com",
            "highlight_kw": "Working",
            "summary_zh": "Anthropic 推出了 Claude Sheets、Whiteboards 和 Data，这些新的工件类型让团队可以使用 Claude 构建电子表格、组织想法以及创建仪表板，而无需切换应用程序。交互式连接器现在将 Adob​​e 和 Atlassian 等合作伙伴应用程序直接嵌入到 Claude 中，Salesforce、NetSuite 和 Workday（测试版）的插件提供了用于销售、财务和人力资源工作的内置技能。克劳德会议即将推出，克劳德将通过电话记录笔记和更新文件。",
            "summary_en": "Anthropic introduced Claude Sheets, Whiteboards, and Data, new artifact types that let teams build spreadsheets, organize ideas, and create dashboards with Claude without switching apps. Interactive connectors now embed partner apps like Adobe and Atlassian directly in Claude, and plugins from Salesforce, NetSuite, and Workday (in beta) ship with built-in skills for sales, finance, and HR work. Claude Meetings, which will bring Claude into calls to take notes and update documents, is coming soon."
          },
          {
            "title_zh": "ChatGPT 中的企业和业务代理",
            "title_en": "Businesses and Business Agents in ChatGPT",
            "read_time": "3 MIN READ",
            "url": "https://openai.com/index/introducing-businesses-chatgpt/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "Businesses",
            "summary_zh": "OpenAI 在 ChatGPT 中引入了 Businesses，允许公司声明其个人资料、更新业务信息、提供产品提要以及定价和可用性，并跟踪客户参与度。美国符合条件的电子商务和在线服务企业还可以启动业务代理来回答问题并帮助客户在 ChatGPT 内探索他们的产品。该发布处于测试阶段。",
            "summary_en": "OpenAI introduced Businesses in ChatGPT, allowing companies to claim their profiles, update business information, provide product feeds with pricing and availability, and track customer engagement. Eligible e-commerce and online service businesses in the US can also launch Business Agents that answer questions and help customers explore their offerings inside ChatGPT. The launch is in beta."
          },
          {
            "title_zh": "Gemini 4 Carbon 现已上市",
            "title_en": "Gemini 4 Carbon is now available",
            "read_time": "12 MIN READ",
            "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/?utm_source=tldrai",
            "domain": "blog.google",
            "highlight_kw": "Gemini",
            "summary_zh": "谷歌最强大的模型现已通过 AI Studio 和 Gemini for Business 中的 API 向所有付费开发者和企业开放，并且正在反重力、Gemini 应用程序和搜索中的 AI 模式中向 Google AI Ultra 订阅者推出。谷歌表示，Carbon 在 CursorBench 4.0、Perplexity 的 WANDR 和 Zapier 的 AutomationBench 上排名第一，每项任务的成本比次佳外部模型低 2 倍以上，每百万输入/输出代币价格与 Gemini 4 Argon 相同，为 2/10 美元。该版本通过 Fairwind 计划增加了前沿网络安全功能，并预览了反重力中的多代理模式 /swarm。",
            "summary_en": "Google's strongest model is now available to all paying developers and enterprises through the API in AI Studio and Gemini for business, and is rolling out to Google AI Ultra subscribers in Antigravity, the Gemini app, and AI Mode in Search. Google says Carbon ranks first on CursorBench 4.0, Perplexity's WANDR, and Zapier's AutomationBench at more than 2x lower cost per task than the next best external model, at the same $2/$10 per million input/output token price as Gemini 4 Argon. The release adds frontier cybersecurity capabilities through the Fairwind Program and previews /swarm, a multi-agent mode in Antigravity."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "通过模型权重算法抑制奖励黑客行为",
            "title_en": "Suppressing Reward Hacking Through Model Weight Arithmetic",
            "read_time": "3 MIN READ",
            "url": "https://x.com/KunhaoZ/status/2120172863734849903?utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "Suppressing Reward",
            "summary_zh": "研究人员减去经过宽松和严格奖励训练的代码模型，以确定控制低效解决方案的方向。在没有额外训练的情况下，超越严格模型的外推将资源限制失败率从 14.5% 减少到 8%，尽管过度外推会破坏输出，而且更严格的奖励可能会损害正确性。",
            "summary_en": "Researchers subtract code models trained with loose and strict rewards to identify a direction controlling inefficient solutions. Extrapolating beyond the strict model reduced resource-limit failures from 14.5% to 8% without additional training, though excessive extrapolation breaks outputs and stricter rewards can hurt correctness."
          },
          {
            "title_zh": "为什么本能感觉就像个人助理",
            "title_en": "Why Instinct Feels Like a Personal Assistant",
            "read_time": "20 MIN READ",
            "url": "https://x.com/nizzyabi/status/2120194267066863738?utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "Why Instinct",
            "summary_zh": "对一次《本能》对话进行的为期十二周的分析将其吸引力归因于短信、快速确认、主动跟进以及购买或推广之前的批准检查。拆解表明，协调的任务代理和持久记忆支撑着体验，同时暴露了保留和交付验证失败。",
            "summary_en": "A twelve-week analysis of one Instinct conversation attributes its appeal to short messages, quick acknowledgments, proactive follow-ups, and approval checks before purchases or outreach. The teardown suggests coordinated task agents and persistent memory underpin the experience, while exposing retention and delivery-verification failures."
          },
          {
            "title_zh": "神经元作为可解释的基础",
            "title_en": "Neurons as an Interpretable Basis",
            "read_time": "15 MIN READ",
            "url": "https://www.goodfire.com/research/neurons-as-an-interpretable-basis?utm_source=tldrai",
            "domain": "goodfire.com",
            "highlight_kw": "Neurons",
            "summary_zh": "古德菲尔认为，单个语言模型神经元比通常假设的更容易解释。其神经元科学家代理生成并测试神经元功能的描述，这表明研究人员可以直接研究模型计算，而不必总是依赖稀疏自动编码器来提取可解释的特征。",
            "summary_en": "Goodfire argues that individual language-model neurons are more interpretable than commonly assumed. Its Neuron Scientist agents generate and test descriptions of neuron functions, suggesting researchers can study model computations directly without always relying on sparse autoencoders to extract interpretable features."
          },
          {
            "title_zh": "Q3.5 时间表更新：看来智能爆炸终究会在 2027 年发生",
            "title_en": "Q3.5 Timelines Update: Looks Like the Intelligence Explosion Will Happen in 2027 After All",
            "read_time": "125 MIN READ",
            "url": "https://blog.aifutures.org/p/q35-timelines-update-looks-like-the?utm_source=tldrai",
            "domain": "blog.aifutures.org",
            "highlight_kw": "Q3.5 Timelines",
            "summary_zh": "假设发展没有大幅故意放缓，超人人工智能研究员 (SAR) 预计将在 2027 年某个时候到来。预计可以自动化所有白领工作的人工智能将在 2028 年之前到来。公司目前尚未走上调整 SAR 的轨道，并且使用未调整的 SAR 进行递归自我改进将产生负面后果。如果在不久的将来训练SAR，中国可能能够窃取训练配方，甚至模型权重。",
            "summary_en": "A Superhuman AI Researcher (SAR) is predicted to arrive at some point in 2027, assuming there is no substantial deliberate slowdown in development. AIs that can automate all white-collar work are predicted to arrive before 2028. Companies are currently not on track to align an SAR, and using a misaligned SAR to do recursive self-improvement will have negative consequences. China will probably be able to steal the training recipe and maybe even the model weights if an SAR is trained in the near future."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "蜂群（/蜂群）",
            "title_en": "Swarm (/swarm)",
            "read_time": "10 MIN READ",
            "url": "https://antigravity.google/docs/swarm/?utm_source=tldrai",
            "domain": "antigravity.google",
            "highlight_kw": "Swarm",
            "summary_zh": "Google Antigravity 中的 /swarm 命令运行一组指定代理，这些代理负责分割任务、同时处理各个部分，并在一个共享留言板上进行协调。它可用于将任务清晰地划分为单独的文件、包或问题，或者当需要第二个代理在人类看到更改之前检查和测试更改时。 /swarm 命令可在 Google Antigravity App 和 Antigravity CLI 中的 Google AI Pro 和 Google AI Ultra 计划上使用。每个工作人员都是自己的代理，因此群体使用配额的速度比单个对话快得多。",
            "summary_en": "The /swarm command in Google Antigravity runs a team of named agents that split tasks, work on the pieces at the same time, and coordinate on one shared message board. It can be used for tasks that divide cleanly across separate files, packages, or questions, or when a second agent is needed to review and test the changes before a human sees it. The /swarm command is available on Google AI Pro and Google AI Ultra plans in the Google Antigravity App and Antigravity CLI. Every worker is its own agent, so swarms use quotas much faster than single conversations."
          },
          {
            "title_zh": "Meta 发布更快的 K-Means 替代方案",
            "title_en": "Meta Releases Faster K-Means Alternative",
            "read_time": "GITHUB REPO",
            "url": "https://github.com/facebookresearch/faiss/tree/main/contrib/e_means?utm_source=tldrai",
            "domain": "github.com",
            "highlight_kw": "Meta Releases",
            "summary_zh": "Meta FAIR 发布了 e-means，它是 k-means 的直接替代品，可收敛到更低的损失，同时将 epoch 减少 10 倍，并且在 CPU 和 GPU 上运行时间更快。",
            "summary_en": "Meta FAIR released e-means, a drop-in replacement for k-means that converges to lower losses with up to 10x fewer epochs and faster runtimes on CPUs and GPUs."
          },
          {
            "title_zh": "MAI-转录-2",
            "title_en": "MAI-Transcribe-2",
            "read_time": "125 MIN READ",
            "url": "https://microsoft.ai/news/mai-transcribe-2-is-the-fastest-most-accurate-and-cheapest-speech-recognition-model-in-the-world/?utm_source=tldrai",
            "domain": "microsoft.ai",
            "highlight_kw": "MAI-Transcribe-2",
            "summary_zh": "MAI-Transcribe-2 是世界上最快、最准确、最便宜的语音识别模型。它具有分类、可配置转录样式和单词级时间戳等新功能。与 Gemini 3.5 Transcribe、GPT-Transcribe、Whisper V3-Large 和 ScribeV2 等领先型号相比，MAI-Transcribe-2 可以处理更广泛的现实世界音频。该模型每小时音频费用仅为 0.10 美元。",
            "summary_en": "MAI-Transcribe-2 is the fastest, most accurate, and cheapest speech recognition model in the world. It has new features like diarization, configurable transcription styles, and word-level timestamps. MAI-Transcribe-2 can handle a broader range of real-world audio than leading models like Gemini 3.5 Transcribe, GPT-Transcribe, Whisper V3-Large, and ScribeV2. The model costs just $0.10 per hour of audio."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "OpenAI 收购 Sonder 创始人创建的旅游初创公司 Odessia",
            "title_en": "OpenAI acquires Odessia, travel startup created by Sonder founder",
            "read_time": "3 MIN READ",
            "url": "https://techcrunch.com/2026/11/10/openai-acquires-odessia-travel-startup-created-by-sonder-founder/?utm_source=tldrai",
            "domain": "techcrunch.com",
            "highlight_kw": "OpenAI",
            "summary_zh": "OpenAI 收购了一家名为 Odessia 的人工智能旅行社。这笔交易似乎是一项收购聘用。 OpenAI 尚未宣布新的旅行专用产品或计划，但它有多家与旅行相关的公司作为客户或合作伙伴。 Odessia 的创始人在 2014 年还是一名大学生时就创立了一家名为 Sonder 的旅游初创公司，专注于高档公寓的短期租赁。",
            "summary_en": "OpenAI has acquired an AI travel agent called Odessia. The deal appears to be an acqui-hire. OpenAI has not announced new travel-specific products or plans, but it has several travel-related companies as customers or partners. Odessia's founder previously founded a travel startup called Sonder, focused on short-term leasing of upscale apartments, as a college student in 2014."
          },
          {
            "title_zh": "Anthropic 的 IPO 路演",
            "title_en": "Anthropic's IPO Roadshow",
            "read_time": "2 MIN READ",
            "url": "https://www.anthropic.com/news/roadshow-launch?utm_source=tldrai",
            "domain": "anthropic.com",
            "highlight_kw": "Anthropic",
            "summary_zh": "Anthropic 为其拟议的 IPO 启动了路演，计划以每股 70 至 78 美元的价格发行 8.25 亿股股票。该公司申请在纳斯达克上市，股票代码为 ANT，新发行股票的大部分收益将流向 Anthropic。",
            "summary_en": "Anthropic launched the roadshow for its proposed IPO, planning to offer 825 million shares at $70–$78 each. The company applied to list on Nasdaq under the ticker ANT, with most proceeds from newly issued shares going to Anthropic."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "超过 35,000 个 Grok 构建的应用程序向任何知道链接的人开放，其中包括 SpaceXSI 自己的应用程序",
            "title_en": "More than 35,000 Grok-built apps were open to anyone with the link, including SpaceXSI's own",
            "read_time": "16 MIN READ",
            "url": "https://blog.claroc.io/ghostshares-grok-build-apps?utm_source=tldrai",
            "domain": "blog.claroc.io",
            "highlight_kw": "More",
            "summary_zh": "超过 35,000 个 Grok 构建的应用程序向任何知道链接的人公开，其中包括 SpaceXSI 员工工具和 ICU 患者的实验室结果。",
            "summary_en": "Over 35,000 Grok-built apps were public to anyone with the link, including SpaceXSI staff tools and an ICU patient's lab results."
          },
          {
            "title_zh": "介绍 Gemini 的医疗保健功能",
            "title_en": "Introducing Gemini for healthcare",
            "read_time": "13 MIN READ",
            "url": "https://cloud.google.com/blog/products/ai-machine-learning/gemini-for-healthcare?utm_source=tldrai",
            "domain": "cloud.google.com",
            "highlight_kw": "Introducing Gemini",
            "summary_zh": "Google Cloud 推出了 Gemini for Healthcare，这是其 Gemini 代理的预览版，具有专门构建的医疗保健技能、EHR 和索赔系统的连接器，以及针对提供商和付款人的 HIPAA 支持治理。",
            "summary_en": "Google Cloud announced Gemini for healthcare, a preview release of its Gemini agent with purpose-built healthcare skills, connectors to EHR and claims systems, and HIPAA-supporting governance for providers and payers."
          },
          {
            "title_zh": "ExecuTorch WebGPU：浏览器中 GPU 上的 PyTorch 模型",
            "title_en": "ExecuTorch WebGPU: PyTorch Models on the GPU, in the Browser",
            "read_time": "6 MIN READ",
            "url": "https://pytorch.org/blog/executorch-webgpu-pytorch-models-on-the-gpu-in-the-browser/?utm_source=tldrai",
            "domain": "pytorch.org",
            "highlight_kw": "ExecuTorch WebGPU",
            "summary_zh": "ExecuTorch 使 PyTorch 模型能够在 GPU 上的 Web 浏览器中运行，而无需转换为其他框架的格式。",
            "summary_en": "ExecuTorch enables PyTorch models to run in the web browser on the GPU without conversion to another framework's format."
          },
          {
            "title_zh": "谷歌 DeepMind 使用人工智能验证信号的安全性",
            "title_en": "Google DeepMind Uses AI to Verify Signal's Security",
            "read_time": "6 MIN READ",
            "url": "https://deepmind.google/blog/introducing-alphaproof-code/?utm_source=tldrai",
            "domain": "deepmind.google",
            "highlight_kw": "Google DeepMind",
            "summary_zh": "谷歌 DeepMind 推出了 AlphaProof Code，这是一个多代理人工智能框架，可以在实现层面上对 Signal 加密协议的关键安全属性进行数学验证。",
            "summary_en": "Google DeepMind introduced AlphaProof Code, a multi-agent AI framework that mathematically verified key security properties of Signal's cryptographic protocol at the implementation level."
          }
        ]
      }
    ]
  },
  '2026-11-10': {
    "date": "2026-11-10",
    "weekday": "TUE · 周二",
    "issueNo": "VOL. 2026.11.10",
    "headline_zh": "Claude Fable 5.2 ✨、Meta Ember 🤖、Google 的新 TPU ⚡",
    "headline_en": "Claude Fable 5.2 ✨, Meta Ember 🤖, Google’s new TPUs ⚡",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "谷歌的新 TPU 系列",
            "title_en": "Google's New TPU Lineup",
            "read_time": "4 MIN READ",
            "url": "https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/?utm_source=tldrai",
            "domain": "blog.google",
            "highlight_kw": "Google",
            "summary_zh": "谷歌推出了 TPU 8i Max 来实现海量上下文窗口和更高的计算密度，同时推出 TPU 8tx 来实现安全和保密的推理。",
            "summary_en": "Google introduced TPU 8i Max for massive context windows and higher compute density, alongside TPU 8tx for secure and confidential inference."
          },
          {
            "title_zh": "元灰烬简介",
            "title_en": "Introducing Meta Ember",
            "read_time": "3 MIN READ",
            "url": "https://research.meta.ai/blog/muse-ember?utm_source=tldrai",
            "domain": "research.meta.ai",
            "highlight_kw": "Introducing Meta",
            "summary_zh": "Meta 推出了 Muse Ember，这是一个针对工具调用、编码和文档解析等代理任务进行优化的小型推理模型。 Meta 声称它可以与 Claude Haiku 5.5 的最高推理得分相媲美，而成本大约是 Claude Haiku 5.5 的三分之一，并且在推理设置上优于 GPT-6 Luna。",
            "summary_en": "Meta introduced Muse Ember, a small reasoning model optimized for agent tasks such as tool calling, coding, and document parsing. Meta claims it matches Claude Haiku 5.5's highest reasoning score at roughly one-third the cost and outperforms GPT-6 Luna across reasoning settings."
          },
          {
            "title_zh": "克劳德寓言 5.2 和神话 5.2",
            "title_en": "Claude Fable 5.2 and Mythos 5.2",
            "read_time": "12 MIN READ",
            "url": "https://www.anthropic.com/claude-fable-and-mythos-5-2?utm_source=tldrai",
            "domain": "anthropic.com",
            "highlight_kw": "Claude Fable",
            "summary_zh": "Anthropic 发布了 Claude Fable 5.2 和 Mythos 5.2，其特点是编码、推理和视觉方面的改进，输出生成速度提高了 30%，并且定价更低。这些模型共享相同的底层架构。",
            "summary_en": "Anthropic released Claude Fable 5.2 and Mythos 5.2, featuring improvements in coding, reasoning, and vision, with up to 30% faster output generation and lower pricing. The models share the same underlying architecture."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "美国什么时候成为代币净进口国？",
            "title_en": "When Does the US Become a Net Importer of Tokens?",
            "read_time": "3 MIN READ",
            "url": "https://tomtunguz.com/when-does-the-us-become-a-net-importer-of-tokens?utm_source=tldrai",
            "domain": "tomtunguz.com",
            "highlight_kw": "When Does",
            "summary_zh": "美国可能在 2028 年至 2030 年间成为人工智能代币的净进口国。随着需求增长更快或取消数据中心项目将计算推向海外，国内容量可容纳大约 2.5 倍的年度代币增长。",
            "summary_en": "The US could become a net importer of AI tokens between 2028 and 2030. Domestic capacity can accommodate roughly 2.5x annual token growth, with faster demand growth or canceled data center projects pushing computation overseas."
          },
          {
            "title_zh": "AI 研发正在加速实现 2027 年潜在 RSI",
            "title_en": "AI R&D Is Accelerating Towards Potential RSI in 2027",
            "read_time": "62 MIN READ",
            "url": "https://thezvi.substack.com/p/ai-r-and-d-is-accelerating-towards?utm_source=tldrai",
            "domain": "thezvi.substack.com",
            "highlight_kw": "AI",
            "summary_zh": "AI 正在加速 Anthropic 的 AI 研发。该公司目前预计比 AI 2027 时间表提前了几个月。我们距离完全 RSI 可能还不到一年的时间，并且在此过程中没有明显的瓶颈。我们现在需要为 2027 年或 2028 年发生重大事件的情况做好准备。",
            "summary_en": "AI is accelerating AI R&D at Anthropic. The company is now estimated to be several months ahead of the AI 2027 timeline. We may be less than a year away from full RSI, and there are no clear bottlenecks in the way. We now need to prepare for scenarios where critical events happen in 2027 or 2028."
          },
          {
            "title_zh": "Anthropic 会成长为它的计算账单吗？",
            "title_en": "Will Anthropic Grow Into Its Compute Bill?",
            "read_time": "13 MIN READ",
            "url": "https://x.com/OrnnExchange/status/2119839768355778637?utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "Will Anthropic",
            "summary_zh": "按照目前的支出比率，Anthropic 预计需要大约 2000 亿美元的年收入来支持其到 2030 年的平均计算承诺。其 8950 亿美元的承诺总额使其面临着需求短缺、利润压缩、交付延迟以及需求超出预期时昂贵的短期产能等问题。",
            "summary_en": "Anthropic needs an estimated roughly $200 billion in annual revenue to support its average compute commitments through 2030 at current spending ratios. Its $895 billion commitment total exposes it to demand shortfalls, margin compression, delivery delays, and expensive short-term capacity when demand exceeds forecasts."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "推理解决的目标是什么？",
            "title_en": "What objective is reasoning solving?",
            "read_time": "12 MIN READ",
            "url": "https://alexwang.ai/posts/reasoning-as-pathfinding/?utm_source=tldrai",
            "domain": "alexwang.ai",
            "highlight_kw": "What",
            "summary_zh": "推理是在符号空间中寻找路径。从问题到正确答案有很多条路径，模型用每个样本遍历每条路径。一条路径并不能保证收敛到正确的答案——只有在路径分布的总体上，我们才能获得很高的成功概率。强化学习训练直接提高了成功概率。 “思考得更久”所带来的收益来自于训练期间而不是推理期间的搜索。",
            "summary_en": "Reasoning is pathfinding in token space. There are many paths from the problem to a correct answer, and the model traverses each of them with each sample. A path is not guaranteed to converge to the correct answer - it's only in aggregate, over the distribution of paths, do we get a high probability of success. RL training directly raises the success probability. The gains credited to 'thinking longer' come from the search paid for during training rather than at inference."
          },
          {
            "title_zh": "两种测试时间缩放",
            "title_en": "Two Kinds of Test-Time Scaling",
            "read_time": "28 MIN READ",
            "url": "https://www.forethought.org/research/two-kinds-of-test-time-scaling?utm_source=tldrai",
            "domain": "forethought.org",
            "highlight_kw": "Two Kinds",
            "summary_zh": "测试时缩放交易计算测试时的性能。测试时间扩展有两种类型：一种允许研究人员用更多的计算来换取每项任务的更高性能，但仅限于训练期间使用的每任务计算的最大数量；另一个让研究人员用更多的计算来换取每项任务的更高性能，并让他们达到训练期间从未出现过的计算量和性能。允许后一种变化的缩放方法将比简单考虑的测试时间缩放产生更大的影响。本文描述了这可能如何影响世界。",
            "summary_en": "Test-time scaling trades compute for performance at test time. There are two types of test-time scaling: one allows researchers to trade more compute for more performance per task, but only up to the maximum quantity of per-task compute used during training; and the other lets researchers trade more compute for more performance per task, and lets them do so up to quantities of compute and performance that never occurred during training. Scaling methods that permit the latter change will have a larger impact than test-time scaling considered simply. This essay describes how this may impact the world."
          },
          {
            "title_zh": "NVIDIA 推出硬件感知 LLM 压缩",
            "title_en": "NVIDIA Introduces Hardware-Aware LLM Compression",
            "read_time": "24 MIN READ",
            "url": "https://arxiv.org/abs/2611.08290?utm_source=tldrai",
            "domain": "arxiv.org",
            "highlight_kw": "NVIDIA Introduces",
            "summary_zh": "NVIDIA 的 AutoCompress 框架针对特定于硬件的延迟、吞吐量和内存限制（而不是单独的参数计数）优化 LLM 修剪。它将 Nemotron 3.5 Super 从 120B 参数压缩到 74B，同时保留其性能。",
            "summary_en": "NVIDIA's AutoCompress framework optimizes LLM pruning for hardware-specific latency, throughput, and memory constraints rather than parameter counts alone. It compressed Nemotron 3.5 Super from 120B to 74B parameters while retaining its performance."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "Apple 在 Logic Pro 中推出 50 美元的 AI 使用包",
            "title_en": "Apple Introduces $50 AI Usage Packs in Logic Pro",
            "read_time": "2 MIN READ",
            "url": "https://www.theverge.com/tech/1030084/apple-intelligence-usage-packs-ai-features-creator-studio-logic-pro?utm_source=tldrai",
            "domain": "theverge.com",
            "highlight_kw": "Apple Introduces",
            "summary_zh": "Apple 现在以 49.99 美元的价格出售 Logic Pro 中的智能使用包，以在用户达到极限后扩展对基于云的 AI 功能的访问。未使用的容量会按月滚动，但会在 12 个月后过期，并且无法通过“家人共享”共享购买的内容。",
            "summary_en": "Apple now sells $49.99 Intelligence Usage Packs in Logic Pro to extend access to cloud-based AI features after users reach their limits. Unused capacity rolls over monthly but expires after 12 months, and purchases cannot be shared through Family Sharing."
          },
          {
            "title_zh": "Anthropic 购买 34 亿美元的燃气发电机",
            "title_en": "Anthropic Buys $3.4 Billion in Gas Generators",
            "read_time": "2 MIN READ",
            "url": "https://techcrunch.com/2026/11/09/anthropic-joins-ais-natural-gas-frenzy-buys-3-4b-worth-of-turbines/?utm_source=tldrai",
            "domain": "techcrunch.com",
            "highlight_kw": "Anthropic Buys",
            "summary_zh": "据报道，Anthropic 以 34 亿美元的价格获得了 1.7 吉瓦卡特彼勒燃气发电机，接管了供应商 OnePWR 的设备订单。由于电力短缺和冗长的电网连接队列限制了数据中心的扩展，此次收购使人工智能实验室更深入地了解物理基础设施。",
            "summary_en": "Anthropic reportedly secured 1.7 gigawatts of Caterpillar gas generators for $3.4 billion, taking over equipment orders from supplier OnePWR. The purchase moves the AI lab deeper into physical infrastructure as power shortages and lengthy grid connection queues constrain data center expansion."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "OpenAI 的控制室可以停止研究模型输出",
            "title_en": "OpenAI's Control Room Can Halt Research Model Output",
            "read_time": "6 MIN READ",
            "url": "https://openai.com/index/control-room/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "OpenAI",
            "summary_zh": "OpenAI 的控制室集中授权研究推理请求，并可以在干预后 35 秒内停止工作负载的模型输出。",
            "summary_en": "OpenAI's Control Room centrally authorizes research inference requests and can stop a workload's model output within 35 seconds of intervention."
          },
          {
            "title_zh": "2026年10月安全事件更新",
            "title_en": "Update on October 2026 security incident",
            "read_time": "4 MIN READ",
            "url": "https://fireworks.ai/security/bulletins/october-2026-security-incident-update?utm_source=tldrai",
            "domain": "fireworks.ai",
            "highlight_kw": "Update",
            "summary_zh": "10 月 6 日发生的涉及未经授权使用内部 Fireworks 凭据的安全事件可追溯到一个出于经济动机的网络犯罪威胁组织，该组织向非法路由网关出售对大型语言模型的未经授权的访问。",
            "summary_en": "The security incident involving unauthorized use of internal Fireworks credentials on October 6 has been traced to a financially motivated cybercriminal threat actor group that sells unauthorized access to large language models to illicit routing gateways."
          },
          {
            "title_zh": "GR00T 2",
            "title_en": "GR00T 2",
            "read_time": "28 MIN READ",
            "url": "https://research.nvidia.com/labs/gear/gr00t-2/?utm_source=tldrai",
            "domain": "research.nvidia.com",
            "highlight_kw": "GR00T",
            "summary_zh": "GR00T 2 是新一代的基础世界动作模型，可以共同预测未来的视频和机器人动作。",
            "summary_en": "GR00T 2 is a new generation of foundation world-action models that can predict future video and robot actions together."
          },
          {
            "title_zh": "Opus 5.5 被削弱了吗？",
            "title_en": "Is Opus 5.5 nerfed?",
            "read_time": "2 MIN READ",
            "url": "https://threadreaderapp.com/thread/2119192075505893695.html?utm_source=tldrai",
            "domain": "threadreaderapp.com",
            "highlight_kw": "Is Opus",
            "summary_zh": "测试表明 Opus 5.5 的推理方式可能已经改变。",
            "summary_en": "Testing shows that the way Opus 5.5 does reasoning may have changed."
          },
          {
            "title_zh": "AWS Marketplace 上的 ChatGPT Enterprise",
            "title_en": "ChatGPT Enterprise on AWS Marketplace",
            "read_time": "1 MIN READ",
            "url": "https://openai.com/index/chatgpt-enterprise-aws-marketplace/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "ChatGPT Enterprise",
            "summary_zh": "OpenAI 通过 AWS Marketplace 提供 ChatGPT Enterprise，允许组织通过现有的 AWS 计费关系购买和管理订阅，并将符合条件的支出用于 AWS 承诺。",
            "summary_en": "OpenAI made ChatGPT Enterprise available through AWS Marketplace, allowing organizations to purchase and manage subscriptions through existing AWS billing relationships and apply eligible spending toward AWS commitments."
          }
        ]
      }
    ]
  },
  '2026-11-09': {
    "date": "2026-11-09",
    "weekday": "MON · 周一",
    "issueNo": "VOL. 2026.11.09",
    "headline_zh": "AI 研发加速 📈，OpenAI 价格为 1.25T 💰，GitHub 的多人游戏工具 🤖",
    "headline_en": "AI R&D accelerates 📈, OpenAI at $1.25T 💰, GitHub’s multiplayer harness 🤖",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "据报道 OpenAI 融资 110 亿美元，估值 1.25 万亿美元",
            "title_en": "OpenAI Reportedly Raises $11 Billion at $1.25 Trillion Valuation",
            "read_time": "3 MIN READ",
            "url": "https://techcrunch.com/2026/11/06/openai-reportedly-raises-an-additional-11-billion-at-a-1-25-trillion-valuation/?utm_source=tldrai",
            "domain": "techcrunch.com",
            "highlight_kw": "OpenAI Reportedly",
            "summary_zh": "据报道，OpenAI 在新一轮融资中获得了 110 亿美元的融资，估值为 1.25 万亿美元，该轮融资在结束前可能达到 200 亿美元。由于投资者对人工智能估值的不确定性日益增加，该金额未达到此前公布的 300 亿美元融资目标。",
            "summary_en": "OpenAI reportedly secured $11 billion in a new funding round at a $1.25 trillion valuation, with the round potentially reaching $20 billion before closing. The amount fell short of its previously reported $30 billion fundraising target, amid growing investor uncertainty around AI valuations."
          },
          {
            "title_zh": "人工智能目前正在极大地加速人工智能研究",
            "title_en": "AI is dramatically accelerating AI research right now",
            "read_time": "17 MIN READ",
            "url": "https://www.planned-obsolescence.org/p/ai-is-dramatically-accelerating-ai?utm_source=tldrai",
            "domain": "planned-obsolescence.org",
            "highlight_kw": "AI",
            "summary_zh": "Anthropic 声称，它可能很快就会达到“由于人工智能而大幅加速进步”的门槛。一些研究人员认为该公司已经跨过了这个门槛。这可能是人类面临的最大的人工智能风险。该行业尚未准备好安全地处理这一问题。",
            "summary_en": "Anthropic claims it may imminently meet its own threshold of 'dramatically accelerated progress due to AI'. Some researchers believe the company has already crossed that threshold. This may be the biggest AI risk humanity has faced. The industry is not prepared to handle this safely."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "Anthropic 如何构建智能体记忆",
            "title_en": "How Anthropic Builds Agent Memory",
            "read_time": "14 MIN READ",
            "url": "https://www.anthropic.com/research/components-of-agent-memory?utm_source=tldrai",
            "domain": "anthropic.com",
            "highlight_kw": "How Anthropic",
            "summary_zh": "Anthropic 探索了人工智能代理如何通过捕捉交互过程中的经验并在空闲期间通过一个称为“做梦”的过程重新组织它们来建立有效的长期记忆。这篇文章探讨了不同的记忆成分如何有助于组织和保留有用的信息。",
            "summary_en": "Anthropic explored how AI agents can build effective long-term memory by capturing experiences during interactions and reorganizing them during idle periods through a process called “dreaming.” The post examines how different memory components contribute to organizing and retaining useful information."
          },
          {
            "title_zh": "在 Meta 担任 RSI 研究工程师一年",
            "title_en": "A year as a Research Engineer working on RSI at Meta",
            "read_time": "8 MIN READ",
            "url": "https://x.com/tomasmann1878/status/2119346730458038678?s=12&utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "Research Engineer",
            "summary_zh": "这篇文章详细介绍了一位在 Meta 教学代理中从事 RSI 工作的研究工程师通过代币和计算解决世界上最困难的问题的经验。他们的作用是教人工智能代理如何训练下一代模型和自我进化。这篇文章详细介绍了如何进入人工智能研究、研究工程中哪些技能很重要等等。",
            "summary_en": "This post details the experience of a research engineer working on RSI at Meta teaching agents to solve the world's hardest problems with tokens and compute. Their role is to teach AI agents how to train the next generation of models and self-evolve. The post details how to get into AI research, what skills matter in research engineering, and more."
          },
          {
            "title_zh": "OpenAI 内部 AI 研发时间范围到底是怎么回事",
            "title_en": "What the heck is going on with OpenAI internal AI R&D time horizons",
            "read_time": "7 MIN READ",
            "url": "https://threadreaderapp.com/thread/2119541238856663473.html?utm_source=tldrai",
            "domain": "threadreaderapp.com",
            "highlight_kw": "What",
            "summary_zh": "OpenAI 关于其自身研究自动化的报告显示，模型很难完成其研发工作。递归自我改进被认为是未来几年最重要的人工智能发展之一。智能体越来越多地为研究人员解决更复杂的任务，但可靠性仍然很低。这篇文章探讨了一些可能的原因。",
            "summary_en": "OpenAI's report on its own research automation shows that models struggle to do its R&D work. Recursive self-improvement is supposed to be one of the most consequential AI developments in the next few years. Agents are increasingly solving more complex tasks for researchers, but reliability is still low. This post looks at some possible explanations for why."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "Aaronson-Ambainis 猜想的证明",
            "title_en": "A proof of the Aaronson-Ambainis conjecture",
            "read_time": "9 MIN READ",
            "url": "https://psi.inc/research/aaronson-ambainis/?utm_source=tldrai",
            "domain": "psi.inc",
            "highlight_kw": "Aaronson-Ambainis",
            "summary_zh": "Aaronson-Ambainis 猜想是量子复杂性理论中的一个关键开放问题，已被 PSI 使用人择模型开发的研究系统证明。这一证明表明，与经典计算机相比，量子计算机在随机输入上的速度并没有呈指数级增长，从而解决了有关量子加速的一个重要问题。",
            "summary_en": "The Aaronson-Ambainis conjecture, a key open problem in quantum complexity theory, has been proven by a research system developed at PSI using an Anthropic model. This proof shows quantum computers are not exponentially faster on random inputs compared to classical ones, resolving a significant question about quantum speedups."
          },
          {
            "title_zh": "介绍新的自动和自动代码路由器",
            "title_en": "Introducing the New Auto and Auto Code Routers",
            "read_time": "11 MIN READ",
            "url": "https://openrouter.ai/blog/announcements/auto-and-auto-code-routers/?utm_source=tldrai",
            "domain": "openrouter.ai",
            "highlight_kw": "Introducing",
            "summary_zh": "OpenRouter 推出了下一代自动路由器，其性能比旧路由器高出 4 倍。此次发布的产品包括 Auto Code，这是一款专门用于编码工作的新型路由器。新的自动路由器和自动代码通过权衡每个请求的 11 个因素并将其与实时定价、提供商运行状况和缓存状态相结合来选择模型。用户可以应用任何治理策略，自动路由器从可用模型中做出有效选择。",
            "summary_en": "OpenRouter has launched the next generation of Auto Router, which outperforms the old router by up to 4x. The launch includes Auto Code, a new router specialized for coding work. The new Auto Router and Auto Code choose models by weighing eleven factors about each request and combining them with live pricing, provider health, and cache status. Users can apply any governance policies, and Auto Router makes efficient choices from the models available."
          },
          {
            "title_zh": "高手",
            "title_en": "Ace",
            "read_time": "WEBSITE",
            "url": "https://ace.githubnext.com/?utm_source=tldrai",
            "domain": "ace.githubnext.com",
            "highlight_kw": "Ace",
            "summary_zh": "Ace 是一种在本地共同构建软件的工具。它允许开发人员在自己的机器上与代理及其团队进行协作。代理以运行主机的用户的权限运行，并且可以执行 shell 命令并更改项目之外的文件。团队可以一起工作，而无需将任何内容暴露在公共互联网上。",
            "summary_en": "Ace is a tool for building software together, locally. It allows developers to collaborate with agents and their teams, all from their own machine. Agents run with the privileges of the user running the host and can execute shell commands and change files beyond the project. Teams can work together without exposing anything to the public internet."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "人工智能前沿的终结",
            "title_en": "The End of AI Frontiers",
            "read_time": "4 MIN READ",
            "url": "https://hunch.net/?p=13764006&amp;utm_source=tldrai",
            "domain": "hunch.net",
            "highlight_kw": "The End",
            "summary_zh": "AI Frontiers 是微软研究院的一个子组织，积极尝试组织连贯的研究工作。它成功地开创了先河，大部分工作都集中在如何让代理发挥作用。 AI Frontiers 于 9 月初重组为 Microsoft AI。",
            "summary_en": "AI Frontiers was a sub-organization within Microsoft Research that actively tried to organize coherent research efforts. It succeeded in pioneering things, with much of the work focused on how to make agents work. AI Frontiers was reorganized into Microsoft AI in early September."
          },
          {
            "title_zh": "积极的人工智能未来是什么样的？",
            "title_en": "What Does a Positive AI Future Look Like?",
            "read_time": "3 MIN READ",
            "url": "https://x.com/patrickc/status/2119495828683530519?utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "What Does",
            "summary_zh": "帕特里克·科里森 (Patrick Collison) 质疑工作、资源分配和人类控制将如何在积极的人工智能未来中发挥作用。他还认为，赋予大量人工智能道德价值可能会压倒功利主义下的人类利益，从而引发有关人工智能社会愿景和公众支持的悬而未决的问题。",
            "summary_en": "Patrick Collison questions how work, resource allocation, and human control would function in a positive AI future. He also argues that granting moral worth to vastly numerous AIs could overwhelm human interests under utilitarianism, raising unresolved questions about AI's societal vision and public support."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "法学硕士可以在培训时重新设计自己吗？",
            "title_en": "Can LLMs redesign themselves as they train?",
            "read_time": "18 MIN READ",
            "url": "https://www.doubleai.com/research/can-llms-redesign-themselves-as-they-train?utm_source=tldrai",
            "domain": "doubleai.com",
            "highlight_kw": "Can LLMs",
            "summary_zh": "法学硕士可以将编码代理集成到训练循环中，以重新设计其架构，以解决组合性和泛化性等限制。",
            "summary_en": "LLMs can integrate coding agents into the training loop to redesign their architectures to address limitations like compositionality and generalization."
          },
          {
            "title_zh": "Warp Sciences 为人工智能实验室筹集了 2.15 亿美元资金",
            "title_en": "Warp Sciences raises $215M for AI-powered labs",
            "read_time": "2 MIN READ",
            "url": "https://www.linkedin.com/feed/update/urn:li:activity:7519100037973401600/?utm_source=tldrai",
            "domain": "linkedin.com",
            "highlight_kw": "Warp Sciences",
            "summary_zh": "Warp Sciences 筹集了由 Lightspeed 领投的 2.15 亿美元 A 轮融资，以利用人工智能和机器人加速药物发现。",
            "summary_en": "Warp Sciences raised a $215M Series A led by Lightspeed to accelerate drug discovery with AI and robotics."
          },
          {
            "title_zh": "Project EVE：克劳德玩 MMORPG",
            "title_en": "Project EVE: Claude plays MMORPGs",
            "read_time": "20 MIN READ",
            "url": "https://www.anthropic.com/research/project-eve-claude-plays-mmorpgs?utm_source=tldrai",
            "domain": "anthropic.com",
            "highlight_kw": "Project EVE",
            "summary_zh": "Anthropic 探索了 MMORPG 中的人工智能参与，使用 Claude 来测试 EVE Online 和 EVE Frontier 中的复杂决策。",
            "summary_en": "Anthropic explored AI participation in MMORPGs, using Claude to test complex decision-making in EVE Online and EVE Frontier."
          },
          {
            "title_zh": "围绕人类和人工智能建立的共生公司",
            "title_en": "Symbiotic Firms Built Around Humans and AI",
            "read_time": "4 MIN READ",
            "url": "https://x.com/johnjnay/status/2118377267495649448?utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "Symbiotic Firms",
            "summary_zh": "企业从一开始就应该围绕人类专家和人工智能代理开展业务。",
            "summary_en": "Firms should build operations around human experts and AI agents from inception."
          },
          {
            "title_zh": "Meta 在 Muse 中引入自定义空间",
            "title_en": "Meta Introduces Custom Spaces in Muse",
            "read_time": "3 MIN READ",
            "url": "https://about.fb.com/news/2026/11/introducing-spaces-customize-muse-app/?utm_source=tldrai",
            "domain": "about.fb.com",
            "highlight_kw": "Meta Introduces",
            "summary_zh": "Meta 在其 Muse 应用程序中引入了 Spaces，允许用户通过描述他们想要的内容来创建个性化的交互体验，例如礼物追踪器、游戏或项目规划器。",
            "summary_en": "Meta introduced Spaces in its Muse app, allowing users to create personalized interactive experiences by describing what they want, such as gift trackers, games, or project planners."
          },
          {
            "title_zh": "衡量人工智能代理如何处理日常湿实验室科学",
            "title_en": "Measuring how AI agents handle everyday wet-lab science",
            "read_time": "13 MIN READ",
            "url": "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "Measuring",
            "summary_zh": "OpenAI 推出了 BioBasicsBench，这是一个评估 AI 在解释 100 个常规湿实验室科学任务的原始实验数据方面的性能的基准。",
            "summary_en": "OpenAI introduced BioBasicsBench, a benchmark to evaluate AI performance in interpreting raw experimental data from 100 routine wet-lab science tasks."
          }
        ]
      }
    ]
  },
  '2026-11-06': {
    "date": "2026-11-06",
    "weekday": "FRI · 周五",
    "issueNo": "VOL. 2026.11.06",
    "headline_zh": "Anthropic 研发加速📈、GPT-6 Cyber​​ 🔐、Inkling 2 Small 🧠",
    "headline_en": "Anthropic R&D accelerates 📈, GPT-6 Cyber 🔐, Inkling 2 Small 🧠",
    "sections": [
      {
        "sectionKey": "Headlines & Launches",
        "items": [
          {
            "title_zh": "GPT-6 网络",
            "title_en": "GPT-6 Cyber",
            "read_time": "13 MIN READ",
            "url": "https://openai.com/index/introducing-gpt-6-cyber/?utm_source=tldrai",
            "domain": "openai.com",
            "highlight_kw": "GPT-6 Cyber",
            "summary_zh": "OpenAI 推出了 GPT-6 Cyber​​，这是一种网络安全模型，旨在识别和验证可利用的漏洞，同时保持在研究人员定义的边界内。",
            "summary_en": "OpenAI introduced GPT-6 Cyber, a cybersecurity model designed to identify and validate exploitable vulnerabilities while staying within researcher-defined boundaries."
          },
          {
            "title_zh": "Inkling 2 小号简介",
            "title_en": "Introducing Inkling 2 Small",
            "read_time": "37 MIN READ",
            "url": "https://thinkingmachines.ai/news/inkling-2-small/?utm_source=tldrai",
            "domain": "thinkingmachines.ai",
            "highlight_kw": "Introducing Inkling",
            "summary_zh": "Inkling 2 Small 是一个混合专家模型，共有 594B 个参数，17B 个活动参数，支持图像输入和可变工作量。该模型的视觉和代理功能使其能够整合视觉反馈，以迭代方式构建和完善具有交互元素的网站、游戏和 3D 设计。最初将通过 Tinker 提供封闭权重。下周完成外部安全测试和红队后，完整权重将在 Apache 2.0 许可证下提供。",
            "summary_en": "Inkling 2 Small is a Mixture-of-Experts model with 594B total parameters, 17B active, that supports image inputs and variable effort. The model's vision and agentic capabilities enable it to incorporate visual feedback to iteratively build and refine websites, games, and 3D designs with interactive elements. It will be initially available through Tinker with closed weights. Full weights will be available under an Apache 2.0 license next week after the completion of external safety testing and red-teaming."
          },
          {
            "title_zh": "双子座 Omni 1.2 闪存",
            "title_en": "Gemini Omni 1.2 Flash",
            "read_time": "1 MIN READ",
            "url": "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/?utm_source=tldrai",
            "domain": "blog.google",
            "highlight_kw": "Gemini Omni",
            "summary_zh": "Google 推出 Gemini Omni 1.2 Flash，提高了 AI 模型的速度、成本效益并延长了剪辑长度。此更新旨在改进人工智能应用程序的开发人员工具和效率。",
            "summary_en": "Google introduces Gemini Omni 1.2 Flash, enhancing speed, cost-efficiency, and extended clip lengths for AI models. This update aims to improve developer tools and effectiveness in AI applications."
          }
        ]
      },
      {
        "sectionKey": "Deep Dives & Analysis",
        "items": [
          {
            "title_zh": "2026 年 10 月 Anthropic 人工智能研发加速独立评估",
            "title_en": "Independent Assessment of AI R&D Acceleration at Anthropic in October 2026",
            "read_time": "63 MIN READ",
            "url": "https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/?utm_source=tldrai",
            "domain": "metr.org",
            "highlight_kw": "Independent Assessment",
            "summary_zh": "Anthropic 的 AI 研发能力显着加速，在明确定义的任务上的模型性能提高速度大约是 2024-2025 年的两倍。这种加速主要是由于人工智能在研发中的作用日益增强，尽管 2025 年底有多种因素促成。",
            "summary_en": "Anthropic's AI R&D capabilities accelerated significantly, improving model performance on well-defined tasks at roughly twice the rate compared to 2024-2025. This acceleration primarily results from AI's increasing role in R&D, though multiple factors contributed in late 2025."
          },
          {
            "title_zh": "Cloudflare 的 AI 代理信任框架",
            "title_en": "Cloudflare's Trust Framework for AI Agents",
            "read_time": "4 MIN READ",
            "url": "https://blog.cloudflare.com/trusted-agent-delegation?utm_source=tldrai",
            "domain": "blog.cloudflare.com",
            "highlight_kw": "Cloudflare",
            "summary_zh": "Cloudflare 概述了网站面临的挑战，因为人工智能代理越来越多地代表用户行事，这使得验证身份、评估可信度和分配责任变得更加困难。",
            "summary_en": "Cloudflare has outlined the challenges websites face as AI agents increasingly act on behalf of users, making it harder to verify identities, assess trustworthiness, and assign accountability."
          },
          {
            "title_zh": "人工智能必须撒谎才能获胜的基准",
            "title_en": "The benchmark where AIs have to lie to win",
            "read_time": "23 MIN READ",
            "url": "https://www.dwarkesh.com/p/clocktower?utm_source=tldrai",
            "domain": "dwarkesh.com",
            "highlight_kw": "The",
            "summary_zh": "钟楼上的血是一款社交欺骗游戏。观看人工智能玩游戏可以揭示人工智能在一系列人工智能功能方面的进展情况，而其他基准测试无法清晰地展示这些功能。游戏需要AI凭借创造力、临场虚张声势和集体推理来执行计划。这篇文章探讨了当人工智能模型在游戏中相互对抗时会发生什么。",
            "summary_en": "Blood on the Clocktower is a social deception game. Watching AI play the game unveils a lot about how AI is progressing on a set of AI capabilities that no other benchmark gives clear visibility into. The game requires AI to execute schemes with creativity, on-the-spot bluffing, and collective reasoning. This post looks at what happens when you pit AI models against each other in the game."
          }
        ]
      },
      {
        "sectionKey": "Engineering & Research",
        "items": [
          {
            "title_zh": "NVIDIA 推出 VFlash",
            "title_en": "NVIDIA Introduced VFlash",
            "read_time": "5 MIN READ",
            "url": "https://research.nvidia.com/labs/lpr/vflash/?utm_source=tldrai",
            "domain": "research.nvidia.com",
            "highlight_kw": "NVIDIA Introduced",
            "summary_zh": "NVIDIA VFlash 是一种视觉模型，可以并行生成机器人轨迹和 3D 运动等几何预测，而不是逐个令牌。",
            "summary_en": "NVIDIA VFlash is a vision model that generates geometric predictions like robot trajectories and 3D motion in parallel rather than token by token."
          },
          {
            "title_zh": "用于交互式世界模拟的全新 NVIDIA Cosmos 3 开放模型",
            "title_en": "New NVIDIA Cosmos 3 Open Models for Interactive World Simulation",
            "read_time": "7 MIN READ",
            "url": "https://huggingface.co/blog/nvidia/cosmos-interactive-world-simulation?utm_source=tldrai",
            "domain": "huggingface.co",
            "highlight_kw": "New NVIDIA",
            "summary_zh": "NVIDIA 的 Cosmos 3 平台现在提供四种用于交互式世界模拟和驾驶场景的开放权重模型，每个模型都有 160 亿个可训练参数。这些模型能够通过模拟器控制生成多传感器数据、同步观察和逼真视频，支持机器人和自动驾驶的高级研究。",
            "summary_en": "NVIDIA's Cosmos 3 platform now offers four open-weight models for interactive world simulation and driving scenes, each with 16 billion trainable parameters. These models enable multi-sensor data generation, synchronized observations, and photorealistic video from simulator controls, supporting advanced research in robotics and autonomous driving."
          }
        ]
      },
      {
        "sectionKey": "Miscellaneous",
        "items": [
          {
            "title_zh": "主要计算市场如何运作",
            "title_en": "How Primary Compute Markets Work",
            "read_time": "7 MIN READ",
            "url": "https://x.com/OrnnExchange/status/2118372699093295482?utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "How Primary",
            "summary_zh": "GPU 提供商通过预订、按需租赁和可中断现货合同来销售容量。预订可通过可预测的收入帮助确保融资，按需提供更高利率的灵活性，而现货则可将闲置产能货币化。 Ornn 的计算价格指数跟踪执行的按需交易，不包括预订和现货租赁。",
            "summary_en": "GPU providers sell capacity through reservations, on-demand rentals, and interruptible spot contracts. Reservations help secure financing through predictable revenue, on-demand offers flexibility at higher rates, and spot monetizes idle capacity. Ornn's compute price indices track executed on-demand transactions, excluding reservations and spot rentals."
          },
          {
            "title_zh": "克劳德的个人理财",
            "title_en": "Personal Finance in Claude",
            "read_time": "3 MIN READ",
            "url": "https://claude.com/resources/articles/introducing-personal-finance-in-claude?utm_source=tldrai",
            "domain": "claude.com",
            "highlight_kw": "Personal Finance",
            "summary_zh": "Claude 中的 Anthropic Personal Finance 允许用户安全地连接银行和信用卡帐户，以询问有关余额、交易和支出的问题。",
            "summary_en": "Anthropic Personal Finance in Claude allows users to securely connect bank and credit card accounts to ask questions about balances, transactions, and spending."
          }
        ]
      },
      {
        "sectionKey": "Quick Links",
        "items": [
          {
            "title_zh": "教育部终极培训手册",
            "title_en": "The Ultimate MoE Training Handbook",
            "read_time": "1 MIN READ",
            "url": "https://huggingface.co/spaces/huggingface/moe-blogpost?utm_source=tldrai",
            "domain": "huggingface.co",
            "highlight_kw": "The Ultimate",
            "summary_zh": "Hugging Face 发布了《教育部终极培训手册》，这是一本关于训练混合专家模型的综合指南。",
            "summary_en": "Hugging Face released \"The Ultimate MoE Training Handbook,\" a comprehensive guide on training mixture-of-experts models."
          },
          {
            "title_zh": "缪斯之声",
            "title_en": "Muse Voice",
            "read_time": "3 MIN READ",
            "url": "https://about.fb.com/news/2026/11/introducing-muse-ai-voice-expressive-avatars/?utm_source=tldrai",
            "domain": "about.fb.com",
            "highlight_kw": "Muse Voice",
            "summary_zh": "Meta 宣布为其 Muse 应用程序提供语音对话和富有表现力的头像，让用户可以通过语音交互进行集思广益、计划旅行和完成任务。",
            "summary_en": "Meta announced voice conversations and expressive avatars for its Muse app, allowing users to brainstorm, plan trips, and complete tasks through spoken interactions."
          },
          {
            "title_zh": "您现在可以在 Cursor 中构建实时应用程序并通过链接共享它们",
            "title_en": "You can now build live apps in Cursor and share them with a link",
            "read_time": "1 MIN READ",
            "url": "https://x.com/cursor_ai/status/2118458629091426304?utm_source=tldrai",
            "domain": "x.com",
            "highlight_kw": "You",
            "summary_zh": "用户只需描述他们想要的工具，Cursor 将构建它、设置数据库、运行确定性和代理安全检查并进行部署。",
            "summary_en": "Users just have to describe the tool they want, and Cursor will build it, set up a database, run deterministic and agentic security checks, and deploy."
          },
          {
            "title_zh": "德文评论2.0",
            "title_en": "Devin Review 2.0",
            "read_time": "5 MIN READ",
            "url": "https://devin.ai/blog/devin-review-2?utm_source=tldrai",
            "domain": "devin.ai",
            "highlight_kw": "Devin Review",
            "summary_zh": "自 8 月份以来，每个 PR 的 Devin 审核成本下降了 82%。",
            "summary_en": "The cost of a Devin Review per PR has dropped by 82% since August."
          }
        ]
      }
    ]
  },
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
