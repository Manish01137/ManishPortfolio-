import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { EXPERIENCE } from '../data/content'

function Item({ exp, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      className="relative pl-12 sm:pl-16 pb-12 last:pb-0"
    >
      {/* node */}
      <span className="absolute left-[10px] sm:left-[14px] top-1.5 h-4 w-4 rounded-full border-2 border-bg-900 z-10"
            style={{ background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))' }} />

      <div className="spotlight-card glass glass-hover rounded-2xl p-5 sm:p-6"
           onMouseMove={(e) => {
             const r = e.currentTarget.getBoundingClientRect()
             e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
             e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
           }}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/10 text-gradient-static">
            {exp.period}
          </span>
          <span className="text-xs text-ink-400">{exp.org}</span>
        </div>
        <h3 className="heading-md text-lg mt-3">{exp.role}</h3>
        <p className="text-sm text-ink-200 leading-relaxed mt-2">{exp.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.tags.map((t) => (
            <span key={t} className="text-[11px] text-ink-400 border border-white/10 rounded-full px-2.5 py-1">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
            <Briefcase size={14} style={{ color: 'var(--c-cyan)' }} /> Journey
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="heading-lg mt-5">
            The road so far, <span className="text-gradient-static">in motion</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="body-lg mt-5">
            From self-taught builder to a full-stack engineer shipping production products for clients worldwide.
          </motion.p>
        </div>

        <div ref={ref} className="relative mt-14 max-w-3xl">
          {/* track */}
          <div className="absolute left-[16px] sm:left-[20px] top-0 bottom-0 w-px bg-white/[0.08]" />
          {/* animated progress fill */}
          <motion.div
            style={{ height }}
            className="absolute left-[16px] sm:left-[20px] top-0 w-px origin-top"
          >
            <div className="h-full w-full" style={{ background: 'linear-gradient(180deg, var(--c-violet), var(--c-cyan), var(--c-pink))' }} />
          </motion.div>

          {EXPERIENCE.map((exp, i) => <Item key={exp.period} exp={exp} i={i} />)}
        </div>
      </div>
    </section>
  )
}
