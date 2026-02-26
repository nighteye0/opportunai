import { useAuth } from '../hooks/useAuth'
import { SRC_COLOR, SRC_LABEL } from '../hooks/useJobs'

export default function JobCard({ job, onOpenDetail, isHighlighted, votes = {}, onVote, onApply, compareList = [], onToggleCompare }) {
  const { user, profile, toggleSavedJob } = useAuth()
  const saved = profile?.savedJobs?.includes(job.id)
  const c = SRC_COLOR[job.source] || '#888'
  const voteCount = votes[job.id] || 0
  const inCompare = compareList.includes(job.id)
  const compareDisabled = !inCompare && compareList.length >= 3

  return (
    <div
      onClick={() => onOpenDetail(job)}
      className={`job-card ${isHighlighted ? 'highlighted' : ''} ${inCompare ? 'in-compare' : ''}`}
    >
      {isHighlighted && <div className="shimmer-line" />}

      {isHighlighted && (
        <div className="ai-badge">🎯 AI Match</div>
      )}

      {/* Top row: logo + actions */}
      <div className="card-row card-top">
        <div className="logo-box">
          {job.logo
            ? <img src={job.logo} alt="" onError={e => { e.target.style.display = 'none'; e.target.parentElement.textContent = job.logo || '💼' }} />
            : job.logo || '💼'}
        </div>
        <div className="top-actions">
          {onToggleCompare && (
            <button
              className={`icon-btn ${inCompare ? 'compare-on' : ''} ${compareDisabled ? 'compare-off' : ''}`}
              onClick={e => { e.stopPropagation(); if (!compareDisabled || inCompare) onToggleCompare(job.id) }}
              title={inCompare ? 'Remove from compare' : compareDisabled ? 'Max 3 jobs' : 'Add to compare'}
            >{inCompare ? '⊖' : '⊕'}</button>
          )}
          <button
            className={`icon-btn ${saved ? 'saved' : ''}`}
            onClick={e => { e.stopPropagation(); if (user) toggleSavedJob(job.id) }}
            title={user ? (saved ? 'Unsave' : 'Save') : 'Sign in to save'}
          >{saved ? '♥' : '♡'}</button>
        </div>
      </div>

      {/* Source tag */}
      <span className="src-tag" style={{ background: `${c}18`, color: c, borderColor: `${c}28` }}>
        {SRC_LABEL[job.source] || job.source}
      </span>

      {/* Title + company */}
      <div className="title-block">
        <div className="job-title">{job.title}</div>
        <div className="job-company">{job.company}</div>
      </div>

      {/* Meta */}
      <div className="meta-row">
        {[`📍 ${job.location}`, `💼 ${job.type}`, job.posted && `📅 ${job.posted}`].filter(Boolean).map(m => (
          <span key={m} className="meta-chip">{m}</span>
        ))}
      </div>

      {/* Skills */}
      {(job.tags || []).length > 0 && (
        <div className="tags-row">
          {(job.tags || []).slice(0, 4).map(t => (
            <span key={t} className="skill-chip">{t}</span>
          ))}
          {job.tags?.length > 4 && <span className="skill-chip more">+{job.tags.length - 4}</span>}
        </div>
      )}

      {/* Footer */}
      <div className="card-footer">
        <div className="footer-left">
          <span className="salary">{job.salary || 'Competitive'}</span>
          {onVote && (
            <button className={`vote-btn ${voteCount > 0 ? 'voted' : ''}`} onClick={e => onVote(job.id, e)}>
              ▲ {voteCount}
            </button>
          )}
        </div>
        <button className="apply-btn" onClick={e => { e.stopPropagation(); onApply?.(job) }}>
          Apply 🚀
        </button>
      </div>

      <style>{`
        .job-card {
          position: relative;
          background: linear-gradient(160deg, rgba(14,14,26,0.98), rgba(8,8,14,0.99));
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.72rem;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.32s cubic-bezier(0.34,1.4,0.64,1),
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
          animation: cardReveal 0.45s cubic-bezier(0.4,0,0.2,1) both;
        }
        .job-card:hover {
          transform: translateY(-7px) scale(1.017);
          border-color: rgba(240,192,64,0.28);
          box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(240,192,64,0.07) inset;
        }
        .job-card.highlighted {
          background: linear-gradient(160deg, rgba(168,124,250,0.09), rgba(8,8,14,0.99));
          border-color: rgba(168,124,250,0.22);
        }
        .job-card.highlighted:hover {
          border-color: rgba(168,124,250,0.5);
          box-shadow: 0 32px 80px rgba(168,124,250,0.18);
        }
        .job-card.in-compare {
          border-color: rgba(61,218,120,0.38) !important;
          box-shadow: 0 0 0 1px rgba(61,218,120,0.1) inset;
        }

        .shimmer-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,124,250,0.8), transparent);
          animation: shimmerPulse 2.5s ease-in-out infinite;
        }
        @keyframes shimmerPulse {
          0%,100% { opacity: 0.4; transform: scaleX(0.8); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        .ai-badge {
          position: absolute;
          top: -1px; right: 14px;
          background: linear-gradient(135deg, #a87cfa, #7c3aed);
          color: #fff;
          font-size: 0.57rem;
          font-weight: 800;
          padding: 0.22rem 0.72rem;
          border-radius: 0 0 10px 10px;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          box-shadow: 0 4px 20px rgba(168,124,250,0.45);
          animation: badgeDrop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes badgeDrop {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .card-row { display: flex; align-items: flex-start; }
        .card-top { justify-content: space-between; }

        .logo-box {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; overflow: hidden; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1);
        }
        .job-card:hover .logo-box { transform: scale(1.1) rotate(-4deg); }
        .logo-box img { width: 100%; height: 100%; object-fit: contain; padding: 7px; }

        .top-actions { display: flex; gap: 0.4rem; }
        .icon-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.35);
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34,1.5,0.64,1);
        }
        .icon-btn:hover { transform: scale(1.18); }
        .icon-btn.saved { background: rgba(240,192,64,0.12); border-color: rgba(240,192,64,0.38); color: #F0C040; }
        .icon-btn:not(.saved):not(.compare-on):not(.compare-off):hover { border-color: rgba(240,192,64,0.32); color: #F0C040; }
        .icon-btn.compare-on { background: rgba(61,218,120,0.12); border-color: rgba(61,218,120,0.4); color: #3DDA78; }
        .icon-btn:not(.compare-on):not(.compare-off):hover { border-color: rgba(61,218,120,0.3); color: #3DDA78; }
        .icon-btn.compare-off { opacity: 0.28; cursor: not-allowed; }

        .src-tag {
          display: inline-block;
          padding: 0.22rem 0.72rem;
          border-radius: 50px;
          border: 1px solid;
          font-size: 0.61rem;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          width: fit-content;
        }

        .title-block { display: flex; flex-direction: column; gap: 0.22rem; }
        .job-title {
          font-weight: 800;
          font-size: 0.97rem;
          line-height: 1.35;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.01em;
        }
        .job-company {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.38);
          font-weight: 500;
        }

        .meta-row { display: flex; flex-wrap: wrap; gap: 0.38rem; }
        .meta-chip {
          font-size: 0.67rem;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.03);
          padding: 0.2rem 0.55rem;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.05);
          white-space: nowrap;
        }

        .tags-row { display: flex; gap: 0.32rem; flex-wrap: wrap; }
        .skill-chip {
          font-size: 0.63rem;
          padding: 0.2rem 0.6rem;
          border-radius: 50px;
          background: rgba(240,192,64,0.06);
          color: rgba(240,192,64,0.72);
          border: 1px solid rgba(240,192,64,0.13);
          font-weight: 600;
          transition: all 0.18s;
        }
        .skill-chip:hover { background: rgba(240,192,64,0.13); color: #F0C040; }
        .skill-chip.more { opacity: 0.45; }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.88rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          gap: 0.5rem;
        }
        .footer-left { display: flex; align-items: center; gap: 0.48rem; }
        .salary {
          font-size: 0.9rem;
          font-weight: 800;
          color: #F0C040;
          letter-spacing: -0.01em;
        }
        .vote-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 0.2rem 0.55rem;
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 800;
          color: rgba(255,255,255,0.35);
          display: flex; align-items: center; gap: 0.25rem;
          transition: all 0.22s cubic-bezier(0.34,1.5,0.64,1);
        }
        .vote-btn:hover { transform: scale(1.1); }
        .vote-btn.voted { background: rgba(240,192,64,0.1); border-color: rgba(240,192,64,0.28); color: #F0C040; }

        .apply-btn {
          background: linear-gradient(135deg, #3DDA78, #2bb864);
          color: #000;
          border: none;
          padding: 0.46rem 1.1rem;
          border-radius: 50px;
          font-size: 0.73rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.26s cubic-bezier(0.34,1.5,0.64,1);
          letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(61,218,120,0.28);
          white-space: nowrap;
        }
        .apply-btn:hover {
          transform: scale(1.08) translateY(-1px);
          box-shadow: 0 8px 30px rgba(61,218,120,0.48);
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(22px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .job-card { padding: 1.1rem; border-radius: 16px; gap: 0.6rem; }
          .logo-box { width: 42px; height: 42px; border-radius: 12px; }
          .job-title { font-size: 0.9rem; }
          .apply-btn { padding: 0.4rem 0.9rem; font-size: 0.7rem; }
        }
      `}</style>
    </div>
  )
}
