import { useState, useEffect, useRef } from 'react'

const STATS = [
  { value: '65+', label: 'Live Jobs' },
  { value: '50+', label: 'SaaS Tools' },
  { value: '3', label: 'Job Sources' },
  { value: '100%', label: 'Remote' },
]

const TAGS = ['React', 'Python', 'AI/ML', 'Design', 'Marketing', 'DevOps', 'Node.js', 'TypeScript']


function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('') // '', 'loading', 'success', 'error', 'already'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (data.error === 'already_subscribed') setStatus('already')
      else if (data.success) { setStatus('success'); setEmail('') }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section style={{padding:'80px 24px',borderTop:'1px solid #141414'}}>
      <div style={{maxWidth:600,margin:'0 auto',textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:20}}>📬</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(26px,4vw,38px)',fontWeight:800,color:'#fff',letterSpacing:'-1px',marginBottom:12}}>
          Get the best remote jobs weekly
        </h2>
        <p style={{color:'#888',fontSize:16,lineHeight:1.7,marginBottom:36}}>
          Top remote opportunities, SaaS tools, and digital products — delivered to your inbox every week. No spam, ever.
        </p>

        {status === 'success' ? (
          <div style={{background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:14,padding:'20px 28px'}}>
            <div style={{fontSize:32,marginBottom:8}}>✅</div>
            <p style={{color:'#4ade80',fontWeight:700,fontSize:16,margin:0}}>You're subscribed! Check your inbox for a welcome email.</p>
          </div>
        ) : status === 'already' ? (
          <div style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:14,padding:'20px 28px'}}>
            <p style={{color:'#c9a84c',fontWeight:700,fontSize:16,margin:0}}>You're already subscribed! 🎉</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{display:'flex',gap:10,maxWidth:480,margin:'0 auto',flexWrap:'wrap',justifyContent:'center'}}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{flex:1,minWidth:220,background:'#111',border:'1.5px solid #2a2a2a',borderRadius:12,padding:'14px 18px',color:'#fff',fontSize:15,outline:'none',transition:'border-color 0.2s'}}
              onFocus={e => e.target.style.borderColor='#c9a84c'}
              onBlur={e => e.target.style.borderColor='#2a2a2a'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontWeight:700,fontSize:15,border:'none',borderRadius:12,padding:'14px 28px',cursor:'pointer',opacity:status==='loading'?0.7:1,whiteSpace:'nowrap',transition:'transform 0.2s,box-shadow 0.2s'}}
              onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 8px 24px rgba(201,168,76,0.3)' }}
              onMouseLeave={e => { e.target.style.transform=''; e.target.style.boxShadow='' }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Free →'}
            </button>
            {status === 'error' && <p style={{color:'#ff6b6b',fontSize:13,width:'100%',margin:'4px 0 0',textAlign:'center'}}>Something went wrong. Please try again.</p>}
          </form>
        )}
        <p style={{color:'#444',fontSize:12,marginTop:16}}>Join hundreds of remote workers. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [jobs, setJobs] = useState([])
  const [tools, setTools] = useState([])
  const [search, setSearch] = useState('')
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
    fetch('/api/jobs').then(r => r.json()).then(d => setJobs((d.jobs || []).slice(0, 6))).catch(() => {})
    fetch('/api/tools').then(r => r.json()).then(d => setTools((d.tools || []).filter(t => t.featured).slice(0, 4))).catch(() => {})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    window.location.href = `/jobs${search ? `?q=${encodeURIComponent(search)}` : ''}`
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.15s; }
        .d3 { transition-delay: 0.25s; }
        .d4 { transition-delay: 0.35s; }
        .d5 { transition-delay: 0.45s; }
        .job-card:hover { border-color: #c9a84c !important; transform: translateY(-3px); }
        .tool-card:hover { border-color: #c9a84c !important; background: #1a1a1a !important; }
        .tag-pill:hover { background: rgba(201,168,76,0.2) !important; color: #c9a84c !important; border-color: rgba(201,168,76,0.4) !important; }
        .search-wrap:focus-within { border-color: #c9a84c !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.15) !important; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,0.35) !important; }
        .ghost-btn:hover { border-color: #c9a84c !important; color: #c9a84c !important; }
        .glow { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
        ::placeholder { color: #555; }
        input:focus { outline: none; }
      `}</style>

      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', textAlign: 'center', overflow: 'hidden' }}>
        {/* Background glows */}
        <div className="glow" style={{ width: 600, height: 600, background: 'rgba(201,168,76,0.07)', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="glow" style={{ width: 300, height: 300, background: 'rgba(201,168,76,0.05)', top: '30%', left: '10%' }} />
        <div className="glow" style={{ width: 300, height: 300, background: 'rgba(201,168,76,0.05)', top: '20%', right: '10%' }} />

        {/* Grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}>
          <div className={`fade-up d1 ${loaded ? 'visible' : ''}`}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#c9a84c', fontWeight: 600, marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a84c', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              65+ remote jobs updated daily
            </span>
          </div>

          <h1 className={`fade-up d2 ${loaded ? 'visible' : ''}`} style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 800, lineHeight: 1.05, color: '#fff', letterSpacing: '-2px', marginBottom: 24 }}>
            Find Your Next<br />
            <span style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d878 50%, #c9a84c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Remote Job</span>
          </h1>

          <p className={`fade-up d3 ${loaded ? 'visible' : ''}`} style={{ fontSize: 18, color: '#888', lineHeight: 1.7, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
            Curated remote opportunities from top companies worldwide — powered by AI, built for builders.
          </p>

          {/* Search bar */}
          <form className={`fade-up d4 ${loaded ? 'visible' : ''}`} onSubmit={handleSearch} style={{ marginBottom: 28 }}>
            <div className="search-wrap" style={{ display: 'flex', alignItems: 'center', background: '#111', border: '1.5px solid #2a2a2a', borderRadius: 16, padding: '6px 6px 6px 20px', maxWidth: 580, margin: '0 auto', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
              <span style={{ fontSize: 18, marginRight: 12 }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by role, skill, or company..."
                style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: 15, padding: '8px 0' }}
              />
              <button type="submit" className="cta-btn" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0d0d0d', fontWeight: 700, fontSize: 14, border: 'none', borderRadius: 12, padding: '12px 24px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                Search Jobs
              </button>
            </div>
          </form>

          {/* Tag pills */}
          <div className={`fade-up d5 ${loaded ? 'visible' : ''}`} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {TAGS.map(tag => (
              <a key={tag} href={`/jobs?q=${tag}`} className="tag-pill" style={{ padding: '6px 14px', borderRadius: 100, fontSize: 13, border: '1px solid #2a2a2a', color: '#777', background: 'transparent', textDecoration: 'none', transition: 'all 0.2s' }}>
                {tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', background: '#0d0d0d', padding: '28px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: '#c9a84c', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Now Hiring</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Featured Remote Jobs</h2>
          </div>
          <a href="/jobs" className="ghost-btn" style={{ border: '1.5px solid #333', color: '#aaa', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
            View all jobs →
          </a>
        </div>

        {jobs.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#555', padding: 60 }}>Loading jobs...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {jobs.map(job => (
              <a key={job.id} href="/jobs" className="job-card" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{job.logo || '🏢'}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>{job.title}</div>
                    <div style={{ color: '#666', fontSize: 13 }}>{job.company}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ background: '#161616', border: '1px solid #252525', color: '#888', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>📍 {job.location}</span>
                  <span style={{ background: '#161616', border: '1px solid #252525', color: '#888', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>💼 {job.type}</span>
                  {job.salary && <span style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>💰 {job.salary}</span>}
                </div>
                {job.tags && job.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {job.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{ background: '#141414', color: '#666', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}>{tag}</span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="/jobs" className="cta-btn" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0d0d0d', fontWeight: 700, fontSize: 16, borderRadius: 12, padding: '14px 36px', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            Browse All Jobs →
          </a>
        </div>
      </section>

      {/* FEATURED TOOLS */}
      <section style={{ background: '#0a0a0a', borderTop: '1px solid #141414', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Directory</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Top SaaS Tools</h2>
            </div>
            <a href="/tools" className="ghost-btn" style={{ border: '1.5px solid #333', color: '#aaa', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
              View all tools →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {tools.length > 0 ? tools.map(tool => (
              <a key={tool.id} href={tool.website} target="_blank" rel="noopener noreferrer" className="tool-card" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 32 }}>{tool.logo || '🔧'}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{tool.name}</div>
                    <div style={{ color: '#c9a84c', fontSize: 12, fontWeight: 600 }}>{tool.pricing}</div>
                  </div>
                </div>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>{tool.description.slice(0, 80)}...</p>
                <span style={{ color: '#c9a84c', fontSize: 13, fontWeight: 600 }}>Visit →</span>
              </a>
            )) : [
              { id: 1, logo: '🤖', name: 'ChatGPT', pricing: 'Free / $20/mo', description: 'Conversational AI for writing, coding, and analysis.', website: 'https://chat.openai.com' },
              { id: 2, logo: '📓', name: 'Notion', pricing: 'Free / $8/mo', description: 'All-in-one workspace for notes and project management.', website: 'https://notion.so' },
              { id: 3, logo: '▲', name: 'Vercel', pricing: 'Free / $20/mo', description: 'Deploy frontend apps instantly with zero config.', website: 'https://vercel.com' },
              { id: 4, logo: '🖌️', name: 'Figma', pricing: 'Free / $12/mo', description: 'Collaborative interface design tool for teams.', website: 'https://figma.com' },
            ].map(tool => (
              <a key={tool.id} href={tool.website} target="_blank" rel="noopener noreferrer" className="tool-card" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 32 }}>{tool.logo}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{tool.name}</div>
                    <div style={{ color: '#c9a84c', fontSize: 12, fontWeight: 600 }}>{tool.pricing}</div>
                  </div>
                </div>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>{tool.description}</p>
                <span style={{ color: '#c9a84c', fontSize: 13, fontWeight: 600 }}>Visit →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />

      {/* FOR EMPLOYERS CTA */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', background: 'linear-gradient(135deg, #111 0%, #161610 100%)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 24, padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="glow" style={{ width: 400, height: 400, background: 'rgba(201,168,76,0.06)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📢</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 14 }}>Hiring remotely?</h2>
            <p style={{ color: '#888', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>Post your job for free and reach thousands of remote-first candidates. No credit card required.</p>
            <a href="/post-job" className="cta-btn" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0d0d0d', fontWeight: 700, fontSize: 16, borderRadius: 12, padding: '14px 36px', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              Post a Job for Free →
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 600px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </div>
  )
}
