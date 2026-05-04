import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const last = useRef({ x: 0, y: 0, t: 0 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let raf, dpr = window.devicePixelRatio || 1

    const resize = () => {
      cv.width = window.innerWidth * dpr
      cv.height = window.innerHeight * dpr
      cv.style.width = window.innerWidth + 'px'
      cv.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const themeColor = () => {
      const cs = getComputedStyle(document.documentElement)
      return cs.getPropertyValue('--c-violet').trim() || '#7C3AED'
    }

    const onMove = (e) => {
      const now = performance.now()
      const dx = e.clientX - last.current.x
      const dy = e.clientY - last.current.y
      const speed = Math.hypot(dx, dy)
      last.current = { x: e.clientX, y: e.clientY, t: now }
      if (speed < 1.5) return
      const count = Math.min(2, Math.floor(speed / 8))
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
          size: 2 + Math.random() * 2
        })
      }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      const color = themeColor()
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i]
        p.x += p.vx; p.y += p.vy; p.life -= 0.02
        if (p.life <= 0) { particles.current.splice(i, 1); continue }
        ctx.globalAlpha = p.life * 0.6
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
