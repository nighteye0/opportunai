import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PARTICLES = Array.from({length: 40}, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  speed: Math.random() * 0.3 + 0.1,
  opacity: Math.random() * 0.5 + 0.1,
}))

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState([])
  const [tools, setTools] = useState([])
  const [jobCount, setJobCount] = useState(0)
  const [tick, setTick] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/jobs?limit=6').then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : (d.jobs || [])
      setJobs(arr.slice(0, 6))
      setJobCount(arr.length)
    }).catch(() => {})
    fetch('/api/tools').then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : (d.tools || [])
      setTools(arr.filter(t => t.featured).slice(0, 4))
    }).catch(() => {})
    const id = setInterval(() => setTick(t => t + 1), 100)
    return () => clearInterval(id)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/jobs?search=${encodeURIComponent(query)}`)
    else navigate('/jobs')
  }

  const stats = [
    { value: '117+', label: 'Live Jobs', color: '#00f5ff' },
    { value: '5', label: 'Data Sources', color: '#00ff88' },
    { value: '50+', label: 'SaaS Tools', color: '#c9a84c' },
    { value: '100%', label: 'Remote Only', color: '#7b5ea7' },
  ]

  const tags = ['Engineering', 'Design', 'Marketing', 'DevOps', 'AI/ML', 'Product', 'Sales']

  return (
    <>
      <style>{`
        .home { min-height: 100vh; position: relative; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 120px 24px 80px;
          position: relative; overflow: hidden;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }
        .hero-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: #00f5ff;
          pointer-events: none;
          animation: float-particle linear infinite;
        }
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        .hero-content { position: relative; z-index: 1; text-align: center; max-width: 900px; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 16px;
          background: rgba(0,245,255,0.05);
          border: 1px solid rgba(0,245,255,0.15);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: rgba(0,245,255,0.8);
          letter-spacing: 1px;
          margin-bottom: 32px;
          animation: slide-in 0.5s ease forwards;
        }
        .hero-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00ff88;
          box-shadow: 0 0 8px #00ff88;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .hero-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(36px, 7vw, 88px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -2px;
          margin-bottom: 24px;
          animation: slide-in 0.6s ease 0.1s both forwards;
          opacity: 0;
        }
        .hero-title .line1 { color: #e8f4ff; display: block; }
        .hero-title .line2 {
          display: block;
          background: linear-gradient(135deg, #00f5ff 0%, #00c8d4 40%, #7b5ea7 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(0,245,255,0.4));
        }
        .hero-sub {
          font-size: 16px; color: rgba(200,220,255,0.5);
          line-height: 1.6; max-width: 500px; margin: 0 auto 48px;
          font-weight: 400;
          animation: slide-in 0.6s ease 0.2s both forwards;
          opacity: 0;
        }
        .search-wrap {
          position: relative; max-width: 640px; margin: 0 auto 24px;
          animation: slide-in 0.6s ease 0.3s both forwards;
          opacity: 0;
        }
        .search-bar {
          width: 100%;
          background: rgba(6,13,20,0.9);
          border: 1px solid rgba(0,245,255,0.2);
          border-radius: 8px;
          padding: 18px 140px 18px 52px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; color: #e8f4ff;
          outline: none;
          transition: all 0.3s;
          backdrop-filter: blur(12px);
        }
        .search-bar::placeholder { color: rgba(200,220,255,0.25); }
        .search-bar:focus {
          border-color: rgba(0,245,255,0.5);
          box-shadow: 0 0 30px rgba(0,245,255,0.1), inset 0 0 20px rgba(0,245,255,0.02);
        }
        .search-icon {
          position: absolute; left: 18px; top: 50%; transform: translateY(-50%);
          font-size: 18px; opacity: 0.4;
        }
        .search-btn {
          position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
          padding: 10px 20px;
          background: linear-gradient(135deg, #00f5ff, #00c8d4);
          color: #020408;
          font-family: 'Orbitron', monospace;
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: none; border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .search-btn:hover { box-shadow: 0 0 20px rgba(0,245,255,0.4); }
        .tags-row {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
          animation: slide-in 0.6s ease 0.4s both forwards; opacity: 0;
        }
        .tag-pill {
          padding: 6px 14px;
          background: rgba(0,245,255,0.04);
          border: 1px solid rgba(0,245,255,0.1);
          border-radius: 100px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; color: rgba(200,220,255,0.5);
          cursor: pointer; transition: all 0.2s; text-decoration: none;
        }
        .tag-pill:hover {
          border-color: rgba(0,245,255,0.3);
          color: #00f5ff; background: rgba(0,245,255,0.06);
        }

        /* STATS */
        .stats-bar {
          display: grid; grid-template-columns: repeat(4, 1fr);
          max-width: 900px; margin: 0 auto;
          border: 1px solid rgba(0,245,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(6,13,20,0.6);
          backdrop-filter: blur(12px);
        }
        .stat-item {
          padding: 28px 24px; text-align: center;
          border-right: 1px solid rgba(0,245,255,0.08);
          transition: background 0.3s;
        }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: rgba(0,245,255,0.03); }
        .stat-value {
          font-family: 'Orbitron', monospace;
          font-size: 32px; font-weight: 700;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 11px; color: rgba(200,220,255,0.4);
          letter-spacing: 1px; text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }

        /* SECTIONS */
        .section { padding: 100px 24px; max-width: 1280px; margin: 0 auto; }
        .section-head { margin-bottom: 48px; }

        /* JOB CARDS */
        .jobs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
        .job-card {
          background: rgba(6,13,20,0.8);
          border: 1px solid rgba(0,245,255,0.08);
          border-radius: 10px;
          padding: 24px;
          text-decoration: none;
          display: block;
          transition: all 0.3s; position: relative; overflow: hidden;
          backdrop-filter: blur(8px);
        }
        .job-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #00f5ff, transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .job-card:hover::before { opacity: 1; }
        .job-card:hover {
          border-color: rgba(0,245,255,0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,245,255,0.06);
        }
        .job-company {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .company-logo {
          width: 40px; height: 40px; border-radius: 8px;
          background: rgba(0,245,255,0.08);
          border: 1px solid rgba(0,245,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .company-name { font-size: 12px; color: rgba(200,220,255,0.4); font-family: 'JetBrains Mono', monospace; }
        .job-title { font-size: 15px; font-weight: 600; color: #e8f4ff; margin-bottom: 12px; line-height: 1.3; }
        .job-meta { display: flex; flex-wrap: wrap; gap: 6px; }
        .job-tag {
          padding: 3px 8px;
          background: rgba(0,245,255,0.05);
          border: 1px solid rgba(0,245,255,0.1);
          border-radius: 3px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: rgba(0,245,255,0.6);
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .job-salary { color: #00ff88; border-color: rgba(0,255,136,0.15); background: rgba(0,255,136,0.04); }

        /* TOOLS GRID */
        .tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .tool-card {
          background: rgba(6,13,20,0.8);
          border: 1px solid rgba(0,245,255,0.08);
          border-radius: 10px; padding: 24px;
          transition: all 0.3s; position: relative; overflow: hidden;
          backdrop-filter: blur(8px);
        }
        .tool-card:hover {
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 0 30px rgba(201,168,76,0.06);
          transform: translateY(-2px);
        }
        .tool-emoji { font-size: 28px; margin-bottom: 14px; display: block; }
        .tool-name { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 600; color: #e8f4ff; margin-bottom: 8px; }
        .tool-desc { font-size: 13px; color: rgba(200,220,255,0.45); line-height: 1.5; margin-bottom: 16px; }
        .tool-price {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          color: #c9a84c;
        }

        /* CTA */
        .cta-section {
          padding: 80px 24px; text-align: center;
          background: rgba(0,245,255,0.02);
          border-top: 1px solid rgba(0,245,255,0.06);
          border-bottom: 1px solid rgba(0,245,255,0.06);
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,245,255,0.03), transparent);
        }
        .cta-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(24px, 4vw, 42px); font-weight: 700;
          color: #e8f4ff; margin-bottom: 16px; position: relative;
        }
        .cta-sub { color: rgba(200,220,255,0.45); font-size: 15px; margin-bottom: 36px; position: relative; }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; }

        @media (max-width: 640px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .hero-title { letter-spacing: -1px; }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="home">
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-glow" />
          {PARTICLES.map(p => (
            <div key={p.id} className="particle" style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: `${p.size}px`, height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.speed * 20 + 10}s`,
              animationDelay: `${p.id * 0.3}s`,
            }} />
          ))}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-dot" />
              SYSTEM ONLINE — {jobCount || '117'}+ REMOTE OPPORTUNITIES
            </div>
            <h1 className="hero-title">
              <span className="line1">FIND YOUR</span>
              <span className="line2">REMOTE FUTURE</span>
            </h1>
            <p className="hero-sub">
              AI-curated remote jobs, tools & products for the next generation of digital workers.
            </p>
            <form className="search-wrap" onSubmit={handleSearch}>
              <span className="search-icon">⌕</span>
              <input
                className="search-bar"
                placeholder="Search jobs, skills, companies..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">SEARCH</button>
            </form>
            <div className="tags-row">
              {tags.map(tag => (
                <Link key={tag} to={`/jobs?search=${tag}`} className="tag-pill">{tag}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <div style={{padding: '0 24px 80px', maxWidth: 1280, margin: '0 auto'}}>
          <div className="stats-bar">
            {stats.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-value" style={{color: s.color, textShadow: `0 0 20px ${s.color}60`}}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED JOBS */}
        <div className="section">
          <div className="section-head">
            <div className="section-label" style={{marginBottom: 16}}>LIVE FEED</div>
            <h2 className="section-title">Latest <span className="accent">Opportunities</span></h2>
          </div>
          <div className="jobs-grid">
            {jobs.length > 0 ? jobs.map((job, i) => (
              <a key={job.id || i} href={job.url} target="_blank" rel="noopener noreferrer" className="job-card">
                <div className="job-company">
                  <div className="company-logo">
                    {job.company_logo ? <img src={job.company_logo} alt="" style={{width:'100%',height:'100%',borderRadius:7,objectFit:'cover'}} /> : '🏢'}
                  </div>
                  <span className="company-name">{job.company_name || job.company || 'Company'}</span>
                </div>
                <div className="job-title">{job.title}</div>
                <div className="job-meta">
                  {job.job_type && <span className="job-tag">{job.job_type}</span>}
                  {job.candidate_required_location && <span className="job-tag">{job.candidate_required_location}</span>}
                  {job.salary && <span className="job-tag job-salary">{job.salary}</span>}
                </div>
              </a>
            )) : [1,2,3,4,5,6].map(i => (
              <div key={i} className="job-card" style={{opacity:0.4}}>
                <div className="job-company">
                  <div className="company-logo" style={{background:'rgba(0,245,255,0.03)'}} />
                  <div style={{width:80,height:10,background:'rgba(200,220,255,0.06)',borderRadius:4}} />
                </div>
                <div style={{width:'70%',height:14,background:'rgba(200,220,255,0.06)',borderRadius:4,marginBottom:12}} />
                <div style={{display:'flex',gap:6}}>
                  <div style={{width:60,height:20,background:'rgba(0,245,255,0.04)',borderRadius:3}} />
                  <div style={{width:80,height:20,background:'rgba(0,245,255,0.04)',borderRadius:3}} />
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:40}}>
            <Link to="/jobs" className="btn-cyber">VIEW ALL JOBS →</Link>
          </div>
        </div>

        {/* FEATURED TOOLS */}
        {tools.length > 0 && (
          <div className="section" style={{paddingTop:0}}>
            <div className="section-head">
              <div className="section-label" style={{marginBottom:16}}>ARSENAL</div>
              <h2 className="section-title">Top <span className="accent">Tools</span></h2>
            </div>
            <div className="tools-grid">
              {tools.map((tool, i) => (
                <a key={tool.id || i} href={tool.website} target="_blank" rel="noopener noreferrer" className="tool-card" style={{textDecoration:'none'}}>
                  <span className="tool-emoji">{tool.logo || '🔧'}</span>
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-desc">{tool.description?.slice(0, 80)}...</div>
                  <div className="tool-price">{tool.pricing || 'Free'}</div>
                </a>
              ))}
            </div>
            <div style={{textAlign:'center', marginTop:40}}>
              <Link to="/tools" className="btn-cyber" style={{borderColor:'#c9a84c',color:'#c9a84c'}}>EXPLORE TOOLS →</Link>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="cta-section">
          <h2 className="cta-title">HIRING REMOTELY?</h2>
          <p className="cta-sub">Post your job and reach thousands of remote-first candidates worldwide.</p>
          <div className="cta-btns">
            <Link to="/post-job" className="btn-solid">POST A JOB FREE</Link>
            <Link to="/jobs" className="btn-cyber">BROWSE JOBS</Link>
          </div>
        </div>
      </div>
    </>
  )
}
