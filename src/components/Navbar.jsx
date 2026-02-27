import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (p) => location.pathname === p

  return (
    <>
      <nav className="navbar" style={{ borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)' }}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">OpportuAI</Link>

          <ul className="nav-links">
            {[
              ['/jobs','Jobs'],
              ['/tools','Tools'],
              ['/products','Products'],
              ['/blog','Blog'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link to={href} className={isActive(href) ? 'active' : ''}>{label}</Link>
              </li>
            ))}
          </ul>

          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div className="nav-dot" title="All systems online" />
            <Link to="/jobs" className="nav-cta nav-cta-desktop">Browse Jobs</Link>
            <button
              className="nav-hamburger"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {[
          ['/jobs','💼 Jobs'],
          ['/tools','🛠️ Tools'],
          ['/products','📦 Products'],
          ['/blog','✍️ Blog'],
        ].map(([href, label]) => (
          <Link key={href} to={href} style={isActive(href) ? {color:'var(--text)',borderColor:'var(--border)',background:'var(--surface)'} : {}}>
            {label}
          </Link>
        ))}
        <Link
          to="/jobs"
          style={{marginTop:8,padding:'12px 14px',background:'var(--accent)',color:'#fff',borderRadius:8,fontSize:14,fontWeight:600,textAlign:'center',border:'none'}}
        >
          Browse Remote Jobs →
        </Link>
      </div>
    </>
  )
}