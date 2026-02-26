export default function APIModal({ keys, onSave, onClose }) {
  let local = { ...keys }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.4rem' }}>
          <div>
            <div className="badge" style={{ color: 'var(--dim)', border: '1px solid var(--border)', marginBottom: '0.6rem' }}>🔑 API KEYS</div>
            <h2 className="modal-title">Connect Job Sources</h2>
            <p style={{ color: 'var(--dim)', fontSize: '0.84rem', marginTop: '0.3rem' }}>Add free API keys to pull millions of real live jobs</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
            background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '12px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '0.85rem' }}>✅ Remotive</span>
            <span style={{ color: 'var(--dim)', fontSize: '0.82rem' }}>No key needed — already fetching live remote jobs!</span>
          </div>

          <div className="field">
            <label>🔍 Adzuna App ID — <a href="https://developer.adzuna.com" target="_blank" rel="noreferrer" style={{ color: 'var(--gold)' }}>Get free key</a></label>
            <input placeholder="Your Adzuna App ID" defaultValue={keys.adzunaId || ''} onChange={e => { local.adzunaId = e.target.value }} />
          </div>
          <div className="field">
            <label>🔍 Adzuna App Key</label>
            <input placeholder="Your Adzuna App Key" defaultValue={keys.adzunaKey || ''} onChange={e => { local.adzunaKey = e.target.value }} />
          </div>
          <div className="field">
            <label>⚡ JSearch RapidAPI Key — <a href="https://rapidapi.com/letscrape-6bfp2/api/jsearch" target="_blank" rel="noreferrer" style={{ color: 'var(--gold)' }}>Get free key</a></label>
            <input placeholder="Your RapidAPI Key" defaultValue={keys.rapidKey || ''} onChange={e => { local.rapidKey = e.target.value }} />
          </div>

          <button className="btn btn-primary btn-full" onClick={() => { onSave(local); onClose() }}>
            Save & Fetch Live Jobs
          </button>

          <div style={{
            background: 'var(--d3)', border: '1px solid var(--border)', borderRadius: '12px',
            padding: '1rem', fontSize: '0.78rem', color: 'var(--dim)', lineHeight: 1.65,
          }}>
            🔒 <strong style={{ color: 'var(--text)' }}>Keys stay in your browser only.</strong> Never sent to any server.<br />
            All three APIs have free tiers — no credit card needed.
          </div>
        </div>
      </div>
    </div>
  )
}
