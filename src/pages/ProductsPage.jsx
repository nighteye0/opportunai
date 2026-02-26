import { useState, useEffect } from 'react'

const CATEGORIES = ['All','Notion Templates','UI & Design Kits','Online Courses','Code Templates','eBooks & Guides','AI Prompts','Spreadsheet Templates','Design Assets','Productivity Systems']

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.creator?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',padding:'40px 20px',fontFamily:'Inter,sans-serif'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:48}}>
          <span style={{display:'inline-block',background:'rgba(201,168,76,0.15)',color:'#c9a84c',border:'1px solid rgba(201,168,76,0.3)',borderRadius:20,padding:'4px 16px',fontSize:13,fontWeight:600,marginBottom:16}}>Digital Products</span>
          <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,52px)',fontWeight:800,color:'#fff',margin:'0 0 12px',letterSpacing:'-1px'}}>Products for Builders</h1>
          <p style={{color:'#888',fontSize:16,margin:'0 0 28px'}}>Templates, courses, tools, and resources from top creators worldwide</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, creators..." style={{background:'#141414',border:'1.5px solid #2a2a2a',borderRadius:10,padding:'10px 16px',color:'#fff',fontSize:14,width:280}} />
            <a href="/submit-product" style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontWeight:700,borderRadius:10,padding:'10px 20px',textDecoration:'none',fontSize:14}}>Submit a Product</a>
          </div>
        </div>

        {/* Featured */}
        {!search && category === 'All' && featured.length > 0 && (
          <div style={{marginBottom:48}}>
            <div style={{fontSize:12,color:'#c9a84c',fontWeight:700,letterSpacing:2,textTransform:'uppercase',marginBottom:16}}>Featured</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16}}>
              {featured.map(p => <ProductCard key={p.id} product={p} highlight />)}
            </div>
          </div>
        )}

        {/* Category filters */}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={()=>setCategory(c)} style={{padding:'7px 16px',borderRadius:20,fontSize:13,border:'1.5px solid',borderColor:category===c?'#c9a84c':'#2a2a2a',color:category===c?'#c9a84c':'#888',background:category===c?'rgba(201,168,76,0.12)':'transparent',cursor:'pointer',transition:'all 0.15s'}}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{textAlign:'center',color:'#888',padding:60}}>Loading products...</div>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:'center',color:'#888',padding:60}}>
            <div style={{fontSize:48,marginBottom:16}}>📦</div>
            <p>No products found. <a href="/submit-product" style={{color:'#c9a84c'}}>Submit one!</a></p>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product: p, highlight }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer"
      style={{background:highlight?'#131310':'#111',border:`1px solid ${highlight?'rgba(201,168,76,0.25)':'#1e1e1e'}`,borderRadius:16,padding:22,display:'flex',flexDirection:'column',gap:12,textDecoration:'none',transition:'all 0.2s',cursor:'pointer'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='#c9a84c';e.currentTarget.style.transform='translateY(-3px)'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=highlight?'rgba(201,168,76,0.25)':'#1e1e1e';e.currentTarget.style.transform='translateY(0)'}}>
      <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
        <div style={{fontSize:32,width:48,height:48,background:'#1a1a1a',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{p.logo||'📦'}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
            <span style={{color:'#fff',fontWeight:700,fontSize:15}}>{p.name}</span>
            {p.featured && <span style={{background:'rgba(201,168,76,0.2)',color:'#c9a84c',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:8}}>Featured</span>}
          </div>
          <div style={{color:'#666',fontSize:12,marginTop:2}}>{p.creator} · {p.platform}</div>
        </div>
      </div>
      <p style={{color:'#777',fontSize:13,lineHeight:1.55,margin:0,flex:1}}>{p.description}</p>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'auto'}}>
        <div>
          <span style={{color:p.price==='Free'?'#4ade80':'#c9a84c',fontWeight:700,fontSize:16}}>{p.price}</span>
          {p.category && <span style={{color:'#444',fontSize:12,marginLeft:8}}>{p.category}</span>}
        </div>
        <span style={{color:'#c9a84c',fontSize:13,fontWeight:600}}>Get it →</span>
      </div>
    </a>
  )
}
