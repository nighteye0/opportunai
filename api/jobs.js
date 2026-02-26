import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=3600')

  const fetches = await Promise.allSettled([
    // 1. Remotive
    fetch('https://remotive.com/api/remote-jobs?limit=25').then(r => r.json()),
    // 2. Arbeitnow
    fetch('https://www.arbeitnow.com/api/job-board-api?limit=25').then(r => r.json()),
    // 3. RemoteOK
    fetch('https://remoteok.com/api', { headers: { 'User-Agent': 'OpportuAI Job Board' } }).then(r => r.json()),
    // 4. Himalayas
    fetch('https://himalayas.app/jobs/api?limit=20').then(r => r.json()),
    // 5. Jobicy (no API key needed)
    fetch('https://jobicy.com/api/v2/remote-jobs?count=25').then(r => r.json()),
    // 6. Supabase community
    (async () => {
      if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) return []
      const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
      const { data } = await supabase.from('job_submissions').select('*').eq('status', 'approved').order('created_at', { ascending: false })
      return data || []
    })(),
  ])

  let jobs = []

  // 1. Remotive
  if (fetches[0].status === 'fulfilled') {
    const remotive = (fetches[0].value.jobs || []).slice(0, 25).map(j => ({
      id: `remotive-${j.id}`,
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location || 'Remote',
      type: j.job_type || 'full_time',
      salary: j.salary || '',
      tags: j.tags?.slice(0, 4) || [],
      source: 'remotive',
      logo: '🌐',
      url: j.url,
      postedAt: j.publication_date,
      upvotes: 0,
    }))
    jobs = [...jobs, ...remotive]
  }

  // 2. Arbeitnow
  if (fetches[1].status === 'fulfilled') {
    const arbeit = (fetches[1].value.data || []).slice(0, 25).map(j => ({
      id: `arbeit-${j.slug}`,
      title: j.title,
      company: j.company_name,
      location: j.location || 'Remote',
      type: j.job_types?.[0] || 'full-time',
      salary: '',
      tags: j.tags?.slice(0, 4) || [],
      source: 'arbeitnow',
      logo: '💼',
      url: j.url,
      postedAt: j.created_at,
      upvotes: 0,
    }))
    jobs = [...jobs, ...arbeit]
  }

  // 3. RemoteOK
  if (fetches[2].status === 'fulfilled') {
    const rok = (Array.isArray(fetches[2].value) ? fetches[2].value : [])
      .filter(j => j.id)
      .slice(0, 20)
      .map(j => ({
        id: `rok-${j.id}`,
        title: j.position,
        company: j.company,
        location: 'Remote',
        type: 'full-time',
        salary: j.salary || '',
        tags: j.tags?.slice(0, 4) || [],
        source: 'remoteok',
        logo: '🖥️',
        url: j.url ? (j.url.startsWith('http') ? j.url : `https://remoteok.com${j.url}`) : '#',
        postedAt: new Date(j.epoch * 1000).toISOString(),
        upvotes: 0,
      }))
    jobs = [...jobs, ...rok]
  }

  // 4. Himalayas
  if (fetches[3].status === 'fulfilled') {
    const himalaya = (fetches[3].value.jobs || []).slice(0, 20).map(j => {
      let salary = ''
      if (j.minSalary && j.maxSalary) salary = `$${Math.round(j.minSalary/1000)}k-$${Math.round(j.maxSalary/1000)}k`
      else if (j.minSalary) salary = `From $${Math.round(j.minSalary/1000)}k`
      return {
        id: `himalaya-${j.id || j.slug}`,
        title: j.title,
        company: j.companyName || j.company?.name || 'Unknown',
        location: j.locationRestrictions?.join(', ') || 'Remote',
        type: j.employmentType || 'Full Time',
        salary,
        tags: j.categories?.slice(0, 4) || [],
        source: 'himalayas',
        logo: '🏔️',
        url: j.applicationLink || j.url || `https://himalayas.app/jobs/${j.slug}`,
        postedAt: j.createdAt || new Date().toISOString(),
        upvotes: 0,
      }
    })
    jobs = [...jobs, ...himalaya]
  }

  // 5. Jobicy
  if (fetches[4].status === 'fulfilled') {
    const jobicy = (fetches[4].value.jobs || []).slice(0, 25).map(j => {
      let salary = ''
      if (j.annualSalaryMin && j.annualSalaryMax) {
        salary = `$${Math.round(j.annualSalaryMin/1000)}k-$${Math.round(j.annualSalaryMax/1000)}k`
      } else if (j.annualSalaryMin) {
        salary = `From $${Math.round(j.annualSalaryMin/1000)}k`
      }
      return {
        id: `jobicy-${j.id}`,
        title: j.jobTitle,
        company: j.companyName,
        location: j.jobGeo || 'Anywhere',
        type: j.jobType || 'full-time',
        salary,
        tags: [j.jobIndustry].filter(Boolean).slice(0, 4),
        source: 'jobicy',
        logo: '🔎',
        url: j.url,
        postedAt: j.pubDate,
        upvotes: 0,
      }
    })
    jobs = [...jobs, ...jobicy]
  }

  // 6. Community (Supabase)
  if (fetches[5].status === 'fulfilled' && Array.isArray(fetches[5].value)) {
    const community = fetches[5].value.map(j => ({
      id: `community-${j.id}`,
      title: j.title,
      company: j.company,
      location: j.location,
      type: j.type,
      salary: j.salary || '',
      tags: j.tags || [],
      source: 'community',
      logo: j.logo || '🏢',
      url: j.url || '#',
      postedAt: j.created_at,
      upvotes: 0,
    }))
    jobs = [...community, ...jobs]
  }

  res.status(200).json({ jobs })
}
