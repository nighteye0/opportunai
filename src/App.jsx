import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { useJobs } from './hooks/useJobs'

import Navbar from './components/Navbar'
import AuthModal from './components/AuthModal'
import AIJobMatcher from './components/AIJobMatcher'
import SubmitModal from './components/SubmitModal'
import APIModal from './components/APIModal'

import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import DashboardPage from './pages/DashboardPage'
import ResumePage from './pages/ResumePage'

function PostPage({ onOpen }) {
  const navigate = useNavigate()
  useEffect(() => { onOpen(); navigate('/') }, [])
  return null
}

function AppInner() {
  const [showAuth, setShowAuth] = useState(null)
  const [showMatcher, setShowMatcher] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [showAPI, setShowAPI] = useState(false)
  const [matchedIds, setMatchedIds] = useState([])
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const stored = localStorage.getItem('opportunai_api_keys')
      return stored ? JSON.parse(stored) : { adzunaId: '3a6e37ae', adzunaKey: '3d5c5180d26a473788338a9c70a94e66', rapidKey: '' }
    } catch { return { adzunaId: '', adzunaKey: '', rapidKey: '' } }
  })

  const saveApiKeys = (keys) => {
    setApiKeys(keys)
    localStorage.setItem('opportunai_api_keys', JSON.stringify(keys))
  }

  const jobs = useJobs(apiKeys)

  return (
    <BrowserRouter>
      <Navbar
        onOpenMatcher={() => setShowMatcher(true)}
        onOpenSubmit={() => setShowSubmit(true)}
        onOpenAuth={(mode) => setShowAuth(mode)}
      />

      <Routes>
        <Route path="/" element={<HomePage onOpenMatcher={() => setShowMatcher(true)} onOpenSubmit={() => setShowSubmit(true)} allJobs={jobs.allJobs} />} />
        <Route path="/jobs" element={
          <JobsPage
            jobs={jobs} loading={jobs.loading} errors={jobs.errors}
            fetchRemotive={jobs.fetchRemotive} fetchAdzuna={jobs.fetchAdzuna} fetchJSearch={jobs.fetchJSearch}
            apiKeys={apiKeys} onOpenAPI={() => setShowAPI(true)} onOpenSubmit={() => setShowSubmit(true)}
            onOpenMatcher={() => setShowMatcher(true)} matchedIds={matchedIds} setMatchedIds={setMatchedIds}
          />
        } />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/post" element={<PostPage onOpen={() => setShowSubmit(true)} />} />
        <Route path="/dashboard" element={<DashboardPage allJobs={jobs.allJobs} />} />
      </Routes>

      {showAuth && <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} />}
      {showMatcher && <AIJobMatcher allJobs={jobs.allJobs} onMatchResult={(ids) => { setMatchedIds(ids); setShowMatcher(false) }} onClose={() => setShowMatcher(false)} />}
      {showSubmit && <SubmitModal onSubmit={(job) => jobs.addSubmitted(job)} onClose={() => setShowSubmit(false)} />}
      {showAPI && <APIModal keys={apiKeys} onSave={saveApiKeys} onClose={() => setShowAPI(false)} />}
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
