import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '../data/content'

function CountUp({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = performance.now()
    const tick = (t) => {
      const p = Math.min((t - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(start + (to - start) * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref}>{n}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-page grid lg:grid-cols-12 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6"
        >
          <span className="section-label">About me</span>
          <h2 className="heading-lg mt-5">
            Engineering <span className="text-gradient-static">elegant solutions</span> from
            frontend & Backend to cloud.
          </h2>
          <p className="body-lg mt-6">
            I&apos;m Manish — a full-stack developer who treats every project like a product.
            Over the last year of freelancing, I&apos;ve shipped <span className="text-white font-semibold">30+ projects</span> ranging
            from SaaS dashboards and marketplaces to AI-powered automations and realtime apps,
            for clients across the US, Europe and the Middle East.
          </p>
          <p className="body-lg mt-4">
            My sweet spot: combining a strong eye for design with solid backend architecture
            and reliable cloud deployments — so the products I build feel premium <em>and</em> hold up at scale.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Frontend', 'Backend', 'Cloud / DevOps', 'UI / UX'].map((t) => (
              <span key={t} className="glass rounded-full px-4 py-1.5 text-xs text-ink-200">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-glow glass glass-hover rounded-3xl p-6 sm:p-8"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold text-gradient-static">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-ink-400 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
