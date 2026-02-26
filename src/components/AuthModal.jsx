import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthModal({ mode: initialMode, onClose }) {
  const [mode, setMode] = useState(initialMode || 'signin')
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signIn, signUp } = useAuth()

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    setError(''); setLoading(true)
    try {
      if (mode === 'signin') {
        const { error } = await signIn(form.email, form.password)
        if (error) throw error
        onClose()
      } else {
        const { error } = await signUp(form.email, form.password, form.name)
        if (error) throw error
        setSuccess('Check your email to confirm your account, then sign in!')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.4rem' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
              {mode === 'signin' ? '🔑 WELCOME BACK' : '🚀 GET STARTED'}
            </div>
            <h2 className="modal-title">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{
              textAlign: 'center', padding: '2rem 1rem',
              background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)',
              borderRadius: 'var(--radius)', 
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>✅</div>
              <p style={{ color: 'var(--green)', fontWeight: 600, lineHeight: 1.6 }}>{success}</p>
              <button className="btn btn-secondary" style={{ marginTop: '1.2rem' }} onClick={() => { setSuccess(''); setMode('signin'); }}>
                Sign In →
              </button>
            </div>
          ) : (
            <>
              {mode === 'signup' && (
                <div className="field">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Your full name" />
                </div>
              )}
              <div className="field">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" />
              </div>
              <div className="field">
                <label>Password</label>
                <input name="password" type="password" value={form.password} onChange={handle}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                  onKeyDown={e => e.key === 'Enter' && submit()} />
              </div>

              {error && <p className="error-msg">⚠️ {error}</p>}

              <button className="btn btn-primary btn-full"
                onClick={submit}
                disabled={!form.email || !form.password || loading}
                style={{ marginTop: '0.2rem' }}>
                {loading ? <><span className="spin">◌</span> {mode === 'signin' ? 'Signing in...' : 'Creating account...'}</> :
                  mode === 'signin' ? 'Sign In →' : 'Create Free Account →'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--dim)' }}>
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
                  style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
                  {mode === 'signin' ? 'Sign up free' : 'Sign in'}
                </button>
              </p>

              <div style={{
                fontSize: '0.74rem', color: 'var(--dim)', textAlign: 'center',
                padding: '0.8rem', background: 'var(--d3)', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
              }}>
                🔒 Powered by Supabase · Your data is secure · Free forever
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
