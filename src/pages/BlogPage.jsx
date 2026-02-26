import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [cat, setCat] = useState('All')
  const [loading, setLoading] = useState(true)

  const cats = ['All','Remote Work','SaaS Reviews','Career Tips','Tools']

  useEffect(() => {
    fetch('/api/blog').then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d)?d:(d.posts||[])
      setPosts(arr); setLoading(false)
    }).catch(()=>setLoading(false))
  }, [])

  const filtered = cat==='All' ? posts : posts.filter(p=>p.category===cat)
  const featured = posts.find(p=>p.featured) || posts[0]
  const rest = filtered.filter(p=>p.slug!==featured?.slug)

  return (
    <>
      <style>{`
        .blog-page { min-height:100vh; padding-top:54px; background:var(--black); }
        .page-header {
          padding:52px 24px 40px; border-bottom:1px solid var(--border);
          background:radial-gradient(ellipse 70% 100% at 50% 0%, rgba(99,102,241,0.04), transparent);
        }
        .ph-inner { max-width:1120px; margin:0 auto; }
        .ph-title { font-size:clamp(22px,4vw,32px); font-weight:800; color:#fff; letter-spacing:-.03em; margin-bottom:4px; }
        .ph-sub { font-size:13px; color:#444; margin-bottom:24px; }
        .filter-row { display:flex; flex-wrap:wrap; gap:6px; }
        .filt {
          padding:5px 12px; border-radius:6px; font-size:12px; font-weight:500;
          border:1px solid var(--border); background:transparent; color:#444;
          cursor:pointer; transition:all .15s; font-family:inherit;
        }
        .filt:hover { background:var(--surface); color:#888; }
        .filt.on { background:var(--surface2); border-color:rgba(99,102,241,0.35); color:#818cf8; }
        .page-body { max-width:1120px; margin:0 auto; padding:36px 24px 72px; }

        /* Featured */
        .feat-post {
          display:block; text-decoration:none;
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--radius-lg); padding:32px;
          margin-bottom:32px; transition:all .2s; position:relative; overflow:hidden;
        }
        .feat-post::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse 80% 120% at 0% 0%, rgba(99,102,241,0.05), transparent);
        }
        .feat-post:hover { border-color:var(--border-hover); transform:translateY(-1px); box-shadow:0 12px 40px rgba(0,0,0,.5); }
        .feat-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 8px; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-radius:4px; font-size:10px; font-weight:600; color:#818cf8; letter-spacing:.04em; margin-bottom:14px; }
        .feat-title { font-size:clamp(18px,3vw,24px); font-weight:700; color:#fff; letter-spacing:-.025em; line-height:1.25; margin-bottom:10px; }
        .feat-excerpt { font-size:13px; color:#444; line-height:1.65; margin-bottom:16px; }
        .feat-meta { display:flex; align-items:center; gap:12px; font-size:11px; color:#333; }
        .feat-cat { padding:2px 7px; background:var(--surface3); border:1px solid var(--border); border-radius:4px; color:#444; font-weight:500; }

        /* Posts grid */
        .posts-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:10px; }
        .post-card {
          display:block; text-decoration:none;
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--radius); padding:20px; transition:all .2s;
        }
        .post-card:hover { border-color:var(--border-hover); background:var(--surface2); transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,.5); }
        .pc-cat { display:inline-block; padding:2px 7px; background:var(--surface3); border:1px solid var(--border); border-radius:4px; font-size:10px; font-weight:600; color:#444; letter-spacing:.04em; margin-bottom:10px; }
        .pc-title { font-size:14px; font-weight:600; color:#ddd; line-height:1.35; margin-bottom:8px; }
        .pc-excerpt { font-size:12px; color:#444; line-height:1.55; margin-bottom:14px; }
        .pc-meta { font-size:11px; color:#333; display:flex; align-items:center; justify-content:space-between; }
        .pc-read { color:#818cf8; font-weight:500; }
        .empty { text-align:center; padding:80px 20px; color:#333; font-size:14px; }
      `}</style>

      <div className="blog-page">
        <div className="page-header">
          <div className="ph-inner">
            <div className="eyebrow" style={{marginBottom:8}}>Editorial</div>
            <h1 className="ph-title">Blog</h1>
            <p className="ph-sub">Remote work tips, SaaS reviews, and career advice</p>
            <div className="filter-row">
              {cats.map(c=>(
                <button key={c} className={`filt${cat===c?' on':''}`} onClick={()=>setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="page-body">
          {loading ? (
            <div style={{opacity:.25}}>
              <div className="feat-post"><div style={{width:'60%',height:22,background:'var(--surface3)',borderRadius:4}}/></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty">No posts yet.</div>
          ) : (
            <>
              {featured && cat==='All' && (
                <Link to={`/blog/${featured.slug}`} className="feat-post">
                  <div className="feat-badge">✦ Featured</div>
                  <h2 className="feat-title">{featured.title}</h2>
                  <p className="feat-excerpt">{(featured.excerpt||featured.content||'').slice(0,160)}...</p>
                  <div className="feat-meta">
                    <span className="feat-cat">{featured.category}</span>
                    <span>{featured.author}</span>
                    <span>{featured.read_time||'5 min read'}</span>
                    <span style={{marginLeft:'auto',color:'#818cf8',fontWeight:500}}>Read →</span>
                  </div>
                </Link>
              )}
              <div className="posts-grid">
                {(cat==='All'?rest:filtered).map((p,i)=>(
                  <Link key={p.slug||i} to={`/blog/${p.slug}`} className="post-card">
                    <span className="pc-cat">{p.category}</span>
                    <h3 className="pc-title">{p.title}</h3>
                    <p className="pc-excerpt">{(p.excerpt||p.content||'').slice(0,100)}...</p>
                    <div className="pc-meta">
                      <span>{p.read_time||'5 min read'}</span>
                      <span className="pc-read">Read →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
