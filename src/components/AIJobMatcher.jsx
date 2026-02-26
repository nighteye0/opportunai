import { useState } from 'react'
import { SRC_COLOR, SRC_LABEL } from '../hooks/useJobs'

export default function AIJobMatcher({ allJobs, onMatchResult, onClose }) {
  const [profile, setProfile] = useState({ skills: '', experience: '', goals: '', location: '' })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [matches, setMatches] = useState([])
  const [reasoning, setReasoning] = useState('')
  const handle = e => setProfile({ ...profile, [e.target.name]: e.target.value })

  const runMatch = async () => {
    setLoading(true)
    try {
      const jobSummaries = allJobs.slice(0, 60).map(j =>
        `ID:${j.id} | ${j.title} at ${j.company} | ${j.location} | ${j.type} | ${j.salary || 'Competitive'} | Tags: ${(j.tags || []).join(', ')}`
      ).join('\n')

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          messages: [{ role: 'user', content: `You are a job matching AI. Given a candidate profile and job listings, identify the TOP 5 best-fit jobs.\n\nCANDIDATE PROFILE:\nSkills: ${profile.skills}\nExperience: ${profile.experience}\nGoals/Preferences: ${profile.goals}\nPreferred Location: ${profile.location || 'Any'}\n\nJOB LISTINGS:\n${jobSummaries}\n\nRespond ONLY with a JSON object (no markdown, no backticks):\n{"matches":["id1","id2","id3","id4","id5"],"reasoning":"2-3 sentence explanation"}` }]
        })
      })
      const data = await res.json()
      const text = data.content?.map(b => b.text || '').join('') || '{}'
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      const matchedJobs = (parsed.matches || []).map(id => allJobs.find(j => j.id === id)).filter(Boolean)
      setMatches(matchedJobs)
      setReasoning(parsed.reasoning || '')
      setStep(2)
      onMatchResult(matchedJobs.map(j => j.id))
    } catch {
      setReasoning('Could not load matches. Please check your connection and try again.')
      setStep(2)
    }
    setLoading(false)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.4rem' }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '0.6rem' }}>🎯 AI POWERED</div>
            <h2 className="modal-title">Find Your Perfect Match</h2>
            <p style={{ color: 'var(--dim)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
              {step === 1 ? 'Tell us about yourself — AI ranks your best-fit roles instantly' : `Found ${matches.length} great matches for you`}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {step === 1 ? (
          <div className="modal-body">
            <div className="field">
              <label>Your Skills *</label>
              <input name="skills" value={profile.skills} onChange={handle} placeholder="e.g. React, Python, Product Management, SQL..." />
            </div>
            <div className="field">
              <label>Experience Level & Background</label>
              <textarea name="experience" value={profile.experience} onChange={handle} rows={3}
                placeholder="e.g. 5 years as a frontend engineer, worked at startups, led teams of 3–5..." />
            </div>
            <div className="field">
              <label>What You're Looking For</label>
              <input name="goals" value={profile.goals} onChange={handle}
                placeholder="e.g. Senior role, remote, growth-stage startup..." />
            </div>
            <div className="field">
              <label>Preferred Location</label>
              <input name="location" value={profile.location} onChange={handle} placeholder="e.g. Remote, New York, Austin..." />
            </div>
            <button className="btn btn-primary btn-full" onClick={runMatch} disabled={!profile.skills || loading}>
              {loading ? <><span className="spin">◌</span> Analyzing {allJobs.length} jobs...</> : '🎯 Find My Best Matches'}
            </button>
          </div>
        ) : (
          <div className="modal-body">
            {reasoning && (
              <div style={{
                background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
                borderRadius: 'var(--radius)', padding: '1rem 1.2rem',
              }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: '0.5rem' }}>✦ AI Analysis</div>
                <p style={{ fontSize: '0.86rem', color: 'var(--dim)', lineHeight: 1.65 }}>{reasoning}</p>
              </div>
            )}
            {matches.length > 0 ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {matches.map((job, i) => {
                    const c = SRC_COLOR[job.source] || '#888'
                    return (
                      <div key={job.id} style={{
                        display: 'flex', alignItems: 'center', gap: '0.9rem',
                        padding: '0.85rem 1rem', background: 'var(--d3)',
                        border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                        transition: 'all 0.2s',
                      }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)', minWidth: '28px' }}>#{i+1}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--dim)', marginBottom: '0.3rem' }}>{job.company} · {job.location}</div>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span className="src-tag" style={{ background: `${c}18`, color: c }}>{SRC_LABEL[job.source]}</span>
                            {(job.tags || []).slice(0, 2).map(t => <span key={t} style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '50px', background: 'var(--d5)', color: 'var(--dim)' }}>{t}</span>)}
                          </div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{job.salary || 'Competitive'}</div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', gap: '0.7rem' }}>
                  <button className="btn btn-primary btn-full" onClick={onClose}>View Highlighted Jobs ↓</button>
                  <button className="btn btn-secondary" style={{ flexShrink: 0 }} onClick={() => { setStep(1); setMatches([]); setReasoning(''); onMatchResult([]) }}>↺ Redo</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--dim)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>😕</div>
                <p>{reasoning || 'No matches found. Try broadening your skills or preferences.'}</p>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setStep(1); setReasoning('') }}>Try Again</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
