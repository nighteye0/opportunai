import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { SRC_COLOR, SRC_LABEL } from '../hooks/useJobs'
import JobDetailModal from '../components/JobDetailModal'

function StatCard({ icon, value, label, color = 'var(--gold)' }) {
  return (
    <div style={{
      background: 'var(--d3)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.6rem',
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
    }}>
      <div style={{ fontSize: '1.8rem' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  )
}

export default function DashboardPage({ allJobs }) {
  const { user, profile, updateProfile, signOut, toggleSavedJob } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ skills: profile?.skills || '', experience: profile?.experience || '', location: profile?.location || '', bio: profile?.bio || '' })
  const [detailJob, setDetailJob] = useState(null)

  if (!user) {
    return (
      <div style={{ paddingTop: '72px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.8rem' }}>Sign in to access your dashboard</h2>
          <p style={{ color: 'var(--dim)', marginBottom: '1.8rem' }}>Track applications, save jobs, and manage your profile.</p>
          <Link to="/"><button className="btn btn-primary">← Back to Home</button></Link>
        </div>
      </div>
    )
  }

  const savedJobs = (profile?.savedJobs || []).map(id => allJobs.find(j => j.id === id)).filter(Boolean)
  const appliedJobs = profile?.appliedJobs || []

  const stats = [
    { icon: '💼', value: appliedJobs.length, label: 'Jobs Applied', color: 'var(--blue)' },
    { icon: '♥', value: savedJobs.length, label: 'Saved Jobs', color: 'var(--gold)' },
    { icon: '📅', value: appliedJobs.filter(j => {
      const d = new Date(j.appliedAt); const now = new Date()
      return (now - d) / (1000 * 60 * 60 * 24) <= 7
    }).length, label: 'Applied This Week', color: 'var(--green)' },
    { icon: '📊', value: profile?.skills ? profile.skills.split(',').length : 0, label: 'Skills Listed', color: 'var(--purple)' },
  ]

  const saveProfile = () => {
    updateProfile(form)
    setEditing(false)
  }

  const TABS = [
    { k: 'overview', l: '📊 Overview' },
    { k: 'saved', l: `♥ Saved (${savedJobs.length})` },
    { k: 'applied', l: `✅ Applied (${appliedJobs.length})` },
    { k: 'profile', l: '👤 Profile' },
  ]

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--d2)', borderBottom: '1px solid var(--border)', padding: '2rem 3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>📊 DASHBOARD</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800 }}>
              Welcome back{profile?.name || user.user_metadata?.full_name ? `, ${profile?.name || user.user_metadata.full_name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p style={{ color: 'var(--dim)', fontSize: '0.86rem', marginTop: '0.3rem' }}>{user.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <Link to="/jobs"><button className="btn btn-secondary">Browse Jobs</button></Link>
            <button className="btn btn-ghost" onClick={signOut}>Sign Out</button>
          </div>
        </div>

        {/* Dashboard tabs */}
        <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t.k} onClick={() => setActiveTab(t.k)} style={{
              padding: '0.5rem 1.1rem', borderRadius: '10px 10px 0 0',
              fontSize: '0.8rem', fontWeight: 700, border: 'none',
              borderBottom: activeTab === t.k ? '2px solid var(--gold)' : '2px solid transparent',
              background: activeTab === t.k ? 'var(--gd)' : 'transparent',
              color: activeTab === t.k ? 'var(--gold)' : 'var(--dim)',
              cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--font-body)',
            }}>{t.l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {stats.map(s => <StatCard key={s.label} {...s} />)}
            </div>

            {/* Recent activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '1rem' }}>Recent Applications</h3>
                {appliedJobs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--dim)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                    <p style={{ fontSize: '0.84rem' }}>No applications yet</p>
                    <Link to="/jobs"><button className="btn btn-secondary" style={{ marginTop: '0.8rem', fontSize: '0.78rem' }}>Browse Jobs →</button></Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {appliedJobs.slice(0, 5).map(job => (
                      <div key={job.id} style={{
                        display: 'flex', alignItems: 'center', gap: '0.8rem',
                        padding: '0.7rem', background: 'var(--d4)', borderRadius: '10px',
                      }}>
                        <div style={{ fontSize: '1.3rem' }}>{job.emoji || '💼'}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--dim)' }}>{job.company}</div>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--green)', fontWeight: 600, flexShrink: 0 }}>
                          {new Date(job.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                    {appliedJobs.length > 5 && (
                      <button onClick={() => setActiveTab('applied')} className="btn btn-ghost" style={{ fontSize: '0.78rem' }}>View all {appliedJobs.length} →</button>
                    )}
                  </div>
                )}
              </div>

              <div style={{ background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '1rem' }}>Saved Jobs</h3>
                {savedJobs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--dim)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔖</div>
                    <p style={{ fontSize: '0.84rem' }}>Save jobs to review them later</p>
                    <Link to="/jobs"><button className="btn btn-secondary" style={{ marginTop: '0.8rem', fontSize: '0.78rem' }}>Find Jobs →</button></Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {savedJobs.slice(0, 5).map(job => {
                      const c = SRC_COLOR[job.source] || '#888'
                      return (
                        <div key={job.id} style={{
                          display: 'flex', alignItems: 'center', gap: '0.8rem',
                          padding: '0.7rem', background: 'var(--d4)', borderRadius: '10px',
                          cursor: 'pointer', transition: 'background 0.18s',
                        }} onClick={() => setDetailJob(job)}>
                          <div style={{ fontSize: '1.3rem' }}>{job.emoji || '💼'}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--dim)' }}>{job.company}</div>
                          </div>
                          <div className="src-tag" style={{ background: `${c}18`, color: c, fontSize: '0.62rem', flexShrink: 0 }}>{SRC_LABEL[job.source]}</div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SAVED JOBS */}
        {activeTab === 'saved' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Saved Jobs</h2>
            {savedJobs.length === 0 ? (
              <div className="empty-state">
                <div className="icon">🔖</div>
                <h3>No saved jobs yet</h3>
                <p>Click the ♡ on any job to save it for later</p>
                <Link to="/jobs"><button className="btn btn-primary" style={{ marginTop: '1.2rem' }}>Browse Jobs</button></Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
                {savedJobs.map(job => {
                  const c = SRC_COLOR[job.source] || '#888'
                  return (
                    <div key={job.id} style={{
                      background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                      padding: '1.4rem', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onClick={() => setDetailJob(job)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,184,75,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.7rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>{job.emoji || '💼'}</div>
                        <button onClick={e => { e.stopPropagation(); toggleSavedJob(job.id) }} className="btn btn-ghost" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', color: 'var(--gold)', borderColor: 'rgba(232,184,75,0.3)' }}>♥ Unsave</button>
                      </div>
                      <div className="src-tag" style={{ background: `${c}18`, color: c, marginBottom: '0.5rem' }}>{SRC_LABEL[job.source]}</div>
                      <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '0.3rem' }}>{job.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--dim)', marginBottom: '0.6rem' }}>{job.company} · {job.location}</div>
                      <div style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem' }}>{job.salary || 'Competitive'}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* APPLIED JOBS */}
        {activeTab === 'applied' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Application Tracker</h2>
            {appliedJobs.length === 0 ? (
              <div className="empty-state">
                <div className="icon">📋</div>
                <h3>No applications tracked yet</h3>
                <p>When you click Apply on a job, it'll appear here automatically</p>
                <Link to="/jobs"><button className="btn btn-primary" style={{ marginTop: '1.2rem' }}>Find Jobs to Apply</button></Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {appliedJobs.map(job => {
                  const c = SRC_COLOR[job.source] || '#888'
                  const daysSince = Math.floor((new Date() - new Date(job.appliedAt)) / (1000 * 60 * 60 * 24))
                  return (
                    <div key={job.id} style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem 1.2rem', background: 'var(--d3)',
                      border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                      transition: 'all 0.2s', cursor: 'pointer',
                    }}
                    onClick={() => setDetailJob(job)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,184,75,0.25)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      <div style={{ fontSize: '1.6rem' }}>{job.emoji || '💼'}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{job.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--dim)' }}>{job.company} · {job.location}</div>
                      </div>
                      <div className="src-tag" style={{ background: `${c}18`, color: c }}>{SRC_LABEL[job.source]}</div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 700 }}>✅ Applied</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--dim)', marginTop: '0.2rem' }}>
                          {daysSince === 0 ? 'Today' : daysSince === 1 ? 'Yesterday' : `${daysSince}d ago`}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Your Profile</h2>
              {!editing ? (
                <button className="btn btn-secondary" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
              ) : (
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
                  <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              )}
            </div>

            {/* Avatar + basic info */}
            <div style={{
              background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              padding: '1.8rem', marginBottom: '1.2rem',
              display: 'flex', alignItems: 'center', gap: '1.5rem',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'var(--grad)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: 'var(--font-display)',
                fontSize: '1.8rem', fontWeight: 800, color: '#000', flexShrink: 0,
              }}>
                {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{user.user_metadata?.full_name || 'Your Name'}</div>
                <div style={{ color: 'var(--dim)', fontSize: '0.86rem', marginTop: '0.2rem' }}>{user.email}</div>
                <div className="badge badge-green" style={{ marginTop: '0.6rem', fontSize: '0.65rem' }}>✅ Verified</div>
              </div>
            </div>

            <div style={{ background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {editing ? (
                <>
                  <div className="field">
                    <label>Bio</label>
                    <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} placeholder="Tell employers about yourself..." />
                  </div>
                  <div className="field">
                    <label>Skills (comma-separated)</label>
                    <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="React, Python, Product Management..." />
                  </div>
                  <div className="field">
                    <label>Experience Level</label>
                    <textarea value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} rows={2} placeholder="e.g. 5 years frontend engineer, startups..." />
                  </div>
                  <div className="field">
                    <label>Preferred Location</label>
                    <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. Remote, New York..." />
                  </div>
                </>
              ) : (
                <>
                  {[
                    { label: 'Bio', value: profile?.bio },
                    { label: 'Skills', value: profile?.skills },
                    { label: 'Experience', value: profile?.experience },
                    { label: 'Preferred Location', value: profile?.location },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>{label}</div>
                      <div style={{ fontSize: '0.9rem', color: value ? 'var(--text)' : 'var(--dim)', fontStyle: value ? 'normal' : 'italic' }}>
                        {value || `No ${label.toLowerCase()} added yet`}
                      </div>
                    </div>
                  ))}
                  {!profile?.skills && (
                    <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} onClick={() => setEditing(true)}>+ Complete Your Profile</button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {detailJob && <JobDetailModal job={detailJob} onClose={() => setDetailJob(null)} />}
    </div>
  )
}
