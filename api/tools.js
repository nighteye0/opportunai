const SEEDED_TOOLS = [
  { id: 'seed-1', name: 'ChatGPT', category: 'AI', description: 'Conversational AI by OpenAI. Write, code, analyze, and brainstorm with one of the most capable AI assistants available.', pricing: 'Free / $20/mo', website: 'https://chat.openai.com', logo: '🤖', featured: true },
  { id: 'seed-2', name: 'Claude', category: 'AI', description: "Anthropic's AI assistant for writing, analysis, coding, and research. Known for thoughtful, nuanced responses.", pricing: 'Free / $20/mo', website: 'https://claude.ai', logo: '🧠', featured: true },
  { id: 'seed-3', name: 'Midjourney', category: 'AI', description: 'Generate stunning images from text prompts. The go-to AI image generator for designers and creatives.', pricing: 'From $10/mo', website: 'https://midjourney.com', logo: '🎨', featured: true },
  { id: 'seed-4', name: 'Cursor', category: 'AI', description: 'AI-first code editor built on VS Code. Write, edit, and debug code with an AI that understands your entire codebase.', pricing: 'Free / $20/mo', website: 'https://cursor.sh', logo: '⚡', featured: true },
  { id: 'seed-5', name: 'Perplexity', category: 'AI', description: 'AI-powered search engine that gives direct answers with cited sources. Replaces traditional search for research tasks.', pricing: 'Free / $20/mo', website: 'https://perplexity.ai', logo: '🔍' },
  { id: 'seed-6', name: 'ElevenLabs', category: 'AI', description: 'Hyper-realistic AI voice generation. Clone voices, create audiobooks, and power voice apps with natural-sounding speech.', pricing: 'Free / from $5/mo', website: 'https://elevenlabs.io', logo: '🎙️' },
  { id: 'seed-7', name: 'Runway', category: 'AI', description: 'AI video generation and editing platform. Create, edit, and transform video content with powerful generative AI tools.', pricing: 'From $12/mo', website: 'https://runwayml.com', logo: '🎬' },
  { id: 'seed-8', name: 'Otter.ai', category: 'AI', description: 'AI meeting transcription and notes. Automatically transcribes meetings, highlights key points, and generates summaries.', pricing: 'Free / $16/mo', website: 'https://otter.ai', logo: '📝' },
  { id: 'seed-9', name: 'Notion', category: 'Productivity', description: 'All-in-one workspace for notes, docs, wikis, and project management. Highly customizable and great for teams.', pricing: 'Free / $8/mo', website: 'https://notion.so', logo: '📓', featured: true },
  { id: 'seed-10', name: 'Linear', category: 'Productivity', description: 'The issue tracker built for high-performance teams. Fast, focused, and loved by engineering teams worldwide.', pricing: 'Free / $8/mo', website: 'https://linear.app', logo: '📐', featured: true },
  { id: 'seed-11', name: 'Todoist', category: 'Productivity', description: 'Simple yet powerful task manager for individuals and teams. Manage projects, set priorities, and track progress.', pricing: 'Free / $4/mo', website: 'https://todoist.com', logo: '✅' },
  { id: 'seed-12', name: 'Obsidian', category: 'Productivity', description: 'A powerful knowledge base that works on local Markdown files. Build a personal wiki with bidirectional links.', pricing: 'Free / $8/mo', website: 'https://obsidian.md', logo: '💎' },
  { id: 'seed-13', name: 'Cron', category: 'Productivity', description: 'Next-generation calendar for professionals. Beautiful, fast, and packed with features for managing your time.', pricing: 'Free', website: 'https://cron.com', logo: '📅' },
  { id: 'seed-14', name: 'Loom', category: 'Productivity', description: 'Record and share video messages instantly. Replace unnecessary meetings with quick async video updates.', pricing: 'Free / $12.50/mo', website: 'https://loom.com', logo: '🎥' },
  { id: 'seed-15', name: 'Raycast', category: 'Productivity', description: 'Blazing fast launcher for Mac. Replace Spotlight with AI-powered search, snippets, and 1000+ integrations.', pricing: 'Free / $8/mo', website: 'https://raycast.com', logo: '🚀' },
  { id: 'seed-16', name: 'Superhuman', category: 'Productivity', description: 'The fastest email experience ever made. AI triage, keyboard shortcuts, and a gorgeous interface for power users.', pricing: '$30/mo', website: 'https://superhuman.com', logo: '📧' },
  { id: 'seed-17', name: 'Vercel', category: 'Dev Tools', description: 'Deploy frontend apps instantly. Zero-config deployments, edge network, and seamless GitHub integration.', pricing: 'Free / $20/mo', website: 'https://vercel.com', logo: '▲', featured: true },
  { id: 'seed-18', name: 'Supabase', category: 'Dev Tools', description: 'Open source Firebase alternative. Get a Postgres database, authentication, storage, and edge functions instantly.', pricing: 'Free / $25/mo', website: 'https://supabase.com', logo: '⚡', featured: true },
  { id: 'seed-19', name: 'GitHub', category: 'Dev Tools', description: "The world's leading code hosting platform. Version control, CI/CD, project management, and Copilot AI coding.", pricing: 'Free / $4/mo', website: 'https://github.com', logo: '🐙' },
  { id: 'seed-20', name: 'Postman', category: 'Dev Tools', description: 'API platform for building and using APIs. Design, test, document, and collaborate on APIs in one place.', pricing: 'Free / $14/mo', website: 'https://postman.com', logo: '📮' },
  { id: 'seed-21', name: 'Railway', category: 'Dev Tools', description: 'Deploy anything in seconds. The simplest cloud platform for deploying databases, backends, and full-stack apps.', pricing: 'Free / $5/mo', website: 'https://railway.app', logo: '🚂' },
  { id: 'seed-22', name: 'PlanetScale', category: 'Dev Tools', description: 'MySQL-compatible serverless database platform. Branching, non-blocking schema changes, and massive scale.', pricing: 'Free / $29/mo', website: 'https://planetscale.com', logo: '🌍' },
  { id: 'seed-23', name: 'Retool', category: 'Dev Tools', description: 'Build internal tools 10x faster. Drag-and-drop UI components that connect to any database or API.', pricing: 'Free / $10/mo', website: 'https://retool.com', logo: '🔧' },
  { id: 'seed-24', name: 'Sentry', category: 'Dev Tools', description: 'Application monitoring and error tracking. Find and fix bugs before your users report them.', pricing: 'Free / $26/mo', website: 'https://sentry.io', logo: '🛡️' },
  { id: 'seed-25', name: 'Figma', category: 'Design', description: 'The collaborative interface design tool. Design, prototype, and hand off all in one browser-based platform.', pricing: 'Free / $12/mo', website: 'https://figma.com', logo: '🖌️', featured: true },
  { id: 'seed-26', name: 'Canva', category: 'Design', description: 'Design anything — social posts, presentations, logos, and more. Drag-and-drop simplicity with professional results.', pricing: 'Free / $12.99/mo', website: 'https://canva.com', logo: '🎨' },
  { id: 'seed-27', name: 'Framer', category: 'Design', description: 'Design and publish stunning websites without code. The bridge between design tool and production website.', pricing: 'Free / $5/mo', website: 'https://framer.com', logo: '✦' },
  { id: 'seed-28', name: 'Spline', category: 'Design', description: 'Design and publish 3D web experiences. Create interactive 3D scenes directly in your browser.', pricing: 'Free / $7/mo', website: 'https://spline.design', logo: '🌀' },
  { id: 'seed-29', name: 'Lottiefiles', category: 'Design', description: "The world's largest library of Lottie animations. Add lightweight, scalable animations to any website or app.", pricing: 'Free / $19/mo', website: 'https://lottiefiles.com', logo: '✨' },
  { id: 'seed-30', name: 'Mailchimp', category: 'Marketing', description: 'Email marketing and automation platform. Build campaigns, automate journeys, and grow your audience.', pricing: 'Free / $13/mo', website: 'https://mailchimp.com', logo: '🐒' },
  { id: 'seed-31', name: 'Beehiiv', category: 'Marketing', description: 'The newsletter platform built for growth. Start, scale, and monetize your newsletter with powerful built-in tools.', pricing: 'Free / $39/mo', website: 'https://beehiiv.com', logo: '🐝', featured: true },
  { id: 'seed-32', name: 'Buffer', category: 'Marketing', description: 'Social media scheduling and analytics. Plan, schedule, and publish content across all your social channels.', pricing: 'Free / $6/mo', website: 'https://buffer.com', logo: '📱' },
  { id: 'seed-33', name: 'Ahrefs', category: 'Marketing', description: 'All-in-one SEO toolset. Research keywords, analyze competitors, audit your site, and build backlinks.', pricing: 'From $99/mo', website: 'https://ahrefs.com', logo: '📊' },
  { id: 'seed-34', name: 'Typeform', category: 'Marketing', description: 'Beautiful, conversational forms and surveys. Higher completion rates through engaging one-question-at-a-time design.', pricing: 'Free / $25/mo', website: 'https://typeform.com', logo: '📋' },
  { id: 'seed-35', name: 'Lemlist', category: 'Marketing', description: 'Cold email and sales engagement platform. Personalize at scale with images, videos, and multi-channel sequences.', pricing: 'From $59/mo', website: 'https://lemlist.com', logo: '📤' },
  { id: 'seed-36', name: 'Mixpanel', category: 'Analytics', description: 'Product analytics for user behavior. Track events, build funnels, and understand what drives retention.', pricing: 'Free / $28/mo', website: 'https://mixpanel.com', logo: '📈' },
  { id: 'seed-37', name: 'Plausible', category: 'Analytics', description: 'Simple, privacy-friendly website analytics. Lightweight, cookie-free, and GDPR compliant alternative to Google Analytics.', pricing: 'From $9/mo', website: 'https://plausible.io', logo: '📉' },
  { id: 'seed-38', name: 'Hotjar', category: 'Analytics', description: 'Heatmaps, session recordings, and surveys. See exactly how users interact with your website and find friction points.', pricing: 'Free / $32/mo', website: 'https://hotjar.com', logo: '🔥' },
  { id: 'seed-39', name: 'PostHog', category: 'Analytics', description: 'Open source product analytics platform. Self-host or cloud with feature flags, session replay, and A/B testing included.', pricing: 'Free / usage-based', website: 'https://posthog.com', logo: '🦔' },
  { id: 'seed-40', name: 'Slack', category: 'Communication', description: 'The messaging app for business. Organize conversations into channels, integrate your tools, and work faster together.', pricing: 'Free / $7.25/mo', website: 'https://slack.com', logo: '💬', featured: true },
  { id: 'seed-41', name: 'Discord', category: 'Communication', description: 'Voice, video, and text communication. Used by communities, startups, and remote teams everywhere.', pricing: 'Free / $9.99/mo', website: 'https://discord.com', logo: '🎮' },
  { id: 'seed-42', name: 'Zoom', category: 'Communication', description: 'Video conferencing that just works. Meetings, webinars, and team chat — the standard for remote collaboration.', pricing: 'Free / $13.32/mo', website: 'https://zoom.us', logo: '📹' },
  { id: 'seed-43', name: 'Cal.com', category: 'Communication', description: 'Open source scheduling infrastructure. Let people book time with you without the back-and-forth emails.', pricing: 'Free / $12/mo', website: 'https://cal.com', logo: '📆' },
  { id: 'seed-44', name: 'Stripe', category: 'Finance', description: 'The complete payments platform. Accept payments, manage subscriptions, and handle global compliance with ease.', pricing: '2.9% + 30c per transaction', website: 'https://stripe.com', logo: '💳', featured: true },
  { id: 'seed-45', name: 'Mercury', category: 'Finance', description: 'Banking built for startups. Free business checking, FDIC insured, with powerful API access and team features.', pricing: 'Free', website: 'https://mercury.com', logo: '🏦' },
  { id: 'seed-46', name: 'Ramp', category: 'Finance', description: 'Corporate cards and spend management. Save money with automatic receipt matching, bill pay, and expense insights.', pricing: 'Free', website: 'https://ramp.com', logo: '💰' },
  { id: 'seed-47', name: 'Paddle', category: 'Finance', description: 'Payments infrastructure for SaaS. Handle billing, taxes, and compliance globally as the merchant of record.', pricing: '5% + 50c per transaction', website: 'https://paddle.com', logo: '🏄' },
  { id: 'seed-48', name: 'Deel', category: 'HR', description: 'Global hiring and payroll platform. Hire employees and contractors in 150+ countries, handle compliance and payments.', pricing: 'From $49/mo', website: 'https://deel.com', logo: '🌐' },
  { id: 'seed-49', name: 'Rippling', category: 'HR', description: 'HR, IT, and finance in one platform. Onboard employees, manage payroll, provision software, and run reports.', pricing: 'From $8/mo/user', website: 'https://rippling.com', logo: '🔄' },
  { id: 'seed-50', name: 'Gusto', category: 'HR', description: 'Payroll, benefits, and HR for small businesses. Runs payroll in minutes, handles taxes automatically, and more.', pricing: 'From $46/mo', website: 'https://gusto.com', logo: '👥' },
]

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=3600')

  let tools = [...SEEDED_TOOLS]

  try {
    const url = process.env.VITE_SUPABASE_URL
    const key = process.env.VITE_SUPABASE_ANON_KEY
    if (url && key) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(url, key)
      const { data } = await supabase
        .from('tool_listings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
      if (data && data.length > 0) {
        const community = data.map(t => ({ ...t, id: 'community-' + t.id }))
        tools = [...community, ...tools]
      }
    }
  } catch (e) {
    // serve seeded tools only
  }

  res.status(200).json({ tools })
}
