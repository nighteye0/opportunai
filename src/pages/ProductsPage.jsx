import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const cats = ['All','Notion Templates','UI & Design Kits','Online Courses','Code Templates','eBooks & Guides','AI Prompts','Spreadsheet Templates','Design Assets','Productivity Systems']

  useEffect(() => {
    fetch('/api/products').then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d)?d:(d.products||[])
      setProducts(arr); setFiltered(arr); setLoading(false)
    }).catch(()=>setLoading(false))
  }, [])

  useEffect(() => {
    let arr = products
    if (cat !== 'All') arr = arr.filter(p=>p.category===cat)
    if (search) arr = arr.filter(p=>p.name?.toLowerCase().includes(search.toLowerCase())||p.description?.toLowerCase().includes(search.toLowerCase()))
    setFiltered(arr)
  }, [cat, search, products])

  const featured = products.filter(p=>p.featured).slice(0,4)

  return (
    <div style={{minHeight:'100vh',paddingTop:54,background:'#060606',color:'#ececec',fontFamily:'Inter,-apple-system,sans-serif'}}>
      <div style={{padding:'52px 24px 40px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(245,158,11,0.04), transparent)'}}>
        <div style={{maxWidth:1120,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:24}}>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:'#f59e0b',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:8}}>Marketplace</div>
              <h1 style={{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#fff',letterSpacing:'-0.03em',marginBottom:4}}>Digital Products</h1>
              <p style={{fontSize:13,color:'#444'}}>Templates, courses, tools and resources from top creators</p>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
              <input
                placeholder="Search products..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
                style={{padding:'9px 14px',background:'#0d0d0d',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,fontSize:13,color:'#ececec',fontFamily:'inherit',outline:'none',width:220}}
              />
              <Link to="/submit-product" style={{padding:'9px 14px',background:'#f59e0b',color:'#000',fontWeight:600,fontSize:12,borderRadius:8,textDecoration:'none'}}>+ Submit</Link>
            </div>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:500,border:`1px solid ${cat===c?'rgba(245,158,11,0.35)':'rgba(255,255,255,0.06)'}`,background:cat===c?'#111':'transparent',color:cat===c?'#f59e0b':'#444',cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1120,margin:'0 auto',padding:'36px 24px 72px'}}>
        {cat==='All'&&!search&&featured.length>0&&(
          <div style={{marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:600,color:'#333',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:16}}>Featured</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:10,marginBottom:32}}>
              {featured.map((p,i)=>(
                <a key={i} href={p.website} target="_blank" rel="noopener noreferrer" style={{display:'block',textDecoration:'none',background:'#0d0d0d',border:'1px solid rgba(245,158,11,0.12)',borderRadius:10,padding:20,transition:'all .2s',position:'relative'}}>
                  <div style={{position:'absolute',top:12,right:12,padding:'2px 7px',background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:4,fontSize:10,fontWeight:600,color:'#f59e0b'}}>Featured</div>
                  <div style={{fontSize:22,marginBottom:12}}>{p.logo||'📦'}</div>
                  <div style={{fontSize:13,fontWeight:600,color:'#ddd',marginBottom:4}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#333',marginBottom:10}}>{p.creator} · {p.platform}</div>
                  <div style={{fontSize:12,color:'#444',lineHeight:1.5,marginBottom:14}}>{(p.description||'').slice(0,80)}...</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:13,fontWeight:700,color:'#f59e0b'}}>{p.pricing}</span>
                    <span style={{fontSize:11,color:'#555'}}>Get it →</span>
                  </div>
                </a>
              ))}
            </div>
            <div style={{height:1,background:'rgba(255,255,255,0.06)',marginBottom:36}}/>
          </div>
        )}

        <div style={{fontSize:12,color:'#333',marginBottom:20}}>{filtered.length} products</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:10}}>
          {filtered.map((p,i)=>(
            <a key={i} href={p.website} target="_blank" rel="noopener noreferrer" style={{display:'block',textDecoration:'none',background:'#0d0d0d',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:18,transition:'all .2s'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                <div style={{fontSize:18,width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',background:'#111',border:'1px solid rgba(255,255,255,0.06)',borderRadius:7,flexShrink:0}}>{p.logo||'📦'}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'#ddd'}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#333',marginTop:2}}>{p.creator}</div>
                </div>
              </div>
              <div style={{display:'inline-block',padding:'2px 7px',background:'#111',border:'1px solid rgba(255,255,255,0.06)',borderRadius:4,fontSize:10,fontWeight:600,color:'#444',marginBottom:8}}>{p.category}</div>
              <div style={{fontSize:12,color:'#444',lineHeight:1.5,marginBottom:12}}>{(p.description||'').slice(0,80)}...</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontSize:12,fontWeight:600,color:'#f59e0b'}}>{p.pricing}</span>
                <span style={{fontSize:11,color:'#555'}}>Get it →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
