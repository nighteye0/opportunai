import { useState, useEffect, useCallback } from 'react'

function useLiveClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function pad(n) { return String(n).padStart(2, '0') }

export default function LiveFeed({ allJobs, onOpenSubmit, onOpenDetail }) {
  const time = useLiveClock()
  const [votes, setVotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('opportunai_votes') || '{}') } catch { return {} }
  })
  const [launches, setLaunches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('opportunai_launches') || '[]') } catch { return [] }
  })
  const [showLaunchForm, setShowLaunchForm] = useState(false)
  const [launchForm, setLaunchForm] = useState({ name: '', tagline: '', url: '', emoji: '🚀', category: 'AI' })
  const [activeTab, setActiveTab] = useState('jobs')

  const CATEGORIES = ['AI', 'SaaS', 'DevTools', 'Design', 'Productivity', 'Finance', 'Health', 'Other']

  const todayStr = new Date().toISOString().split('T')[0]

  // Today's jobs sorted by posted date
  const todayJobs = allJobs
    .filter(j => j.posted === todayStr || !j.posted)
    .slice(0, 8)

  const justLanded = [...allJobs]
    .sort((a, b) => new Date(b.posted || 0) - new Date(a.posted || 0))
    .slice(0, 6)

  const vote = useCallback((id) => {
    setVotes(prev => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 }
      localStorage.setItem('opportunai_votes', JSON.stringify(next))
      return next
    })
  }, [])

  const submitLaunch = () => {
    if (!launchForm.name || !launchForm.tagline) return
    const newLaunch = {
      ...launchForm,
      id: 'l_' + Date.now(),
      posted: todayStr,
      postedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
    const updated = [newLaunch, ...launches]
    setLaunches(updated)
    localStorage.setItem('opportunai_launches', JSON.stringify(updated))
    setLaunchForm({ name: '', tagline: '', url: '', emoji: '🚀', category: 'AI' })
    setShowLaunchForm(false)
  }

  const allLaunches = launches

  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`

  const tabStyle = (k) => ({
    padding: '0.4rem 1rem', borderRadius: '8px 8px 0 0', fontSize: '0.74rem',
    fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
    textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.18s',
    background: activeTab === k ? 'var(--gd)' : 'transparent',
    color: activeTab === k ? 'var(--gold)' : 'var(--dim)',
    borderBottom: activeTab === k ? '2px solid var(--gold)' : '2px solid transparent',
  })

  return (
    <section style={{ padding: '4rem 3rem', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Section header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem', fontWeight: 700 }}>✦ Live Feed</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
            Today's <span className="gold-text">Activity</span>
          </h2>
        </div>

        {/* Live clock */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700,
          background: 'var(--d3)', border: '1px solid var(--border)',
          borderRadius: '12px', padding: '0.6rem 1.4rem',
          color: 'var(--gold)', letterSpacing: '0.08em',
          boxShadow: '0 0 30px rgba(232,184,75,0.08)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 8px var(--green)', animation: 'blink 1.5s infinite' }} />
          {timeStr}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left: Tabs + content */}
        <div style={{ background: 'var(--d2)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', gap: '0.2rem', padding: '0 1.2rem', borderBottom: '1px solid var(--border)', background: 'var(--d3)' }}>
            <button style={tabStyle('jobs')} onClick={() => setActiveTab('jobs')}>🔥 Jobs Today</button>
            <button style={tabStyle('launches')} onClick={() => setActiveTab('launches')}>🚀 Launches ({allLaunches.length})</button>
            <button style={tabStyle('just')} onClick={() => setActiveTab('just')}>⚡ Just Landed</button>
          </div>

          {/* Jobs Today */}
          {activeTab === 'jobs' && (
            <div>
              {todayJobs.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--dim)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>📭</div>
                  <p>No jobs posted today yet</p>
                </div>
              ) : (
                todayJobs.map((job, i) => (
                  <div key={job.id} onClick={() => onOpenDetail?.(job)} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.9rem 1.2rem', cursor: 'pointer',
                    borderBottom: i < todayJobs.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--d3)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: 'var(--d4)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0,
                    }}>{job.logo ? <img src={job.logo} style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '6px' }} /> : job.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>{job.company} · {job.location}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}>{job.salary}</span>
                      <button onClick={(e) => { e.stopPropagation(); vote(job.id) }} style={{
                        background: votes[job.id] ? 'var(--gd)' : 'var(--d4)',
                        border: `1px solid ${votes[job.id] ? 'rgba(232,184,75,0.3)' : 'var(--border)'}`,
                        borderRadius: '8px', padding: '0.25rem 0.6rem',
                        cursor: 'pointer', fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem', fontWeight: 700,
                        color: votes[job.id] ? 'var(--gold)' : 'var(--dim)',
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                        transition: 'all 0.15s',
                      }}>
                        ▲ {votes[job.id] || 0}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Indie Launches */}
          {activeTab === 'launches' && (
            <div>
              {allLaunches.length === 0 && (
                <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--dim)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>🛸</div>
                  <p style={{ marginBottom: '1rem' }}>No launches yet — be the first!</p>
                </div>
              )}
              {allLaunches.map((l, i) => (
                <div key={l.id} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.9rem 1.2rem',
                  borderBottom: i < allLaunches.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px', background: 'var(--d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0,
                  }}>{l.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{l.name}</span>
                      <span style={{
                        fontSize: '0.62rem', background: 'var(--gd)', color: 'var(--gold)',
                        padding: '0.1rem 0.5rem', borderRadius: '50px', fontWeight: 700,
                        border: '1px solid rgba(232,184,75,0.2)',
                      }}>{l.category}</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--dim)', marginTop: '0.1rem' }}>{l.tagline}</div>
                    {l.url && <a href={l.url.startsWith('http') ? l.url : 'https://' + l.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: 'var(--blue)', marginTop: '0.1rem', display: 'block' }}>🔗 {l.url}</a>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', flexShrink: 0 }}>
                    <button onClick={() => vote(l.id)} style={{
                      background: votes[l.id] ? 'var(--gd)' : 'var(--d4)',
                      border: `1px solid ${votes[l.id] ? 'rgba(232,184,75,0.3)' : 'var(--border)'}`,
                      borderRadius: '8px', padding: '0.3rem 0.7rem',
                      cursor: 'pointer', fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem', fontWeight: 700,
                      color: votes[l.id] ? 'var(--gold)' : 'var(--dim)',
                      transition: 'all 0.15s',
                    }}>▲ {votes[l.id] || 0}</button>
                    {l.postedAt && <span style={{ fontSize: '0.62rem', color: 'var(--dim)' }}>{l.postedAt}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Just Landed */}
          {activeTab === 'just' && (
            <div>
              {justLanded.map((job, i) => (
                <div key={job.id} onClick={() => onOpenDetail?.(job)} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.9rem 1.2rem', cursor: 'pointer',
                  borderBottom: i < justLanded.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--d3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 800, color: 'var(--dim)',
                    width: '22px', textAlign: 'center', flexShrink: 0,
                  }}>#{i + 1}</div>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '9px',
                    background: 'var(--d4)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1rem', flexShrink: 0,
                  }}>{job.logo ? <img src={job.logo} style={{ width: '26px', height: '26px', objectFit: 'contain', borderRadius: '5px' }} /> : job.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.title}</div>
                    <div style={{ fontSize: '0.73rem', color: 'var(--dim)' }}>{job.company}</div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <span style={{
                      fontSize: '0.65rem', padding: '0.2rem 0.6rem', borderRadius: '50px',
                      background: 'rgba(74,222,128,0.1)', color: 'var(--green)', fontWeight: 700,
                    }}>NEW</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); vote(job.id) }} style={{
                    background: votes[job.id] ? 'var(--gd)' : 'var(--d4)',
                    border: `1px solid ${votes[job.id] ? 'rgba(232,184,75,0.3)' : 'var(--border)'}`,
                    borderRadius: '8px', padding: '0.25rem 0.6rem',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem', fontWeight: 700,
                    color: votes[job.id] ? 'var(--gold)' : 'var(--dim)',
                    flexShrink: 0,
                  }}>▲ {votes[job.id] || 0}</button>
                </div>
              ))}
            </div>
          )}

          {/* Footer action */}
          <div style={{
            padding: '0.8rem 1.2rem', borderTop: '1px solid var(--border)',
            display: 'flex', gap: '0.6rem', background: 'var(--d3)',
          }}>
            {activeTab === 'launches' ? (
              <button onClick={() => setShowLaunchForm(true)} className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '0.45rem 1rem' }}>
                🚀 Submit Your Product
              </button>
            ) : (
              <button onClick={onOpenSubmit} className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '0.45rem 1rem' }}>
                📌 Post a Job
              </button>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Trending categories */}
          <div style={{ background: 'var(--d2)', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.4rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: '1rem' }}>📈 Trending Categories</div>
            {[
              { label: 'AI / Machine Learning', pct: 84, color: 'var(--purple)' },
              { label: 'React / Frontend', pct: 71, color: 'var(--blue)' },
              { label: 'Remote Full-time', pct: 63, color: 'var(--green)' },
              { label: 'SaaS Growth', pct: 52, color: 'var(--gold)' },
              { label: 'Freelance Dev', pct: 41, color: 'var(--orange)' },
            ].map(c => (
              <div key={c.label} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600 }}>{c.label}</span>
                  <span style={{ color: c.color, fontWeight: 700 }}>{c.pct}%</span>
                </div>
                <div style={{ height: '5px', background: 'var(--d4)', borderRadius: '50px', overflow: 'hidden' }}>
                  <div style={{ width: c.pct + '%', height: '100%', background: c.color, borderRadius: '50px', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div style={{ background: 'var(--d2)', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.4rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: '1rem' }}>📊 Platform Today</div>
            {[
              { label: 'Jobs Available', value: allJobs.length, icon: '💼' },
              { label: 'Products Launched', value: allLaunches.length, icon: '🚀' },
              { label: 'Total Upvotes', value: Object.values(votes).reduce((a, b) => a + b, 0), icon: '▲' },
            ].map(s => (
              <div key={s.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--dim)' }}>{s.icon} {s.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Weekly insight */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.08), rgba(232,184,75,0.05))',
            border: '1px solid rgba(167,139,250,0.2)', borderRadius: '18px', padding: '1.4rem',
          }}>
            <div style={{ fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple)', marginBottom: '0.8rem' }}>💡 This Week's Insight</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--dim)', lineHeight: 1.7 }}>
              AI roles dominate at <strong style={{ color: 'var(--text)' }}>28%</strong> of all posts. Multi-category products lead at <strong style={{ color: 'var(--text)' }}>84%</strong>, suggesting founders target broader markets. Night launches dominate at <strong style={{ color: 'var(--text)' }}>56%</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Launch submit modal */}
      {showLaunchForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }} onClick={() => setShowLaunchForm(false)}>
          <div style={{
            background: 'var(--d2)', border: '1px solid var(--border)', borderRadius: '24px',
            padding: '2rem', width: '100%', maxWidth: '480px', animation: 'slideIn 0.3s ease',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.3rem' }}>🚀 Submit Your Product</h2>
            <p style={{ color: 'var(--dim)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Share what you're building with the community</p>

            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.9rem' }}>
              <div style={{ flex: 0 }}>
                <label style={{ fontSize: '0.74rem', color: 'var(--dim)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>EMOJI</label>
                <input value={launchForm.emoji} onChange={e => setLaunchForm(f => ({ ...f, emoji: e.target.value }))}
                  style={{ width: '60px', background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text)', fontSize: '1.2rem', textAlign: 'center', outline: 'none' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.74rem', color: 'var(--dim)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>PRODUCT NAME *</label>
                <input value={launchForm.name} onChange={e => setLaunchForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="My Awesome App"
                  style={{ width: '100%', background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 0.9rem', color: 'var(--text)', fontSize: '0.88rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '0.9rem' }}>
              <label style={{ fontSize: '0.74rem', color: 'var(--dim)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>TAGLINE *</label>
              <input value={launchForm.tagline} onChange={e => setLaunchForm(f => ({ ...f, tagline: e.target.value }))}
                placeholder="The best tool for..."
                style={{ width: '100%', background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 0.9rem', color: 'var(--text)', fontSize: '0.88rem', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.74rem', color: 'var(--dim)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>URL</label>
                <input value={launchForm.url} onChange={e => setLaunchForm(f => ({ ...f, url: e.target.value }))}
                  placeholder="yourproduct.com"
                  style={{ width: '100%', background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 0.9rem', color: 'var(--text)', fontSize: '0.88rem', outline: 'none' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.74rem', color: 'var(--dim)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>CATEGORY</label>
                <select value={launchForm.category} onChange={e => setLaunchForm(f => ({ ...f, category: e.target.value }))}
                  style={{ width: '100%', background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 0.9rem', color: 'var(--text)', fontSize: '0.88rem', outline: 'none' }}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.7rem' }}>
              <button onClick={() => setShowLaunchForm(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={submitLaunch} className="btn btn-primary" style={{ flex: 2 }}>🚀 Launch It!</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
