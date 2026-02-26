const SEEDED_PRODUCTS = [
  // Notion Templates — real direct URLs
  { id:'p1', name:'Life OS (Simplified Notion)', category:'Notion Templates', description:'All-in-one Notion system for goals, habits, daily log, projects, and journaling. Used by 6500+ people.', price:'$27', creator:'BetterCreating', logo:'📓', url:'https://bettercreating.gumroad.com/l/asimplifiednotion2022', platform:'Gumroad', featured:true },
  { id:'p2', name:'Notion Life OS', category:'Notion Templates', description:'Track goals, skills, relationships, job search, and finances in one beautiful Notion workspace.', price:'$19', creator:'NotionWorkshop', logo:'🧠', url:'https://notionworkshop.gumroad.com/l/notion-life-os', platform:'Gumroad', featured:true },
  { id:'p3', name:'Ultimate Notion Dashboard', category:'Notion Templates', description:'PPV-based life OS for tasks, projects, calendar, notes, goals, and content creation. Inspired by August Bradley.', price:'$27', creator:'WesleyAnna', logo:'🎯', url:'https://wesleyanna.gumroad.com/l/ultimate-notion-dashboard', platform:'Gumroad' },
  { id:'p4', name:'August Bradley Premium Templates', category:'Notion Templates', description:'Free PPV Notion template pack — Daily Action Zone, Project Database, Tracking DB from the original Life OS creator.', price:'Free', creator:'August Bradley', logo:'⭐', url:'https://augustbradley.gumroad.com/l/unpfDu', platform:'Gumroad' },
  { id:'p5', name:'Thomas Frank Notion Templates', category:'Notion Templates', description:'The best free and paid Notion templates for students, creators, and productivity nerds by YouTuber Thomas Frank.', price:'Free+', creator:'Thomas Frank', logo:'🎓', url:'https://thomasjfrank.com/templates/', platform:'Own Site' },
  { id:'p6', name:'Notion for Creators', category:'Notion Templates', description:'Content calendar, video production tracker, audience CRM, and analytics hub all inside Notion.', price:'$29', creator:'Easlo', logo:'✍️', url:'https://easlo.gumroad.com', platform:'Gumroad' },

  // UI & Design Kits — verified real products
  { id:'p9', name:'Relume UI Kit (Figma)', category:'UI & Design Kits', description:'The largest Figma component library. 1000+ components, 100+ page templates, responsive and production-ready.', price:'Free', creator:'Relume', logo:'🎨', url:'https://library.relume.io', platform:'Own Site', featured:true },
  { id:'p10', name:'UI8 Design Assets', category:'UI & Design Kits', description:'Premium Figma UI kits, icon sets, landing pages, and illustration packs from top designers worldwide.', price:'From $12', creator:'UI8', logo:'🖌️', url:'https://ui8.net', platform:'UI8', featured:true },
  { id:'p11', name:'Phosphor Icons', category:'UI & Design Kits', description:'Flexible icon family with 1200+ icons in 6 styles. Free, open source, and available in Figma, SVG, and React.', price:'Free', creator:'Phosphor Icons', logo:'✏️', url:'https://phosphoricons.com', platform:'Own Site' },
  { id:'p12', name:'Mobbin Design Library', category:'UI & Design Kits', description:'The world\'s largest library of mobile and web app screenshots. Reference real UI patterns from 300+ apps.', price:'Free / $8/mo', creator:'Mobbin', logo:'📱', url:'https://mobbin.com', platform:'Own Site' },
  { id:'p13', name:'Untitled UI — Figma Kit', category:'UI & Design Kits', description:'The largest and most popular Figma UI kit. 15,000+ components, 900+ pages. Used by 100k+ designers.', price:'Free / $179', creator:'Untitled UI', logo:'⚡', url:'https://www.untitledui.com', platform:'Own Site' },
  { id:'p14', name:'Humaaans Illustration Kit', category:'UI & Design Kits', description:'Mix-and-match illustration library of people for websites, apps, and presentations. Free to use.', price:'Free', creator:'Pablo Stanley', logo:'🧑', url:'https://www.humaaans.com', platform:'Own Site' },

  // Online Courses — real verified URLs
  { id:'p16', name:'ShipFast — Next.js SaaS Boilerplate', category:'Code Templates', description:'Production-ready Next.js starter with auth, Stripe, email, and SEO. Used by 135k+ developers. Ship in days.', price:'$199', creator:'Marc Lou', logo:'⚡', url:'https://shipfa.st', platform:'Own Site', featured:true },
  { id:'p17', name:'Build a SaaS with Django', category:'Online Courses', description:'Full-stack SaaS course using Django, Stripe, HTMX, and Tailwind. Launch a real product by the end.', price:'$97', creator:'CodingEntrepreneurs', logo:'🐍', url:'https://www.codingentrepreneurs.com', platform:'Own Site' },
  { id:'p18', name:'Prompt Engineering for Everyone', category:'Online Courses', description:'Learn to write effective prompts for ChatGPT, Claude, and Midjourney. Free course by DeepLearning.AI.', price:'Free', creator:'DeepLearning.AI', logo:'🤖', url:'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', platform:'Own Site' },
  { id:'p19', name:'Figma UI Design Bootcamp', category:'Online Courses', description:'Complete Figma course from beginner to advanced. Auto layout, components, prototyping, and design systems.', price:'$89', creator:'DesignCode', logo:'🎨', url:'https://designcode.io/figma-handbook', platform:'Own Site' },
  { id:'p20', name:'SEO Masterclass', category:'Online Courses', description:'Nathan Gotch\'s complete SEO course. Keyword research, on-page, link building, and content strategy from scratch.', price:'$497', creator:'Gotch SEO', logo:'📈', url:'https://www.gotchseo.com/seo-training/', platform:'Own Site' },
  { id:'p21', name:'Zero to Sold', category:'Online Courses', description:'How to bootstrap a profitable SaaS from idea to exit. Real lessons from a founder who did it twice.', price:'$49', creator:'Arvid Kahl', logo:'🚀', url:'https://thebootstrappedfounder.com/zero-to-sold/', platform:'Own Site' },

  // Code Templates — real verified URLs
  { id:'p23', name:'Makerkit — SaaS Starter', category:'Code Templates', description:'Full-stack SaaS starter with Next.js, Supabase, Stripe, and multi-tenancy. Production-ready from day one.', price:'$299', creator:'Makerkit', logo:'🛠️', url:'https://makerkit.dev', platform:'Own Site' },
  { id:'p24', name:'SaaS Pegasus (Django)', category:'Code Templates', description:'Django SaaS boilerplate with teams, subscriptions, async tasks, and React. Used by 1000+ developers.', price:'$249', creator:'SaaS Pegasus', logo:'🐎', url:'https://www.saaspegasus.com', platform:'Own Site' },
  { id:'p25', name:'Supastarter', category:'Code Templates', description:'Next.js and Nuxt SaaS boilerplate with Supabase, i18n, Stripe, email, and a beautiful landing page.', price:'$199', creator:'Supastarter', logo:'▲', url:'https://supastarter.dev', platform:'Own Site' },
  { id:'p26', name:'React Email Templates', category:'Code Templates', description:'Beautiful, responsive email templates built with React Email and Tailwind. Free and open source.', price:'Free', creator:'React Email', logo:'📧', url:'https://react.email/templates', platform:'Own Site' },
  { id:'p27', name:'T3 Stack Boilerplate', category:'Code Templates', description:'The best way to start a full-stack, typesafe Next.js app. tRPC + Prisma + NextAuth + Tailwind. Free on GitHub.', price:'Free', creator:'Theo (t3.gg)', logo:'🔺', url:'https://create.t3.gg', platform:'Own Site' },
  { id:'p28', name:'Nextless.js SaaS Template', category:'Code Templates', description:'React SaaS boilerplate with multi-tenancy, auth, billing, email, and dashboard. Clean and well-documented.', price:'$149', creator:'Nextless', logo:'⚛️', url:'https://nextlessjs.com', platform:'Own Site' },

  // eBooks & Guides — real verified URLs
  { id:'p29', name:'The Indie Hacker Handbook', category:'eBooks & Guides', description:'Pieter Levels\'s guide to building profitable internet businesses. Zero to revenue without investors.', price:'Free', creator:'Pieter Levels', logo:'📖', url:'https://levels.io/blog', platform:'Own Blog', featured:true },
  { id:'p30', name:'Zero to Marketing', category:'eBooks & Guides', description:'A no-fluff marketing guide for startup founders and indie hackers. Get your first 1000 users.', price:'$29', creator:'Federico Grandinetti', logo:'📣', url:'https://zerotomarketing.com', platform:'Gumroad' },
  { id:'p31', name:'The SaaS Playbook', category:'eBooks & Guides', description:'Rob Walling\'s complete guide to building and growing a bootstrapped SaaS business profitably.', price:'$29', creator:'Rob Walling', logo:'📚', url:'https://saasplaybook.com', platform:'Own Site' },
  { id:'p32', name:'Refactoring UI', category:'eBooks & Guides', description:'Design tips and practical advice for developers who want to design better UIs. By Tailwind CSS creators.', price:'$99', creator:'Adam Wathan & Steve Schoger', logo:'🎨', url:'https://www.refactoringui.com', platform:'Own Site', featured:true },
  { id:'p33', name:'The Mom Test', category:'eBooks & Guides', description:'How to talk to customers and learn if your business is a good idea when everyone is lying to you.', price:'$10', creator:'Rob Fitzpatrick', logo:'🧪', url:'https://www.momtestbook.com', platform:'Own Site' },
  { id:'p34', name:'Traction', category:'eBooks & Guides', description:'How any startup can achieve explosive customer growth using the Bullseye framework. 19 traction channels.', price:'$15', creator:'Gabriel Weinberg', logo:'📊', url:'https://www.amazon.com/Traction-Startup-Achieve-Explosive-Customer/dp/1591848369', platform:'Amazon' },

  // AI Prompts — real verified URLs
  { id:'p35', name:'Awesome ChatGPT Prompts', category:'AI Prompts', description:'The most popular open-source collection of ChatGPT prompts. 200+ prompts for every use case. Free on GitHub.', price:'Free', creator:'f/awesome-chatgpt-prompts', logo:'🤖', url:'https://github.com/f/awesome-chatgpt-prompts', platform:'GitHub', featured:true },
  { id:'p36', name:'FlowGPT Prompt Library', category:'AI Prompts', description:'Community-built library of 10,000+ AI prompts for ChatGPT, Claude, Midjourney, and Stable Diffusion.', price:'Free', creator:'FlowGPT', logo:'🌊', url:'https://flowgpt.com', platform:'Own Site' },
  { id:'p37', name:'PromptBase Marketplace', category:'AI Prompts', description:'Buy and sell quality prompts for DALL-E, Midjourney, Stable Diffusion, GPT-4, and Llama. 100k+ prompts.', price:'From $1.99', creator:'PromptBase', logo:'💡', url:'https://promptbase.com', platform:'Own Site' },
  { id:'p38', name:'Learn Prompting (Free Guide)', category:'AI Prompts', description:'The world\'s largest open-source guide to prompt engineering. From basics to advanced jailbreaking techniques.', price:'Free', creator:'Learn Prompting', logo:'🎓', url:'https://learnprompting.org', platform:'Own Site' },
  { id:'p39', name:'Midjourney Prompt Generator', category:'AI Prompts', description:'Generate perfect Midjourney prompts for any style. Photography, illustration, 3D, and more. Free to use.', price:'Free', creator:'PromptHero', logo:'🎨', url:'https://prompthero.com', platform:'Own Site' },
  { id:'p40', name:'AI Prompt Pack for Marketers', category:'AI Prompts', description:'100 battle-tested prompts for social media, email, ads, SEO content, and brand voice. Instantly usable.', price:'$19', creator:'Marketing AI Institute', logo:'📣', url:'https://www.marketingaiinstitute.com', platform:'Gumroad' },

  // Spreadsheet Templates — real verified URLs
  { id:'p41', name:'Startup Financial Model (Notion)', category:'Spreadsheet Templates', description:'VC-ready financial model template with revenue projections, burn rate, and unit economics. Google Sheets.', price:'Free', creator:'Slidebean', logo:'📊', url:'https://slidebean.com/tools/startup-financial-model', platform:'Own Site', featured:true },
  { id:'p42', name:'Personal Budget Spreadsheet', category:'Spreadsheet Templates', description:'Free Google Sheets budget tracker by Tiller Money. Auto-categorizes transactions and tracks net worth.', price:'Free', creator:'Tiller Money', logo:'💸', url:'https://www.tillerhq.com/free-google-sheets-budget-template/', platform:'Own Site' },
  { id:'p43', name:'SaaS Metrics Dashboard', category:'Spreadsheet Templates', description:'Track MRR, churn, LTV, CAC, and all key SaaS metrics automatically. Google Sheets template, free.', price:'Free', creator:'Baremetrics', logo:'📉', url:'https://baremetrics.com/resources/saas-metrics-spreadsheet', platform:'Own Site' },
  { id:'p44', name:'Content Marketing Calendar', category:'Spreadsheet Templates', description:'Plan, schedule, and track content across all channels in one Google Sheets dashboard. Free download.', price:'Free', creator:'HubSpot', logo:'📅', url:'https://offers.hubspot.com/editorial-calendar-templates', platform:'Own Site' },

  // Design Assets — real verified URLs
  { id:'p45', name:'LottieFiles Free Animations', category:'Design Assets', description:'Thousands of free Lottie animations for loading states, success screens, and illustrations. Free to download.', price:'Free', creator:'LottieFiles', logo:'✨', url:'https://lottiefiles.com/free-animations', platform:'Own Site' },
  { id:'p46', name:'Anthony Boyd Mockups', category:'Design Assets', description:'High-quality free iPhone, MacBook, iPad, and device mockup PSD files for presentations and portfolios.', price:'Free', creator:'Anthony Boyd', logo:'📱', url:'https://www.anthonyboyd.graphics/mockups/', platform:'Own Site' },
  { id:'p47', name:'Storyset Illustrations', category:'Design Assets', description:'Free customizable illustrations for web and app projects. Edit colors, animate, and download in SVG or PNG.', price:'Free', creator:'Storyset by Freepik', logo:'🖼️', url:'https://storyset.com', platform:'Own Site' },

  // Productivity Systems
  { id:'p48', name:'PARA Method Starter Kit', category:'Productivity Systems', description:'Tiago Forte\'s official PARA method explained with free templates for Notion, Obsidian, and Evernote.', price:'Free', creator:'Tiago Forte', logo:'🗂️', url:'https://fortelabs.com/blog/para/', platform:'Own Blog' },
  { id:'p49', name:'Getting Things Done (GTD)', category:'Productivity Systems', description:'David Allen\'s complete GTD system guide. The definitive method for stress-free productivity and task capture.', price:'$15', creator:'David Allen', logo:'✅', url:'https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563', platform:'Amazon' },
  { id:'p50', name:'Obsidian Starter Vault', category:'Productivity Systems', description:'Free Obsidian starter vault with templates for daily notes, projects, book summaries, and meeting notes.', price:'Free', creator:'Obsidian Community', logo:'💎', url:'https://obsidian.md/blog/new-obsidian-starter-kit/', platform:'Own Site' },
]

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=3600')

  let products = [...SEEDED_PRODUCTS]

  try {
    const url = process.env.VITE_SUPABASE_URL
    const key = process.env.VITE_SUPABASE_ANON_KEY
    if (url && key) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(url, key)
      const { data } = await supabase
        .from('product_listings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
      if (data && data.length > 0) {
        products = [...data.map(p => ({ ...p, id: 'community-' + p.id })), ...products]
      }
    }
  } catch (e) { /* serve seeded only */ }

  res.status(200).json({ products })
}
