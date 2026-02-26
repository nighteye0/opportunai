import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const ADMIN_PASSWORD = 'opportunai2024'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState('pending')
  const [editing, setEditing] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (authed) fetchJobs()
  }, [authed, filter])

  const fetchJobs = async () => {
    const { data } = await supabase
      .from('job_submissions')
      .select('*')
      .eq('status', filter)
      .order('created_at', { ascending: false })
    setJobs(data || [])
  }

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError('') }
    else setPwError('Wrong password.')
  }

  const updateStatus = async (id, status) => {
    await supabase.from('job_submissions').update({ status }).eq('id', id)
    setMsg(status === 'approved' ? 'Job approved and live!' : 'Job rejected.')
    setTimeout(() => setMsg(''), 3000)
    fetchJobs()
  }

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job permanently?')) return
    await supabase.from('job_submissions').delete().eq('id', id)
    setMsg('Job deleted.')
    setTimeout(() => setMsg(''), 3000)
    fetchJobs()
  }

  const saveEdit = async () => {
    const { id, ...fields } = editing
    await supabase.from('job_submissions').update(fields).eq('id', id)
    setEditing(null)
    setMsg('Changes saved.')
    setTimeout(() => setMsg(''), 3000)
    fetchJobs()
  }

  if (!authed) return (
    <div style={s.center}>
      <div style={s.loginBox}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
        <h2 style={s.loginTitle}>Admin Dashboard</h2>
        <p style={s.loginSub}>Enter your admin password to continue.</p>
        <input
          style={{ ...s.inp, marginBottom: 12 }}
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
        />
        {pwError && <p style={{ color: '#ff6b6b', fontSize: 13, margin: '0 0 12px' }}>{pwError}</p>}
        <button onClick={login} style={s.loginBtn}>Enter Dashboard</button>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Admin Dashboard</h1>
          <p style={s.sub}>Manage job submissions</p>
        </div>
        <button onClick={() => setAuthed(false)} style={s.signOutBtn}>Lock</button>
      </div>

      {msg && <div style={s.toast}>{msg}</div>}

      <div style={s.tabs}>
        {['pending','approved','rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ ...s.tab, ...(filter === f ? s.tabActive : {}) }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {editing && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <h3 style={{ color: '#fff', marginTop: 0 }}>Edit Submission</h3>
            {['title','company','location','type','salary','url','description'].map(field => (
              <div key={field} style={{ marginBottom: 12 }}>
                <label style={s.label}>{field.toUpperCase()}</label>
                {field === 'description'
                  ? <textarea style={{ ...s.inp, minHeight: 80, resize: 'vertical' }} value={editing[field] || ''} onChange={e => setEditing({...editing, [field]: e.target.value})} />
                  : <input style={s.inp} value={editing[field] || ''} onChange={e => setEditing({...editing, [field]: e.target.value})} />
                }
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={saveEdit} style={s.approveBtn}>Save Changes</button>
              <button onClick={() => setEditing(null)} style={s.rejectBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {jobs.length === 0
        ? <div style={s.empty}>No {filter} submissions.</div>
        : jobs.map(job => (
          <div key={job.id} style={s.card}>
            <div style={s.cardTop}>
              <div style={s.jobTitle}>{job.logo} {job.title}</div>
              <div style={s.jobMeta}>{job.company} · {job.location} · {job.type}</div>
              {job.salary && <div style={s.salary}>{job.salary}</div>}
              <div style={s.email}>email: {job.email}</div>
              {job.tags && job.tags.length > 0 && (
                <div style={s.tagRow}>{job.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>
              )}
              {job.description && <p style={s.desc}>{job.description}</p>}
              {job.url && <a href={job.url} target="_blank" rel="noreferrer" style={s.link}>{job.url}</a>}
              <div style={s.date}>Submitted: {new Date(job.created_at).toLocaleString()}</div>
            </div>
            <div style={s.actions}>
              {filter !== 'approved' && (
                <button onClick={() => updateStatus(job.id, 'approved')} style={s.approveBtn}>Approve</button>
              )}
              {filter !== 'rejected' && (
                <button onClick={() => updateStatus(job.id, 'rejected')} style={s.rejectBtn}>Reject</button>
              )}
              <button onClick={() => setEditing(job)} style={s.editBtn}>Edit</button>
              <button onClick={() => deleteJob(job.id)} style={s.deleteBtn}>Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: '#0d0d0d', padding: '32px 24px', fontFamily: 'Inter,sans-serif', maxWidth: 860, margin: '0 auto' },
  center: { minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter,sans-serif' },
  loginBox: { background: '#141414', border: '1px solid #222', borderRadius: 24, padding: 48, textAlign: 'center', maxWidth: 380, width: '100%' },
  loginTitle: { color: '#fff', fontSize: 24, fontWeight: 800, margin: '0 0 8px' },
  loginSub: { color: '#888', margin: '0 0 24px', fontSize: 14 },
  loginBtn: { width: '100%', background: 'linear-gradient(135deg,#c9a84c,#e8c96a)', color: '#0d0d0d', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 },
  title: { color: '#fff', fontSize: 28, fontWeight: 800, margin: 0 },
  sub: { color: '#666', fontSize: 14, margin: '4px 0 0' },
  signOutBtn: { background: 'transparent', border: '1px solid #333', color: '#888', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13 },
  toast: { background: '#1a3a1a', border: '1px solid #2d5a2d', color: '#6fcf6f', borderRadius: 10, padding: '12px 18px', marginBottom: 20, fontSize: 14 },
  tabs: { display: 'flex', gap: 8, marginBottom: 24 },
  tab: { background: 'transparent', border: '1.5px solid #2a2a2a', color: '#666', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600 },
  tabActive: { borderColor: '#c9a84c', color: '#c9a84c', background: 'rgba(201,168,76,0.1)' },
  card: { background: '#141414', border: '1px solid #222', borderRadius: 16, padding: 24, marginBottom: 16 },
  cardTop: { marginBottom: 16 },
  jobTitle: { color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 4 },
  jobMeta: { color: '#888', fontSize: 14, marginBottom: 4 },
  salary: { color: '#c9a84c', fontSize: 13, fontWeight: 600, marginBottom: 4 },
  email: { color: '#6fcf6f', fontSize: 13, marginBottom: 8 },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  tag: { background: '#1a1a1a', border: '1px solid #333', color: '#aaa', borderRadius: 12, padding: '2px 10px', fontSize: 12 },
  desc: { color: '#aaa', fontSize: 13, margin: '8px 0', lineHeight: 1.5 },
  link: { color: '#6b9fff', fontSize: 12, display: 'block', marginBottom: 8 },
  date: { color: '#555', fontSize: 12 },
  actions: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  approveBtn: { background: 'rgba(47,100,47,0.3)', border: '1px solid #2d5a2d', color: '#6fcf6f', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  rejectBtn: { background: 'rgba(100,47,47,0.3)', border: '1px solid #5a2d2d', color: '#cf6f6f', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  editBtn: { background: 'rgba(30,30,80,0.5)', border: '1px solid #333', color: '#6b9fff', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  deleteBtn: { background: 'transparent', border: '1px solid #2a2a2a', color: '#555', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  empty: { textAlign: 'center', color: '#555', padding: '60px 0', fontSize: 16 },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 },
  modal: { background: '#141414', border: '1px solid #333', borderRadius: 20, padding: 32, width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' },
  label: { display: 'block', fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.5px' },
  inp: { width: '100%', background: '#0d0d0d', border: '1.5px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' },
}
