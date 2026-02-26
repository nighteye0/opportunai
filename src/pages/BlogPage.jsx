import { useState, useEffect } from 'react'

const CATEGORIES = ['All', 'Remote Work Tips', 'Job Search Advice', 'SaaS & Tools Reviews']

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(d => { setPosts(d.posts || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = category === 'All' ? posts : posts.filter(p => p.category === category)
  const featured = posts.filter(p => p.featured).slice(0, 3)

  return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',padding:'40px 20px',fontFamily:'Inter,sans-serif'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:48}}>
          <span style={{display:'inline-block',background:'rgba(201,168,76,0.15)',color:'#c9a84c',border:'1px solid rgba(201,168,76,0.3)',borderRadius:20,padding:'4px 16px',fontSize:13,fontWeight:600,marginBottom:16}}>Blog</span>
          <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,52px)',fontWeight:800,color:'#fff',margin:'0 0 12px',letterSpacing:'-1px'}}>Remote Work Insights</h1>
          <p style={{color:'#888',fontSize:16,margin:0}}>Tips, tools, and strategies for the modern remote worker</p>
        </div>

        {/* Featured */}
        {featured.length > 0 && category === 'All' && (
          <div style={{marginBottom:48}}>
            <div style={{fontSize:12,color:'#c9a84c',fontWeight:700,letterSpacing:2,textTransform:'uppercase',marginBottom:20}}>Featured Posts</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:20}}>
              {featured.map(post => <PostCard key={post.id} post={post} featured />)}
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={()=>setCategory(c)} style={{padding:'7px 16px',borderRadius:20,fontSize:13,border:'1.5px solid',borderColor:category===c?'#c9a84c':'#2a2a2a',color:category===c?'#c9a84c':'#888',background:category===c?'rgba(201,168,76,0.12)':'transparent',cursor:'pointer',transition:'all 0.15s'}}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{textAlign:'center',color:'#888',padding:60}}>Loading posts...</div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:20}}>
            {filtered.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function PostCard({ post, featured }) {
  return (
    <a href={`/blog/${post.slug}`} style={{background:featured?'#131310':'#111',border:`1px solid ${featured?'rgba(201,168,76,0.2)':'#1e1e1e'}`,borderRadius:16,padding:24,display:'flex',flexDirection:'column',gap:14,textDecoration:'none',transition:'all 0.2s'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='#c9a84c';e.currentTarget.style.transform='translateY(-3px)'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=featured?'rgba(201,168,76,0.2)':'#1e1e1e';e.currentTarget.style.transform='translateY(0)'}}>
      <div style={{fontSize:40}}>{post.emoji || '📝'}</div>
      <div>
        <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
          <span style={{background:'rgba(201,168,76,0.12)',color:'#c9a84c',fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:8}}>{post.category}</span>
          {featured && <span style={{background:'rgba(201,168,76,0.2)',color:'#c9a84c',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:8}}>Featured</span>}
        </div>
        <h2 style={{color:'#fff',fontSize:17,fontWeight:700,margin:'0 0 8px',lineHeight:1.4}}>{post.title}</h2>
        <p style={{color:'#777',fontSize:13,lineHeight:1.55,margin:0}}>{post.excerpt}</p>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'auto',paddingTop:12,borderTop:'1px solid #1a1a1a'}}>
        <span style={{color:'#555',fontSize:12}}>{post.readTime} · {new Date(post.publishedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
        <span style={{color:'#c9a84c',fontSize:13,fontWeight:600}}>Read →</span>
      </div>
    </a>
  )
}
