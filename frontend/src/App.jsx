import { useEffect, useState, useRef } from 'react'
import Cursor from './components/Cursor'
import Toast from './components/Toast'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

const API = 'http://localhost:5000/api'

export default function App() {
  const [projects, setProjects] = useState([])
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' })

  useScrollReveal()

  // Track visit
  useEffect(() => {
    fetch(API + '/analytics/hit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: '/', referrer: document.referrer || 'direct' })
    }).catch(() => {})
  }, [])

  // Load projects
  useEffect(() => {
    fetch(API + '/projects')
      .then(r => r.json())
      .then(data => { if (data.success) setProjects(data.data) })
      .catch(() => {})
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 4500)
  }

  return (
    <>
      <Cursor />
      <Toast toast={toast} />
      <Nav />
      <Hero projects={projects} />
      <Marquee />
      <About />
      <Projects projects={projects} />
      <Education />
      <Contact showToast={showToast} API={API} />
      <Footer />
    </>
  )
}