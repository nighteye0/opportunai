const SEEDED_PRODUCTS = [
  // Notion Templates
  { id:'p1', name:'Ultimate Life OS', category:'Notion Templates', description:'All-in-one Notion system for goals, habits, finances, and projects. Used by 50,000+ people worldwide.', price:'$29', creator:'August Bradley', logo:'📓', url:'https://gumroad.com/a/364350451', platform:'Gumroad', featured:true },
  { id:'p2', name:'Second Brain Template', category:'Notion Templates', description:'Build your personal knowledge management system with this complete Notion second brain starter kit.', price:'$19', creator:'Tiago Forte', logo:'🧠', url:'https://gumroad.com/a/856453299', platform:'Gumroad', featured:true },
  { id:'p3', name:'Freelancer OS', category:'Notion Templates', description:'Complete CRM, project tracker, invoice generator, and client portal — all inside Notion for freelancers.', price:'$25', creator:'Thomas Frank', logo:'💼', url:'https://thomasjfrank.com/templates/', platform:'Gumroad' },
  { id:'p4', name:'Creator HQ', category:'Notion Templates', description:'Content calendar, audience tracker, monetization dashboard, and analytics hub for content creators.', price:'$39', creator:'Easlo', logo:'🎯', url:'https://easlo.gumroad.com/l/creator-hq', platform:'Gumroad' },
  { id:'p5', name:'Startup OS', category:'Notion Templates', description:'Full company operating system — OKRs, roadmap, team wiki, investor updates, and hiring tracker.', price:'$49', creator:'Notion Everything', logo:'🚀', url:'https://notioneverything.com', platform:'Gumroad' },
  { id:'p6', name:'Personal Finance Dashboard', category:'Notion Templates', description:'Track income, expenses, savings, investments, and net worth in one beautiful Notion workspace.', price:'Free', creator:'Zoe Chew', logo:'💰', url:'https://gumroad.com/a/856453200', platform:'Gumroad' },
  { id:'p7', name:'Job Search Tracker', category:'Notion Templates', description:'Track applications, interviews, contacts, and offers. Never lose track of a job opportunity again.', price:'Free', creator:'Notion Community', logo:'🔍', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p8', name:'Content Calendar Pro', category:'Notion Templates', description:'Plan, write, and schedule content across YouTube, Twitter, Instagram, and newsletters in one place.', price:'$15', creator:'Ali Abdaal', logo:'📅', url:'https://gumroad.com/a/content-calendar', platform:'Gumroad' },

  // UI & Design Kits
  { id:'p9', name:'Nucleus UI Kit', category:'UI & Design Kits', description:'50+ full-width chart templates, 200+ components for Figma. Light and dark mode. Perfect for dashboards.', price:'$39', creator:'Alien Pixel', logo:'🎨', url:'https://gumroad.com/a/nucleus-ui', platform:'Gumroad', featured:true },
  { id:'p10', name:'Figterate Variables Plugin', category:'UI & Design Kits', description:'Stop updating variables one by one. Batch-edit Figma variables across your entire design system instantly.', price:'$19', creator:'Figterate', logo:'⚡', url:'https://gumroad.com/a/figterate', platform:'Gumroad' },
  { id:'p11', name:'Framer Components Library', category:'UI & Design Kits', description:'100+ production-ready Framer components. Animations, forms, navbars, hero sections, and more.', price:'$59', creator:'Framer Community', logo:'🖌️', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p12', name:'SaaS Landing Page Kit', category:'UI & Design Kits', description:'20 conversion-optimized landing page templates for SaaS products. Figma source included.', price:'$49', creator:'UI8', logo:'🌐', url:'https://ui8.net', platform:'UI8', featured:true },
  { id:'p13', name:'Icon Pack Pro 3000+', category:'UI & Design Kits', description:'3000+ consistent, pixel-perfect icons in SVG and Figma format. 12 categories, light and bold styles.', price:'$29', creator:'Streamline', logo:'✏️', url:'https://streamlinehq.com', platform:'Gumroad' },
  { id:'p14', name:'Mobile App UI Kit', category:'UI & Design Kits', description:'200+ mobile screens for iOS and Android. Onboarding, auth, dashboard, and profile flows included.', price:'$69', creator:'Mobbin', logo:'📱', url:'https://mobbin.com', platform:'Gumroad' },
  { id:'p15', name:'Brand Identity Kit', category:'UI & Design Kits', description:'Complete branding package template — logo guidelines, color system, typography, and business card layouts.', price:'$35', creator:'Canva Creators', logo:'🏷️', url:'https://gumroad.com', platform:'Gumroad' },

  // Online Courses
  { id:'p16', name:'Build a SaaS in a Weekend', category:'Online Courses', description:'Full-stack course: Next.js, Supabase, Stripe, and deployment. Go from zero to paying customers in 2 days.', price:'$97', creator:'Marc Lou', logo:'💻', url:'https://shipfa.st', platform:'Gumroad', featured:true },
  { id:'p17', name:'No-Code AI App Builder', category:'Online Courses', description:'Build real AI-powered apps without writing code using Bubble, Make, and OpenAI API. 6 projects included.', price:'$79', creator:'No Code MBA', logo:'🤖', url:'https://nocodemba.com', platform:'Gumroad' },
  { id:'p18', name:'Freelance to $10k/month', category:'Online Courses', description:'Exact system to find high-paying clients, close deals, and deliver results as a freelancer. Real case studies.', price:'$149', creator:'Alex Fasulo', logo:'💵', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p19', name:'SEO for Beginners 2025', category:'Online Courses', description:'Learn keyword research, on-page SEO, link building, and content strategy from scratch. Rank on Google.', price:'$49', creator:'Nathan Gotch', logo:'📈', url:'https://gotchseo.com', platform:'Gumroad' },
  { id:'p20', name:'Twitter Growth Masterclass', category:'Online Courses', description:'Grow from 0 to 10,000 followers with proven tweet frameworks, thread templates, and engagement strategies.', price:'$67', creator:'Kieran Drew', logo:'🐦', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p21', name:'Figma UI Design Bootcamp', category:'Online Courses', description:'Learn Figma from scratch — components, auto-layout, prototyping, and handoff. 40+ hours of content.', price:'$89', creator:'DesignCode', logo:'🎓', url:'https://designcode.io', platform:'Gumroad' },
  { id:'p22', name:'Prompt Engineering for Devs', category:'Online Courses', description:'Master ChatGPT, Claude, and Gemini for coding. Build AI-powered features, write better prompts, ship faster.', price:'$59', creator:'DeepLearning.AI', logo:'🧑‍💻', url:'https://deeplearning.ai', platform:'Gumroad' },

  // Code Templates & Boilerplates
  { id:'p23', name:'Next.js SaaS Boilerplate', category:'Code Templates', description:'Production-ready Next.js starter with auth, payments, dashboard, and email. Save 40+ hours of setup.', price:'$149', creator:'Marc Lou', logo:'▲', url:'https://shipfa.st', platform:'Gumroad', featured:true },
  { id:'p24', name:'React Dashboard Template', category:'Code Templates', description:'Beautiful admin dashboard with 50+ components, dark mode, charts, and tables. TypeScript included.', price:'$69', creator:'Creative Tim', logo:'⚛️', url:'https://creative-tim.com', platform:'Gumroad' },
  { id:'p25', name:'Stripe Subscription Starter', category:'Code Templates', description:'Complete billing system with Stripe, webhooks, customer portal, and usage-based pricing. Copy-paste ready.', price:'$49', creator:'Lee Robinson', logo:'💳', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p26', name:'Landing Page HTML Template', category:'Code Templates', description:'5 stunning landing page HTML templates. Responsive, animated, and optimized for conversions.', price:'$29', creator:'HTML5 UP', logo:'🌐', url:'https://html5up.net', platform:'Gumroad' },
  { id:'p27', name:'Chrome Extension Boilerplate', category:'Code Templates', description:'Build and publish a Chrome extension in hours. React + Vite + Manifest V3. Includes popup, options, and content scripts.', price:'$39', creator:'Extension Builder', logo:'🧩', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p28', name:'Mobile App with React Native', category:'Code Templates', description:'Full React Native app template with auth, navigation, push notifications, and Supabase backend.', price:'$99', creator:'React Native School', logo:'📲', url:'https://gumroad.com', platform:'Gumroad' },

  // eBooks & Guides
  { id:'p29', name:'The Indie Hacker Playbook', category:'eBooks & Guides', description:'How to build, launch, and grow a profitable side project to $10k MRR. Real numbers, real strategies.', price:'$19', creator:'Pieter Levels', logo:'📖', url:'https://levels.io', platform:'Gumroad', featured:true },
  { id:'p30', name:'Cold Email Masterguide', category:'eBooks & Guides', description:'200+ cold email templates, subject lines, and follow-up sequences that actually get replies. 5-star rated.', price:'$29', creator:'Justin Welsh', logo:'📧', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p31', name:'The Remote Work Handbook', category:'eBooks & Guides', description:'Everything you need to land a remote job, negotiate salary, and thrive working from anywhere in the world.', price:'$15', creator:'Remote OK', logo:'🌍', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p32', name:'SEO Content Playbook', category:'eBooks & Guides', description:'Step-by-step system to write content that ranks on Google and drives organic traffic. 100+ pages.', price:'$39', creator:'Ryan Law', logo:'✍️', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p33', name:'Design for Developers', category:'eBooks & Guides', description:'Visual design principles every developer needs. Typography, color theory, spacing, and component design.', price:'$25', creator:'Adam Wathan', logo:'🎨', url:'https://refactoringui.com', platform:'Gumroad' },
  { id:'p34', name:'Monetize Your Newsletter', category:'eBooks & Guides', description:'6 proven ways to make money from your newsletter. Sponsorships, products, paid tiers, and affiliates.', price:'$19', creator:'Chenell Basilio', logo:'💌', url:'https://gumroad.com', platform:'Gumroad' },

  // AI Prompts
  { id:'p35', name:'ChatGPT Prompt Bible', category:'AI Prompts', description:'2000+ battle-tested prompts for writing, coding, marketing, sales, and productivity. Organized by use case.', price:'$29', creator:'AI Advantage', logo:'🤖', url:'https://gumroad.com', platform:'Gumroad', featured:true },
  { id:'p36', name:'Midjourney Prompt Vault', category:'AI Prompts', description:'500+ Midjourney prompts for logos, social media, product shots, portraits, and marketing assets.', price:'$19', creator:'Prompt Hero', logo:'🎨', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p37', name:'Claude Coding Prompts', category:'AI Prompts', description:'100+ expert prompts for using Claude to write, debug, and review code. Includes system prompts for your AI dev setup.', price:'$15', creator:'Anthropic Community', logo:'🧑‍💻', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p38', name:'AI Marketing Toolkit', category:'AI Prompts', description:'50 prompts to write ads, emails, landing pages, and social posts 10x faster. Templates for every channel.', price:'$25', creator:'Marketing AI', logo:'📣', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p39', name:'GPT-4 Business Prompts', category:'AI Prompts', description:'Business plan generator, pitch deck writer, contract templates, and investor email prompts. 300+ prompts total.', price:'$35', creator:'Business AI', logo:'💡', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p40', name:'AI Content Calendar System', category:'AI Prompts', description:'30-day content calendar + AI prompts to generate a month of posts in one sitting. Works for any niche.', price:'$19', creator:'Creator Economy', logo:'📅', url:'https://gumroad.com', platform:'Gumroad' },

  // Spreadsheet & Excel Templates
  { id:'p41', name:'Startup Financial Model', category:'Spreadsheet Templates', description:'VC-ready financial model with revenue projections, unit economics, cash flow, and cap table. Excel + Google Sheets.', price:'$49', creator:'Slidebean', logo:'📊', url:'https://slidebean.com', platform:'Gumroad', featured:true },
  { id:'p42', name:'Social Media Analytics Dashboard', category:'Spreadsheet Templates', description:'Track followers, engagement, reach, and ROI across all platforms in one Google Sheets dashboard.', price:'$19', creator:'Data Creator', logo:'📉', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p43', name:'Content ROI Calculator', category:'Spreadsheet Templates', description:'Measure the exact ROI of every piece of content you publish. Integrates with Google Analytics data.', price:'$15', creator:'Marketing Templates', logo:'🔢', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p44', name:'Personal Budget Tracker', category:'Spreadsheet Templates', description:'Beautiful Google Sheets budget tracker with automatic categories, charts, and monthly reports.', price:'Free', creator:'Budget Templates', logo:'💸', url:'https://gumroad.com', platform:'Gumroad' },

  // Video & Photo Assets
  { id:'p45', name:'Lottie Animation Pack', category:'Design Assets', description:'100+ lightweight Lottie animations for apps and websites. Loading states, success, errors, and illustrations.', price:'$39', creator:'LottieFiles', logo:'✨', url:'https://lottiefiles.com', platform:'Gumroad' },
  { id:'p46', name:'Mockup Bundle Pro', category:'Design Assets', description:'500+ device mockups for iPhone, MacBook, iPad, and Android. PSD and Figma formats included.', price:'$29', creator:'Anthony Boyd', logo:'📱', url:'https://anthonyboyd.graphics', platform:'Gumroad' },
  { id:'p47', name:'Social Media Templates Pack', category:'Design Assets', description:'200+ Canva templates for Instagram, Twitter, LinkedIn, and YouTube. Fully editable, brand-ready.', price:'$25', creator:'Social Template Co', logo:'🖼️', url:'https://gumroad.com', platform:'Gumroad' },

  // Productivity Systems
  { id:'p48', name:'The PARA Method', category:'Productivity Systems', description:'Tiago Forte\'s complete PARA system for organizing your digital life. Notion + Obsidian templates included.', price:'$10', creator:'Tiago Forte', logo:'🗂️', url:'https://fortelabs.com', platform:'Gumroad' },
  { id:'p49', name:'Weekly Review System', category:'Productivity Systems', description:'David Allen\'s GTD weekly review turned into a guided Notion workflow. Never miss a commitment again.', price:'Free', creator:'GTD Community', logo:'✅', url:'https://gumroad.com', platform:'Gumroad' },
  { id:'p50', name:'Deep Work Planner', category:'Productivity Systems', description:'Cal Newport\'s deep work principles in a daily planner template. Time-block, prioritize, and protect focus time.', price:'$12', creator:'Deep Work Community', logo:'🎯', url:'https://gumroad.com', platform:'Gumroad' },
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
