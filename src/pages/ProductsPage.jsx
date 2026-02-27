import { useState, useEffect } from 'react'

const CATS = ['All','Notion Templates','UI & Design Kits','Online Courses','Code Templates','eBooks & Guides','AI Prompts','Spreadsheet Templates','Design Assets','Productivity Systems']

function getUrl(item) {
  return item.url || item.website || item.website_url || item.link ||
    item.href || item.external_url || item.affiliate_url ||
    item.product_url || item.buy_url || item.gumroad_url || null
}

function openUrl(item) {
  const url = getUrl(item)
  console.log('Product clicked:', item.name, '| URL field:', url, '| Full object:', item)
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    alert('No URL found for: ' + item.name + '\nCheck console for details.')
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => {
        const arr = Array.isArray(d) ? d : (d.products || d.data || [])
        console.log('Products loaded. Sample item:', arr[0])
        setProducts(arr)
        setFiltered(arr)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    let arr = products
    if (cat !== 'All') arr = arr.filter(p => p.category === cat)
    if (search.trim()) {
      const q = search.toLowerCase()
      arr = arr.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      )
    }
    setFiltered(arr)
  }, [cat, search, products])

  const featured = products.filter(p => p.featured).slice(0, 4)

  const pill = (active) => ({
    padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 500,
    border: `1px solid ${active ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.07)'}`,
    background: active ? 'rgba(245,158,11,0.08)' : 'transparent',
    color: active ? '#f59e0b' : '#555', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap'
  })

  const Card = ({ p, featured: isFeatured }) => (
    <div
      onClick={() => openUrl(p)}
      style={{
        background: '#0a0a0a',
        border: `1px solid ${isFeatured ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12, padding: 18, cursor: 'pointer',
        transition: 'all 0.2s', position: 'relative'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = isFeatured ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.14)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isFeatured ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.07)'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {isFeatured && (
        <span style={{ position: 'absolute', top: 12, right: 12, padding: '2px 8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 5, fontSize: 11, fontWeight: 700, color: '#f59e0b' }}>Featured</span>
      )}
      <div style={{ fontSize: 22, marginBottom: 12 }}>{p.logo || p.emoji || p.icon || '📦'}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8', marginBottom: 3 }}>{p.name}</div>
      <div style={{ fontSize: 12, color: '#444', marginBottom: 10 }}>{p.creator}{p.platform ? ` · ${p.platform}` : ''}</div>
      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {p.description}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>{p.pricing || p.price || 'Free'}</span>
        <span style={{ fontSize: 13, color: '#555' }}>Get it →</span>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: '#060606', color: '#e8e8e8', fontFamily: "'DM Sans',-apple-system,sans-serif" }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 36px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(245,158,11,0.04), transparent)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(245,158,11,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Marketplace</div>
              <h1 style={{ fontFamily: "'Syne','system-ui',sans-serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 4 }}>Digital Products</h1>
              <p style={{ fontSize: 15, color: '#555' }}>Templates, courses, tools and resources from top creators</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ padding: '10px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, fontSize: 14, color: '#e8e8e8', fontFamily: 'inherit', outline: 'none', width: 220 }}
              />
              <button style={{ padding: '10px 16px', background: '#f59e0b', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>+ Submit</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATS.map(c => <button key={c} style={pill(cat === c)} onClick={() => setCat(c)}>{c}</button>)}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Featured */}
        {cat === 'All' && !search && featured.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#333', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Featured</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10, marginBottom: 32 }}>
              {featured.map((p, i) => <Card key={i} p={p} featured />)}
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 36 }} />
          </div>
        )}

        <div style={{ fontSize: 13, color: '#333', marginBottom: 20 }}>{filtered.length} products</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 18, opacity: 0.2 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#222', marginBottom: 12 }} />
                <div style={{ height: 14, background: '#222', borderRadius: 4, width: '65%', marginBottom: 8 }} />
                <div style={{ height: 11, background: '#1a1a1a', borderRadius: 4, width: '90%', marginBottom: 6 }} />
                <div style={{ height: 11, background: '#1a1a1a', borderRadius: 4, width: '75%' }} />
              </div>
            ))
            : filtered.map((p, i) => <Card key={i} p={p} />)
          }
        </div>
      </div>
    </div>
  )
}