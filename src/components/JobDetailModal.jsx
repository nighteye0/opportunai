import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { SRC_COLOR, SRC_LABEL } from '../hooks/useJobs'

export default function JobDetailModal({ job, onClose }) {
  const { user, profile, toggleSavedJob, markApplied } = useAuth()
  const saved = profile?.savedJobs?.includes(job.id)
  const applied = profile?.appliedJobs?.find(j => j.id === job.id)
  const c = SRC_COLOR[job.source] || '#888'

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{
        maxWidth: '680px', maxHeight: '90vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '1.8rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{
              width: '58px', height: '58px', borderRadius: '14px',
              background: 'var(--d4)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.9rem', flexShrink: 0, overflow: 'hidden',
            }}>
              {job.logo
                ? <img src={job.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} onError={e => { e.target.style.display='none'; e.target.parentElement.textContent = job.emoji||'💼' }} />
                : job.emoji || '💼'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="src-tag" style={{ background: `${c}18`, color: c, marginBottom: '0.5rem' }}>
                {SRC_LABEL[job.source] || job.source}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.2rem' }}>
                {job.title}
              </h2>
              <div style={{ fontSize: '0.88rem', color: 'var(--dim)', fontWeight: 600 }}>{job.company}</div>
            </div>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>

          {/* Meta pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
            {[`📍 ${job.location}`, `💼 ${job.type}`, job.posted && `📅 ${job.posted}`].filter(Boolean).map(m => (
              <div key={m} style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.28rem 0.8rem',
                borderRadius: '50px', background: 'var(--d3)', border: '1px solid var(--border)',
                fontSize: '0.74rem', color: 'var(--dim)', fontWeight: 600,
              }}>{m}</div>
            ))}
            <div style={{
              display: 'inline-flex', alignItems: 'center', padding: '0.28rem 0.8rem',
              borderRadius: '50px', background: 'var(--gd)', border: '1px solid rgba(232,184,75,0.3)',
              fontSize: '0.74rem', color: 'var(--gold)', fontWeight: 700,
            }}>💰 {job.salary || 'Competitive'}</div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {(job.tags || []).map(t => (
              <span key={t} style={{
                fontSize: '0.74rem', padding: '0.25rem 0.75rem', borderRadius: '50px',
                background: 'var(--d5)', color: 'var(--dim)', border: '1px solid rgba(255,255,255,0.06)',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '1.6rem 1.8rem', flex: 1, overflowY: 'auto' }}>
          <div style={{
            fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 700, marginBottom: '0.8rem',
          }}>About this role</div>
          <p style={{ fontSize: '0.9rem', color: 'var(--dim)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {job.description || 'Full job description not available. Click Apply to view details on the company\'s website.'}
          </p>
          {job.email && (
            <div style={{ marginTop: '1.4rem', paddingTop: '1.2rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem' }}>Contact</div>
              <a href={`mailto:${job.email}`} style={{ color: 'var(--gold)', fontSize: '0.88rem', fontWeight: 600 }}>{job.email}</a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.2rem 1.8rem', borderTop: '1px solid var(--border)',
          display: 'flex', gap: '0.8rem', alignItems: 'center', justifyContent: 'flex-end',
          flexShrink: 0,
        }}>
          {applied && (
            <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>✅ Applied {new Date(applied.appliedAt).toLocaleDateString()}</span>
          )}
          {user && (
            <button
              className={`btn btn-ghost`}
              onClick={() => toggleSavedJob(job.id)}
              style={{ color: saved ? 'var(--gold)' : undefined, borderColor: saved ? 'rgba(232,184,75,0.4)' : undefined }}
            >
              {saved ? '♥ Saved' : '♡ Save Job'}
            </button>
          )}
          <a
            href={job.url || '#'} target="_blank" rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.8rem', fontSize: '0.9rem', textDecoration: 'none' }}
            onClick={() => user && markApplied(job)}
          >Apply Now →</a>
        </div>
      </div>
    </div>
  )
}
