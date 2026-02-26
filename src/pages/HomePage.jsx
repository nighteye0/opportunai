import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [q, setQ] = useState('')
  const [jobs, setJobs] = useState([])
  const [tools, setTools] = useState([])
  const [email, setEmail] = useState('')
  const [subMsg, setSubMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/jobs').then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d)?d:(d.jobs||[])
      setJobs(arr.slice(0,6))
    }).catch(()=>{})
    fetch('/api/tools').then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d)?d:(d.tools||[])
      setTools(arr.filter(t=>t.featured).slice(0,3))
    }).catch(()=>{})
  }, [])

  const onSearch = e => {
    e.preventDefault()
    navigate(`/jobs${q?'?search='+encodeURIComponent(q):''}`)
  }

  const onSub = async e => {
    e.preventDefault()
    if(!email) return
    try {
      const r = await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
      const d = await r.json()
      setSubMsg(d.message||'You're in!')
      setEmail('')
    } catch { setSubMsg('You're in!') }
  }

  const tags = ['Engineering','Design','Marketing','DevOps','AI / ML','Product','Customer Success']
  const stats = [
    {n:'117+',l:'Remote Jobs'},
    {n:'5',l:'Job Sources'},
    {n:'50+',l:'SaaS Tools'},
    {n:'50+',l:'Products'},
  ]

  return (
    <>
      <style>{`
        /* ── HERO ── */
        .hero {
          position:relative; overflow:hidden;
          min-height:100vh; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          padding:100px 24px 80px; text-align:center;
        }
        .hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          padding:5px 14px; border-radius:100px;
          background:rgba(99,102,241,0.07);
          border:1px solid rgba(99,102,241,0.18);
          font-size:12px; font-weight:500; color:#818cf8;
          margin-bottom:24px;
        }
        .bdot { width:6px;height:6px;border-radius:50%;background:#818cf8;animation:pulse-dot 2s ease-in-out infinite; }
        .hero-h1 {
          font-size:clamp(38px,7.5vw,84px);
          font-weight:800; letter-spacing:-0.045em; line-height:1.03;
          color:#fff; margin-bottom:20px; max-width:800px;
        }
        .hero-h1 em {
          font-style:normal;
          background:linear-gradient(120deg,#818cf8 0%,#c084fc 55%,#f472b6 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .hero-p {
          font-size:17px; color:#555; line-height:1.7;
          max-width:420px; margin:0 auto 36px; font-weight:400;
        }
        .search-row {
          display:flex; gap:8px; max-width:520px; width:100%;
          margin-bottom:16px;
        }
        .search-input {
          flex:1; padding:11px 16px;
          background:var(--surface); border:1px solid rgba(255,255,255,0.08);
          border-radius:9px; font-size:14px; color:var(--text);
          outline:none; font-family:inherit; transition:all .2s;
        }
        .search-input::placeholder { color:#333; }
        .search-input:focus {
          border-color:rgba(99,102,241,0.45);
          box-shadow:0 0 0 3px rgba(99,102,241,0.07);
        }
        .tag-row {
          display:flex; flex-wrap:wrap; gap:6px; justify-content:center;
          margin-bottom:56px;
        }
        .tag-pill {
          padding:4px 12px; border-radius:100px;
          background:var(--surface); border:1px solid var(--border);
          font-size:12px; color:#444; cursor:pointer;
          transition:all .15s; text-decoration:none;
        }
        .tag-pill:hover { background:var(--surface2); color:#aaa; border-color:rgba(255,255,255,0.1); }

        /* STATS BAR */
        .stats-bar {
          display:flex; border:1px solid var(--border); border-radius:var(--radius-lg);
          overflow:hidden; width:100%; max-width:580px;
          background:var(--surface);
        }
        .stat-cell {
          flex:1; padding:20px 12px; text-align:center;
          border-right:1px solid var(--border);
        }
        .stat-cell:last-child { border-right:none; }
        .stat-n { font-size:22px; font-weight:700; color:#fff; letter-spacing:-.025em; }
        .stat-l { font-size:11px; color:#444; margin-top:3px; font-weight:500; }

        /* GRID */
        .grid-2 { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:10px; }
        .grid-3 { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:10px; }

        /* JOB CARD */
        .jc {
          display:block; text-decoration:none; padding:18px;
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--radius); transition:all .2s;
        }
        .jc:hover {
          border-color:var(--border-hover); background:var(--surface2);
          transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,.45);
        }
        .jc-top { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .jc-img {
          width:34px;height:34px;border-radius:8px;
          background:var(--surface3); border:1px solid var(--border);
          display:flex;align-items:center;justify-content:center;
          font-size:15px; flex-shrink:0; overflow:hidden;
        }
        .jc-img img { width:100%;height:100%;object-fit:cover; }
        .jc-co { font-size:12px; color:#444; font-weight:500; }
        .jc-title { font-size:13px; font-weight:600; color:#ddd; line-height:1.35; margin-bottom:10px; }
        .jc-tags { display:flex; flex-wrap:wrap; gap:5px; }
        .jc-tag {
          padding:2px 7px; border-radius:4px; font-size:11px; font-weight:500;
          background:var(--surface3); border:1px solid var(--border); color:#555;
        }
        .jc-tag-g { background:rgba(34,197,94,0.05); border-color:rgba(34,197,94,0.12); color:#4ade80; }

        /* TOOL CARD */
        .tc {
          display:block; text-decoration:none; padding:20px;
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--radius); transition:all .2s;
        }
        .tc:hover {
          border-color:var(--border-hover); transform:translateY(-1px);
          box-shadow:0 8px 28px rgba(0,0,0,.45);
        }
        .tc-icon { font-size:22px; margin-bottom:10px; display:block; }
        .tc-name { font-size:13px; font-weight:600; color:#ddd; margin-bottom:5px; }
        .tc-desc { font-size:12px; color:#444; line-height:1.55; margin-bottom:12px; }
        .tc-price { font-size:12px; color:var(--accent-light); font-weight:500; }

        /* CTA STRIP */
        .cta-strip {
          border-radius:var(--radius-lg);
          background:linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.06) 100%);
          border:1px solid rgba(99,102,241,0.18);
          padding:40px 36px; display:flex; align-items:center;
          justify-content:space-between; flex-wrap:wrap; gap:20px;
        }
        .cta-h { font-size:20px; font-weight:700; color:#fff; letter-spacing:-.02em; margin-bottom:5px; }
        .cta-p { font-size:13px; color:#555; }

        /* NL CARD */
        .nl-card {
          border-radius:var(--radius-lg);
          background:var(--surface); border:1px solid var(--border);
          padding:40px; text-align:center; position:relative; overflow:hidden;
        }
        .nl-card::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 70% 120% at 50% 0%, rgba(99,102,241,0.05), transparent);
          pointer-events:none;
        }
        .nl-h { font-size:20px; font-weight:700; color:#fff; letter-spacing:-.02em; margin-bottom:6px; }
        .nl-p { font-size:13px; color:#555; margin-bottom:20px; }
        .nl-form { display:flex; gap:8px; max-width:380px; margin:0 auto; }

        /* FOOTER */
        .footer {
          border-top:1px solid var(--border); padding:28px 24px;
          text-align:center; color:#333; font-size:12px; margin-top:32px;
        }

        @media(max-width:640px) {
          .search-row,.nl-form { flex-direction:column; }
          .stats-bar { flex-wrap:wrap; }
          .stat-cell { min-width:50%; border-right:none; border-bottom:1px solid var(--border); }
          .cta-strip { flex-direction:column; text-align:center; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="mesh" aria-hidden>
          <div className="mesh-blob" style={{width:700,height:700,background:'radial-gradient(circle,rgba(99,102,241,0.09) 0%,transparent 65%)',top:-200,left:'50%',transform:'translateX(-50%)'}} />
          <div className="mesh-blob" style={{width:400,height:400,background:'radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 65%)',bottom:-100,right:-80}} />
        </div>
        <div className="dot-bg" style={{position:'absolute',inset:0,opacity:0.6}} />

        <div className="hero-badge a1">
          <span className="bdot"/>
          117+ remote jobs updated daily
        </div>

        <h1 className="hero-h1 a2">
          Find remote work<br/>built for <em>what's next</em>
        </h1>

        <p className="hero-p a3">
          Curated remote jobs, SaaS tools, and digital products for the next generation of workers.
        </p>

        <form className="search-row a4" onSubmit={onSearch}>
          <input
            className="search-input"
            placeholder="Search jobs, companies, skills..."
            value={q} onChange={e=>setQ(e.target.value)}
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>

        <div className="tag-row a4">
          {tags.map(t=><Link key={t} to={`/jobs?search=${t}`} className="tag-pill">{t}</Link>)}
        </div>

        <div className="stats-bar a5">
          {stats.map(s=>(
            <div key={s.l} className="stat-cell">
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <div className="container">
        <div className="section">
          <div className="eyebrow">Latest openings</div>
          <h2 className="section-title">Remote jobs, live now</h2>
          <div className="grid-2">
            {jobs.length > 0 ? jobs.map((j,i)=>(
              <a key={j.id||i} href={j.url} target="_blank" rel="noopener noreferrer" className="jc">
                <div className="jc-top">
                  <div className="jc-img">
                    {j.company_logo?<img src={j.company_logo} alt=""/>:'🏢'}
                  </div>
                  <span className="jc-co">{j.company_name||j.company||'Company'}</span>
                </div>
                <div className="jc-title">{j.title}</div>
                <div className="jc-tags">
                  {j.job_type&&<span className="jc-tag">{j.job_type}</span>}
                  {j.candidate_required_location&&<span className="jc-tag">{j.candidate_required_location}</span>}
                  {j.salary&&<span className="jc-tag jc-tag-g">{j.salary}</span>}
                </div>
              </a>
            )) : [1,2,3,4,5,6].map(i=>(
              <div key={i} className="jc" style={{opacity:0.25}}>
                <div className="jc-top">
                  <div className="jc-img"/>
                  <div style={{width:70,height:10,background:'#1a1a1a',borderRadius:4}}/>
                </div>
                <div style={{width:'65%',height:13,background:'#1a1a1a',borderRadius:4,marginBottom:10}}/>
                <div style={{display:'flex',gap:5}}>
                  <div style={{width:50,height:16,background:'#111',borderRadius:4}}/>
                  <div style={{width:70,height:16,background:'#111',borderRadius:4}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:24}}>
            <Link to="/jobs" className="btn-secondary">View all jobs →</Link>
          </div>
        </div>
      </div>

      <div className="container"><div className="divider"/></div>

      {/* TOOLS */}
      {tools.length > 0 && (
        <div className="container">
          <div className="section">
            <div className="eyebrow">Essential stack</div>
            <h2 className="section-title">Top tools for remote workers</h2>
            <div className="grid-3">
              {tools.map((t,i)=>(
                <a key={t.id||i} href={t.website} target="_blank" rel="noopener noreferrer" className="tc">
                  <span className="tc-icon">{t.logo||'🔧'}</span>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-desc">{(t.description||'').slice(0,80)}...</div>
                  <div className="tc-price">{t.pricing||'Free'}</div>
                </a>
              ))}
            </div>
            <div style={{marginTop:24}}>
              <Link to="/tools" className="btn-secondary">Browse all tools →</Link>
            </div>
          </div>
        </div>
      )}

      <div className="container"><div className="divider"/></div>

      {/* NEWSLETTER */}
      <div className="container">
        <div className="section">
          <div className="nl-card">
            <h3 className="nl-h">Stay ahead of the curve</h3>
            <p className="nl-p">Get the best remote jobs and tools delivered to your inbox every week.</p>
            <form className="nl-form" onSubmit={onSub}>
              <input
                className="search-input" type="email"
                placeholder="your@email.com"
                value={email} onChange={e=>setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
            {subMsg&&<p style={{marginTop:12,fontSize:13,color:'#4ade80'}}>{subMsg}</p>}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container" style={{paddingBottom:80}}>
        <div className="cta-strip">
          <div>
            <div className="cta-h">Hiring remote talent?</div>
            <p className="cta-p">Post your job free and reach thousands of qualified remote candidates.</p>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <Link to="/post-job" className="btn-primary">Post a job free</Link>
            <Link to="/jobs" className="btn-secondary">Browse jobs</Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025 OpportuAI · Built for the future of remote work
      </footer>
    </>
  )
}
