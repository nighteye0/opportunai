import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    const onResize = () => setMobile(window.innerWidth < 768)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize) }
  }, [])

  const isActive = (p) => location.pathname === p

  const linkStyle = (href) => ({
    padding:'6px 11px', fontSize:13, fontWeight:500,
    color: isActive(href) ? '#e8e8e8' : '#666',
    borderRadius:7, textDecoration:'none',
    background: isActive(href) ? 'rgba(255,255,255,0.06)' : 'transparent',
    transition:'all 0.15s'
  })

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, height:56,
        background: scrolled ? 'rgba(6,6,6,0.97)' : 'rgba(6,6,6,0.85)',
        backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        zIndex:100, display:'flex', alignItems:'center',
        transition:'background 0.2s'
      }}>
        <div style={{maxWidth:1120, margin:'0 auto', padding:'0 20px', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16}}>

          <Link to="/" style={{
            fontFamily:"'Syne','system-ui',sans-serif", fontSize:18, fontWeight:800,
            letterSpacing:'-0.03em',
            background:'linear-gradient(135deg,#fff 0%,#818cf8 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text', textDecoration:'none', flexShrink:0
          }}>OpportuAI</Link>

          {!mobile && (
            <div style={{display:'flex', alignItems:'center', gap:2}}>
              {[['/', 'Home'],['/jobs','Jobs'],['/tools','Tools'],['/products','Products'],['/blog','Blog'],['/submit','Submit']].map(([href, label]) => (
                <Link key={href} to={href} style={linkStyle(href)}>{label}</Link>
              ))}
            </div>
          )}

          <div style={{display:'flex', alignItems:'center', gap:10, flexShrink:0}}>
            {!mobile && (
              <>
                <div style={{width:7,height:7,background:'#22c55e',borderRadius:'50%',flexShrink:0}} title="Online" />
                <Link to="/jobs" style={{
                  padding:'7px 14px', background:'#6366f1', color:'#fff',
                  fontWeight:600, fontSize:12, borderRadius:8, textDecoration:'none',
                  transition:'background 0.15s', whiteSpace:'nowrap'
                }}>Browse Jobs</Link>
              </>
            )}
            {mobile && (
              <button onClick={() => setMenuOpen(o => !o)} style={{
                display:'flex', flexDirection:'column', gap:5, padding:8,
                background:'none', border:'none', cursor:'pointer'
              }} aria-label="Menu">
                <span style={{display:'block',width:20,height:2,background:'#888',borderRadius:2,transition:'all 0.2s',transform:menuOpen?'rotate(45deg) translate(4px,5px)':'none'}} />
                <span style={{display:'block',width:20,height:2,background:'#888',borderRadius:2,transition:'all 0.2s',opacity:menuOpen?0:1}} />
                <span style={{display:'block',width:20,height:2,background:'#888',borderRadius:2,transition:'all 0.2s',transform:menuOpen?'rotate(-45deg) translate(4px,-5px)':'none'}} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {mobile && menuOpen && (
        <div style={{
          position:'fixed', top:56, left:0, right:0,
          background:'rgba(6,6,6,0.98)', backdropFilter:'blur(16px)',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
          padding:'16px 20px 24px', zIndex:99,
          display:'flex', flexDirection:'column', gap:4
        }}>
          {[['/', 'Home'],['/jobs','Jobs'],['/tools','Tools'],['/products','Products'],['/blog','Blog'],['/submit','Submit']].map(([href, label]) => (
            <Link key={href} to={href} style={{
              padding:'13px 16px', fontSize:15, fontWeight:500,
              color: isActive(href) ? '#e8e8e8' : '#666',
              borderRadius:9, textDecoration:'none',
              background: isActive(href) ? 'rgba(255,255,255,0.05)' : 'transparent',
              border:'1px solid '+(isActive(href)?'rgba(255,255,255,0.07)':'transparent'),
              transition:'all 0.15s'
            }}>{label}</Link>
          ))}
          <Link to="/jobs" style={{
            marginTop:10, padding:'14px', background:'#6366f1', color:'#fff',
            borderRadius:10, fontSize:14, fontWeight:600,
            textAlign:'center', textDecoration:'none'
          }}>Browse Remote Jobs →</Link>
        </div>
      )}
    </>
  )
}