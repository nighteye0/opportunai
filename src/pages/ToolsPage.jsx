import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ToolsPage() {
  const [tools, setTools] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const cats = ['All','AI','Productivity','Dev Tools','Design','Marketing','Analytics','Communication','Finance','HR']

  useEffect(() => {
    fetch('/api/tools').then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d)?d:(d.tools||[])
      setTools(arr); setFiltered(arr); setLoading(false)
    }).catch(()=>setLoading(false))
  }, [])

  useEffect(() => {
    let arr = tools
    if (cat !== 'All') arr = arr.filter(t=>t.category===cat)
    if (search) arr = arr.filter(t=>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(arr)
  }, [cat, search, tools])

  return (
    <>
      <style>{`
        .inner-page { min-height:100vh; padding-top:54px; background:var(--black); }
        .page-header {
          padding:52px 24px 40px; border-bottom:1px solid var(--border);
          background:radial-gradient(ellipse 70% 100% at 50% 0%, rgba(99,102,241,0.05), transparent);
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
        .search-box:focus { border-color:rgba(99,102,241,0.4); box-shadow:0 0 0 3px rgba(99,102,241,0.07); }
        .filter-row { display:flex; flex-wrap:wrap; gap:6px; }
        .filt {
          padding:5px 12px; border-radius:6px; font-size:12px; font-weight:500;
          border:1px solid var(--border); background:transparent; color:#444;
          cursor:pointer; transition:all .15s; font-family:inherit;
        }
        .filt:hover { background:var(--surface); color:#888; }
        .filt.on { background:var(--surface2); border-color:rgba(99,102,241,0.35); color:#818cf8; }
        .page-body { max-width:1120px; margin:0 auto; padding:36px 24px 72px; }
        .tools-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:10px; }
        .tool-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--radius); padding:20px;
          text-decoration:none; display:block; transition:all .2s;
        }
        .tool-card:hover {
          border-color:var(--border-hover); background:var(--surface2);
          transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,.5);
        }
        .tc-head { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .tc-icon { font-size:22px; width:38px; height:38px; display:flex; align-items:center; justify-content:center; background:var(--surface3); border:1px solid var(--border); border-radius:8px; flex-shrink:0; }
        .tc-meta { flex:1; min-width:0; }
        .tc-name { font-size:13px; font-weight:600; color:#ddd; }
        .tc-cat { font-size:11px; color:#333; margin-top:2px; }
        .tc-desc { font-size:12px; color:#444; line-height:1.55; margin-bottom:14px; }
        .tc-foot { display:flex; align-items:center; justify-content:space-between; }
        .tc-price { font-size:12px; color:#818cf8; font-weight:500; }
        .tc-visit { font-size:11px; color:#555; font-weight:500; padding:4px 10px; background:var(--surface3); border:1px solid var(--border); border-radius:5px; transition:all .15s; }
        .tool-card:hover .tc-visit { color:#aaa; border-color:var(--border-hover); }
        .feat-dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:#818cf8; box-shadow:0 0 6px #818cf8; margin-left:6px; vertical-align:middle; }
        .empty { text-align:center; padding:80px 20px; color:#333; font-size:14px; }
        .count-bar { font-size:12px; color:#333; margin-bottom:20px; }
      `}</style>

      <div className="inner-page">
        <div className="page-header">
          <div className="ph-inner">
            <div className="ph-top">
              <div>
                <div className="eyebrow" style={{marginBottom:8}}>Directory</div>
                <h1 className="ph-title">SaaS Tools</h1>
                <p className="ph-sub">The best tools for remote workers and builders</p>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                <input className="search-box" placeholder="Search tools..." value={search} onChange={e=>setSearch(e.target.value)} />
                <Link to="/submit-tool" className="btn-primary" style={{fontSize:12,padding:'8px 14px'}}>+ Submit Tool</Link>
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
          {loading ? (
            <div className="tools-grid">
              {[1,2,3,4,5,6].map(i=>(
                <div key={i} className="tool-card" style={{opacity:.3}}>
                  <div className="tc-head">
                    <div className="tc-icon" style={{background:'var(--surface3)'}}/>
                    <div><div style={{width:80,height:12,background:'var(--surface3)',borderRadius:4}}/></div>
                  </div>
                  <div style={{width:'90%',height:10,background:'var(--surface3)',borderRadius:4,marginBottom:8}}/>
                  <div style={{width:'70%',height:10,background:'var(--surface3)',borderRadius:4}}/>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty">No tools found. <Link to="/submit-tool" style={{color:'#818cf8'}}>Submit one →</Link></div>
          ) : (
            <>
              <div className="count-bar">{filtered.length} tools</div>
              <div className="tools-grid">
                {filtered.map((t,i)=>(
                  <a key={t.id||i} href={t.website} target="_blank" rel="noopener noreferrer" className="tool-card">
                    <div className="tc-head">
                      <div className="tc-icon">{t.logo||'🔧'}</div>
                      <div className="tc-meta">
                        <div className="tc-name">{t.name}{t.featured&&<span className="feat-dot"/>}</div>
                        <div className="tc-cat">{t.category}</div>
                      </div>
                    </div>
                    <div className="tc-desc">{(t.description||'').slice(0,100)}</div>
                    <div className="tc-foot">
                      <span className="tc-price">{t.pricing||'Free'}</span>
                      <span className="tc-visit">Visit →</span>
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
