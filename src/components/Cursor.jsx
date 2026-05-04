import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [variant, setVariant] = useState('default')
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 })
  const sy = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 })

  useEffect(() => {
    // skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const onLeave = () => setHidden(true)
    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (t) setVariant(t.getAttribute('data-cursor'))
      else if (e.target.closest('a, button, input, textarea, [role="button"]')) setVariant('link')
      else setVariant('default')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('mouseover', onOver)
    document.documentElement.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.style.cursor = ''
    }
  }, [x, y])

  const variants = {
    default: { width: 12, height: 12, opacity: 0.95 },
    link:    { width: 38, height: 38, opacity: 0.9  },
    card:    { width: 60, height: 60, opacity: 0.85 }
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ translateX: sx, translateY: sy, opacity: hidden ? 0 : 1 }}
      >
        <motion.span
          className="block rounded-full bg-white"
          animate={variants[variant]}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          style={{ marginLeft: '-50%', marginTop: '-50%' }}
        />
      </motion.div>

      {/* outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ translateX: x, translateY: y, opacity: hidden ? 0 : 0.4 }}
      >
        <span
          className="block h-8 w-8 rounded-full border border-white/40"
          style={{ marginLeft: '-50%', marginTop: '-50%' }}
        />
      </motion.div>
    </>
  )
}
