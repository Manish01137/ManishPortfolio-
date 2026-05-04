import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const SECTIONS = ['top','about','services','skills','projects','process','pricing','faq','contact']
const LABELS   = ['Home','About','Services','Skills','Work','Process','Pricing','FAQ','Contact']

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 })
  const [active, setActive] = useState('top')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight / 3
      let current = SECTIONS[0]
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
        style={{ scaleX: w, background: 'linear-gradient(90deg, var(--c-violet), var(--c-cyan), var(--c-pink))' }}
      />
      <nav aria-label="Section indicators" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {SECTIONS.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            data-cursor="link"
            className="group relative flex items-center justify-end gap-3"
            aria-label={`Go to ${LABELS[i]}`}
          >
            <span className={`opacity-0 group-hover:opacity-100 transition text-xs font-medium tracking-widest uppercase
                              text-ink-200 ${active === id ? '!opacity-100' : ''}`}>
              {LABELS[i]}
            </span>
            <span className={`block h-1.5 rounded-full transition-all duration-500
                              ${active === id ? 'w-6 bg-gradient-to-r from-[var(--c-violet)] to-[var(--c-cyan)]' : 'w-1.5 bg-white/30 group-hover:bg-white/60'}`} />
          </a>
        ))}
      </nav>
    </>
  )
}
