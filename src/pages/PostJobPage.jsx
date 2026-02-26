import { useState } from 'react'

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance']

export default function PostJobPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [form, setForm] = useState({
    title: '', company: '', location: '', type: 'Full-time',
    salary: '', description: '', tags: [], logo: '', email: '', url: '',
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && form.tags.length < 6 && !form.tags.includes(t)) {
      set('tags', [...form.tags, t])
      setTagInput('')
    }
  }

  const removeTag = (t) => set('tags', form.tags.filter(x => x !== t))

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Required'
    if (!form.company.trim()) e.company = 'Required'
    if (!form.location.trim()) e.location = 'Required'
    if (!form.description.trim() || form.description.length < 50) e.description = 'Min 50 characters'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setStep(2)
  }

  if (step === 2) return <SuccessScreen company={form.company} title={form.title} />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #0d0d12)', color: 'var(--text, #e8e8f0)', fontFamily: "'DM Sans', sans-serif", padding: '0 0 80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        :root { --gold: #F0C040; --bg: #0d0d12; --card: #13131a; --border: rgba(255,255,255,0.07); --dim: #6b6b80; --text: #e8e8f0; }
        .pj-hero { background: linear-gradient(135deg, #0d0d12 0%, #13101f 50%, #0d0d12 100%); border-bottom: 1px solid var(--border); padding: 56px 24px 40px; text-align: center; position: relative; overflow: hidden; }
        .pj-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(240,192,64,0.08) 0%, transparent 70%); pointer-events: none; }
        .pj-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; margin: 0 0 12px; background: linear-gradient(135deg, #fff 40%, var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .pj-hero p { color: var(--dim); font-size: 1rem; margin: 0 0 16px; }
        .pj-free-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(76,175,130,0.12); border: 1px solid rgba(76,175,130,0.3); color: #4caf82; font-size: 0.8rem; font-weight: 700; padding: 5px 14px; border-radius: 20px; }
        .pj-wrap { max-width: 760px; margin: 0 auto; padding: 0 20px; }
        .pj-perks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 32px 0; }
        @media(max-width:560px) { .pj-perks { grid-template-columns: 1fr; } }
        .pj-perk { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; font-size: 0.82rem; color: var(--dim); display: flex; align-items: flex-start; gap: 10px; }
        .pj-perk-icon { font-size: 1.1rem; flex-shrink: 0; }
        .pj-perk strong { display: block; color: var(--text); font-size: 0.85rem; margin-bottom: 2px; }
        .pj-section { margin-bottom: 20px; }
        .pj-label { font-size: 0.78rem; font-weight: 600; color: var(--dim); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
        .pj-err-text { color: #f05; font-size: 0.72rem; font-weight: 400; text-transform: none; }
        .pj-input { width: 100%; background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; color: var(--text); font-size: 0.95rem; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
        .pj-input:focus { border-color: rgba(240,192,64,0.5); }
        .pj-input.error { border-color: rgba(220,50,50,0.6); }
        .pj-input::placeholder { color: var(--dim); }
        textarea.pj-input { resize: vertical; min-height: 140px; line-height: 1.6; }
        .pj-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width:500px) { .pj-row { grid-template-columns: 1fr; } }
        .pj-type-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .pj-type-pill { padding: 7px 16px; border-radius: 50px; border: 1px solid var(--border); background: var(--card); color: var(--dim); font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .pj-type-pill.active { border-color: var(--gold); background: rgba(240,192,64,0.1); color: var(--gold); }
        .pj-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 10px; }
        .pj-tag { background: rgba(240,192,64,0.1); border: 1px solid rgba(240,192,64,0.25); color: var(--gold); font-size: 0.78rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; display: flex; align-items: center; gap: 5px; }
        .pj-tag button { background: none; border: none; color: var(--gold); cursor: pointer; padding: 0; font-size: 0.9rem; line-height: 1; }
        .pj-tag-row { display: flex; gap: 8px; }
        .pj-tag-row .pj-input { flex: 1; }
        .pj-add-btn { background: rgba(240,192,64,0.1); border: 1px solid rgba(240,192,64,0.3); color: var(--gold); font-weight: 600; padding: 0 18px; border-radius: 10px; cursor: pointer; font-size: 0.85rem; white-space: nowrap; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
        .pj-add-btn:hover { background: rgba(240,192,64,0.2); }
        .pj-divider { border: none; border-top: 1px solid var(--border); margin: 28px 0; }
        .pj-section-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 20px; color: var(--text); }
        .pj-hint { font-size: 0.75rem; color: var(--dim); margin-top: 6px; }
        .pj-notice { background: rgba(240,192,64,0.05); border: 1px solid rgba(240,192,64,0.12); border-radius: 12px; padding: 14px 16px; font-size: 0.82rem; color: var(--dim); margin-top: 16px; line-height: 1.6; }
        .pj-notice strong { color: var(--gold); }
        .pj-submit { width: 100%; padding: 16px; background: var(--gold); color: #000; font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 800; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s; margin-top: 28px; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .pj-submit:hover { background: #f5ce50; transform: translateY(-1px); }
        .pj-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .pj-dot { width: 7px; height: 7px; border-radius: 50%; background: #000; animation: pjbounce 0.6s infinite alternate; }
        .pj-dot:nth-child(2) { animation-delay: 0.2s; }
        .pj-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pjbounce { from { transform: translateY(0); } to { transform: translateY(-6px); } }
      `}</style>

      <div className="pj-hero">
        <div className="pj-wrap">
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📣</div>
          <h1>Post a Job on OpportuAI</h1>
          <p>Reach thousands of remote-first developers, designers & operators</p>
          <div className="pj-free-badge">✦ Completely free while we're growing</div>
        </div>
      </div>

      <div className="pj-wrap" style={{ marginTop: '32px' }}>
        <div className="pj-perks">
          <div className="pj-perk">
            <span className="pj-perk-icon">⚡</span>
            <div><strong>Live in 24h</strong>We review and approve all listings manually</div>
          </div>
          <div className="pj-perk">
            <span className="pj-perk-icon">🌍</span>
            <div><strong>Global reach</strong>Candidates from 80+ countries browse daily</div>
          </div>
          <div className="pj-perk">
            <span className="pj-perk-icon">🎯</span>
            <div><strong>Targeted audience</strong>Remote-first, tech-focused job seekers</div>
          </div>
        </div>

        <hr className="pj-divider" />
        <div className="pj-section-title">Job details</div>

        <div className="pj-row" style={{ marginBottom: '14px' }}>
          <div className="pj-section">
            <div className="pj-label">Job Title {errors.title && <span className="pj-err-text">{errors.title}</span>}</div>
            <input className={`pj-input${errors.title ? ' error' : ''}`} placeholder="e.g. Senior React Engineer" value={form.title} onChange={e => set('title', e.target.value)} />
          </div>
          <div className="pj-section">
            <div className="pj-label">Company Name {errors.company && <span className="pj-err-text">{errors.company}</span>}</div>
            <input className={`pj-input${errors.company ? ' error' : ''}`} placeholder="e.g. Acme Corp" value={form.company} onChange={e => set('company', e.target.value)} />
          </div>
        </div>

        <div className="pj-row" style={{ marginBottom: '14px' }}>
          <div className="pj-section">
            <div className="pj-label">Location {errors.location && <span className="pj-err-text">{errors.location}</span>}</div>
            <input className={`pj-input${errors.location ? ' error' : ''}`} placeholder="e.g. Remote, USA, Worldwide" value={form.location} onChange={e => set('location', e.target.value)} />
          </div>
          <div className="pj-section">
            <div className="pj-label">Salary / Rate</div>
            <input className="pj-input" placeholder="e.g. $120k–$160k or $80/hr" value={form.salary} onChange={e => set('salary', e.target.value)} />
          </div>
        </div>

        <div className="pj-section" style={{ marginBottom: '14px' }}>
          <div className="pj-label">Job Type</div>
          <div className="pj-type-pills">
            {TYPES.map(t => (
              <button key={t} className={`pj-type-pill${form.type === t ? ' active' : ''}`} onClick={() => set('type', t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="pj-section" style={{ marginBottom: '14px' }}>
          <div className="pj-label">
            Job Description {errors.description && <span className="pj-err-text">{errors.description}</span>}
            <span style={{ color: form.description.length >= 50 ? '#4caf82' : 'var(--dim)', fontWeight: 400, textTransform: 'none', fontSize: '0.72rem' }}>{form.description.length} chars</span>
          </div>
          <textarea className={`pj-input${errors.description ? ' error' : ''}`} placeholder="Describe the role, responsibilities, and requirements..." value={form.description} onChange={e => set('description', e.target.value)} />
        </div>

        <div className="pj-section" style={{ marginBottom: '14px' }}>
          <div className="pj-label">Skills & Tags <span style={{ color: 'var(--dim)', textTransform: 'none', fontSize: '0.72rem' }}>{form.tags.length}/6</span></div>
          {form.tags.length > 0 && (
            <div className="pj-tags">
              {form.tags.map(t => (
                <div key={t} className="pj-tag">{t}<button onClick={() => removeTag(t)}>×</button></div>
              ))}
            </div>
          )}
          <div className="pj-tag-row">
            <input className="pj-input" placeholder="e.g. React, Node.js, Python — press Enter" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
            <button className="pj-add-btn" onClick={addTag}>+ Add</button>
          </div>
        </div>

        <hr className="pj-divider" />
        <div className="pj-section-title">Company & contact</div>

        <div className="pj-row" style={{ marginBottom: '14px' }}>
          <div className="pj-section">
            <div className="pj-label">Company Logo URL</div>
            <input className="pj-input" placeholder="https://yourcompany.com/logo.png" value={form.logo} onChange={e => set('logo', e.target.value)} />
            <div className="pj-hint">PNG or SVG — shown on the job card</div>
          </div>
          <div className="pj-section">
            <div className="pj-label">Application URL</div>
            <input className="pj-input" placeholder="https://yourcompany.com/apply" value={form.url} onChange={e => set('url', e.target.value)} />
            <div className="pj-hint">Where candidates click "Apply"</div>
          </div>
        </div>

        <div className="pj-section">
          <div className="pj-label">Your Email {errors.email && <span className="pj-err-text">{errors.email}</span>}</div>
          <input className={`pj-input${errors.email ? ' error' : ''}`} type="email" placeholder="you@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
          <div className="pj-hint">We'll email you when your listing goes live</div>
        </div>

        <div className="pj-notice">
          <strong>How it works:</strong> Submit → we review within 24h → your job goes live in the Community tab. Completely free while OpportuAI is growing. Questions? <strong>hello@opportunai.com</strong>
        </div>

        <button className="pj-submit" onClick={handleSubmit} disabled={loading}>
          {loading
            ? <><div className="pj-dot" /><div className="pj-dot" /><div className="pj-dot" /></>
            : <>Post Job for Free 🚀</>
          }
        </button>
      </div>
    </div>
  )
}

function SuccessScreen({ company, title }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #0d0d12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", color: '#e8e8f0', padding: '24px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes ring { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        .ring { position: absolute; border-radius: 50%; border: 2px solid rgba(240,192,64,0.4); animation: ring 1.8s ease-out infinite; }
      `}</style>
      <div style={{ textAlign: 'center', maxWidth: '440px' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ring" style={{ width: '80px', height: '80px', animationDelay: '0s' }} />
          <div className="ring" style={{ width: '80px', height: '80px', animationDelay: '0.6s' }} />
          <div style={{ fontSize: '2.2rem', position: 'relative', zIndex: 1 }}>✅</div>
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 12px', color: '#F0C040' }}>Listing Submitted!</h1>
        <p style={{ color: '#6b6b80', marginBottom: '8px' }}>
          <strong style={{ color: '#e8e8f0' }}>{title}</strong> at <strong style={{ color: '#e8e8f0' }}>{company}</strong>
        </p>
        <p style={{ color: '#6b6b80', fontSize: '0.9rem', lineHeight: 1.6 }}>
          We'll review your listing within 24 hours and email you when it goes live. Completely free.
        </p>
        <a href="/jobs" style={{ display: 'inline-block', marginTop: '28px', background: '#F0C040', color: '#000', fontFamily: 'Syne, sans-serif', fontWeight: 800, padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem' }}>
          Browse Jobs →
        </a>
      </div>
    </div>
  )
}
