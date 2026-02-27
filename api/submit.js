import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { type, email, ...data } = req.body

  if (!type || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Basic validation
  if (!['job', 'tool', 'product'].includes(type)) {
    return res.status(400).json({ error: 'Invalid submission type' })
  }

  const { error } = await supabase.from('submissions').insert([{
    type,
    email,
    data,
    status: 'pending',
    submitted_at: new Date().toISOString()
  }])

  if (error) {
    console.error('Supabase error:', error)
    return res.status(500).json({ error: 'Failed to save submission' })
  }

  res.status(200).json({ ok: true, message: 'Submission received!' })
}