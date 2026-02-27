import { useState } from 'react'
import { Link } from 'react-router-dom'

const TYPES = [
  { id: 'job', icon: '💼', label: 'Job Listing', desc: 'Post a remote job opening' },
  { id: 'tool', icon: '🛠️', label: 'AI Tool', desc: 'Submit a SaaS or AI tool' },
  { id: 'product', icon: '📦', label: 'Digital Product', desc: 'Sell a template, course or resource' },
]

const JOB_CATS = ['Engineering','Design','Marketing','DevOps','Sales','Product','Customer Success','Data','AI / ML','Other']
const TOOL_CATS = ['Productivity','Writing','Design','Development','Marketing','Analytics','Communication','Finance','Other']
const PRODUCT_CATS = ['Notion Templates','UI & Design Kits','Online Courses','Code Templates','eBooks & Guides','AI Prompts','Spreadsheet Templates','Design Assets','Productivity Systems']

export default function SubmitPage() {
  const [type, setType] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...form })
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Submission failed')
      setDone(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const inp = (label, key, placeholder, required = true, type = 'text') => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6, display: 'block' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key] || ''}
        onChange={e => set(key, e.target.value)}
        required={required}
        style={{ width: '100%', padding: '11px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, fontSize: 14, color: '#e8e8e8', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }}
        onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.4)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
      />
    </div>
  )

  const textarea = (label, key, placeholder, required = true) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6, display: 'block' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={form[key] || ''}
        onChange={e => set(key, e.target.value)}
        required={required}
        rows={3}
        style={{ width: '100%', padding: '11px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, fontSize: 14, color: '#e8e8e8', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6, transition: 'border-color .15s' }}
        onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.4)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
      />
    </div>
  )

  const select = (label, key, options, required = true) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6, display: 'block' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <select
        value={form[key] || ''}
        onChange={e => set(key, e.target.value)}
        required={required}
        style={{ width: '100%', padding: '11px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, fontSize: 14, color: form[key] ? '#e8e8e8' : '#555', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
      >
        <option value="">Select category...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )

  // Success state
  if (done) return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: '#060606', color: '#e8e8e8', fontFamily: "'DM Sans',-apple-system,sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 24px' }}>✓</div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10 }}>Submission received!</h1>
        <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginBottom: 32 }}>
          Thanks for submitting! We review all submissions manually and will publish it within 24–48 hours if it meets our guidelines.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => { setDone(false); setType(null); setForm({}) }} style={{ padding: '10px 20px', background: '#6366f1', color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Submit Another</button>
          <Link to="/" style={{ padding: '10px 20px', background: 'transparent', color: '#666', fontWeight: 500, fontSize: 14, borderRadius: 9, border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>Back to Home</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: '#060606', color: '#e8e8e8', fontFamily: "'DM Sans',-apple-system,sans-serif" }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 40px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(99,102,241,0.05), transparent)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(129,140,248,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Submit</div>
          <h1 style={{ fontFamily: "'Syne','system-ui',sans-serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10 }}>Share with the community</h1>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7 }}>Submit a job listing, AI tool, or digital product. Free to list — we review all submissions within 48 hours.</p>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Type selector */}
        {!type ? (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 20, textAlign: 'center' }}>What are you submitting?</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {TYPES.map(t => (
                <button key={t.id} onClick={() => setType(t.id)} style={{ padding: '24px 16px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'all .2s', color: 'inherit' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.background = 'rgba(99,102,241,0.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#0a0a0a' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#e8e8e8', marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: '#555' }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Back button */}
            <button onClick={() => { setType(null); setForm({}) }} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 28, padding: 0 }}>
              ← Back
            </button>

            {/* Form header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, padding: '16px 20px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
              <span style={{ fontSize: 24 }}>{TYPES.find(t => t.id === type)?.icon}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{TYPES.find(t => t.id === type)?.label}</div>
                <div style={{ fontSize: 12, color: '#555' }}>Fill out the form below — all fields marked * are required</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* JOB FORM */}
              {type === 'job' && <>
                {inp('Job Title', 'title', 'e.g. Senior Frontend Engineer')}
                {inp('Company Name', 'company', 'e.g. Acme Inc.')}
                {inp('Company Website', 'company_url', 'https://acme.com', false, 'url')}
                {inp('Apply URL', 'url', 'https://acme.com/jobs/frontend', true, 'url')}
                {select('Category', 'category', JOB_CATS)}
                {inp('Salary Range', 'salary', 'e.g. $80k–$120k or Competitive', false)}
                {inp('Location', 'location', 'Remote — Worldwide')}
                {select('Job Type', 'type', ['Full-time', 'Part-time', 'Contract', 'Freelance'])}
                {textarea('Job Description', 'description', 'Brief description of the role and requirements...')}
                {inp('Your Email', 'email', 'your@email.com (not published)', true, 'email')}
              </>}

              {/* TOOL FORM */}
              {type === 'tool' && <>
                {inp('Tool Name', 'name', 'e.g. Notion, Figma, ChatGPT')}
                {inp('Website URL', 'url', 'https://yourtool.com', true, 'url')}
                {inp('Tagline', 'tagline', 'One sentence describing what it does')}
                {textarea('Description', 'description', 'What does your tool do? Who is it for?')}
                {select('Category', 'category', TOOL_CATS)}
                {inp('Pricing', 'pricing', 'e.g. Free, Freemium, $9/mo', false)}
                {inp('Logo Emoji', 'emoji', 'e.g. 🛠️ 🤖 ✨', false)}
                {inp('Your Email', 'email', 'your@email.com (not published)', true, 'email')}
              </>}

              {/* PRODUCT FORM */}
              {type === 'product' && <>
                {inp('Product Name', 'name', 'e.g. Ultimate Notion Dashboard')}
                {inp('Website / Store URL', 'url', 'https://gumroad.com/l/yourproduct', true, 'url')}
                {textarea('Description', 'description', 'What is it? Who is it for? What problem does it solve?')}
                {select('Category', 'category', PRODUCT_CATS)}
                {inp('Price', 'pricing', 'e.g. Free, $9, $29, Pay what you want')}
                {inp('Creator / Your Name', 'creator', 'Your name or brand')}
                {inp('Platform', 'platform', 'e.g. Gumroad, Lemon Squeezy, Own Site', false)}
                {inp('Logo Emoji', 'emoji', 'e.g. 📦 🎨 💡', false)}
                {inp('Your Email', 'email', 'your@email.com (not published)', true, 'email')}
              </>}

              {error && (
                <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8, fontSize: 13, color: '#ef4444', marginBottom: 18 }}>
                  {error}
                </div>
              )}

              <div style={{ padding: '14px 16px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)', borderRadius: 8, fontSize: 13, color: '#555', marginBottom: 24, lineHeight: 1.6 }}>
                📋 All submissions are reviewed manually before going live. We typically review within 24–48 hours. Spam or irrelevant submissions will be rejected.
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#333' : '#6366f1', color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
                {loading ? 'Submitting...' : 'Submit for Review →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}