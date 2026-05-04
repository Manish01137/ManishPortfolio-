import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    })

    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    // Anchor link smooth scroll via lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id === '#' || id.length < 2) return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el, { offset: -70, duration: 1.4 })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}
