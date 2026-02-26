import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LiveFeed from '../components/LiveFeed'
import NewsletterSignup from '../components/NewsletterSignup'

const STATS = [
  { value: '2.4M+', label: 'Active Jobs', icon: '💼' },
  { value: '850K+', label: 'Companies', icon: '🏢' },
  { value: '12M+', label: 'Professionals', icon: '👥' },
  { value: '94%', label: 'Placement Rate', icon: '🎯' },
]

const FEATURES = [
  { icon: '🧠', title: 'AI Resume Builder', desc: 'Generate a tailored, ATS-optimized resume in seconds.', color: '#A87CFA', tag: 'Powered by Claude' },
  { icon: '🎯', title: 'AI Job Matching', desc: 'Describe your background — AI finds your best-fit roles instantly.', color: '#F0C040', tag: 'Smart Match' },
  { icon: '🌐', title: 'Remotive API', desc: 'Live remote jobs in real-time — no API key required.', color: '#3DDA78', tag: 'No key needed' },
  { icon: '🔍', title: 'Adzuna API', desc: 'Millions of real jobs from 100+ countries, updated hourly.', color: '#5BA4FA', tag: '100+ countries' },
  { icon: '⚡', title: 'JSearch API', desc: 'Jobs from LinkedIn, Indeed, and Glassdoor in one feed.', color: '#FA8C3C', tag: 'Aggregated' },
  { icon: '📌', title: 'Community Board', desc: 'Post a job free forever. Reach thousands instantly.', color: '#FA6060', tag: 'Free forever' },
]

