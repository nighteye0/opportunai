import { useState, useEffect } from 'react'

const CATS = ['All','Productivity','Writing','Design','Development','Marketing','Analytics','Communication','Finance','Other']

export default function ToolsPage() {
  const [tools, setTools] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tools').then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : (d.tools || [])
      setTools(arr); setFiltered(arr); setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    let arr = tools
    if (cat !== 'All') arr = arr.filter(t => t.category === cat)
    if (search) arr = arr.filter(t =>
      (t.name||'').toLowerCase().includes(search.toLowerCase()) ||
      (t.description||t.tagline||'').toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(arr)
  }, [cat, search, tools])

  const pill = (active) => ({
    padding:'6px 14px', borderRadius:100, fontSize:12, fontWeight:500,
    border:`1px solid ${active ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)'}`,
    background: active ? 'rgba(99,102,241,0.08)' : 'transparent',
    color: active ? '#818cf8' : '#555', cursor:'pointer',
    fontFamily:'inherit', transition:'all 0.15s', whiteSpace:'nowrap'
  })

  return (
    <div style={{minHeight:'100vh', paddingTop:56, background:'#060606', color:'#e8e8e8', fontFamily:"'DM Sans',-apple-system,sans-serif"}}>
      <div style={{padding:'48px 24px 36px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(99,102,241,0.04), transparent)'}}>
        <div style={{maxWidth:1120, margin:'0 auto'}}>
          <div style={{fontSize:11, fontWeight:700, color:'rgba(129,140,248,0.8)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6}}>AI Stack</div>
          <h1 style={{fontFamily:"'Syne','system-ui',sans-serif", fontSize:'clamp(22px,4vw,32px)', fontWeight:800, letterSpacing:'-0.03em', color:'#fff', marginBottom:4}}>SaaS & AI Tools</h1>
          <p style={{fontSize:13, color:'#555', marginBottom:28}}>50+ hand-picked tools to supercharge your remote workflow</p>
          <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12}}>
            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
              {CATS.map(c => <button key={c} style={pill(cat===c)} onClick={() => setCat(c)}>{c}</button>)}
            </div>
            <input
              style={{padding:'9px 14px', background:'#0f0f0f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:9, fontSize:13, color:'#e8e8e8', fontFamily:'inherit', outline:'none', width:240}}
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{maxWidth:1120, margin:'0 auto', padding:'28px 24px 80px'}}>
        <div style={{fontSize:12, color:'#333', marginBottom:20}}>{filtered.length} tools</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:10}}>
          {loading ? Array.from({length:9}).map((_,i) => (
            <div key={i} style={{background:'#0a0a0a', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:18, opacity:0.25}}>
              <div style={{width:40, height:40, borderRadius:9, background:'#111', marginBottom:12}} />
              <div style={{height:11, background:'rgba(255,255,255,0.06)', borderRadius:4, width:'60%', marginBottom:8}} />
              <div style={{height:9, background:'rgba(255,255,255,0.04)', borderRadius:4, width:'90%', marginBottom:6}} />
              <div style={{height:9, background:'rgba(255,255,255,0.04)', borderRadius:4, width:'70%'}} />
            </div>
          )) : filtered.map((t,i) => (
            <a key={i} href={t.website||t.url||'#'} target="_blank" rel="noopener noreferrer"
              style={{background:'#0a0a0a', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:18, textDecoration:'none', color:'inherit', display:'block', transition:'all 0.2s'}}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.13)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
            >
              <div style={{width:40, height:40, borderRadius:9, background:'#111', border:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:12}}>{t.logo||t.emoji||'🛠️'}</div>
              <div style={{fontSize:14, fontWeight:600, color:'#e0e0e0', marginBottom:4}}>{t.name}</div>
              <div style={{fontSize:12, color:'#444', lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{t.description||t.tagline}</div>
              {t.category && <div style={{marginTop:10, display:'inline-block', padding:'2px 8px', background:'rgba(99,102,241,0.06)', border:'1px solid rgba(99,102,241,0.12)', borderRadius:5, fontSize:10, fontWeight:600, color:'#555'}}>{t.category}</div>}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}