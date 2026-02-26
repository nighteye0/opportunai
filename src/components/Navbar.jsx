import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const links = [
    { label: 'Jobs', to: '/jobs' },
    { label: 'Tools', to: '/tools' },
    { label: 'Products', to: '/products' },
    { label: 'Blog', to: '/blog' },
  ]

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/')

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: all 0.4s ease;
          padding: 0;
        }
        .navbar.scrolled {
          background: rgba(2,4,8,0.92);
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(0,245,255,0.08);
          box-shadow: 0 0 40px rgba(0,245,255,0.04);
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 32px;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .logo-icon {
          width: 32px; height: 32px;
          border: 1px solid rgba(0,245,255,0.4);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          background: rgba(0,245,255,0.05);
          box-shadow: 0 0 12px rgba(0,245,255,0.2), inset 0 0 12px rgba(0,245,255,0.05);
        }
        .logo-icon::after {
          content: 'AI';
          font-family: 'Orbitron', monospace;
          font-size: 9px; font-weight: 900;
          color: #00f5ff;
          letter-spacing: 0.5px;
        }
        .logo-text {
          font-family: 'Orbitron', monospace;
          font-size: 16px; font-weight: 700;
          color: #e8f4ff;
          letter-spacing: 1px;
        }
        .logo-text span { color: #00f5ff; text-shadow: 0 0 20px rgba(0,245,255,0.6); }
        .nav-center { display: flex; align-items: center; gap: 2px; }
        .nav-link {
          padding: 8px 16px; border-radius: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(200,220,255,0.5);
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: all 0.2s;
          position: relative;
        }
        .nav-link:hover { color: rgba(200,220,255,0.9); background: rgba(0,245,255,0.04); }
        .nav-link.active { color: #00f5ff; }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%; transform: translateX(-50%);
          width: 16px; height: 1px;
          background: #00f5ff;
          box-shadow: 0 0 6px #00f5ff;
        }
        .nav-right { display: flex; align-items: center; gap: 16px; }
        .nav-clock {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: rgba(0,245,255,0.4);
          letter-spacing: 1px;
        }
        .nav-post {
          padding: 8px 20px;
          background: transparent;
          border: 1px solid rgba(0,245,255,0.3);
          color: #00f5ff;
          font-family: 'Orbitron', monospace;
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .nav-post:hover {
          background: rgba(0,245,255,0.08);
          box-shadow: 0 0 20px rgba(0,245,255,0.2);
          border-color: rgba(0,245,255,0.6);
        }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00ff88;
          box-shadow: 0 0 8px #00ff88;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 768px) {
          .nav-center, .nav-clock { display: none; }
        }
      `}</style>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <div className="logo-icon" />
            <span className="logo-text">Opportu<span>AI</span></span>
          </Link>
          <div className="nav-center">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`nav-link${isActive(l.to) ? ' active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <span className="nav-clock">{time}</span>
            <div className="status-dot" title="Live" />
            <Link to="/post-job" className="nav-post">Post Job</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
