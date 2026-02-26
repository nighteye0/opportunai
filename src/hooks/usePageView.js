import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function usePageView() {
  const location = useLocation()
  useEffect(() => {
    supabase.from('page_views').insert([{ page: location.pathname }])
  }, [location.pathname])
}
