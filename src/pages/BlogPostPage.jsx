import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setPost(d.post); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div style={{minHeight:'100vh',background:'#0d0d0d',display:'flex',alignItems:'center',justifyContent:'center',color:'#888',fontFamily:'Inter,sans-serif'}}>Loading...</div>
  if (!post) return <div style={{minHeight:'100vh',background:'#0d0d0d',display:'flex',alignItems:'center',justifyContent:'center',color:'#888',fontFamily:'Inter,sans-serif'}}>Post not found. <a href="/blog" style={{color:'#c9a84c',marginLeft:8}}>Back to blog</a></div>

  // Simple markdown-like renderer
  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#fff',margin:'0 0 24px',letterSpacing:'-1px'}}>{line.slice(2)}</h1>
      if (line.startsWith('## ')) return <h2 key={i} style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(20px,3vw,26px)',fontWeight:700,color:'#fff',margin:'36px 0 14px'}}>{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i} style={{fontSize:18,fontWeight:700,color:'#ddd',margin:'24px 0 10px'}}>{line.slice(4)}</h3>
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{color:'#fff',fontWeight:700,fontSize:16,margin:'16px 0 8px'}}>{line.slice(2,-2)}</p>
      if (line.startsWith('- ')) return <li key={i} style={{color:'#aaa',fontSize:16,lineHeight:1.7,marginBottom:6}}>{line.slice(2)}</li>
      if (line.match(/^\d+\. /)) return <li key={i} style={{color:'#aaa',fontSize:16,lineHeight:1.7,marginBottom:6}}>{line.replace(/^\d+\. /,'')}</li>
      if (line.trim() === '') return <br key={i} />
      // Handle inline links [text](url)
      const linkified = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#c9a84c;text-decoration:none;font-weight:600">$1</a>')
      if (linkified !== line) return <p key={i} style={{color:'#aaa',fontSize:16,lineHeight:1.8,margin:'10px 0'}} dangerouslySetInnerHTML={{__html:linkified}} />
      return <p key={i} style={{color:'#aaa',fontSize:16,lineHeight:1.8,margin:'10px 0'}}>{line}</p>
    })
  }

  return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',fontFamily:'Inter,sans-serif'}}>
      {/* Hero */}
      <div style={{background:'linear-gradient(180deg,#111 0%,#0d0d0d 100%)',borderBottom:'1px solid #1a1a1a',padding:'60px 24px 48px'}}>
        <div style={{maxWidth:720,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:64,marginBottom:20}}>{post.emoji || '📝'}</div>
          <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:20,flexWrap:'wrap'}}>
            <span style={{background:'rgba(201,168,76,0.12)',color:'#c9a84c',fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:8}}>{post.category}</span>
            <span style={{color:'#555',fontSize:12,padding:'4px 0'}}>{post.readTime}</span>
            <span style={{color:'#555',fontSize:12,padding:'4px 0'}}>·</span>
            <span style={{color:'#555',fontSize:12,padding:'4px 0'}}>{new Date(post.publishedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
          </div>
          <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(28px,5vw,48px)',fontWeight:800,color:'#fff',margin:'0 0 16px',letterSpacing:'-1.5px',lineHeight:1.1}}>{post.title}</h1>
          <p style={{color:'#888',fontSize:18,lineHeight:1.6,margin:'0 0 24px'}}>{post.excerpt}</p>
          <span style={{color:'#666',fontSize:13}}>By {post.author || 'OpportuAI Team'}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:720,margin:'0 auto',padding:'48px 24px 80px'}}>
        <div style={{lineHeight:1.8}}>
          {renderContent(post.content)}
        </div>

        {/* Footer */}
        <div style={{marginTop:60,paddingTop:32,borderTop:'1px solid #1a1a1a',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
          <a href="/blog" style={{color:'#c9a84c',fontWeight:600,fontSize:14,textDecoration:'none'}}>← Back to Blog</a>
          <a href="/jobs" style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontWeight:700,borderRadius:10,padding:'10px 20px',textDecoration:'none',fontSize:14}}>Browse Remote Jobs →</a>
        </div>
      </div>
    </div>
  )
}
