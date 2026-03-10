import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const ring = ringRef.current
    const dot  = dotRef.current

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let frame
    const loop = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      frame = requestAnimationFrame(loop)
    }
    loop()

    const expand = () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.9)'
      ring.style.borderColor = 'rgba(232,201,110,0.7)'
    }
    const shrink = () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.borderColor = 'var(--gold)'
    }

    const attach = () => {
      document.querySelectorAll('a,button,.proj-item,.pill').forEach(el => {
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attach()
    const timer = setInterval(attach, 1000)
    setTimeout(() => clearInterval(timer), 5000)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div id="cur-ring" ref={ringRef}></div>
      <div id="cur-dot"  ref={dotRef}></div>
    </>
  )
}