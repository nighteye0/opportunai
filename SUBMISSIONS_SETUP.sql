-- Run in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('job','tool','product')),
  email text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (submit)
CREATE POLICY "Anyone can submit"
  ON submissions FOR INSERT
  WITH CHECK (true);

-- Only service role can read/update (admin only)
CREATE POLICY "Service role can manage submissions"
  ON submissions FOR ALL
  USING (auth.role() = 'service_role');
