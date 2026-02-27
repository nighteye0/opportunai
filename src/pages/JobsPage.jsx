import { useState, useEffect } from 'react'

const CATS = ['All','Engineering','Design','Marketing','DevOps','Sales','Product','Customer Success','Data','AI / ML','Other']

function matchesCat(job, cat) {
  if (cat === 'All') return true
  const fields = [job.category, job.type, job.department, job.tags, job.tag]
  return fields.some(f => {
    if (!f) return false
    if (Array.isArray(f)) return f.some(v => String(v).toLowerCase().includes(cat.toLowerCase()))
    return String(f).toLowerCase().includes(cat.toLowerCase())
  })
}

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load jobs')
        return r.json()
      })
      .then(d => {
        const arr = Array.isArray(d) ? d : (d.jobs || d.data || [])
        const clean = arr.filter(j => j && (j.title || j.position) && (j.company || j.employer))
        setJobs(clean)
        setFiltered(clean)
        setLoading(false)
      })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  useEffect(() => {
    try {
      let arr = jobs
      if (cat !== 'All') arr = arr.filter(j => matchesCat(j, cat))
      if (search.trim()) {
        const q = search.toLowerCase()
        arr = arr.filter(j =>
          (j.title || j.position || '').toLowerCase().includes(q) ||
          (j.company || j.employer || '').toLowerCase().includes(q) ||
          (j.location || '').toLowerCase().includes(q)
        )
      }
      setFiltered(arr)
    } catch (e) {
      console.error('Filter error:', e)
    }
  }, [cat, search, jobs])

  const pill = (active) => ({
    padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500,
    border: `1px solid ${active ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.07)'}`,
    background: active ? 'rgba(34,197,94,0.08)' : 'transparent',
    color: active ? '#22c55e' : '#555', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap'
  })

  const tagStyle = (color) => ({
    padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap',
    background: color === 'green' ? 'rgba(34,197,94,0.08)' : color === 'amber' ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${color === 'green' ? 'rgba(34,197,94,0.15)' : color === 'amber' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)'}`,
    color: color === 'green' ? '#22c55e' : color === 'amber' ? '#f59e0b' : '#555'
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: '#060606', color: '#e8e8e8', fontFamily: "'DM Sans',-apple-system,sans-serif" }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 36px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(34,197,94,0.04), transparent)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(34,197,94,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Live Feed</div>
          <h1 style={{ fontFamily: "'Syne','system-ui',sans-serif", fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 4 }}>Remote Jobs</h1>
          <p style={{ fontSize: 13, color: '#555', marginBottom: 24 }}>Updated daily from 5 sources worldwide</p>

          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CATS.map(c => (
                <button key={c} style={pill(cat === c)} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <input
              style={{ padding: '9px 14px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, fontSize: 13, color: '#e8e8e8', fontFamily: 'inherit', outline: 'none', width: 240, maxWidth: '100%' }}
              placeholder="Search jobs, companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 24px 80px' }}>

        {error && (
          <div style={{ padding: '16px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, color: '#ef4444', fontSize: 13, marginBottom: 20 }}>
            Failed to load jobs: {error}
          </div>
        )}

        <div style={{ fontSize: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ color: '#22c55e', fontWeight: 600 }}>{loading ? '...' : `${filtered.length} jobs`}</span>
          {cat !== 'All' && !loading && filtered.length === 0 && (
            <span style={{ color: '#555', marginLeft: 8 }}>No {cat} jobs found — <button onClick={() => setCat('All')} style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12 }}>show all</button></span>
          )}
        </div>

        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: 14, opacity: 0.2 }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: '#222' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 11, background: '#222', borderRadius: 4, width: '40%', marginBottom: 7 }} />
                  <div style={{ height: 9, background: '#1a1a1a', borderRadius: 4, width: '25%' }} />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: '#444' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 14, marginBottom: 8 }}>No jobs match your search</div>
              <button onClick={() => { setCat('All'); setSearch('') }} style={{ padding: '8px 16px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, color: '#818cf8', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>Clear filters</button>
            </div>
          ) : (
            filtered.map((j, i) => {
              const title = j.title || j.position || 'Untitled'
              const company = j.company || j.employer || 'Unknown'
              const url = j.url || j.link || j.apply_url || '#'
              const salary = j.salary || j.compensation || j.salary_range
              const emoji = j.company_emoji || j.emoji || j.logo_emoji || '💼'

              return (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', gap: 14, textDecoration: 'none', color: 'inherit', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: '#111', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>
                    {emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e0e0e0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
                    <div style={{ fontSize: 12, color: '#444', marginTop: 2 }}>{company}{j.location ? ` · ${j.location}` : ''}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    {salary && <span style={tagStyle('amber')}>{salary}</span>}
                    <span style={tagStyle('green')}>Remote</span>
                  </div>
                </a>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}