import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { page } = req.body
  const { error } = await supabase.from('page_views').insert([{ page }])
  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json({ ok: true })
}
