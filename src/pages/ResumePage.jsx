import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function ResumePage() {
  const { profile } = useAuth()
  const [form, setForm] = useState({
    name: '', role: '',
    skills: profile?.skills || '',
    experience: profile?.experience || '',
    education: '',
  })
  const [resume, setResume] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const buildResume = async () => {
    setLoading(true); setResume('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1400,
          messages: [{ role: 'user', content: `Create a professional ATS-optimized resume:\nName: ${form.name}\nTarget Role: ${form.role}\nSkills: ${form.skills}\nExperience: ${form.experience}\nEducation: ${form.education}\n\nFormat with clear sections: Professional Summary, Core Skills, Work Experience, Education. Use strong action verbs, quantify achievements where possible. Make it compelling and concise.` }]
        })
      })
      const data = await res.json()
      setResume(data.content?.map(b => b.text || '').join('') || 'Error generating. Please try again.')
      setStep(3)
    } catch {
      setResume('Connection error. Please check your connection and try again.')
      setStep(3)
    }
    setLoading(false)
  }

  const STEPS = ['Your Info', 'Review', 'Resume Ready']

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'var(--d2)', borderBottom: '1px solid var(--border)',
        padding: '2.5rem 3rem', textAlign: 'center',
      }}>
        <div className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>✨ AI POWERED</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '0.6rem' }}>
          Build Your Perfect Resume
        </h1>
        <p style={{ color: 'var(--dim)', fontSize: '1rem', maxWidth: '460px', margin: '0 auto' }}>
          Enter your details — AI crafts an ATS-optimized resume in under 10 seconds
        </p>
      </div>

      <div style={{ padding: '3rem 2rem', maxWidth: '760px', margin: '0 auto' }}>
        {/* Step indicator */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '0', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem',
        }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', flex: 1 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 800, transition: 'all 0.3s',
                  background: step > i + 1 ? 'var(--grad)' : step === i + 1 ? 'var(--grad)' : 'var(--d4)',
                  color: step >= i + 1 ? '#000' : 'var(--dim)',
                  border: step >= i + 1 ? 'none' : '1px solid var(--border)',
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.68rem', color: step === i + 1 ? 'var(--gold)' : 'var(--dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ height: '1px', flex: 0.5, background: step > i + 1 ? 'var(--gold)' : 'var(--border)', marginBottom: '1.6rem', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, var(--d2), var(--d3))',
          border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem',
        }}>
          {step < 3 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div className="row2">
                <div className="field">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="e.g. Sarah Johnson" />
                </div>
                <div className="field">
                  <label>Target Role</label>
                  <input name="role" value={form.role} onChange={handle} placeholder="e.g. Senior Product Manager" />
                </div>
              </div>
              <div className="field">
                <label>Key Skills</label>
                <input name="skills" value={form.skills} onChange={handle} placeholder="Python, Leadership, React, Data Analysis..." />
              </div>
              <div className="field">
                <label>Work Experience</label>
                <textarea name="experience" value={form.experience} onChange={handle} rows={4} placeholder="Describe your roles, companies, and achievements. e.g. 5 years at Google as Senior Engineer, led team of 8, shipped X product used by 2M users..." />
              </div>
              <div className="field">
                <label>Education</label>
                <input name="education" value={form.education} onChange={handle} placeholder="e.g. BSc Computer Science, MIT, 2019" />
              </div>

              <button
                className="btn btn-primary btn-full"
                onClick={step === 1 ? () => setStep(2) : buildResume}
                disabled={step === 1 ? (!form.name || !form.role) : loading}
                style={{ marginTop: '0.4rem' }}
              >
                {step === 1 ? 'Continue →' :
                  loading ? <><span className="spin">◌</span> Crafting Your Resume...</> :
                  '🧠 Generate My Resume'}
              </button>

              {step === 2 && (
                <button className="btn btn-ghost" style={{ marginTop: '-0.5rem' }} onClick={() => setStep(1)}>← Back</button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--green)', fontWeight: 800, fontSize: '1.05rem' }}>✅ Resume Ready!</span>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => navigator.clipboard.writeText(resume)}>📋 Copy</button>
                  <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }} onClick={() => { setStep(1); setResume('') }}>↺ Rebuild</button>
                </div>
              </div>
              <pre style={{
                background: 'var(--dark)', border: '1px solid var(--border)', borderRadius: '14px',
                padding: '1.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap',
                wordWrap: 'break-word', maxHeight: '520px', overflowY: 'auto',
              }}>{resume}</pre>
              <p style={{ fontSize: '0.78rem', color: 'var(--dim)', textAlign: 'center' }}>
                💡 Tip: Copy and paste into Google Docs or Word to add formatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
