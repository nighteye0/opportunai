import { useState } from 'react'

const JOB_TYPES = ["Full-time","Part-time","Freelance","Contract","Remote","Internship"]
const CATEGORIES = ["Technology","Design","Marketing","Sales","Finance","HR","Data","Product","DevOps","Writing","Customer Success","Other"]

export default function SubmitModal({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    title: '', company: '', location: 'Remote', salary: '',
    type: 'Full-time', category: 'Technology', email: '', url: '', description: '',
  })
  const [done, setDone] = useState(false)
  const h = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = () => {
    if (!form.title || !form.company || !form.email) return
    onSubmit({ ...form, id: 'sub_' + Date.now(), emoji: '📌', tags: [form.category], source: 'submitted', posted: new Date().toISOString().split('T')[0] })
    setDone(true)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
            <h2 className="modal-title">Job Posted!</h2>
            <p style={{ color: 'var(--dim)', margin: '0.8rem 0 2rem', lineHeight: 1.6 }}>
              Your listing is now live on OpportuAI.<br />Thousands of candidates can see it right now.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Back to Jobs →</button>
          </div>
        ) : (
          <>
            <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.4rem' }}>
              <div>
                <div className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>📌 POST A JOB</div>
                <h2 className="modal-title">Submit Your Listing</h2>
                <p style={{ color: 'var(--dim)', fontSize: '0.84rem', marginTop: '0.3rem' }}>Free for everyone · Goes live instantly</p>
              </div>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>
            <div className="modal-body">
              <div className="row2">
                <div className="field"><label>Job Title *</label><input name="title" value={form.title} onChange={h} placeholder="e.g. Senior React Developer" /></div>
                <div className="field"><label>Company Name *</label><input name="company" value={form.company} onChange={h} placeholder="e.g. Acme Corp" /></div>
              </div>
              <div className="row2">
                <div className="field"><label>Location</label><input name="location" value={form.location} onChange={h} placeholder="Remote / New York" /></div>
                <div className="field"><label>Salary / Rate</label><input name="salary" value={form.salary} onChange={h} placeholder="$80K–$120K or $60/hr" /></div>
              </div>
              <div className="row2">
                <div className="field">
                  <label>Job Type</label>
                  <select name="type" value={form.type} onChange={h}>{JOB_TYPES.map(t => <option key={t}>{t}</option>)}</select>
                </div>
                <div className="field">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={h}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
                </div>
              </div>
              <div className="field">
                <label>Job Description</label>
                <textarea name="description" value={form.description} onChange={h} rows={4} placeholder="Describe responsibilities, requirements, perks..." />
              </div>
              <div className="row2">
                <div className="field"><label>Contact Email *</label><input name="email" type="email" value={form.email} onChange={h} placeholder="hiring@company.com" /></div>
                <div className="field"><label>Apply URL</label><input name="url" value={form.url} onChange={h} placeholder="https://yoursite.com/apply" /></div>
              </div>
              <button className="btn btn-primary btn-full" onClick={submit} disabled={!form.title || !form.company || !form.email}>
                🚀 Publish Job — It's Free
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--dim)' }}>
                No credit card required · No account needed · Live instantly
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
