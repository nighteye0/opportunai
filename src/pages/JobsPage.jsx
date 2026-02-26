import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [params] = useSearchParams()

  const cats = ['All','Engineering','Design','Marketing','DevOps','Sales','Product','Customer Success','Data','AI / ML','Other']

  useEffect(() => {
    const q = params.get('search') || ''
    setSearch(q)
    fetch('/api/jobs').then(r=>r.json()).then(d=>{
      const arr = Array.isArray(d)?d:(d.jobs||[])
      setJobs(arr); setLoading(false)
    }).catch(()=>setLoading(false))
  }, [])

  useEffect(() => {
    let arr = jobs
    if (search) arr = arr.filter(j=>
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      j.company?.toLowerCase().includes(search.toLowerCase()) ||
      j.tags?.some(t=>t.toLowerCase().includes(search.toLowerCase()))
    )
    if (cat !== 'All') arr = arr.filter(j=>
      j.category?.toLowerCase().includes(cat.toLowerCase()) ||
      j.tags?.some(t=>t.toLowerCase().includes(cat.toLowerCase()))
    )
    setFiltered(arr)
  }, [search, cat, jobs])

  return (
    <>
      <style>{`
        .jobs-page { min-height:100vh; padding-top:54px; background:var(--black); }
        .page-header {
          padding:52px 24px 40px; border-bottom:1px solid var(--border);
          background:radial-gradient(ellipse 70% 100% at 50% 0%, rgba(34,197,94,0.04), transparent);
        }
        .ph-inner { max-width:1120px; margin:0 auto; }
        .ph-top { display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:24px; }
        .ph-title { font-size:clamp(22px,4vw,32px); font-weight:800; color:#fff; letter-spacing:-.03em; }
        .ph-sub { font-size:13px; color:#444; margin-top:4px; }
        .search-box {
          padding:9px 14px; background:var(--surface); border:1px solid var(--border);
          border-radius:8px; font-size:13px; color:var(--text); font-family:inherit;
          outline:none; width:260px; transition:all .2s;
        }
        .search-box::placeholder { color:#333; }
        .search-box:focus { border-color:rgba(34,197,94,0.4); box-shadow:0 0 0 3px rgba(34,197,94,0.06); }
        .filter-row { display:flex; flex-wrap:wrap; gap:6px; }
        .filt {
          padding:5px 12px; border-radius:6px; font-size:12px; font-weight:500;
          border:1px solid var(--border); background:transparent; color:#444;
          cursor:pointer; transition:all .15s; font-family:inherit;
        }
        .filt:hover { background:var(--surface); color:#888; }
        .filt.on { background:var(--surface2); border-color:rgba(34,197,94,0.35); color:#4ade80; }

        .page-body { max-width:1120px; margin:0 auto; padding:36px 24px 72px; }
        .count-bar { font-size:12px; color:#333; margin-bottom:20px; display:flex; align-items:center; gap:8px; }
        .live-badge {
          display:inline-flex; align-items:center; gap:5px;
          padding:2px 8px; background:rgba(34,197,94,0.07); border:1px solid rgba(34,197,94,0.15);
          border-radius:100px; font-size:10px; color:#4ade80; font-weight:500;
        }
        .ldot { width:5px;height:5px;border-radius:50%;background:#22c55e;animation:pulse-dot 2s ease-in-out infinite; }

        .jobs-list { display:flex; flex-direction:column; gap:6px; }
        .job-row {
          display:flex; align-items:center; gap:14px;
          padding:16px 18px; background:var(--surface); border:1px solid var(--border);
          border-radius:var(--radius); text-decoration:none; transition:all .2s;
        }
        .job-row:hover {
          background:var(--surface2); border-color:var(--border-hover);
          transform:translateX(2px); box-shadow:0 4px 20px rgba(0,0,0,.4);
        }
        .jr-logo {
          width:36px;height:36px;border-radius:8px;flex-shrink:0;
          background:var(--surface3);border:1px solid var(--border);
          display:flex;align-items:center;justify-content:center;font-size:15px;overflow:hidden;
        }
        .jr-logo img { width:100%;height:100%;object-fit:cover; }
        .jr-main { flex:1; min-width:0; }
        .jr-title { font-size:13px; font-weight:600; color:#ddd; margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .jr-co { font-size:11px; color:#444; }
        .jr-tags { display:flex; gap:5px; flex-wrap:wrap; margin-left:auto; }
        .jr-tag { padding:2px 7px; border-radius:4px; font-size:11px; font-weight:500; background:var(--surface3); border:1px solid var(--border); color:#444; white-space:nowrap; }
        .jr-tag-g { background:rgba(34,197,94,0.05); border-color:rgba(34,197,94,0.12); color:#4ade80; }
        .jr-apply {
          padding:5px 12px; border-radius:6px; font-size:11px; font-weight:600;
          background:transparent; border:1px solid var(--border); color:#555;
          flex-shrink:0; transition:all .15s;
        }
        .job-row:hover .jr-apply { background:var(--surface3); color:#aaa; border-color:var(--border-hover); }

        .skeleton { opacity:.2; }
        .empty { text-align:center; padding:80px 20px; color:#333; font-size:14px; }

        @media(max-width:640px) {
          .jr-tags { display:none; }
        }
      `}</style>

      <div className="jobs-page">
        <div className="page-header">
          <div className="ph-inner">
            <div className="ph-top">
              <div>
                <div className="eyebrow" style={{marginBottom:8,color:'#4ade80'}}>Live feed</div>
                <h1 className="ph-title">Remote Jobs</h1>
                <p className="ph-sub">Updated daily from 5 sources worldwide</p>
              </div>
              <input
                className="search-box"
                placeholder="Search jobs, companies..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
              />
            </div>
            <div className="filter-row">
              {cats.map(c=>(
                <button key={c} className={`filt${cat===c?' on':''}`} onClick={()=>setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="count-bar">
            <span className="live-badge"><span className="ldot"/>Live</span>
            {loading ? 'Loading...' : `${filtered.length} jobs`}
          </div>

          <div className="jobs-list">
            {loading ? [1,2,3,4,5,6,7,8].map(i=>(
              <div key={i} className="job-row skeleton">
                <div className="jr-logo"/>
                <div className="jr-main">
                  <div style={{width:'45%',height:12,background:'var(--surface3)',borderRadius:4,marginBottom:6}}/>
                  <div style={{width:'25%',height:10,background:'var(--surface3)',borderRadius:4}}/>
                </div>
              </div>
            )) : filtered.length === 0 ? (
              <div className="empty">No jobs found for "{search}"</div>
            ) : filtered.map((j,i)=>(
              <a key={j.id||i} href={j.url} target="_blank" rel="noopener noreferrer" className="job-row">
                <div className="jr-logo">
                  {j.company_logo?<img src={j.company_logo} alt=""/>:'🏢'}
                </div>
                <div className="jr-main">
                  <div className="jr-title">{j.title}</div>
                  <div className="jr-co">{j.company_name||j.company}</div>
                </div>
                <div className="jr-tags">
                  {j.job_type&&<span className="jr-tag">{j.job_type}</span>}
                  {j.candidate_required_location&&<span className="jr-tag">{j.candidate_required_location}</span>}
                  {j.salary&&<span className="jr-tag jr-tag-g">{j.salary}</span>}
                </div>
                <span className="jr-apply">Apply →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
