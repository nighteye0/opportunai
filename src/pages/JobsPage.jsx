import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import JobCard from '../components/JobCard'
import ApplyModal from '../components/ApplyModal'
import { useJobs, SRC_COLOR, SRC_LABEL } from '../hooks/useJobs'

const TYPES = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Freelance']
const TABS = [
  { key: 'all', label: '🌐 All Jobs' },
  { key: 'remote', label: '🏠 Remote' },
  { key: 'freelance', label: '⚡ Freelance' },
  { key: 'community', label: '📌 Community' },
]

/* ─── Job Detail Modal ─── */
function JobDetailModal({ job, onClose, onApply, onVote, votes }) {
  const voteCount = votes?.[job.id] || 0
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flex: 1 }}>
            <div className="detail-logo">
              {job.logo
                ? <img src={job.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} onError={e => { e.target.style.display='none'; e.target.parentElement.textContent = job.emoji||'💼' }} />
                : job.emoji||'💼'}
            </div>
            <div>
              <div className="modal-title">{job.title}</div>
              <div className="modal-sub">{job.company} · {job.location}</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="tag-row">
            {[{ label: job.type, color: '#5BA4FA' }, { label: job.location, color: '#3DDA78' }, { label: job.salary||'Competitive', color: '#F0C040' }, { label: job.posted, color: '#A87CFA' }]
              .filter(x => x.label)
              .map(({ label, color }) => (
                <span key={label} style={{ padding: '0.28rem 0.8rem', borderRadius: '50px', background: `${color}12`, color, border: `1px solid ${color}22`, fontSize: '0.72rem', fontWeight: 700 }}>{label}</span>
              ))}
          </div>
          <div className="info-block">
            <div className="info-label">About the Role</div>
            <p className="info-text">{job.description || 'No description available.'}</p>
          </div>
          {job.tags?.length > 0 && (
            <div>
              <div className="info-label">Skills & Tools</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {job.tags.map(t => <span key={t} className="skill-chip-modal">{t}</span>)}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.7rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => onApply(job)} style={{ flex: 2, background: 'linear-gradient(135deg, #3DDA78, #2bb864)', color: '#000' }}>
              🚀 Apply on OpportuAI
            </button>
            {onVote && <button onClick={() => onVote(job.id)} className="btn btn-secondary" style={{ flex: 1 }}>▲ {voteCount > 0 ? voteCount : ''} Upvote</button>}
            <button onClick={onClose} className="btn btn-ghost">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Compare Modal ─── */
function CompareModal({ jobs, onClose, onApply }) {
  if (!jobs.length) return null
  const fields = [
    { key: 'company', label: 'Company' },
    { key: 'location', label: 'Location' },
    { key: 'type', label: 'Type' },
    { key: 'salary', label: 'Salary', fallback: 'Competitive' },
    { key: 'posted', label: 'Posted' },
  ]
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal compare-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">⚖️ Compare Jobs</div>
            <div className="modal-sub">{jobs.length} job{jobs.length > 1 ? 's' : ''} selected</div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ overflowX: 'auto' }}>
          <div className="compare-grid" style={{ gridTemplateColumns: `140px repeat(${jobs.length}, 1fr)` }}>
            {/* Header row */}
            <div className="compare-cell header-cell" />
            {jobs.map(j => (
              <div key={j.id} className="compare-cell job-header-cell">
                <div className="compare-logo">
                  {j.logo ? <img src={j.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }} onError={e => { e.target.style.display='none'; e.target.parentElement.textContent = j.emoji||'💼' }} /> : j.emoji||'💼'}
                </div>
                <div className="compare-job-title">{j.title}</div>
                <div className="compare-job-company">{j.company}</div>
              </div>
            ))}

            {/* Field rows */}
            {fields.map(f => (
              <>
                <div key={f.key + '_label'} className="compare-cell field-label">{f.label}</div>
                {jobs.map(j => (
                  <div key={j.id + f.key} className="compare-cell field-value">
                    {j[f.key] || f.fallback || '—'}
                  </div>
                ))}
              </>
            ))}

            {/* Tags row */}
            <div className="compare-cell field-label">Skills</div>
            {jobs.map(j => (
              <div key={j.id + '_tags'} className="compare-cell" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', padding: '0.8rem' }}>
                {(j.tags || []).map(t => <span key={t} className="skill-chip-modal">{t}</span>)}
                {!j.tags?.length && <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>—</span>}
              </div>
            ))}

            {/* Apply row */}
            <div className="compare-cell field-label" />
            {jobs.map(j => (
              <div key={j.id + '_apply'} className="compare-cell" style={{ padding: '0.8rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => onApply(j)}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #3DDA78, #2bb864)', color: '#000', fontSize: '0.78rem' }}
                >
                  Apply 🚀
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── AI Match Banner ─── */
function AIMatchBanner({ matches, total, onDismiss }) {
  if (!matches) return null
  return (
    <div className="ai-banner">
      <div className="ai-banner-glow" />
      <div className="ai-banner-content">
        <div className="ai-banner-icon">🤖</div>
        <div>
          <div className="ai-banner-title">AI Match Active</div>
          <div className="ai-banner-sub">Found <strong>{matches}</strong> jobs matched to your profile out of {total}</div>
        </div>
      </div>
      <button className="ai-banner-close" onClick={onDismiss}>✕</button>
    </div>
  )
}

/* ─── Compare Tray ─── */
function CompareTray({ compareList, jobs, onClear, onRemove, onOpenCompare }) {
  if (!compareList.length) return null
  const selectedJobs = jobs.filter(j => compareList.includes(j.id))
  return (
    <div className="compare-tray">
      <div className="compare-tray-inner">
        <div className="tray-label">⚖️ Compare</div>
        <div className="tray-chips">
          {selectedJobs.map(j => (
            <div key={j.id} className="tray-chip">
              <span>{j.title.length > 22 ? j.title.slice(0, 22) + '…' : j.title}</span>
              <button onClick={() => onRemove(j.id)}>×</button>
            </div>
          ))}
          {compareList.length < 3 && (
            <div className="tray-chip empty">
              <span>+ Add job</span>
            </div>
          )}
        </div>
        <div className="tray-actions">
          <button className="btn btn-primary tray-compare-btn" onClick={onOpenCompare} disabled={compareList.length < 2}>
            Compare {compareList.length}
          </button>
          <button className="btn btn-ghost tray-clear-btn" onClick={onClear}>Clear</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function JobsPage({ aiMatches = [], extraJobs = [] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [inputVal, setInputVal] = useState(searchParams.get('q') || '')
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all')
  const [activeType, setActiveType] = useState('All Types')
  const [activeSource, setActiveSource] = useState('all')
  const [selectedJob, setSelectedJob] = useState(null)
  const [applyJob, setApplyJob] = useState(null)
  const [sortBy, setSortBy] = useState('recent')
  const [compareList, setCompareList] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [showAIBanner, setShowAIBanner] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { jobs, allJobs, loading, votes, handleVote } = useJobs({
    query, tab: activeTab,
    type: activeType === 'All Types' ? 'all' : activeType,
    source: activeSource, extraJobs
  })

  const sorted = [...jobs].sort((a, b) =>
    sortBy === 'votes' ? (votes[b.id]||0) - (votes[a.id]||0) : 0
  )
  const highlighted = aiMatches.length > 0
    ? sorted.map(j => ({ ...j, _isMatch: aiMatches.includes(j.id) }))
    : sorted

  const handleSearch = () => {
    setQuery(inputVal)
    const params = {}
    if (inputVal) params.q = inputVal
    if (activeTab !== 'all') params.tab = activeTab
    setSearchParams(params)
  }

  const handleApply = (job) => {
    setSelectedJob(null)
    setShowCompare(false)
    setApplyJob(job)
  }

  const toggleCompare = (id) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const matchCount = aiMatches.length > 0 ? highlighted.filter(j => j._isMatch).length : null

  return (
    <div className="jobs-page">
      {/* ── Header section ── */}
      <div className="page-header">
        <div className="page-header-inner">
          {/* AI Banner */}
          {matchCount && showAIBanner && (
            <AIMatchBanner matches={matchCount} total={allJobs.length} onDismiss={() => setShowAIBanner(false)} />
          )}

          {/* Hero text */}
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your <span className="gold-text">Next Role</span>
            </h1>
            <p className="hero-sub">
              {loading ? 'Loading live jobs…' : `${allJobs.length} live jobs · Apply directly on OpportuAI`}
            </p>
          </div>

          {/* Search bar */}
          <div className="search-row">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Title, skill, company…"
                className="search-input"
              />
              {inputVal && (
                <button className="clear-btn" onClick={() => { setInputVal(''); setQuery('') }}>✕</button>
              )}
            </div>

            {/* Desktop filters inline */}
            <div className="filters-desktop">
              <div className="select-wrap">
                <select value={activeType} onChange={e => setActiveType(e.target.value)} className="filter-select">
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <span className="select-arrow">▼</span>
              </div>
              <div className="select-wrap">
                <select value={activeSource} onChange={e => setActiveSource(e.target.value)} className="filter-select">
                  <option value="all">All Sources</option>
                  {Object.entries(SRC_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>

            {/* Mobile filter toggle */}
            <button className="filter-toggle-btn" onClick={() => setFiltersOpen(f => !f)}>
              ⚙️ Filters
            </button>

            <button className="btn btn-primary search-btn" onClick={handleSearch}>Search</button>
          </div>

          {/* Mobile expandable filters */}
          {filtersOpen && (
            <div className="filters-mobile">
              <div className="select-wrap">
                <select value={activeType} onChange={e => setActiveType(e.target.value)} className="filter-select">
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <span className="select-arrow">▼</span>
              </div>
              <div className="select-wrap">
                <select value={activeSource} onChange={e => setActiveSource(e.target.value)} className="filter-select">
                  <option value="all">All Sources</option>
                  {Object.entries(SRC_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>
          )}

          {/* Tabs + sort */}
          <div className="tab-row">
            <div className="tabs">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="sort-row">
              <span className="sort-label">Sort:</span>
              {['recent', 'votes'].map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`sort-btn ${sortBy === s ? 'active' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid section ── */}
      <div className="jobs-grid-section">
        <div className="page-inner">
          {loading ? (
            <>
              <div className="results-meta">Loading…</div>
              <div className="jobs-grid">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: '280px', animationDelay: `${i * 0.07}s` }} />
                ))}
              </div>
            </>
          ) : highlighted.length > 0 ? (
            <>
              <div className="results-meta">
                <span className="results-count">{highlighted.length} {highlighted.length === 1 ? 'result' : 'results'}</span>
                {query && <span className="results-query"> for "<span className="results-term">{query}</span>"</span>}
                {matchCount && <span className="results-match"> · <span className="match-highlight">{matchCount} AI matched</span></span>}
              </div>
              <div className="jobs-grid">
                {highlighted.map((job, i) => (
                  <div key={job.id} style={{ animationDelay: `${i * 0.04}s` }}>
                    <JobCard
                      job={job}
                      onOpenDetail={setSelectedJob}
                      isHighlighted={!!job._isMatch}
                      votes={votes}
                      onVote={handleVote}
                      onApply={handleApply}
                      compareList={compareList}
                      onToggleCompare={toggleCompare}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3 className="empty-title">No jobs found</h3>
              <p className="empty-sub">Try different keywords or remove filters</p>
              <button className="btn btn-secondary" onClick={() => {
                setQuery(''); setInputVal(''); setActiveType('All Types');
                setActiveSource('all'); setActiveTab('all')
              }}>Clear filters</button>
            </div>
          )}
        </div>
      </div>

      {/* ── Compare tray (floating) ── */}
      <CompareTray
        compareList={compareList}
        jobs={highlighted}
        onClear={() => setCompareList([])}
        onRemove={id => setCompareList(prev => prev.filter(x => x !== id))}
        onOpenCompare={() => setShowCompare(true)}
      />

      {/* ── Modals ── */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApply}
          onVote={handleVote}
          votes={votes}
        />
      )}
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      {showCompare && (
        <CompareModal
          jobs={highlighted.filter(j => compareList.includes(j.id))}
          onClose={() => setShowCompare(false)}
          onApply={handleApply}
        />
      )}

      <style>{`
        /* ── Page layout ── */
        .jobs-page {
          padding-top: 64px;
          min-height: 100vh;
          background: var(--dark, #08080E);
        }
        .page-header {
          background: rgba(8,8,14,0.9);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: sticky;
          top: 64px;
          z-index: 40;
          backdrop-filter: blur(16px);
        }
        .page-header-inner, .page-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 2.5rem 0;
        }
        .jobs-grid-section { padding: 2rem 0 6rem; }
        .page-inner { padding: 0 2.5rem; }

        /* ── AI Banner ── */
        .ai-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(168,124,250,0.1), rgba(124,58,237,0.07));
          border: 1px solid rgba(168,124,250,0.25);
          border-radius: 14px;
          padding: 0.85rem 1.1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
          overflow: hidden;
          animation: slideDown 0.4s cubic-bezier(0.34,1.4,0.64,1) both;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ai-banner-glow {
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,124,250,0.7), transparent);
        }
        .ai-banner-content { display: flex; align-items: center; gap: 0.9rem; }
        .ai-banner-icon { font-size: 1.5rem; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .ai-banner-title { font-size: 0.78rem; font-weight: 800; color: #a87cfa; text-transform: uppercase; letter-spacing: 0.07em; }
        .ai-banner-sub { font-size: 0.82rem; color: rgba(255,255,255,0.55); margin-top: 0.15rem; }
        .ai-banner-sub strong { color: #a87cfa; }
        .ai-banner-close {
          background: none; border: none; color: rgba(255,255,255,0.3);
          font-size: 0.9rem; cursor: pointer; padding: 0.2rem 0.4rem; flex-shrink: 0;
          border-radius: 6px; transition: color 0.2s;
        }
        .ai-banner-close:hover { color: rgba(255,255,255,0.7); }

        /* ── Hero ── */
        .hero-text { margin-bottom: 1.5rem; }
        .hero-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          margin-bottom: 0.4rem;
          line-height: 1.1;
        }
        .gold-text { color: #F0C040; }
        .hero-sub { color: rgba(255,255,255,0.38); font-size: 0.88rem; }

        /* ── Search ── */
        .search-row {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 1.4rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .search-box {
          flex: 1;
          min-width: 220px;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .search-box:focus-within { border-color: rgba(240,192,64,0.35); }
        .search-icon { padding: 0 0.7rem 0 1rem; color: rgba(255,255,255,0.3); font-size: 0.9rem; }
        .search-input {
          flex: 1;
          background: none; border: none; outline: none;
          padding: 0.85rem 0.5rem;
          color: rgba(255,255,255,0.9);
          font-size: 0.88rem;
          font-family: var(--font-body, sans-serif);
        }
        .search-input::placeholder { color: rgba(255,255,255,0.25); }
        .clear-btn {
          background: none; border: none; color: rgba(255,255,255,0.3);
          padding: 0 0.8rem; cursor: pointer; font-size: 0.8rem;
          transition: color 0.2s;
        }
        .clear-btn:hover { color: rgba(255,255,255,0.7); }

        /* Filters */
        .filters-desktop { display: flex; gap: 0.5rem; }
        .filters-mobile {
          display: none;
          gap: 0.5rem;
          padding-bottom: 1rem;
          animation: slideDown 0.25s ease both;
        }
        .filter-toggle-btn {
          display: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.6);
          padding: 0.82rem 1rem;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body, sans-serif);
          white-space: nowrap;
          transition: all 0.2s;
        }
        .filter-toggle-btn:hover { border-color: rgba(240,192,64,0.25); color: #F0C040; }
        .select-wrap { position: relative; }
        .filter-select {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 0.82rem 2.2rem 0.82rem 1rem;
          color: rgba(255,255,255,0.65);
          font-size: 0.83rem;
          outline: none; cursor: pointer;
          font-family: var(--font-body, sans-serif);
          appearance: none;
          transition: border-color 0.2s;
        }
        .filter-select:focus { border-color: rgba(240,192,64,0.3); }
        .select-arrow {
          position: absolute; right: 0.7rem; top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3); pointer-events: none;
          font-size: 0.62rem;
        }
        .search-btn { padding: 0.82rem 1.6rem; white-space: nowrap; }

        /* ── Tabs ── */
        .tab-row {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding-bottom: 0;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .tabs { display: flex; flex: 1; overflow-x: auto; scrollbar-width: none; }
        .tabs::-webkit-scrollbar { display: none; }
        .tab-btn {
          background: none; border: none; cursor: pointer;
          padding: 0.78rem 1.2rem;
          font-size: 0.8rem; font-weight: 600;
          font-family: var(--font-body, sans-serif);
          color: rgba(255,255,255,0.38);
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          margin-bottom: -1px;
          white-space: nowrap;
        }
        .tab-btn:hover { color: rgba(255,255,255,0.7); }
        .tab-btn.active { color: #F0C040; border-bottom-color: #F0C040; }
        .sort-row { display: flex; align-items: center; gap: 0.35rem; padding-bottom: 0.5rem; }
        .sort-label { font-size: 0.7rem; color: rgba(255,255,255,0.3); font-weight: 600; }
        .sort-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 0.2rem 0.55rem;
          font-size: 0.7rem; font-weight: 700;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          font-family: var(--font-body, sans-serif);
          text-transform: capitalize;
          transition: all 0.18s;
        }
        .sort-btn.active { background: rgba(240,192,64,0.1); border-color: rgba(240,192,64,0.22); color: #F0C040; }
        .sort-btn:not(.active):hover { color: rgba(255,255,255,0.7); }

        /* ── Grid ── */
        .results-meta {
          font-size: 0.74rem;
          color: rgba(255,255,255,0.35);
          font-weight: 600;
          margin-bottom: 1.2rem;
          padding-top: 1.5rem;
        }
        .results-count { color: rgba(255,255,255,0.55); }
        .results-term { color: rgba(255,255,255,0.75); }
        .match-highlight { color: #a87cfa; font-weight: 700; }
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }

        /* ── Empty state ── */
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          max-width: 420px;
          margin: 0 auto;
        }
        .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        .empty-title { font-size: 1.2rem; font-weight: 700; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
        .empty-sub { color: rgba(255,255,255,0.35); font-size: 0.88rem; margin-bottom: 1.5rem; }

        /* ── Compare Tray ── */
        .compare-tray {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          animation: trayRise 0.35s cubic-bezier(0.34,1.4,0.64,1) both;
        }
        @keyframes trayRise {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .compare-tray-inner {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(14,14,26,0.97);
          border: 1px solid rgba(61,218,120,0.28);
          border-radius: 50px;
          padding: 0.65rem 0.8rem 0.65rem 1.1rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(61,218,120,0.07) inset;
          backdrop-filter: blur(20px);
          flex-wrap: wrap;
          max-width: 90vw;
        }
        .tray-label { font-size: 0.72rem; font-weight: 800; color: #3DDA78; letter-spacing: 0.06em; white-space: nowrap; }
        .tray-chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .tray-chip {
          display: flex; align-items: center; gap: 0.35rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          padding: 0.25rem 0.65rem;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.7);
          white-space: nowrap;
        }
        .tray-chip.empty { opacity: 0.4; border-style: dashed; }
        .tray-chip button {
          background: none; border: none; color: rgba(255,255,255,0.4);
          cursor: pointer; font-size: 1rem; line-height: 1; padding: 0;
          transition: color 0.15s;
        }
        .tray-chip button:hover { color: rgba(255,255,255,0.9); }
        .tray-actions { display: flex; gap: 0.4rem; }
        .tray-compare-btn {
          border-radius: 50px !important;
          padding: 0.4rem 1rem !important;
          font-size: 0.76rem !important;
          white-space: nowrap;
        }
        .tray-compare-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .tray-clear-btn { border-radius: 50px !important; padding: 0.4rem 0.8rem !important; font-size: 0.76rem !important; }

        /* ── Compare Modal ── */
        .compare-modal { max-width: 900px; width: 95vw; }
        .compare-grid {
          display: grid;
          min-width: 500px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .compare-cell {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          border-right: 1px solid rgba(255,255,255,0.05);
        }
        .compare-cell:last-child { border-right: none; }
        .header-cell { background: transparent; }
        .job-header-cell {
          padding: 1rem;
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          text-align: center;
          background: rgba(255,255,255,0.02);
        }
        .compare-logo {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; overflow: hidden;
        }
        .compare-logo img { width: 100%; height: 100%; object-fit: contain; padding: 5px; }
        .compare-job-title { font-size: 0.82rem; font-weight: 700; color: rgba(255,255,255,0.85); line-height: 1.3; }
        .compare-job-company { font-size: 0.7rem; color: rgba(255,255,255,0.35); }
        .field-label {
          padding: 0.75rem 0.8rem;
          font-size: 0.67rem;
          font-weight: 800;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(255,255,255,0.015);
          display: flex; align-items: center;
        }
        .field-value {
          padding: 0.75rem 0.8rem;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          display: flex; align-items: center;
        }

        /* ── Detail modal ── */
        .detail-modal { max-width: 680px; }
        .detail-logo {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem; flex-shrink: 0; overflow: hidden;
        }
        .modal-title { font-family: var(--font-display, sans-serif); font-size: 1.3rem; font-weight: 800; color: rgba(255,255,255,0.92); }
        .modal-sub { color: rgba(255,255,255,0.38); font-size: 0.82rem; margin-top: 0.2rem; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .info-block {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px; padding: 1.1rem;
        }
        .info-label { font-size: 0.68rem; font-weight: 800; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.6rem; }
        .info-text { color: rgba(255,255,255,0.6); font-size: 0.88rem; line-height: 1.8; margin: 0; }
        .skill-chip-modal {
          font-size: 0.72rem; padding: 0.28rem 0.72rem;
          border-radius: 50px;
          background: rgba(240,192,64,0.07);
          color: rgba(240,192,64,0.75);
          border: 1px solid rgba(240,192,64,0.14);
          font-weight: 600;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .page-header-inner, .page-inner { padding: 1.4rem 1.2rem 0; }
          .jobs-grid-section { padding: 1rem 0 7rem; }
          .page-inner { padding: 0 1.2rem; }
          .filters-desktop { display: none; }
          .filter-toggle-btn { display: flex; align-items: center; gap: 0.4rem; }
          .filters-mobile { display: flex; width: 100%; }
          .filters-mobile .select-wrap { flex: 1; }
          .filters-mobile .filter-select { width: 100%; }
          .hero-title { font-size: 1.8rem; }
          .search-row { gap: 0.5rem; }
          .search-btn { padding: 0.82rem 1.2rem; }
          .tab-btn { padding: 0.7rem 0.85rem; font-size: 0.75rem; }
          .jobs-grid { grid-template-columns: 1fr; gap: 0.75rem; }
          .compare-tray-inner { border-radius: 20px; padding: 0.8rem 1rem; }
        }
        @media (max-width: 480px) {
          .page-header { position: static; }
          .hero-title { font-size: 1.6rem; }
          .sort-row { display: none; }
        }
      `}</style>
    </div>
  )
}
