import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const CATEGORIES = ['AI', 'Productivity', 'Dev Tools', 'Design', 'Marketing', 'Analytics', 'Communication', 'Finance', 'HR', 'Other']

export default function SubmitToolPage() {
  const [form, setForm] = useState({ name:'', description:'', category:'AI', pricing:'', website:'', logo:'', email:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({...f, [k]: v}))

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.email) { setError('Please fill in Name, Description, and Email.'); return }
    setError(''); setLoading(true)
    try {
      const { error: e } = await supabase.from('tool_listings').insert([{...form, status: 'pending'}])
      if (e) throw e
      setSuccess(true)
    } catch(e) { setError('Submission failed: ' + (e.message || 'Unknown error')) }
    finally { setLoading(false) }
  }

  if (success) return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,sans-serif'}}>
      <div style={{textAlign:'center',background:'#141414',border:'1px solid #222',borderRadius:24,padding:48,maxWidth:480}}>
        <div style={{fontSize:56}}>✅</div>
        <h2 style={{color:'#fff',fontSize:28,fontWeight:800,margin:'16px 0 8px'}}>Tool Submitted!</h2>
        <p style={{color:'#c9a84c',fontWeight:600,margin:'0 0 12px'}}>{form.name}</p>
        <p style={{color:'#888',margin:'0 0 28px'}}>We will review your listing within 24 hours. Completely free.</p>
        <a href="/tools" style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontWeight:700,borderRadius:12,padding:'12px 28px',textDecoration:'none'}}>Browse Tools</a>
      </div>
    </div>
  )

  const inp = {width:'100%',background:'#0d0d0d',border:'1.5px solid #2a2a2a',borderRadius:10,padding:'12px 14px',color:'#fff',fontSize:14,boxSizing:'border-box'}
  return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',padding:'40px 20px',fontFamily:'Inter,sans-serif'}}>
      <div style={{maxWidth:680,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <span style={{display:'inline-block',background:'rgba(201,168,76,0.15)',color:'#c9a84c',border:'1px solid rgba(201,168,76,0.3)',borderRadius:20,padding:'4px 16px',fontSize:13,fontWeight:600,marginBottom:16}}>Free</span>
          <h1 style={{fontSize:36,fontWeight:800,color:'#fff',margin:'0 0 12px'}}>Submit Your Tool</h1>
          <p style={{color:'#888',fontSize:16,margin:0}}>Get discovered by thousands of remote workers and builders.</p>
        </div>
        <div style={{background:'#141414',border:'1px solid #222',borderRadius:20,padding:'32px 28px',display:'flex',flexDirection:'column',gap:20}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:6}}>TOOL NAME *</label><input style={inp} value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Notion AI" /></div>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:6}}>CATEGORY</label>
              <select style={inp} value={form.category} onChange={e=>set('category',e.target.value)}>
                {CATEGORIES.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:6}}>DESCRIPTION *</label>
            <textarea style={{...inp,minHeight:100,resize:'vertical'}} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="What does your tool do? Who is it for?" />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:6}}>PRICING</label><input style={inp} value={form.pricing} onChange={e=>set('pricing',e.target.value)} placeholder="e.g. Free / $9/mo / Freemium" /></div>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:6}}>WEBSITE</label><input style={inp} value={form.website} onChange={e=>set('website',e.target.value)} placeholder="https://..." /></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:6}}>LOGO EMOJI</label><input style={inp} value={form.logo} onChange={e=>set('logo',e.target.value)} placeholder="e.g. 🤖" /></div>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:6}}>CONTACT EMAIL *</label><input style={inp} type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@company.com" /></div>
          </div>
          {error && <p style={{color:'#ff6b6b',fontSize:14,margin:0}}>{error}</p>}
          <button onClick={handleSubmit} disabled={loading} style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontSize:17,fontWeight:700,border:'none',borderRadius:14,padding:'16px 40px',cursor:'pointer',width:'100%',opacity:loading?0.5:1}}>
            {loading ? 'Submitting...' : 'Submit Tool for Free'}
          </button>
        </div>
      </div>
    </div>
  )
}
