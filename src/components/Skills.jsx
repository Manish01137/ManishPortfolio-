import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code2, Server, Cloud, Sparkles, Award } from 'lucide-react'

const RINGS = [
  { tags: ['React', 'Node.js', 'AWS', 'TypeScript'],                                        radius: 60  },
  { tags: ['Next.js', 'Tailwind', 'MongoDB', 'Docker', 'Express', 'Vercel', 'GraphQL', 'Stripe'], radius: 115 },
  { tags: ['Redis', 'Three.js', 'Firebase', 'Prisma', 'Socket.io', 'Jest', 'Actions', 'PostgreSQL'], radius: 170 }
]

function TechCloud() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onMove = (e) => {
      const rect = stage.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const ry = ((e.clientX - cx) / rect.width) * 20
      const rx = -((e.clientY - cy) / rect.height) * 20
      stage.style.setProperty('--rx', rx + 'deg')
      stage.style.setProperty('--ry', ry + 'deg')
    }
    const onLeave = () => {
      stage.style.setProperty('--rx', '0deg')
      stage.style.setProperty('--ry', '0deg')
    }
    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)
    return () => {
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="relative h-80 w-full"
      style={{ perspective: '900px' }}
    >
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* faint orbital guides */}
        {RINGS.map((r, i) => (
          <span
            key={`g-${i}`}
            aria-hidden
            className="absolute top-1/2 left-1/2 rounded-full border border-white/[0.05]"
            style={{
              width: r.radius * 2,
              height: r.radius * 2,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

        {RINGS.map((ring, ri) =>
          ring.tags.map((tech, i) => {
            const angle = (i / ring.tags.length) * Math.PI * 2 + (ri * 0.4)
            const x = Math.cos(angle) * ring.radius
            const y = Math.sin(angle) * ring.radius
            return (
              <span
                key={`${ri}-${i}`}
                className="absolute top-1/2 left-1/2 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap glass border border-white/10 hover:border-white/30 hover:text-white transition-colors"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  animation: `float ${4 + ((ri * 8 + i) * 0.18)}s ease-in-out infinite`,
                  animationDelay: `${(ri * 8 + i) * 0.12}s`
                }}
              >
                {tech}
              </span>
            )
          })
        )}

        {/* center hub */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full flex items-center justify-center font-display font-bold text-sm text-white shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))',
            boxShadow: '0 0 40px -8px color-mix(in oklab, var(--c-violet) 70%, transparent)'
          }}
        >
          20+
        </div>
      </div>
    </div>
  )
}

function Bar({ label, value, color = 'var(--c-violet)' }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-200">{label}</span>
        <span className="text-ink-400">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, var(--c-cyan))` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full blur-[100px]"
             style={{ background: 'color-mix(in oklab, var(--c-violet) 20%, transparent)' }} />
        <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full blur-[100px]"
             style={{ background: 'color-mix(in oklab, var(--c-cyan) 20%, transparent)' }} />
      </div>

      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label">Tech stack</span>
          <h2 className="heading-lg mt-5">
            Tools I <span className="text-gradient-static">build with</span>
          </h2>
          <p className="body-lg mt-5">
            A modern, battle-tested stack chosen for speed of delivery, scalability and great DX.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4 mt-14">
          {/* Featured frontend — large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-3 md:row-span-2 spotlight-card glass rounded-3xl p-7 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, color-mix(in oklab, var(--c-violet) 30%, transparent), color-mix(in oklab, var(--c-cyan) 20%, transparent))' }}>
                <Code2 size={18} />
              </div>
              <h3 className="font-display font-semibold text-lg">Frontend</h3>
            </div>
            <p className="text-sm text-ink-200 mt-3">
              Pixel-perfect UIs with React, Next.js and Tailwind. Animation, accessibility and performance dialed in.
            </p>
            <div className="mt-6 space-y-3 flex-1">
              <Bar label="React / Next.js" value={95} />
              <Bar label="TypeScript"      value={88} />
              <Bar label="Tailwind / CSS"  value={94} />
              <Bar label="Framer Motion"   value={86} />
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {['React','Next.js','TS','Tailwind','Vite','Redux'].map(t => (
                <span key={t} className="text-[11px] text-ink-400 border border-white/10 rounded-full px-2.5 py-1">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="md:col-span-3 spotlight-card glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center"
                   style={{ background: 'color-mix(in oklab, var(--c-violet) 20%, transparent)' }}>
                <Server size={16} />
              </div>
              <h3 className="font-display font-semibold">Backend</h3>
            </div>
            <p className="text-sm text-ink-200 mt-3">Scalable APIs, auth, payments and clean data layers.</p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              <Bar label="Node / Express" value={92} />
              <Bar label="MongoDB"        value={86} />
              <Bar label="PostgreSQL"     value={82} />
              <Bar label="GraphQL"        value={78} />
            </div>
          </motion.div>

          {/* Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 spotlight-card glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center"
                   style={{ background: 'color-mix(in oklab, var(--c-cyan) 20%, transparent)' }}>
                <Cloud size={16} />
              </div>
              <h3 className="font-display font-semibold">Cloud &amp; DevOps</h3>
            </div>
            <p className="text-sm text-ink-200 mt-3">Reliable deployments with CI/CD and observability.</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['AWS EC2','S3','Lambda','Docker','GitHub Actions','Vercel','Nginx','Linux'].map(t => (
                <span key={t} className="text-[11px] text-ink-400 border border-white/10 rounded-full px-2.5 py-1">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* 3D Tech Cloud — featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-4 md:row-span-2 spotlight-card glass rounded-3xl p-7 relative"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">Live tech stack</h3>
              <span className="text-[10px] uppercase tracking-widest text-ink-400">Hover to control</span>
            </div>
            <TechCloud />
          </motion.div>

          {/* Currently learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="md:col-span-2 spotlight-card glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-400">
              <Sparkles size={14} /> Currently learning
            </div>
            <h3 className="font-display font-semibold text-lg mt-3">Rust &amp; Three.js</h3>
            <p className="text-sm text-ink-200 mt-2">Exploring systems-level performance + WebGL/3D experiences for richer interfaces.</p>
          </motion.div>

          {/* Awards / Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 spotlight-card glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-400">
              <Award size={14} /> Recognition
            </div>
            <h3 className="font-display font-bold text-3xl mt-3 text-gradient-static">Hackathon · Top 5</h3>
            <p className="text-sm text-ink-200 mt-2">Multiple hackathon finals in health-tech &amp; sports verticals.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
