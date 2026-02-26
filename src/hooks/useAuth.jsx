import { useState, useEffect, createContext, useContext } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('opportunai_user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
        const storedProfile = localStorage.getItem('opportunai_profile_' + parsed.id)
        if (storedProfile) setProfile(JSON.parse(storedProfile))
      } catch (e) {}
    }
    setLoading(false)
  }, [])

  const signUp = async (email, password, name) => {
    const newUser = { id: Date.now().toString(), email, name, createdAt: new Date().toISOString() }
    const newProfile = { userId: newUser.id, savedJobs: [], appliedJobs: [], name }
    setUser(newUser)
    setProfile(newProfile)
    localStorage.setItem('opportunai_user', JSON.stringify(newUser))
    localStorage.setItem('opportunai_profile_' + newUser.id, JSON.stringify(newProfile))
    return { user: newUser, error: null }
  }

  const signIn = async (email, password) => {
    const newUser = { id: btoa(email), email, name: email.split('@')[0], createdAt: new Date().toISOString() }
    const storedProfile = localStorage.getItem('opportunai_profile_' + newUser.id)
    const newProfile = storedProfile ? JSON.parse(storedProfile) : { userId: newUser.id, savedJobs: [], appliedJobs: [] }
    setUser(newUser)
    setProfile(newProfile)
    localStorage.setItem('opportunai_user', JSON.stringify(newUser))
    localStorage.setItem('opportunai_profile_' + newUser.id, JSON.stringify(newProfile))
    return { user: newUser, error: null }
  }

  const signOut = () => {
    setUser(null)
    setProfile(null)
    localStorage.removeItem('opportunai_user')
  }

  const toggleSavedJob = (jobId) => {
    if (!user || !profile) return
    const savedJobs = profile.savedJobs || []
    const newSaved = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId]
    const newProfile = { ...profile, savedJobs: newSaved }
    setProfile(newProfile)
    localStorage.setItem('opportunai_profile_' + user.id, JSON.stringify(newProfile))
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, toggleSavedJob }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) return { user: null, profile: null, loading: false, signUp: async () => {}, signIn: async () => {}, signOut: () => {}, toggleSavedJob: () => {} }
  return ctx
}
