export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const data = [
  {
    "id": "alt-tuna",
    "name": "Tuna",
    "description": "Modern launcher for macOS offering Fuzzy, Leader, Text, and Talk modes, built natively in Swift, supporting extensions, with free and full one-time unlock options.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/tuna/about/",
    "website": "https://alternativeto.net/software/tuna/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-wigify",
    "name": "Wigify",
    "description": "A desktop app that lets you create and display custom HTML/CSS/JS widgets right on your desktop.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/wigify/about/",
    "website": "https://alternativeto.net/software/wigify/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-episteme-reader",
    "name": "Episteme Reader",
    "description": "A native Android document reader application built with Kotlin and Jetpack Compose.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/episteme-reader/about/",
    "website": "https://alternativeto.net/software/episteme-reader/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-useclick",
    "name": "Useclick",
    "description": "Privacy-first link management platform with branded short links, analytics, QR codes, geo-targeting, and link-in-bio pages. No cookies, fully GDPR-compliant.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/useclick/about/",
    "website": "https://alternativeto.net/software/useclick/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-vectorbee",
    "name": "VectorBee",
    "description": "VectorBee is a highly user-friendly genetic engineering software created by VectorBuilder for viewing, editing and analyzing DNA and protein sequences.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/vectorbee/about/",
    "website": "https://alternativeto.net/software/vectorbee/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-beetroot",
    "name": "Beetroot",
    "description": "A smart clipboard manager for Windows with AI-powered text transforms, OCR, fuzzy search, and a beautiful modern UI.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/beetroot/about/",
    "website": "https://alternativeto.net/software/beetroot/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-rahoot",
    "name": "Rahoot",
    "description": "Rahoot is a self-hosted and open-source Kahoot! clone platform, designed for smaller events.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/rahoot/about/",
    "website": "https://alternativeto.net/software/rahoot/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-fairscan",
    "name": "FairScan",
    "description": "Android document scanner creating enhanced, clean PDFs with open-source code, no ads, tracking, watermarks, or cloud—fully offline, private, and simple.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/fairscan/about/",
    "website": "https://alternativeto.net/software/fairscan/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-one-page",
    "name": "One Page",
    "description": "Build a customizable link-in-bio page with grid layout, rich widgets, contact forms, service listings, SEO optimization, and custom domain options.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/one-page/about/",
    "website": "https://alternativeto.net/software/one-page/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  },
  {
    "id": "alt-filelight",
    "name": "Filelight",
    "description": "Displays disk usage visually with interactive segmented rings, scans local and remote disks, allows direct file management, and integrates with KDE file managers.",
    "category": "Productivity",
    "url": "https://alternativeto.net/software/filelight/about/",
    "website": "https://alternativeto.net/software/filelight/about/",
    "emoji": "🔄",
    "logo": "🔄",
    "source": "AlternativeTo",
    "featured": false
  }
]
  res.status(200).json({ tools: data, total: data.length, updated: '2026-02-27T11:18:23.835975+00:00' })
}
