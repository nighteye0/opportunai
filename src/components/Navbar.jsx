import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar({ onOpenMatcher, onOpenSubmit, onOpenAuth }) {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: 'Jobs', to: '/jobs' },
    { label: 'Freelance', to: '/jobs?tab=freelance' },
    { label: 'Resume AI', to: '/resume' },
    { label: 'Launches', to: '/' },
    { label: 'Post a Job', to: '/post-job' },
    { label: 'Tools', to: '/tools' },
  ]

  const isActive = (to) => location.pathname === to.split('?')[0]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '64px',
      background: scrolled ? 'rgba(5,5,8,0.96)' : 'rgba(5,5,8,0.6)',
      backdropFilter: 'blur(28px) saturate(1.4)',
      borderBottom: `1px solid ${scrolled ? 'rgba(240,192,64,0.1)' : 'transparent'}`,
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
    }}>

      <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800,
          background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em', transition: 'filter 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
        >OpportuAI</div>
      </Link>

      <div className="desktop-nav" style={{
        display: 'flex', gap: '0.15rem', alignItems: 'center',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '100px', padding: '0.28rem 0.35rem',
      }}>
        {links.map(({ label, to }) => {
          const active = isActive(to)
          return (
            <Link key={label} to={to} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '0.38rem 1rem', borderRadius: '100px',
                fontSize: '0.8rem', fontWeight: active ? 700 : 500,
                color: active ? 'var(--text)' : hovered === label ? 'var(--text2)' : 'var(--dim)',
                background: active ? 'rgba(255,255,255,0.09)' : hovered === label ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'all 0.2s ease', cursor: 'pointer',
              }}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
              >{label}</div>
            </Link>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
        <button className="btn btn-ai" onClick={onOpenMatcher} style={{ fontSize: '0.79rem', padding: '0.5rem 1rem' }}>
          🎯 AI Match
        </button>
        {user ? (
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <Link to="/dashboard">
              <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.5rem 1rem', fontSize: '0.79rem' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', background: 'var(--grad)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.62rem', fontWeight: 900, color: '#000', flexShrink: 0,
                }}>{user.email?.[0]?.toUpperCase()}</div>
                Dashboard
              </button>
            </Link>
            <button className="btn btn-ghost" onClick={signOut} style={{ fontSize: '0.76rem', padding: '0.5rem 0.9rem' }}>Out</button>
          </div>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => onOpenAuth('signin')} style={{ fontSize: '0.79rem' }}>Sign In</button>
            <button className="btn btn-primary" onClick={() => onOpenAuth('signup')} style={{ fontSize: '0.79rem', padding: '0.55rem 1.2rem' }}>Sign Up Free</button>
          </>
        )}
      </div>
    </nav>
  )
}
