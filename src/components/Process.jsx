import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'

const STEPS = [
  { icon: Search,  step: '01', title: 'Discovery',          desc: 'Understand goals, users and constraints — turn vague ideas into a clear, scoped roadmap.' },
  { icon: PenTool, step: '02', title: 'Design & Architecture', desc: 'Wireframes, UI direction and system design that balance speed-to-ship with long-term maintainability.' },
  { icon: Code2,   step: '03', title: 'Build',              desc: 'Iterative development with weekly demos, clean code and reviews so there are no surprises at launch.' },
  { icon: Rocket,  step: '04', title: 'Launch & Iterate',   desc: 'Deploy to production, monitor real users and ship continuous improvements based on real feedback.' }
]

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 35%'] })
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))
      setActiveIdx(idx)
    })
  }, [scrollYProgress])

  // bind progress to CSS var on the timeline element
  const lineRef = useRef(null)
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (lineRef.current) lineRef.current.style.setProperty('--p', v.toString())
    })
  }, [scrollYProgress])

  const ActiveIcon = STEPS[activeIdx].icon

  return (
    <section id="process" ref={ref} className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label">How I work</span>
          <h2 className="heading-lg mt-5">A simple, <span className="text-gradient-static">battle-tested</span> process</h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          {/* Sticky narrative panel — left */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="glass rounded-3xl p-7 spotlight-card"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl border border-white/10 flex items-center justify-center"
                       style={{ background: 'linear-gradient(135deg, color-mix(in oklab, var(--c-violet) 30%, transparent), color-mix(in oklab, var(--c-cyan) 20%, transparent))' }}>
                    <ActiveIcon size={20} />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-ink-600">{STEPS[activeIdx].step}</div>
                  </div>
                </div>
                <h3 className="heading-md text-2xl mt-5">{STEPS[activeIdx].title}</h3>
                <p className="body-lg mt-3">{STEPS[activeIdx].desc}</p>

                <div className="mt-7 flex items-center gap-2">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${i === activeIdx ? 'w-10 bg-gradient-to-r from-[var(--c-violet)] to-[var(--c-cyan)]' : 'w-3 bg-white/15'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Steps stack — right */}
          <div className="lg:col-span-7 relative">
            {/* timeline rail */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
            <div
              ref={lineRef}
              className="timeline-progress absolute left-6 top-0 bottom-0 w-[2px]"
              style={{ background: 'linear-gradient(180deg, var(--c-violet), var(--c-cyan), var(--c-pink))' }}
            />

            <div className="space-y-12">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative pl-20"
                  >
                    <div className={`absolute left-1.5 top-1 h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-500
                                     ${i <= activeIdx ? 'border-transparent text-white' : 'border-white/10 bg-bg-800 text-ink-400'}`}
                         style={i <= activeIdx ? { background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))' } : {}}>
                      <Icon size={15} />
                    </div>
                    <div className="font-display text-sm font-semibold text-ink-400 tracking-widest">{s.step}</div>
                    <h3 className="heading-md text-xl mt-1">{s.title}</h3>
                    <p className="text-sm text-ink-200 leading-relaxed mt-2 max-w-md">{s.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
