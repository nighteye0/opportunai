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
    if (search) arr = arr.filter(p=>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(arr)
  }, [cat, search, products])

  const featured = products.filter(p=>p.featured).slice(0,4)

  return (
    <>
      <style>{`
        .prod-page { min-height:100vh; padding-top:54px; background:var(--black); }
        .page-header {
          padding:52px 24px 40px; border-bottom:1px solid var(--border);
          background:radial-gradient(ellipse 70% 100% at 50% 0%, rgba(245,158,11,0.04), transparent);
        }
        .ph-inner { max-width:1120px; margin:0 auto; }
        .ph-top { display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:24px; }
        .ph-title { font-size:clamp(22px,4vw,32px); font-weight:800; color:#fff; letter-spacing:-.03em; }
        .ph-sub { font-size:13px; color:#444; margin-top:4px; }
        .search-box {
          padding:9px 14px; background:var(--surface); border:1px solid var(--border);
          border-radius:8px; font-size:13px; color:var(--text); font-family:inherit;
          outline:none; width:220px; transition:all .2s;
        }
        .search-box::placeholder { color:#333; }
        .search-box:focus { border-color:rgba(245,158,11,0.35); box-shadow:0 0 0 3px rgba(245,158,11,0.06); }
        .filter-row { display:flex; flex-wrap:wrap; gap:6px; }
        .filt {
          padding:5px 12px; border-radius:6px; font-size:12px; font-weight:500;
          border:1px solid var(--border); background:transparent; color:#444;
          cursor:pointer; transition:all .15s; font-family:inherit;
        }
        .filt:hover { background:var(--surface); color:#888; }
        .filt.on { background:var(--surface2); border-color:rgba(245,158,11,0.35); color:#f59e0b; }

        .page-body { max-width:1120px; margin:0 auto; padding:36px 24px 72px; }

        /* Featured row */
        .feat-row { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:10px; margin-bottom:48px; }
        .feat-card {
          background:var(--surface); border:1px solid rgba(245,158,11,0.12);
          border-radius:var(--radius); padding:20px;
          text-decoration:none; display:block; transition:all .2s; position:relative;
        }
        .feat-card:hover {
          border-color:rgba(245,158,11,0.25); background:var(--surface2);
          transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,.5);
        }
        .feat-label {
          position:absolute; top:12px; right:12px;
          padding:2px 7px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2);
          border-radius:4px; font-size:10px; font-weight:600; color:#f59e0b; letter-spacing:.04em;
        }
        .fc-img { width:40px; height:40px; border-radius:8px; margin-bottom:12px; display:flex; align-items:center; justify-content:center; font-size:20px; background:var(--surface3); border:1px solid var(--border); }
        .fc-name { font-size:13px; font-weight:600; color:#ddd; margin-bottom:4px; }
        .fc-creator { font-size:11px; color:#333; margin-bottom:10px; }
        .fc-desc { font-size:12px; color:#444; line-height:1.5; margin-bottom:14px; }
        .fc-foot { display:flex; align-items:center; justify-content:space-between; }
        .fc-price { font-size:13px; font-weight:700; color:#f59e0b; }
        .fc-get { font-size:11px; color:#555; padding:4px 10px; background:var(--surface3); border:1px solid var(--border); border-radius:5px; }
        .feat-card:hover .fc-get { color:#aaa; }

        /* All products */
        .prod-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:10px; }
        .prod-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--radius); padding:18px;
          text-decoration:none; display:block; transition:all .2s;
        }
        .prod-card:hover {
          border-color:var(--border-hover); background:var(--surface2);
          transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,.5);
        }
        .pc-head { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
        .pc-icon { font-size:18px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; background:var(--surface3); border:1px solid var(--border); border-radius:7px; flex-shrink:0; }
        .pc-name { font-size:13px; font-weight:600; color:#ddd; }
        .pc-by { font-size:11px; color:#333; margin-top:2px; }
        .pc-cat { font-size:10px; padding:2px 7px; background:var(--surface3); border:1px solid var(--border); border-radius:4px; color:#444; display:inline-block; margin-bottom:8px; font-weight:500; }
        .pc-desc { font-size:12px; color:#444; line-height:1.5; margin-bottom:12px; }
        .pc-foot { display:flex; align-items:center; justify-content:space-between; }
        .pc-price { font-size:12px; font-weight:600; color:#f59e0b; }
        .pc-get { font-size:11px; color:#555; }
        .prod-card:hover .pc-get { color:#aaa; }
        .count-bar { font-size:12px; color:#333; margin-bottom:20px; }
        .sec-label { font-size:11px; font-weight:600; color:#333; letter-spacing:.06em; text-transform:uppercase; margin-bottom:16px; }
        .empty { text-align:center; padding:80px 20px; color:#333; font-size:14px; }
      `}</style>

      <div className="prod-page">
        <div className="page-header">
          <div className="ph-inner">
            <div className="ph-top">
              <div>
                <div className="eyebrow" style={{marginBottom:8,color:'#f59e0b'}}>Marketplace</div>
                <h1 className="ph-title">Digital Products</h1>
                <p className="ph-sub">Templates, courses, tools and resources from top creators</p>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                <input className="search-box" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} />
                <Link to="/submit-product" className="btn-primary" style={{fontSize:12,padding:'8px 14px',background:'#f59e0b',color:'#000'}}>+ Submit</Link>
              </div>
            </div>
            <div className="filter-row">
              {cats.map(c=>(
                <button key={c} className={`filt${cat===c?' on':''}`} onClick={()=>setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="page-body">
          {cat === 'All' && !search && featured.length > 0 && (
            <div style={{marginBottom:48}}>
              <div className="sec-label">Featured</div>
              <div className="feat-row">
                {featured.map((p,i)=>(
                  <a key={p.id||i} href={p.website} target="_blank" rel="noopener noreferrer" className="feat-card">
                    <span className="feat-label">Featured</span>
                    <div className="fc-img">{p.logo||'📦'}</div>
                    <div className="fc-name">{p.name}</div>
                    <div className="fc-creator">{p.creator} · {p.platform}</div>
                    <div className="fc-desc">{(p.description||'').slice(0,80)}...</div>
                    <div className="fc-foot">
                      <span className="fc-price">{p.pricing}</span>
                      <span className="fc-get">Get it →</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="divider" style={{marginBottom:36}}/>
            </div>
          )}

          {loading ? (
            <div className="prod-grid">
              {[1,2,3,4,5,6].map(i=>(
                <div key={i} className="prod-card" style={{opacity:.25}}>
                  <div className="pc-head"><div className="pc-icon"/><div style={{width:80,height:12,background:'var(--surface3)',borderRadius:4}}/></div>
                  <div style={{width:'90%',height:10,background:'var(--surface3)',borderRadius:4,marginBottom:6}}/>
                  <div style={{width:'60%',height:10,background:'var(--surface3)',borderRadius:4}}/>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty">No products found.</div>
          ) : (
            <>
              <div className="count-bar">{filtered.length} products</div>
              <div className="prod-grid">
                {filtered.map((p,i)=>(
                  <a key={p.id||i} href={p.website} target="_blank" rel="noopener noreferrer" className="prod-card">
                    <div className="pc-head">
                      <div className="pc-icon">{p.logo||'📦'}</div>
                      <div>
                        <div className="pc-name">{p.name}</div>
                        <div className="pc-by">{p.creator}</div>
                      </div>
                    </div>
                    <span className="pc-cat">{p.category}</span>
                    <div className="pc-desc">{(p.description||'').slice(0,80)}...</div>
                    <div className="pc-foot">
                      <span className="pc-price">{p.pricing}</span>
                      <span className="pc-get">Get it →</span>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
