import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageView() {
  const location = useLocation()
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: location.pathname })
    }).catch(err => console.error('Track error:', err))
  }, [location.pathname])
}
