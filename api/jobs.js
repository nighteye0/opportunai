export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const fetches = await Promise.allSettled([
    fetch('https://remotive.com/api/remote-jobs?limit=25').then(r => r.json()),
    fetch('https://arbeitnow.com/api/job-board-api').then(r => r.json()),
    fetch('https://remoteok.com/api').then(r => r.json()),
  ])

  let jobs = []

  // Remotive
  if (fetches[0].status === 'fulfilled') {
    const data = fetches[0].value
    const remotive = (data.jobs || []).slice(0, 25).map(j => ({
      id: `remotive-${j.id}`,
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location || 'Remote',
      type: j.job_type || 'full-time',
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

  // Arbeitnow
  if (fetches[1].status === 'fulfilled') {
    const data = fetches[1].value
    const arbeit = (data.data || []).slice(0, 20).map(j => ({
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

  // RemoteOK
  if (fetches[2].status === 'fulfilled') {
    const data = fetches[2].value
    const rok = (Array.isArray(data) ? data : [])
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
        url: j.url,
        postedAt: new Date(j.epoch * 1000).toISOString(),
        upvotes: 0,
      }))
    jobs = [...jobs, ...rok]
  }

  res.status(200).json({ jobs })
}
