import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const TYPES = ['Full-time','Part-time','Contract','Freelance','Internship']
const TAGS = ['React','Node.js','Python','TypeScript','AI/ML','Design','Marketing','DevOps','Mobile','Data']

export default function PostJobPage() {
  const [form, setForm] = useState({ title:'',company:'',location:'',type:'Full-time',salary:'',description:'',tags:[],logo:'',url:'',email:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k,v) => setForm(f => ({...f,[k]:v}))
  const toggleTag = tag => set('tags', form.tags.includes(tag) ? form.tags.filter(t=>t!==tag) : [...form.tags,tag])

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.location || !form.email) {
      setError('Please fill in Title, Company, Location, and Email.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const { error: e } = await supabase.from('job_submissions').insert([{
        title: form.title,
        company: form.company,
        location: form.location,
        type: form.type,
        salary: form.salary,
        description: form.description,
        tags: form.tags,
        logo: form.logo,
        url: form.url,
        email: form.email,
        status: 'pending'
      }])
      if (e) throw e
      setSuccess(true)
    } catch(e) {
      setError('Submission failed: ' + (e.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,sans-serif'}}>
      <div style={{textAlign:'center',background:'#141414',border:'1px solid #222',borderRadius:24,padding:48,maxWidth:480}}>
        <div style={{fontSize:56}}>✅</div>
        <h2 style={{color:'#fff',fontSize:28,fontWeight:800,margin:'16px 0 8px'}}>Listing Submitted!</h2>
        <p style={{color:'#c9a84c',fontWeight:600,margin:'0 0 12px'}}>{form.title} at {form.company}</p>
        <p style={{color:'#888',margin:'0 0 28px'}}>We will review your listing within 24 hours and email you when it goes live. Completely free.</p>
        <a href="/jobs" style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontWeight:700,borderRadius:12,padding:'12px 28px',textDecoration:'none'}}>Browse Jobs</a>
      </div>
    </div>
  )

  const inp = {width:'100%',background:'#0d0d0d',border:'1.5px solid #2a2a2a',borderRadius:10,padding:'12px 14px',color:'#fff',fontSize:14}

  return (
    <div style={{minHeight:'100vh',background:'#0d0d0d',padding:'40px 20px',fontFamily:'Inter,sans-serif'}}>
      <div style={{maxWidth:780,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <span style={{display:'inline-block',background:'rgba(201,168,76,0.15)',color:'#c9a84c',border:'1px solid rgba(201,168,76,0.3)',borderRadius:20,padding:'4px 16px',fontSize:13,fontWeight:600,marginBottom:16}}>Free</span>
          <h1 style={{fontSize:36,fontWeight:800,color:'#fff',margin:'0 0 12px'}}>Post a Job on OpportuAI</h1>
          <p style={{color:'#888',fontSize:16,margin:0}}>Reach thousands of remote-first job seekers. No credit card required.</p>
        </div>
        <div style={{background:'#141414',border:'1px solid #222',borderRadius:20,padding:'32px 28px',display:'flex',flexDirection:'column',gap:20}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>JOB TITLE</label><input style={inp} value={form.title} onChange={e=>set('title',e.target.value)} placeholder="e.g. Senior React Developer" /></div>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>COMPANY</label><input style={inp} value={form.company} onChange={e=>set('company',e.target.value)} placeholder="e.g. Acme Inc." /></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>LOCATION</label><input style={inp} value={form.location} onChange={e=>set('location',e.target.value)} placeholder="e.g. Remote" /></div>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>TYPE</label><select style={inp} value={form.type} onChange={e=>set('type',e.target.value)}>{TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>SALARY</label><input style={inp} value={form.salary} onChange={e=>set('salary',e.target.value)} placeholder="e.g. $120k-$160k" /></div>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>APPLY URL</label><input style={inp} value={form.url} onChange={e=>set('url',e.target.value)} placeholder="https://..." /></div>
          </div>
          <div><label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:4}}>DESCRIPTION</label><textarea style={{...inp,minHeight:120,resize:'vertical'}} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Describe the role..." /></div>
          <div>
            <label style={{fontSize:13,color:'#888',fontWeight:600,display:'block',marginBottom:8}}>TAGS</label>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {TAGS.map(tag=>(
                <button key={tag} onClick={()=>toggleTag(tag)} style={{padding:'6px 14px',borderRadius:20,fontSize:13,border:'1.5px solid',borderColor:form.tags.includes(tag)?'#c9a84c':'#333',color:form.tags.includes(tag)?'#c9a84c':'#aaa',background:form.tags.includes(tag)?'rgba(201,168,76,0.15)':'transparent',cursor:'pointer'}}>{tag}</button>
              ))}
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>LOGO EMOJI</label><input style={inp} value={form.logo} onChange={e=>set('logo',e.target.value)} placeholder="e.g. rocket" /></div>
            <div><label style={{fontSize:13,color:'#888',fontWeight:600}}>CONTACT EMAIL</label><input style={inp} type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@company.com" /></div>
          </div>
          {error && <p style={{color:'#ff6b6b',fontSize:14,margin:0}}>{error}</p>}
          <button onClick={handleSubmit} disabled={loading} style={{background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#0d0d0d',fontSize:17,fontWeight:700,border:'none',borderRadius:14,padding:'16px 40px',cursor:loading?'not-allowed':'pointer',width:'100%',opacity:loading?0.5:1}}>
            {loading ? 'Submitting...' : 'Post Job for Free'}
          </button>
        </div>
      </div>
    </div>
  )
}
