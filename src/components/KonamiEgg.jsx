import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function KonamiEgg() {
  const [active, setActive] = useState(false)
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    let buf = []
    const onKey = (e) => {
      buf.push(e.key.length === 1 ? e.key.toLowerCase() : e.key)
      buf = buf.slice(-SEQ.length)
      if (buf.join('|') === SEQ.join('|')) trigger()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const trigger = () => {
    setActive(true)
    const next = Array.from({ length: 80 }).map((_, i) => ({
      id: i + Date.now(),
      x: 50 + (Math.random() - 0.5) * 10,
      y: 50,
      dx: (Math.random() - 0.5) * 800,
      dy: (Math.random() - 0.5) * 800 - 200,
      hue: Math.floor(Math.random() * 360),
      size: 6 + Math.random() * 10,
      delay: Math.random() * 0.2
    }))
    setPieces(next)
    // cycle through palettes for fun
    const themes = ['sunset','ocean','forest','cosmic']
    let i = 0
    const tick = setInterval(() => {
      document.documentElement.setAttribute('data-theme', themes[i % themes.length])
      i++
      if (i > themes.length) {
        clearInterval(tick)
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'cosmic')
      }
    }, 250)
    setTimeout(() => { setActive(false); setPieces([]) }, 3000)
  }

  return (
    <AnimatePresence>
      {active && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-2 text-sm font-display font-semibold"
          >
            Cheat code unlocked ⚡
          </motion.div>
          {pieces.map((p) => (
            <span
              key={p.id}
              className="absolute h-2 w-2 rounded-sm"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                background: `hsl(${p.hue}, 90%, 60%)`,
                ['--dx']: `${p.dx}px`, ['--dy']: `${p.dy}px`,
                animation: `confetti-burst 1.4s ${p.delay}s cubic-bezier(0.22,1,0.36,1) forwards`
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
