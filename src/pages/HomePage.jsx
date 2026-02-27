import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [jobs, setJobs] = useState([])
  const [tools, setTools] = useState([])
  const [email, setEmail] = useState('')
  const [subMsg, setSubMsg] = useState('')

  useEffect(() => {
    fetch('/api/jobs').then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : (d.jobs || [])
      setJobs(arr.slice(0, 6))
    }).catch(() => {})
    fetch('/api/tools').then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : (d.tools || [])
      setTools(arr.slice(0, 6))
    }).catch(() => {})
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const d = await r.json()
      setSubMsg(d.message || 'You are in!')
      setEmail('')
    } catch {
      setSubMsg('You are in!')
    }
  }

  const categoryColors = {
    'Full-time': 'green',
    'Contract': 'amber',
    'Part-time': 'purple',
    'Remote': 'green',
  }

  return (
    <main style={{ minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative' }}>

          <div className="a1">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              117+ live opportunities updated daily
            </div>
          </div>

          <h1 className="hero-title a2">
            Find remote work<br />
            <span className="accent">built for what&apos;s next</span>
          </h1>

          <p className="hero-sub a3">
            Curated remote jobs, AI-powered tools, and digital products — everything you need to build a career on your own terms.
          </p>

          <div className="hero-actions a4">
            <Link to="/jobs" className="btn-primary">
              Browse Jobs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/tools" className="btn-secondary">
              Explore AI Tools
            </Link>
          </div>

          <div className="a5" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-stats">
              {[
                ['117+', 'Live Jobs'],
                ['50+', 'AI Tools'],
                ['50+', 'Products'],
                ['Free', 'Forever'],
              ].map(([num, label]) => (
                <div key={label} className="hero-stat">
                  <div className="hero-stat-num">{num}</div>
                  <div className="hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOBS ── */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label">Opportunities</div>
              <h2 className="section-title">Latest remote jobs</h2>
            </div>
            <Link to="/jobs" className="btn-secondary" style={{ fontSize: 13, padding: '8px 16px' }}>
              View all →
            </Link>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            {jobs.length === 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="job-row" style={{ opacity: 0.3 }}>
                  <div className="job-logo" />
                  <div className="job-info">
                    <div style={{ height: 12, background: 'var(--border)', borderRadius: 4, width: '40%', marginBottom: 6 }} />
                    <div style={{ height: 10, background: 'var(--border)', borderRadius: 4, width: '25%' }} />
                  </div>
                </div>
              ))
            ) : (
              jobs.map((job, i) => (
                <a key={i} href={job.url || job.link || '#'} target="_blank" rel="noopener noreferrer" className="job-row">
                  <div className="job-logo">{job.company_emoji || job.emoji || '💼'}</div>
                  <div className="job-info">
                    <div className="job-title">{job.title || job.position}</div>
                    <div className="job-company">{job.company} {job.location ? `· ${job.location}` : ''}</div>
                  </div>
                  <div className="job-tags">
                    {job.type && <span className={`tag ${categoryColors[job.type] || ''}`}>{job.type}</span>}
                    {job.salary && <span className="tag">{job.salary}</span>}
                    <span className="tag green">Remote</span>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="section" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label">AI Stack</div>
              <h2 className="section-title">Top AI tools this week</h2>
            </div>
            <Link to="/tools" className="btn-secondary" style={{ fontSize: 13, padding: '8px 16px' }}>
              View all →
            </Link>
          </div>

          <div className="tool-grid">
            {(tools.length === 0 ? Array.from({ length: 6 }) : tools).map((tool, i) => (
              tool ? (
                <a key={i} href={tool.website || tool.url || '#'} target="_blank" rel="noopener noreferrer" className="card tool-card" style={{ textDecoration: 'none' }}>
                  <div className="tool-card-icon">{tool.logo || tool.emoji || '🛠️'}</div>
                  <div className="tool-card-name">{tool.name}</div>
                  <div className="tool-card-desc">{tool.description || tool.tagline}</div>
                </a>
              ) : (
                <div key={i} className="card tool-card" style={{ opacity: 0.3 }}>
                  <div className="tool-card-icon" />
                  <div style={{ height: 12, background: 'var(--border)', borderRadius: 4, width: '70%', marginBottom: 6 }} />
                  <div style={{ height: 10, background: 'var(--border)', borderRadius: 4, width: '90%' }} />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="section">
        <div className="container">
          <div className="newsletter">
            <div className="section-label" style={{ color: 'var(--accent2)', marginBottom: 8 }}>Stay ahead</div>
            <h2 className="newsletter-title">Weekly remote opportunities</h2>
            <p className="newsletter-sub">Get the top jobs, tools, and digital products delivered to your inbox every week. No spam.</p>
            {subMsg ? (
              <div style={{ padding: '12px 20px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 9, fontSize: 14, color: 'var(--green)', display: 'inline-block' }}>
                ✓ {subMsg}
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', marginBottom: 4 }}>OpportuAI</div>
              <div className="footer-copy">Built for the future of work</div>
            </div>
            <nav className="footer-links">
              <Link to="/jobs">Jobs</Link>
              <Link to="/tools">Tools</Link>
              <Link to="/products">Products</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/admin">Admin</Link>
            </nav>
            <div className="footer-copy">© 2026 OpportuAI</div>
          </div>
        </div>
      </footer>
    </main>
  )
}