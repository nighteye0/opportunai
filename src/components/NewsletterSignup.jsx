import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | success | error

  const subscribe = () => {
    if (!email.includes('@')) { setStatus('error'); return }
    const subs = JSON.parse(localStorage.getItem('opportunai_subscribers') || '[]')
    if (!subs.includes(email)) {
      localStorage.setItem('opportunai_subscribers', JSON.stringify([...subs, email]))
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <section style={{
      padding: '5rem 3rem',
      background: 'radial-gradient(ellipse at 60% 50%, rgba(167,139,250,0.06) 0%, transparent 65%)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        top: '-150px', right: '-100px',
        background: 'radial-gradient(circle, rgba(232,184,75,0.04), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem', fontWeight: 700 }}>✉ Newsletter</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '0.8rem', lineHeight: 1.1 }}>
          Weekly updates on what<br /><span className="gold-text">indie founders are shipping</span>
        </h2>
        <p style={{ color: 'var(--dim)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
          Trending jobs, new product launches, top insights — delivered every Monday. No spam, unsubscribe anytime.
        </p>

        {status === 'success' ? (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
            background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)',
            borderRadius: '50px', padding: '0.9rem 2rem', color: 'var(--green)',
            fontWeight: 700, fontSize: '0.92rem', animation: 'fadeIn 0.4s ease',
          }}>
            ✅ You're in! Check your inbox.
          </div>
        ) : (
          <div style={{
            display: 'flex', maxWidth: '480px', margin: '0 auto',
            background: 'var(--d3)', border: '1px solid var(--border)',
            borderRadius: '50px', overflow: 'hidden',
            boxShadow: status === 'error' ? '0 0 0 2px rgba(248,113,113,0.4)' : '0 0 40px rgba(232,184,75,0.05)',
            transition: 'box-shadow 0.2s',
          }}>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle') }}
              onKeyDown={e => e.key === 'Enter' && subscribe()}
              placeholder="you@example.com"
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                padding: '0.95rem 1.5rem', color: 'var(--text)',
                fontSize: '0.9rem', fontFamily: 'var(--font-body)',
              }}
            />
            <button onClick={subscribe} style={{
              background: 'var(--grad)', border: 'none',
              padding: '0.85rem 1.8rem', fontWeight: 800, color: '#000',
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.84rem',
              borderRadius: '0 50px 50px 0', whiteSpace: 'nowrap',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Subscribe →
            </button>
          </div>
        )}

        {status === 'error' && (
          <p style={{ color: 'var(--red)', fontSize: '0.78rem', marginTop: '0.6rem' }}>Please enter a valid email address.</p>
        )}

        <p style={{ color: 'var(--dim)', fontSize: '0.72rem', marginTop: '1rem' }}>
          Join <strong style={{ color: 'var(--text)' }}>2,400+</strong> indie founders & job seekers · No spam · Unsubscribe anytime
        </p>
      </div>
    </section>
  )
}
