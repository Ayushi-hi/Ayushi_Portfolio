import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sibs = Array.from(entry.target.parentElement.querySelectorAll('.reveal,.reveal-left'))
          const idx = sibs.indexOf(entry.target)
          setTimeout(() => entry.target.classList.add('in'), idx * 80)
        }
      })
    }, { threshold: 0.08 })

    const observe = () => {
      document.querySelectorAll('.reveal,.reveal-left').forEach(el => observer.observe(el))
    }
    observe()
    const timer = setInterval(observe, 500)
    setTimeout(() => clearInterval(timer), 3000)
    return () => { observer.disconnect(); clearInterval(timer) }
  }, [])
}