const MARQUEE_COMPANIES = ['Stripe', 'Notion', 'Vercel', 'Linear', 'Figma', 'Loom', 'Framer', 'Supabase', 'Railway', 'Planetscale', 'Resend', 'Clerk', 'Neon', 'Turso', 'Upstash']

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return inView
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef()
  const inView = useInView(ref)
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s ${delay}s cubic-bezier(0.4,0,0.2,1), transform 0.8s ${delay}s cubic-bezier(0.4,0,0.2,1)`,
    }}>{children}</div>
  )
}

export default function HomePage({ onOpenMatcher, onOpenSubmit, allJobs = [] }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const handleSearch = () => {
    if (search.trim()) navigate(`/jobs?q=${encodeURIComponent(search)}`)
    else navigate('/jobs')
  }

  return (
    <div style={{ paddingTop: '64px', background: 'var(--dark)' }}>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '6rem 2rem 5rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Mesh gradient background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', width: '900px', height: '900px',
            top: '-400px', left: '50%', transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(240,192,64,0.07) 0%, transparent 60%)',
            animation: 'pulse 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: '600px', height: '600px',
            bottom: '-200px', left: '-150px',
            background: 'radial-gradient(circle, rgba(168,124,250,0.05) 0%, transparent 65%)',
            animation: 'pulse 11s 3s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: '500px', height: '500px',
            top: '10%', right: '-100px',
            background: 'radial-gradient(circle, rgba(61,218,120,0.03) 0%, transparent 65%)',
            animation: 'pulse 13s 1s ease-in-out infinite',
          }} />
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(240,192,64,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,64,0.025) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black 10%, transparent 70%)',
          }} />
        </div>

        {/* Badge */}
        <div className="badge badge-gold animate-up" style={{ marginBottom: '2rem', animationDelay: '0s' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
          Live · AI-Powered Job Platform
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
          fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em',
          maxWidth: '960px', marginBottom: '0',
          animation: 'fadeUp 0.8s 0.1s cubic-bezier(0.4,0,0.2,1) both',
        }}>
          Every Job.<br />
          <span style={{
            background: 'linear-gradient(135deg, #F0C040 0%, #FFE17A 40%, #A87CFA 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>One Platform.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--dim)',
          maxWidth: '500px', margin: '2.2rem auto 0', lineHeight: 1.8,
          animation: 'fadeUp 0.8s 0.22s cubic-bezier(0.4,0,0.2,1) both',
        }}>
          Full-time, freelance, SaaS, remote — all in one place. Powered by live APIs, Claude AI, and a free community board.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '0.7rem', flexWrap: 'wrap', justifyContent: 'center',
          margin: '2.5rem 0',
          animation: 'fadeUp 0.8s 0.35s cubic-bezier(0.4,0,0.2,1) both',
        }}>
          <button className="btn btn-primary-lg" onClick={() => navigate('/jobs')}>
            Browse Live Jobs →
          </button>
          <button className="btn btn-ai" style={{ padding: '0.9rem 2rem', fontSize: '0.92rem' }} onClick={onOpenMatcher}>
            🎯 Find My Match
          </button>
          <button className="btn btn-ghost" style={{ padding: '0.9rem 1.8rem' }} onClick={onOpenSubmit}>
            + Post Free
          </button>
        </div>

        {/* Search bar */}
        <div style={{
          width: '100%', maxWidth: '580px',
          display: 'flex',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(240,192,64,0.15)',
          borderRadius: '100px', overflow: 'hidden',
          animation: 'fadeUp 0.8s 0.48s cubic-bezier(0.4,0,0.2,1) both',
          boxShadow: '0 0 80px rgba(240,192,64,0.06), 0 0 0 1px rgba(255,255,255,0.03) inset',
          backdropFilter: 'blur(12px)',
        }}>
          <span style={{ padding: '0 0 0 1.4rem', display: 'flex', alignItems: 'center', color: 'var(--dim)', fontSize: '1rem' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search jobs, skills, companies..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              padding: '1rem 1rem', color: 'var(--text)',
              fontSize: '0.92rem', fontFamily: 'var(--font-body)',
            }}
          />
          <button onClick={handleSearch} style={{
            background: 'var(--grad)', border: 'none',
            padding: '0.75rem 1.8rem', fontWeight: 800, color: '#000',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.84rem',
            borderRadius: '100px', margin: '0.3rem',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(240,192,64,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
          >Search</button>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0',
          maxWidth: '720px', margin: '3.5rem auto 0',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '24px', overflow: 'hidden',
          animation: 'fadeUp 0.8s 0.6s cubic-bezier(0.4,0,0.2,1) both',
          backdropFilter: 'blur(8px)',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              flex: 1, minWidth: '130px', padding: '1.4rem 1.2rem', textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,192,64,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{s.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 800,
                background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.value}</div>
              <div style={{ fontSize: '0.67rem', color: 'var(--dim)', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '1.2rem 0', overflow: 'hidden', position: 'relative',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 25s linear infinite', width: 'max-content' }}>
          {[...MARQUEE_COMPANIES, ...MARQUEE_COMPANIES].map((c, i) => (
            <span key={i} style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dim)', letterSpacing: '0.05em', whiteSpace: 'nowrap', userSelect: 'none' }}>{c}</span>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(90deg, var(--dark), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(-90deg, var(--dark), transparent)', pointerEvents: 'none' }} />
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ══════════════ FEATURES ══════════════ */}
      <section style={{ padding: '7rem 3rem', maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-label">✦ Everything You Need</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
                Built for <span className="gold-text">Everyone</span>
              </h2>
            </div>
            <p style={{ color: 'var(--dim)', maxWidth: '360px', lineHeight: 1.75, fontSize: '0.92rem' }}>
              Job seekers, freelancers, SaaS founders, employers — one platform to rule them all.
            </p>
          </div>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.04)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)' }}>
          {FEATURES.map((f, i) => (
            <div key={f.title}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                background: hoveredFeature === i ? `linear-gradient(160deg, ${f.color}0D, var(--d3))` : 'var(--d2)',
                padding: '2.2rem', cursor: 'default', position: 'relative', overflow: 'hidden',
                transition: 'background 0.35s ease',
              }}>
              {/* Top border accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${f.color}${hoveredFeature === i ? '80' : '20'}, transparent)`,
                transition: 'opacity 0.35s',
              }} />

              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: `${f.color}15`,
                border: `1px solid ${f.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', marginBottom: '1.2rem',
                transition: 'transform 0.35s cubic-bezier(0.34,1.4,0.64,1)',
                transform: hoveredFeature === i ? 'scale(1.12) rotate(-4deg)' : 'scale(1) rotate(0deg)',
              }}>{f.icon}</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>{f.title}</div>
                <span style={{
                  fontSize: '0.6rem', padding: '0.15rem 0.5rem', borderRadius: '50px',
                  background: `${f.color}18`, color: f.color, fontWeight: 700,
                  border: `1px solid ${f.color}25`, letterSpacing: '0.04em',
                }}>{f.tag}</span>
              </div>
              <div style={{ color: 'var(--dim)', fontSize: '0.85rem', lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ LIVE FEED ══════════════ */}
      <LiveFeed allJobs={allJobs} onOpenSubmit={onOpenSubmit} />

      {/* ══════════════ NEWSLETTER ══════════════ */}
      <NewsletterSignup />

      {/* ══════════════ CTA ══════════════ */}
      <section style={{
        textAlign: 'center', padding: '8rem 3rem',
        position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(240,192,64,0.06) 0%, transparent 60%)',
        }} />
        <AnimatedSection>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(61,218,120,0.08)', border: '1px solid rgba(61,218,120,0.2)',
            borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '2rem',
            fontSize: '0.72rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
            42+ jobs available right now
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 800,
            maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: 0.95, letterSpacing: '-0.02em',
          }}>
            Your next opportunity<br /><span className="gold-text">is waiting.</span>
          </h2>
          <p style={{ color: 'var(--dim)', fontSize: '1rem', maxWidth: '420px', margin: '0 auto 3rem', lineHeight: 1.75 }}>
            Join millions of professionals, freelancers, and founders building their future on OpportuAI.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary-lg" onClick={() => navigate('/jobs')}>Browse All Jobs</button>
            <button className="btn btn-ai" style={{ padding: '0.9rem 2.2rem' }} onClick={onOpenMatcher}>🎯 AI Match Me</button>
            <button className="btn btn-ghost" style={{ padding: '0.9rem 2rem' }} onClick={onOpenSubmit}>+ Post a Job</button>
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <div style={{
          maxWidth: '1300px', margin: '0 auto',
          padding: '3rem 3rem 2.5rem',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '2rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800,
              background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}>OpportuAI</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--dim)', lineHeight: 1.6 }}>
              The AI-powered job platform<br />built for everyone.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['About', 'Blog', 'Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} style={{
                fontSize: '0.78rem', color: 'var(--dim)', cursor: 'pointer',
                fontWeight: 500, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--dim)'}
              >{l}</a>
            ))}
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--dim2)' }}>© 2026 OpportuAI</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--dim2)', marginTop: '0.2rem' }}>Built for Everyone · Powered by Claude AI</div>
          </div>
        </div>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(240,192,64,0.15), transparent)' }} />
        <div style={{ padding: '0.8rem', textAlign: 'center', fontSize: '0.65rem', color: 'var(--dim2)' }}>
          Made with ♥ using React + Vite + Supabase
        </div>
      </footer>
    </div>
  )
}
