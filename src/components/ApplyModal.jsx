import { useState } from 'react'

const STEPS = ['Your Info', 'Experience', 'Cover Letter', 'Review']

export default function ApplyModal({ job, onClose }) {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    // Step 0 — Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    location: '',
    // Step 1 — Experience
    yearsExp: '',
    currentRole: '',
    currentCompany: '',
    resumeText: '',
    skills: '',
    // Step 2 — Cover Letter
    coverLetter: '',
    whyRole: '',
    salary: '',
    startDate: '',
  })

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: null }))
  }

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'Required'
      if (!form.lastName.trim()) e.lastName = 'Required'
      if (!form.email.includes('@')) e.email = 'Valid email required'
    }
    if (step === 1) {
      if (!form.yearsExp) e.yearsExp = 'Required'
      if (!form.resumeText.trim() || form.resumeText.length < 30) e.resumeText = 'Please add at least a brief summary'
    }
    if (step === 2) {
      if (!form.coverLetter.trim() || form.coverLetter.length < 50) e.coverLetter = 'Please write at least 50 characters'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1600))

    // Save application to localStorage
    const application = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toISOString(),
      ...form,
    }
    const existing = JSON.parse(localStorage.getItem('opportunai_applications') || '[]')
    localStorage.setItem('opportunai_applications', JSON.stringify([application, ...existing]))

    setLoading(false)
    setDone(true)
  }

  const inputStyle = (field) => ({
    background: errors[field] ? 'rgba(250,96,96,0.04)' : 'rgba(255,255,255,0.025)',
    border: `1px solid ${errors[field] ? 'rgba(250,96,96,0.4)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: '12px', padding: '0.82rem 1rem',
    color: 'var(--text)', fontSize: '0.9rem', outline: 'none',
    width: '100%', fontFamily: 'var(--font-body)',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  })

  const onFocus = e => e.target.style.borderColor = 'rgba(240,192,64,0.35)'
  const onBlur = (field) => e => e.target.style.borderColor = errors[field] ? 'rgba(250,96,96,0.4)' : 'rgba(255,255,255,0.07)'

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: '600px', maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header" style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'center', flex: 1 }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
            }}>
              {job.logo
                ? <img src={job.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px', borderRadius: '10px' }} onError={e => { e.target.style.display = 'none'; e.target.parentElement.textContent = job.emoji || '💼' }} />
                : job.emoji || '💼'}
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {done ? '✓ Application Sent' : `Apply · Step ${step + 1} of ${STEPS.length}`}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
                {job.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>{job.company} · {job.location}</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Step indicator */}
        {!done && (
          <div style={{ padding: '0 2rem 1rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'center' }}>
                  <div style={{
                    height: '3px', width: '100%', borderRadius: '10px',
                    background: i <= step ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                    transition: 'background 0.3s ease',
                  }} />
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700,
                    color: i === step ? 'var(--gold)' : i < step ? 'var(--green)' : 'var(--dim2)',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    transition: 'color 0.3s',
                  }}>
                    {i < step ? '✓ ' : ''}{s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="modal-body" style={{ overflowY: 'auto', flex: 1 }}>

          {/* ✅ SUCCESS */}
          {done && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '80px', height: '80px', margin: '0 auto 1.5rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(61,218,120,0.15), rgba(240,192,64,0.08))',
                border: '2px solid rgba(61,218,120,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.2rem', animation: 'float 3s ease-in-out infinite',
                boxShadow: '0 0 50px rgba(61,218,120,0.12)',
              }}>🎉</div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.4rem' }}>
                Application Sent!
              </div>
              <div style={{ color: 'var(--dim)', fontSize: '0.88rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                Your application for <span style={{ color: 'var(--text)' }}>{job.title}</span> at{' '}
                <span style={{ color: 'var(--gold)' }}>{job.company}</span> has been submitted.<br />
                They'll reach you at <span style={{ color: 'var(--green)' }}>{form.email}</span>.
              </div>

              {/* Summary card */}
              <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', padding: '1.2rem', textAlign: 'left', marginBottom: '1.5rem',
              }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
                  Application Summary
                </div>
                {[
                  { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                  { label: 'Email', value: form.email },
                  { label: 'Experience', value: `${form.yearsExp} years` },
                  { label: 'Current Role', value: form.currentRole || '—' },
                  { label: 'Salary Expectation', value: form.salary || 'Not specified' },
                  { label: 'Available From', value: form.startDate || 'Immediately' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--dim)' }}>{label}</span>
                    <span style={{ color: 'var(--text2)', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={onClose}>Back to Jobs</button>
                <button className="btn btn-ghost" onClick={() => { setDone(false); setStep(0) }}>Edit & Resubmit</button>
              </div>
            </div>
          )}

          {/* STEP 0 — Personal Info */}
          {!done && step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="row2">
                <div className="field">
                  <label>First Name *</label>
                  <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Jane" style={inputStyle('firstName')} onFocus={onFocus} onBlur={onBlur('firstName')} />
                  {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                </div>
                <div className="field">
                  <label>Last Name *</label>
                  <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith" style={inputStyle('lastName')} onFocus={onFocus} onBlur={onBlur('lastName')} />
                  {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                </div>
              </div>
              <div className="row2">
                <div className="field">
                  <label>Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" style={inputStyle('email')} onFocus={onFocus} onBlur={onBlur('email')} />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" style={inputStyle('phone')} onFocus={onFocus} onBlur={onBlur('phone')} />
                </div>
              </div>
              <div className="field">
                <label>Current Location</label>
                <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. New York, NY or Remote" style={inputStyle('location')} onFocus={onFocus} onBlur={onBlur('location')} />
              </div>
              <div className="row2">
                <div className="field">
                  <label>LinkedIn URL</label>
                  <input value={form.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="linkedin.com/in/jane" style={inputStyle('linkedin')} onFocus={onFocus} onBlur={onBlur('linkedin')} />
                </div>
                <div className="field">
                  <label>Portfolio / GitHub</label>
                  <input value={form.portfolio} onChange={e => set('portfolio', e.target.value)} placeholder="github.com/jane or jane.dev" style={inputStyle('portfolio')} onFocus={onFocus} onBlur={onBlur('portfolio')} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — Experience */}
          {!done && step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="row2">
                <div className="field">
                  <label>Years of Experience *</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['0–1', '1–3', '3–6', '6–10', '10+'].map(y => (
                      <button key={y} onClick={() => set('yearsExp', y)} style={{
                        padding: '0.42rem 0.9rem', borderRadius: '50px', border: 'none', cursor: 'pointer',
                        background: form.yearsExp === y ? 'rgba(240,192,64,0.12)' : 'rgba(255,255,255,0.04)',
                        color: form.yearsExp === y ? 'var(--gold)' : 'var(--dim)',
                        border: `1px solid ${form.yearsExp === y ? 'rgba(240,192,64,0.3)' : 'rgba(255,255,255,0.06)'}`,
                        fontSize: '0.78rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s',
                      }}>{y} yrs</button>
                    ))}
                  </div>
                  {errors.yearsExp && <span className="error-msg">{errors.yearsExp}</span>}
                </div>
                <div className="field">
                  <label>Current / Last Role</label>
                  <input value={form.currentRole} onChange={e => set('currentRole', e.target.value)} placeholder="e.g. Senior Engineer" style={inputStyle('currentRole')} onFocus={onFocus} onBlur={onBlur('currentRole')} />
                </div>
              </div>
              <div className="field">
                <label>Current / Last Company</label>
                <input value={form.currentCompany} onChange={e => set('currentCompany', e.target.value)} placeholder="e.g. Google" style={inputStyle('currentCompany')} onFocus={onFocus} onBlur={onBlur('currentCompany')} />
              </div>
              <div className="field">
                <label>Key Skills (comma-separated)</label>
                <input value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="React, TypeScript, Node.js, AWS..." style={inputStyle('skills')} onFocus={onFocus} onBlur={onBlur('skills')} />
              </div>
              <div className="field">
                <label>Resume / Experience Summary * <span style={{ color: 'var(--dim2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>({form.resumeText.length} chars)</span></label>
                <textarea value={form.resumeText} onChange={e => set('resumeText', e.target.value)}
                  placeholder="Briefly describe your background, key achievements, and relevant experience for this role..."
                  rows={5} style={{ ...inputStyle('resumeText'), resize: 'vertical', minHeight: '100px' }}
                  onFocus={onFocus} onBlur={onBlur('resumeText')} />
                {errors.resumeText && <span className="error-msg">{errors.resumeText}</span>}
              </div>
            </div>
          )}

          {/* STEP 2 — Cover Letter */}
          {!done && step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Role context reminder */}
              <div style={{
                background: 'rgba(240,192,64,0.04)', border: '1px solid rgba(240,192,64,0.1)',
                borderRadius: '12px', padding: '0.9rem 1rem',
                display: 'flex', gap: '0.8rem', alignItems: 'center',
              }}>
                <span style={{ fontSize: '1.2rem' }}>💡</span>
                <div style={{ fontSize: '0.78rem', color: 'var(--dim)', lineHeight: 1.6 }}>
                  You're applying for <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{job.title}</span> at <span style={{ color: 'var(--text2)' }}>{job.company}</span>.
                  {job.tags?.length > 0 && <> Key skills: <span style={{ color: 'var(--text2)' }}>{job.tags.join(', ')}</span>.</>}
                </div>
              </div>

              <div className="field">
                <label>Cover Letter * <span style={{ color: 'var(--dim2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>({form.coverLetter.length} chars)</span></label>
                <textarea value={form.coverLetter} onChange={e => set('coverLetter', e.target.value)}
                  placeholder={`Dear ${job.company} team,\n\nI'm excited to apply for the ${job.title} role because...`}
                  rows={7} style={{ ...inputStyle('coverLetter'), resize: 'vertical', minHeight: '140px' }}
                  onFocus={onFocus} onBlur={onBlur('coverLetter')} />
                {errors.coverLetter && <span className="error-msg">{errors.coverLetter}</span>}
              </div>

              <div className="row2">
                <div className="field">
                  <label>Salary Expectation</label>
                  <input value={form.salary} onChange={e => set('salary', e.target.value)} placeholder="e.g. $120k–$150k" style={inputStyle('salary')} onFocus={onFocus} onBlur={onBlur('salary')} />
                </div>
                <div className="field">
                  <label>Available From</label>
                  <input value={form.startDate} onChange={e => set('startDate', e.target.value)} placeholder="e.g. Immediately or 4 weeks" style={inputStyle('startDate')} onFocus={onFocus} onBlur={onBlur('startDate')} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Review */}
          {!done && step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
                {[
                  { section: '👤 Personal Info', items: [
                    { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                    { label: 'Email', value: form.email },
                    { label: 'Phone', value: form.phone || '—' },
                    { label: 'Location', value: form.location || '—' },
                    { label: 'LinkedIn', value: form.linkedin || '—' },
                    { label: 'Portfolio', value: form.portfolio || '—' },
                  ]},
                  { section: '💼 Experience', items: [
                    { label: 'Years Exp.', value: `${form.yearsExp} years` },
                    { label: 'Current Role', value: form.currentRole || '—' },
                    { label: 'Company', value: form.currentCompany || '—' },
                    { label: 'Skills', value: form.skills || '—' },
                  ]},
                  { section: '📝 Application', items: [
                    { label: 'Salary', value: form.salary || 'Not specified' },
                    { label: 'Start Date', value: form.startDate || 'Immediately' },
                  ]},
                ].map(({ section, items }) => (
                  <div key={section}>
                    <div style={{ padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.7rem', fontWeight: 800, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{section}</div>
                    {items.map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.82rem' }}>
                        <span style={{ color: 'var(--dim)' }}>{label}</span>
                        <span style={{ color: 'var(--text2)', fontWeight: 500, maxWidth: '60%', textAlign: 'right', wordBreak: 'break-word' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Cover letter preview */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '1rem' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>📝 Cover Letter Preview</div>
                <p style={{ color: 'var(--text2)', fontSize: '0.82rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{form.coverLetter.slice(0, 200)}{form.coverLetter.length > 200 ? '...' : ''}</p>
              </div>

              <div style={{ background: 'rgba(61,218,120,0.05)', border: '1px solid rgba(61,218,120,0.15)', borderRadius: '12px', padding: '0.8rem 1rem', fontSize: '0.78rem', color: 'var(--green)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span>✓</span> Everything looks good. Hit submit to send your application to <strong>{job.company}</strong>.
              </div>
            </div>
          )}

          {/* Navigation */}
          {!done && (
            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.5rem' }}>
              {step > 0 && (
                <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>← Back</button>
              )}
              {step < STEPS.length - 1 && (
                <button className="btn btn-primary" onClick={handleNext} style={{ flex: 2 }}>
                  Continue →
                </button>
              )}
              {step === STEPS.length - 1 && (
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 2, background: 'linear-gradient(135deg, #3DDA78, #2bb864)' }}>
                  {loading ? <span className="spin">↻</span> : '🚀 Submit Application'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
