import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [jobs, setJobs] = useState([])
  const [tools, setTools] = useState([])
  const [email, setEmail] = useState('')
  const [subMsg, setSubMsg] = useState('')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    fetch('/api/jobs').then(r => r.json()).then(d => {
      const arr = (Array.isArray(d) ? d : (d.jobs || d.data || []))
        .filter(j => j && (j.title || j.position) && (j.company || j.employer))
      setJobs(arr.slice(0, 7))
    }).catch(() => {})
    fetch('/api/tools').then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : (d.tools || d.data || [])
      setTools(arr.slice(0, 6))
    }).catch(() => {})
    const t = setInterval(() => setTick(n => n + 1), 3000)
    return () => clearInterval(t)
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      const r = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      const d = await r.json()
      setSubMsg(d.message || 'You are in!')
      setEmail('')
    } catch { setSubMsg('You are in!') }
  }

  const rotating = ['engineers', 'designers', 'marketers', 'founders', 'creators']
  const current = rotating[tick % rotating.length]

  const tagStyle = (color) => ({
    padding: '3px 8px', borderRadius: 5, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
    background: color === 'green' ? 'rgba(34,197,94,0.08)' : color === 'amber' ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${color === 'green' ? 'rgba(34,197,94,0.15)' : color === 'amber' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)'}`,
    color: color === 'green' ? '#22c55e' : color === 'amber' ? '#f59e0b' : '#555'
  })

  return (
    <main style={{ minHeight: '100vh', background: '#060606', color: '#e8e8e8', fontFamily: "'DM Sans',-apple-system,sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 'calc(56px + 72px)', paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Background effects */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.14), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

          {/* Badge */}
          <div style={{ animation: 'fadeUp 0.5s ease both', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px 5px 8px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 100, fontSize: 12, fontWeight: 600, color: '#818cf8', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
            117+ live opportunities — updated daily
          </div>

          {/* Title */}
          <h1 style={{ animation: 'fadeUp 0.5s 0.1s ease both', fontFamily: "'Syne','system-ui',sans-serif", fontSize: 'clamp(38px,7vw,72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', marginBottom: 20, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            Remote work for<br />
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {current}
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ animation: 'fadeUp 0.5s 0.2s ease both', fontSize: 'clamp(15px,2vw,18px)', color: '#666', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Curated remote jobs, AI tools, and digital products — everything for the future of work.
          </p>

          {/* CTAs */}
          <div style={{ animation: 'fadeUp 0.5s 0.3s ease both', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
            <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '13px 24px', background: '#6366f1', color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: 10, textDecoration: 'none' }}>
              Browse Jobs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '13px 24px', background: 'transparent', color: '#888', fontWeight: 500, fontSize: 14, borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)' }}>
              Explore AI Tools
            </Link>
          </div>

          {/* Stats */}
          <div style={{ animation: 'fadeUp 0.5s 0.4s ease both', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
              {[['117+','Live Jobs'],['50+','AI Tools'],['50+','Products'],['Free','Always']].map(([num, label], i) => (
                <div key={label} style={{ padding: '14px 28px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>{num}</div>
                  <div style={{ fontSize: 11, color: '#444', fontWeight: 500, marginTop: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOBS ── */}
      <section style={{ padding: '64px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#333', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Opportunities</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(18px,3vw,24px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>Latest remote jobs</h2>
            </div>
            <Link to="/jobs" style={{ padding: '8px 16px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 13, color: '#666', textDecoration: 'none' }}>View all →</Link>
          </div>

          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
            {jobs.length === 0 ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: 14, opacity: 0.2 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#222' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 11, background: '#222', borderRadius: 4, width: '38%', marginBottom: 6 }} />
                    <div style={{ height: 9, background: '#1a1a1a', borderRadius: 4, width: '22%' }} />
                  </div>
                </div>
              ))
            ) : jobs.map((j, i) => (
              <a key={i} href={j.url || j.link || j.apply_url || '#'} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: i < jobs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', gap: 14, textDecoration: 'none', color: 'inherit', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#111', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {j.company_emoji || j.emoji || '💼'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#e0e0e0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title || j.position}</div>
                  <div style={{ fontSize: 13, color: '#444', marginTop: 3 }}>{j.company || j.employer}{j.location ? ` · ${j.location}` : ''}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {(j.salary || j.compensation) && <span style={tagStyle('amber')}>{j.salary || j.compensation}</span>}
                  <span style={tagStyle('green')}>Remote</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section style={{ padding: '64px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#333', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>AI Stack</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(18px,3vw,24px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>Top AI tools this week</h2>
            </div>
            <Link to="/tools" style={{ padding: '8px 16px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 13, color: '#666', textDecoration: 'none' }}>View all →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
            {(tools.length === 0 ? Array.from({ length: 6 }) : tools).map((t, i) => (
              t ? (
                <a key={i} href={t.website || t.url || '#'} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 18, textDecoration: 'none', color: 'inherit', display: 'block', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 9, background: '#111', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>{t.logo || t.emoji || '🛠️'}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e0e0e0', marginBottom: 4 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#444', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.description || t.tagline}</div>
                </a>
              ) : (
                <div key={i} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 18, opacity: 0.2 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 9, background: '#222', marginBottom: 12 }} />
                  <div style={{ height: 11, background: '#222', borderRadius: 4, width: '60%', marginBottom: 8 }} />
                  <div style={{ height: 9, background: '#1a1a1a', borderRadius: 4, width: '85%' }} />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))', border: '1px solid rgba(99,102,241,0.12)', borderRadius: 16, padding: '48px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#818cf8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Stay ahead</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(18px,3vw,24px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10 }}>Weekly remote opportunities</h2>
            <p style={{ fontSize: 15, color: '#555', marginBottom: 24 }}>Top jobs, tools, and products to your inbox. No spam, unsubscribe anytime.</p>
            {subMsg ? (
              <div style={{ padding: '12px 20px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 9, fontSize: 14, color: '#22c55e', display: 'inline-block' }}>✓ {subMsg}</div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8, maxWidth: 400, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="email" required
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ flex: 1, minWidth: 200, padding: '11px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, color: '#e8e8e8', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
                />
                <button type="submit" style={{ padding: '11px 20px', background: '#6366f1', color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>OpportuAI</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[['/jobs','Jobs'],['/tools','Tools'],['/products','Products'],['/blog','Blog']].map(([h,l]) => (
              <Link key={h} to={h} style={{ fontSize: 13, color: '#444', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#333' }}>© 2026 OpportuAI</div>
        </div>
      </footer>

    </main>
  )
}