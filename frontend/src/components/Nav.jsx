import { useEffect, useState } from 'react'

export default function Nav() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const onScroll = () => {
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['about', 'skills', 'projects', 'education', 'contact']

  return (
    <>
      <nav>
        <div className="nav-logo">Ayushi Singh</div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <a href={'#' + l}
                style={{ color: active === l ? 'var(--cream)' : 'rgba(245,240,232,0.5)' }}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </div>
      </nav>
      <div className={'nav-mobile-menu' + (menuOpen ? ' open' : '')}>
        {links.map(l => (
          <a key={l} href={'#' + l} onClick={() => setMenuOpen(false)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
      </div>
    </>
  )
}