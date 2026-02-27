import { useState, useEffect } from 'react'

const CATS = ['All','Productivity','Writing','Design','Development','Marketing','Analytics','Communication','Finance','Other']

function getUrl(item) {
  return item.url || item.website || item.website_url || item.link ||
    item.href || item.external_url || item.affiliate_url ||
    item.product_url || item.visit_url || null
}

function openUrl(item) {
  const url = getUrl(item)
  console.log('Tool clicked:', item.name, '| URL:', url, '| Full object:', item)
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    alert('No URL found for: ' + item.name + '\nCheck console for field names.')
  }
}

export default function ToolsPage() {
  const [tools, setTools] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tools')
      .then(r => r.json())
      .then(d => {
        const arr = Array.isArray(d) ? d : (d.tools || d.data || [])
        console.log('Tools loaded. Sample:', arr[0])
        setTools(arr)
        setFiltered(arr)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    let arr = tools
    if (cat !== 'All') arr = arr.filter(t => t.category === cat)
    if (search.trim()) {
      const q = search.toLowerCase()
      arr = arr.filter(t =>
        (t.name || '').toLowerCase().includes(q) ||
        (t.description || t.tagline || '').toLowerCase().includes(q)
      )
    }
    setFiltered(arr)
  }, [cat, search, tools])

  const pill = (active) => ({
    padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 500,
    border: `1px solid ${active ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)'}`,
    background: active ? 'rgba(99,102,241,0.08)' : 'transparent',
    color: active ? '#818cf8' : '#555', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap'
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: '#060606', color: '#e8e8e8', fontFamily: "'DM Sans',-apple-system,sans-serif" }}>
      <div style={{ padding: '48px 24px 36px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(99,102,241,0.04), transparent)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(129,140,248,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>AI Stack</div>
          <h1 style={{ fontFamily: "'Syne','system-ui',sans-serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 6 }}>SaaS & AI Tools</h1>
          <p style={{ fontSize: 15, color: '#555', marginBottom: 28 }}>50+ hand-picked tools to supercharge your remote workflow</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CATS.map(c => <button key={c} style={pill(cat === c)} onClick={() => setCat(c)}>{c}</button>)}
            </div>
            <input
              style={{ padding: '10px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, fontSize: 14, color: '#e8e8e8', fontFamily: 'inherit', outline: 'none', width: 240, maxWidth: '100%' }}
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 24px 80px' }}>
        <div style={{ fontSize: 13, color: '#333', marginBottom: 20 }}>{filtered.length} tools</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 18, opacity: 0.2 }}>
                <div style={{ width: 40, height: 40, borderRadius: 9, background: '#222', marginBottom: 12 }} />
                <div style={{ height: 14, background: '#222', borderRadius: 4, width: '60%', marginBottom: 8 }} />
                <div style={{ height: 12, background: '#1a1a1a', borderRadius: 4, width: '90%', marginBottom: 6 }} />
                <div style={{ height: 12, background: '#1a1a1a', borderRadius: 4, width: '70%' }} />
              </div>
            ))
            : filtered.map((t, i) => {
              const url = getUrl(t)
              return (
                <div key={i}
                  onClick={() => openUrl(t)}
                  style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 18, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 12, color: '#333' }}>↗</div>
                  <div style={{ width: 40, height: 40, borderRadius: 9, background: '#111', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>
                    {t.logo || t.emoji || t.icon || '🛠️'}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#e0e0e0', marginBottom: 4 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#444', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 10 }}>
                    {t.description || t.tagline || t.short_description}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {t.category && <span style={{ padding: '2px 8px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)', borderRadius: 5, fontSize: 11, fontWeight: 600, color: '#555' }}>{t.category}</span>}
                    <span style={{ fontSize: 12, color: '#444', marginLeft: 'auto' }}>Visit →</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}