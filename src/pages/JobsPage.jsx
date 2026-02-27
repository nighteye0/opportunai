import { useState, useEffect } from 'react'

const CATS = ['All','Engineering','Design','Marketing','DevOps','Sales','Product','Customer Success','Data','AI / ML','Other']

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/jobs').then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : (d.jobs || [])
      setJobs(arr); setFiltered(arr); setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    let arr = jobs
    if (cat !== 'All') arr = arr.filter(j => j.category === cat || j.type === cat)
    if (search) arr = arr.filter(j =>
      (j.title||'').toLowerCase().includes(search.toLowerCase()) ||
      (j.company||'').toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(arr)
  }, [cat, search, jobs])

  const pill = (active) => ({
    padding:'6px 14px', borderRadius:100, fontSize:12, fontWeight:500,
    border:`1px solid ${active ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.07)'}`,
    background: active ? 'rgba(34,197,94,0.08)' : 'transparent',
    color: active ? '#22c55e' : '#555', cursor:'pointer',
    fontFamily:'inherit', transition:'all 0.15s', whiteSpace:'nowrap'
  })

  const tag = (color) => ({
    padding:'3px 8px', borderRadius:5, fontSize:11, fontWeight:500, whiteSpace:'nowrap',
    background: color==='green' ? 'rgba(34,197,94,0.08)' : color==='amber' ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${color==='green' ? 'rgba(34,197,94,0.15)' : color==='amber' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)'}`,
    color: color==='green' ? '#22c55e' : color==='amber' ? '#f59e0b' : '#555'
  })

  return (
    <div style={{minHeight:'100vh', paddingTop:56, background:'#060606', color:'#e8e8e8', fontFamily:"'DM Sans',-apple-system,sans-serif"}}>
      <div style={{padding:'48px 24px 36px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(34,197,94,0.04), transparent)'}}>
        <div style={{maxWidth:1120, margin:'0 auto'}}>
          <div style={{fontSize:11, fontWeight:700, color:'rgba(34,197,94,0.7)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6}}>Live Feed</div>
          <h1 style={{fontFamily:"'Syne','system-ui',sans-serif", fontSize:'clamp(22px,4vw,32px)', fontWeight:800, letterSpacing:'-0.03em', color:'#fff', marginBottom:4}}>Remote Jobs</h1>
          <p style={{fontSize:13, color:'#555', marginBottom:28}}>Updated daily from 5 sources worldwide</p>
          <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:8}}>
            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
              {CATS.map(c => <button key={c} style={pill(cat===c)} onClick={() => setCat(c)}>{c}</button>)}
            </div>
            <input
              style={{padding:'9px 14px', background:'#0f0f0f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:9, fontSize:13, color:'#e8e8e8', fontFamily:'inherit', outline:'none', width:240}}
              placeholder="Search jobs, companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{maxWidth:1120, margin:'0 auto', padding:'28px 24px 80px'}}>
        <div style={{fontSize:12, color:'#333', marginBottom:16, display:'flex', alignItems:'center', gap:8}}>
          <span style={{width:7, height:7, background:'#22c55e', borderRadius:'50%', display:'inline-block'}} />
          <span style={{color:'#22c55e', fontWeight:600}}>{filtered.length} jobs</span>
        </div>
        <div style={{background:'#0a0a0a', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, overflow:'hidden'}}>
          {loading ? Array.from({length:8}).map((_,i) => (
            <div key={i} style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid rgba(255,255,255,0.04)', gap:14, opacity:0.25}}>
              <div style={{width:38, height:38, borderRadius:9, background:'#111'}} />
              <div style={{flex:1}}>
                <div style={{height:11, background:'rgba(255,255,255,0.06)', borderRadius:4, width:'40%', marginBottom:7}} />
                <div style={{height:9, background:'rgba(255,255,255,0.04)', borderRadius:4, width:'25%'}} />
              </div>
            </div>
          )) : filtered.map((j,i) => (
            <a key={i} href={j.url||j.link||'#'} target="_blank" rel="noopener noreferrer"
              style={{display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid rgba(255,255,255,0.04)', gap:14, textDecoration:'none', color:'inherit', transition:'background 0.15s'}}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <div style={{width:38, height:38, borderRadius:9, background:'#111', border:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0}}>
                {j.company_emoji||j.emoji||'💼'}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:600, color:'#e0e0e0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{j.title||j.position}</div>
                <div style={{fontSize:12, color:'#444', marginTop:2}}>{j.company}{j.location ? ` · ${j.location}` : ''}</div>
              </div>
              <div style={{display:'flex', gap:6, flexShrink:0}}>
                {j.salary && <span style={tag('amber')}>{j.salary}</span>}
                <span style={tag('green')}>Remote</span>
                <span style={tag('')}>{j.category||j.type||'Full-time'}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}