import { useState, useEffect, useMemo } from 'react'

export const SRC_COLOR = {
  remotive:  '#3DDA78',
  arbeitnow: '#5BA4FA',
  remoteok:  '#FA6060',
  himalayas: '#A87CFA',
  jobicy:    '#FA8C3C',
  community: '#F0C040',
}

export const SRC_LABEL = {
  remotive:  'Remotive',
  arbeitnow: 'Arbeitnow',
  remoteok:  'RemoteOK',
  himalayas: 'Himalayas',
  jobicy:    'Jobicy',
  community: 'Community',
}

const PROXY = 'https://corsproxy.io/?'

async function fetchRemotive() {
  try {
    const r = await fetch(`${PROXY}https://remotive.com/api/remote-jobs?limit=20`)
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
    const r = await fetch(`${PROXY}https://www.arbeitnow.com/api/job-board-api`)
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
    const r = await fetch(`${PROXY}https://remoteok.com/api`, {
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
    const r = await fetch(`${PROXY}https://himalayas.app/jobs/api?limit=20`)
    const d = await r.json()
    return (d.jobs || []).map(j => ({
      id: `himalayas_${j.id}`,
      title: j.title,
      company: j.companyName,
      location: j.locationRestrictions?.join(', ') || 'Remote',
      type: j.employmentType || 'Full-time',
      salary: j.salaryCurrency && j.salaryMin
        ? `${j.salaryCurrency}${(j.salaryMin/1000).toFixed(0)}k–${(j.salaryMax/1000).toFixed(0)}k`
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
    const r = await fetch(`${PROXY}https://jobicy.com/api/v2/remote-jobs?count=20`)
    const d = await r.json()
    return (d.jobs || []).map(j => ({
      id: `jobicy_${j.id}`,
      title: j.jobTitle,
      company: j.companyName,
      location: j.jobGeo || 'Remote',
      type: j.jobType || 'Full-time',
      salary: j.annualSalaryMin
        ? `$${(j.annualSalaryMin/1000).toFixed(0)}k–$${(j.annualSalaryMax/1000).toFixed(0)}k`
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

const COMMUNITY_JOBS = [
  { id: 'c1', title: 'Founding Engineer', company: 'Stealth AI Startup', location: 'SF / Remote', type: 'Full-time', salary: '$160k + equity', source: 'community', tags: ['Full-stack', 'AI', 'Startup'], posted: 'Today', emoji: '🚀', url: '#', description: 'Be the 3rd engineer at a well-funded AI startup. Generalist role — you will own multiple areas of the product.' },
  { id: 'c2', title: 'Freelance Brand Designer', company: 'TechCo', location: 'Remote', type: 'Freelance', salary: '$75–$110/hr', source: 'community', tags: ['Branding', 'Figma', 'Illustration'], posted: 'Today', emoji: '🎨', url: '#', description: '4–6 week brand refresh project for a B2B SaaS company.' },
  { id: 'c3', title: 'Head of Engineering', company: 'Resend', location: 'Remote', type: 'Full-time', salary: '$200k–$260k', source: 'community', tags: ['Engineering Leadership', 'Node.js'], posted: 'Today', emoji: '📧', url: '#', description: 'Lead engineering at Resend as we scale to millions of developers globally.' },
]

export function useJobs({ query = '', source = 'all', type = 'all', tab = 'all' } = {}) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [votes, setVotes] = useState({})
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setLoading(true)
    Promise.allSettled([
      fetchRemotive(),
      fetchArbeitnow(),
      fetchRemoteOK(),
      fetchHimalayas(),
      fetchJobicy(),
    ]).then(results => {
      const allJobs = [
        ...COMMUNITY_JOBS,
        ...results.flatMap(r => r.status === 'fulfilled' ? r.value : [])
      ]
      const failed = results
        .map((r, i) => r.status === 'rejected' ? ['Remotive','Arbeitnow','RemoteOK','Himalayas','Jobicy'][i] : null)
        .filter(Boolean)
      setErrors(failed)
      setJobs(allJobs)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let result = jobs
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(j =>
        j.title?.toLowerCase().includes(q) ||
        j.company?.toLowerCase().includes(q) ||
        (j.tags || []).some(t => t?.toLowerCase().includes(q))
      )
    }
    if (source !== 'all') result = result.filter(j => j.source === source)
    if (type !== 'all') result = result.filter(j => j.type?.toLowerCase().includes(type.toLowerCase()))
    if (tab === 'freelance') result = result.filter(j => j.type === 'Freelance' || j.type === 'Contract')
    if (tab === 'remote') result = result.filter(j => j.location?.toLowerCase().includes('remote') || j.type === 'Remote')
    if (tab === 'community') result = result.filter(j => j.source === 'community')
    return result
  }, [jobs, query, source, type, tab])

  const handleVote = (jobId, e) => {
    if (e) e.stopPropagation()
    setVotes(prev => ({ ...prev, [jobId]: (prev[jobId] || 0) + 1 }))
  }

  return { jobs: filtered, allJobs: jobs, loading, votes, handleVote, errors }
}
