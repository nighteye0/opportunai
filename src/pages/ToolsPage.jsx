import { useState, useEffect } from 'react'

const CATEGORIES = ['All', 'AI', 'Productivity', 'Dev Tools', 'Design', 'Marketing', 'Analytics', 'Communication', 'Finance', 'HR']

export default function ToolsPage() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/tools')
      .then(r => r.json())
      .then(d => { setTools(d.tools || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = tools.filter(t => {
    const matchCat = category === 'All' || t.category === category
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',padding:'40px 20px',fontFamily:'Inter,sans-serif'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <span style={{display:'inline-block',background:'rgba(201,168,76,0.15)',color:'#c9a84c',border:'1px solid rgba(201,168,76,0.3)',borderRadius:20,padding:'4px 16px',fontSize:13,fontWeight:600,marginBottom:16}}>Directory</span>
          <h1 style={{fontSize:40,fontWeight:800,color:'#fff',margin:'0 0 12px'}}>SaaS Tools Directory</h1>
          <p style={{color:'#888',fontSize:16,margin:'0 0 28px'}}>Discover the best tools for remote workers and builders</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:16}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tools..." style={{background:'#141414',border:'1.5px solid #2a2a2a',borderRadius:10,padding:'10px 16px',color:'#fff',fontSize:14,width:260}} />
            <a href="/submit-tool" style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontWeight:700,borderRadius:10,padding:'10px 20px',textDecoration:'none',fontSize:14}}>Submit a Tool</a>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={()=>setCategory(c)} style={{padding:'6px 14px',borderRadius:20,fontSize:13,border:'1.5px solid',borderColor:category===c?'#c9a84c':'#333',color:category===c?'#c9a84c':'#aaa',background:category===c?'rgba(201,168,76,0.15)':'transparent',cursor:'pointer'}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{textAlign:'center',color:'#888',padding:60}}>Loading tools...</div>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:'center',color:'#888',padding:60}}>
            <div style={{fontSize:48,marginBottom:16}}>🔧</div>
            <p>No tools found. <a href="/submit-tool" style={{color:'#c9a84c'}}>Be the first to submit one!</a></p>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:20}}>
            {filtered.map(tool => (
              <div key={tool.id} style={{background:'#141414',border:'1px solid #222',borderRadius:16,padding:24,display:'flex',flexDirection:'column',gap:12,transition:'border-color 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='#c9a84c'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='#222'}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{fontSize:36,width:52,height:52,background:'#1a1a1a',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}>{tool.logo || '🔧'}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <h3 style={{color:'#fff',fontSize:16,fontWeight:700,margin:0}}>{tool.name}</h3>
                      {tool.featured && <span style={{background:'rgba(201,168,76,0.2)',color:'#c9a84c',fontSize:11,fontWeight:600,padding:'2px 8px',borderRadius:10}}>Featured</span>}
                    </div>
                    {tool.category && <span style={{color:'#888',fontSize:12}}>{tool.category}</span>}
                  </div>
                </div>
                <p style={{color:'#aaa',fontSize:14,lineHeight:1.5,margin:0,flex:1}}>{tool.description}</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  {tool.pricing && <span style={{color:'#c9a84c',fontSize:13,fontWeight:600}}>{tool.pricing}</span>}
                  {tool.website && (
                    <a href={tool.website} target="_blank" rel="noopener noreferrer"
                      style={{background:'rgba(201,168,76,0.15)',color:'#c9a84c',border:'1px solid rgba(201,168,76,0.3)',borderRadius:8,padding:'6px 14px',fontSize:13,fontWeight:600,textDecoration:'none'}}>
                      Visit →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
