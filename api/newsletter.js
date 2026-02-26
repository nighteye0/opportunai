export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email } = req.body || {}
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' })

  try {
    // 1. Save to Supabase
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
    const { error: dbError } = await supabase.from('subscribers').insert([{ email }])
    if (dbError && dbError.code === '23505') {
      return res.status(400).json({ error: 'already_subscribed' })
    }
    if (dbError) throw dbError

    // 2. Send welcome email via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'OpportuAI <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to OpportuAI! 🎉',
        html: `
          <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0d0d0d;color:#fff;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#c9a84c,#e8c96a);padding:32px;text-align:center;">
              <h1 style="margin:0;color:#0d0d0d;font-size:28px;font-weight:800;">Welcome to OpportuAI!</h1>
            </div>
            <div style="padding:32px;">
              <p style="color:#ccc;font-size:16px;line-height:1.6;">Hey there 👋</p>
              <p style="color:#ccc;font-size:16px;line-height:1.6;">You're now subscribed to OpportuAI — the remote job board powered by AI. We'll send you the best remote opportunities, SaaS tools, and digital products weekly.</p>
              <div style="margin:28px 0;text-align:center;">
                <a href="https://opportunai.vercel.app/jobs" style="background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#0d0d0d;font-weight:700;border-radius:12px;padding:14px 32px;text-decoration:none;font-size:15px;">Browse Remote Jobs →</a>
              </div>
              <p style="color:#666;font-size:13px;text-align:center;">You can unsubscribe anytime. We respect your inbox.</p>
            </div>
          </div>
        `
      })
    })

    res.status(200).json({ success: true })
  } catch (e) {
    console.error('Newsletter error:', e)
    res.status(500).json({ error: e.message || 'Something went wrong' })
  }
}
