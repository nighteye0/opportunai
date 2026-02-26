import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to: '/jobs', label: 'Jobs' },
    { to: '/tools', label: 'Tools' },
    { to: '/products', label: 'Products' },
    { to: '/blog', label: 'Blog' },
  ]

  const isOn = to => location.pathname === to || location.pathname.startsWith(to + '/')

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 54px; display: flex; align-items: center;
        }
        .nav.scrolled {
          background: rgba(6,6,6,0.88);
          backdrop-filter: blur(18px) saturate(150%);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 1px 0 rgba(255,255,255,0.03);
        }
        .nav-inner {
          width:100%; max-width:1120px; margin:0 auto;
          padding:0 24px; display:flex; align-items:center; gap:24px;
        }
        .brand {
          display:flex; align-items:center; gap:9px;
          font-size:15px; font-weight:700; color:#fff;
          text-decoration:none; flex-shrink:0;
        }
        .brand-logo {
          width:28px; height:28px; border-radius:8px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          display:flex; align-items:center; justify-content:center;
          font-size:13px; font-weight:800; color:white;
          box-shadow: 0 0 16px rgba(99,102,241,0.35);
          flex-shrink:0;
        }
        .nav-links { display:flex; align-items:center; gap:1px; flex:1; }
        .nl {
          padding:5px 11px; border-radius:6px;
          font-size:13px; font-weight:500;
          color:#555; text-decoration:none;
          transition: color .15s, background .15s;
        }
        .nl:hover { color:#aaa; background:rgba(255,255,255,0.035); }
        .nl.on { color:#ccc; }
        .nav-end { display:flex; align-items:center; gap:8px; margin-left:auto; }
        .live-pill {
          display:flex; align-items:center; gap:6px;
          padding:4px 10px; border-radius:100px;
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.15);
          font-size:11px; font-weight:500; color:#4ade80;
        }
        .live-dot {
          width:5px; height:5px; border-radius:50%;
          background:#22c55e; box-shadow:0 0 5px #22c55e;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @media(max-width:640px) { .nav-links,.live-pill { display:none; } }
      `}</style>
      <nav className={`nav${scrolled?' scrolled':''}`}>
        <div className="nav-inner">
          <Link to="/" className="brand">
            <div className="brand-logo">O</div>
            OpportuAI
          </Link>
          <div className="nav-links">
            {links.map(l=>(
              <Link key={l.to} to={l.to} className={`nl${isOn(l.to)?' on':''}`}>{l.label}</Link>
            ))}
          </div>
          <div className="nav-end">
            <span className="live-pill"><span className="live-dot"/>Live</span>
            <Link to="/post-job" className="btn-secondary" style={{fontSize:12,padding:'5px 12px'}}>Post a Job</Link>
            <Link to="/post-job" className="btn-primary" style={{fontSize:12,padding:'5px 12px'}}>Get Started →</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
