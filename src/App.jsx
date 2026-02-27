import SubmitPage from './pages/SubmitPage'
import React from 'react'
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
import PostJobPage from './pages/PostJobPage'
import AdminPage from './pages/AdminPage'
import ToolsPage from './pages/ToolsPage'
import ProductsPage from './pages/ProductsPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import SubmitToolPage from './pages/SubmitToolPage'
import { usePageView } from './hooks/usePageView'

function PostPage({ onOpen }) {
  const navigate = useNavigate()
  useEffect(() => { onOpen(); navigate('/') }, [])
  return null
}

function PageViewTracker() { usePageView(); return null }

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
    <BrowserRouter><PageViewTracker />
      <Navbar
        onOpenMatcher={() => setShowMatcher(true)}
        onOpenSubmit={() => setShowSubmit(true)}
        onOpenAuth={(mode) => setShowAuth(mode)}
      />

      <ErrorBoundary><Routes>
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
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/submit-tool" element={<SubmitToolPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/dashboard" element={<DashboardPage allJobs={jobs.allJobs} />} />
        <Route path='/submit' element={<SubmitPage />} />
        </Routes></ErrorBoundary>

      {showAuth && <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} />}
      {showMatcher && <AIJobMatcher allJobs={jobs.allJobs} onMatchResult={(ids) => { setMatchedIds(ids); setShowMatcher(false) }} onClose={() => setShowMatcher(false)} />}
      {showSubmit && <SubmitModal onSubmit={(job) => jobs.addSubmitted(job)} onClose={() => setShowSubmit(false)} />}
      {showAPI && <APIModal keys={apiKeys} onSave={saveApiKeys} onClose={() => setShowAPI(false)} />}
    </BrowserRouter>
  )
}


class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(e) { return { hasError: true, error: e } }
  render() {
    if (this.state.hasError) return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#060606',color:'#e8e8e8',fontFamily:'system-ui',flexDirection:'column',gap:12,padding:24,textAlign:'center'}}>
        <div style={{fontSize:32}}>⚠️</div>
        <div style={{fontSize:16,fontWeight:600}}>Something went wrong</div>
        <div style={{fontSize:13,color:'#555',maxWidth:400}}>{this.state.error?.message}</div>
        <button onClick={() => window.location.href='/'} style={{padding:'8px 18px',background:'#6366f1',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,marginTop:8}}>Go Home</button>
      </div>
    )
    return this.props.children
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
