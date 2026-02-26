async function fetchRemotive() {
  try {
    const r = await fetch('https://remotive.com/api/remote-jobs?limit=20')
    const d = await r.json()
    return (d.jobs || []).map(j => ({
      id: `remotive_${j.id}`,
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location || 'Remote',
      type: j.job_type?.replace('_', '-') || 'Full-time',
      salary: j.salary || '',
      tags: j.tags?.slice(0, 4) || [],
      posted: new Date(j.publication_date).toLocaleDateString(),
      url: j.url,
      logo: j.company_logo,
      description: j.description?.replace(/<[^>]*>/g, '').slice(0, 300) + '...',
      source: 'remotive',
      emoji: '🌐',
    }))
  } catch { return [] }
}

async function fetchArbeitnow() {
  try {
    const r = await fetch('https://www.arbeitnow.com/api/job-board-api')
    const d = await r.json()
    return (d.data || []).slice(0, 20).map(j => ({
      id: `arbeitnow_${j.slug}`,
      title: j.title,
      company: j.company_name,
      location: j.location || 'Remote',
      type: j.remote ? 'Remote' : 'On-site',
      salary: '',
      tags: j.tags?.slice(0, 4) || [],
      posted: new Date(j.created_at * 1000).toLocaleDateString(),
      url: j.url,
      logo: j.company_logo,
      description: j.description?.replace(/<[^>]*>/g, '').slice(0, 300) + '...',
      source: 'arbeitnow',
      emoji: '🏢',
    }))
  } catch { return [] }
}

async function fetchRemoteOK() {
  try {
    const r = await fetch('https://remoteok.com/api', {
      headers: { 'User-Agent': 'OpportuAI Job Board' }
    })
    const d = await r.json()
    return (d || []).filter(j => j.id).slice(0, 20).map(j => ({
      id: `remoteok_${j.id}`,
      title: j.position,
      company: j.company,
      location: j.location || 'Remote',
      type: 'Remote',
      salary: j.salary || '',
      tags: j.tags?.slice(0, 4) || [],
      posted: new Date(j.date).toLocaleDateString(),
      url: j.url,
      logo: j.company_logo,
      description: j.description?.replace(/<[^>]*>/g, '').slice(0, 300) + '...',
      source: 'remoteok',
      emoji: '✅',
    }))
  } catch { return [] }
}

async function fetchHimalayas() {
  try {
    const r = await fetch('https://himalayas.app/jobs/api?limit=20')
    const d = await r.json()
    return (d.jobs || []).map(j => ({
      id: `himalayas_${j.id}`,
      title: j.title,
      company: j.companyName,
      location: j.locationRestrictions?.join(', ') || 'Remote',
      type: j.employmentType || 'Full-time',
      salary: j.salaryCurrency && j.salaryMin
        ? `${j.salaryCurrency}${(j.salaryMin / 1000).toFixed(0)}k–${(j.salaryMax / 1000).toFixed(0)}k`
        : '',
      tags: j.skills?.slice(0, 4) || [],
      posted: new Date(j.publishedAt).toLocaleDateString(),
      url: j.applicationLink || j.url,
      logo: j.companyLogo,
      description: j.description?.replace(/<[^>]*>/g, '').slice(0, 300) + '...',
      source: 'himalayas',
      emoji: '🏔️',
    }))
  } catch { return [] }
}

async function fetchJobicy() {
  try {
    const r = await fetch('https://jobicy.com/api/v2/remote-jobs?count=20')
    const d = await r.json()
    return (d.jobs || []).map(j => ({
      id: `jobicy_${j.id}`,
      title: j.jobTitle,
      company: j.companyName,
      location: j.jobGeo || 'Remote',
      type: j.jobType || 'Full-time',
      salary: j.annualSalaryMin
        ? `$${(j.annualSalaryMin / 1000).toFixed(0)}k–$${(j.annualSalaryMax / 1000).toFixed(0)}k`
        : '',
      tags: j.jobIndustry?.slice(0, 4) || [],
      posted: new Date(j.pubDate).toLocaleDateString(),
      url: j.url,
      logo: j.companyLogo,
      description: j.jobDescription?.replace(/<[^>]*>/g, '').slice(0, 300) + '...',
      source: 'jobicy',
      emoji: '💼',
    }))
  } catch { return [] }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  try {
    const results = await Promise.allSettled([
      fetchRemotive(),
      fetchArbeitnow(),
      fetchRemoteOK(),
      fetchHimalayas(),
      fetchJobicy(),
    ])

    const jobs = results.flatMap(r => r.status === 'fulfilled' ? r.value : [])
    res.status(200).json({ jobs })
  } catch (err) {
    res.status(500).json({ jobs: [], error: err.message })
  }
}
