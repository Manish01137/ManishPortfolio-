import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, X, Check, Globe, Code2, Layers } from 'lucide-react'
import { PROJECTS } from '../data/content'

function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null
  const p = project

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-bg-900/95 backdrop-blur-md"
      />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto glass rounded-3xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          data-cursor="link"
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/[0.08] transition"
        >
          <X size={16} />
        </button>

        <div className="relative h-72 sm:h-96 overflow-hidden rounded-t-3xl bg-bg-700">
          {/* browser chrome */}
          <div className="absolute top-0 left-0 right-0 z-20 h-8 px-3 flex items-center gap-1.5 bg-bg-800/90 backdrop-blur border-b border-white/[0.06]">
            <span className="h-2 w-2 rounded-full bg-rose-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
            <span className="ml-3 text-[11px] text-ink-400 truncate font-mono">
              {p.url.replace('https://', '')}
            </span>
          </div>
          <img
            src={p.screenshot || p.image}
            alt={p.title}
            onError={(e) => { e.currentTarget.src = p.image }}
            className="absolute inset-0 mt-8 w-full h-[calc(100%-2rem)] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-900 via-bg-900/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase tracking-widest text-ink-200">{p.category}</span>
            <h3 className="heading-lg mt-2">{p.title}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-10 grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-2">
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Globe,  label: 'Role', value: p.role || 'Full-stack' },
                { icon: Code2,  label: 'Year', value: p.year || '2025' },
                { icon: Layers, label: 'Status', value: 'Live' }
              ].map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label} className="rounded-2xl border border-white/10 p-4">
                    <Icon size={14} className="text-ink-400" />
                    <div className="text-[10px] uppercase tracking-widest text-ink-400 mt-2">{m.label}</div>
                    <div className="text-sm font-medium mt-0.5">{m.value}</div>
                  </div>
                )
              })}
            </div>

            {p.metrics?.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {p.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                    <div className="font-display text-xl font-bold text-gradient-static">{m.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <h4 className="heading-md text-lg mt-8">Overview</h4>
            <p className="body-lg mt-3">{p.desc}</p>

            <h4 className="heading-md text-lg mt-8">Highlights</h4>
            <ul className="mt-3 space-y-2.5">
              {(p.highlights || [
                'Component-driven UI with Framer Motion micro-interactions',
                'Type-safe API layer with auth and error boundaries',
                'CI/CD pipeline auto-deploying to production on every merge',
                'Observability with structured logs and uptime monitoring'
              ]).map((line) => (
                <li key={line} className="flex gap-2 text-sm text-ink-200">
                  <Check size={16} className="mt-0.5 text-emerald-400 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-5">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-ink-400">Tech stack</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs border border-white/10 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="btn-primary w-full"
            >
              Visit live site <ExternalLink size={14} />
            </a>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ p, i, onOpen }) {
  const cardRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    // 3D tilt
    const cx = rect.width / 2, cy = rect.height / 2
    const rx = ((e.clientY - rect.top - cy) / cy) * -4
    const ry = ((e.clientX - rect.left - cx) / cx) * 4
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const onLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = ''
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: i * 0.06 }}
      data-cursor="card"
      className="group relative rounded-3xl overflow-hidden glass glass-hover flex flex-col spotlight-card transition-transform duration-300"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <button
        onClick={() => onOpen(p)}
        className="block relative h-64 overflow-hidden bg-bg-700 text-left"
        aria-label={`Open case study for ${p.title}`}
      >
        {/* browser chrome */}
        <div className="absolute top-0 left-0 right-0 z-20 h-7 px-3 flex items-center gap-1.5 bg-bg-800/90 backdrop-blur border-b border-white/[0.06]">
          <span className="h-2 w-2 rounded-full bg-rose-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-[10px] text-ink-400 truncate font-mono">
            {p.url.replace('https://', '')}
          </span>
        </div>

        <div className={`absolute inset-7 rounded-md bg-gradient-to-br ${p.accent} opacity-30 transition-opacity duration-700 ${loaded ? 'opacity-0' : 'animate-pulse-soft'}`} />

        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`liquid-img absolute inset-0 mt-7 h-[calc(100%-1.75rem)] w-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-2 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          style={{ background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)' }}
        />

        <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-bg-900 via-bg-900/40 to-transparent" />

        <div className="absolute top-10 right-3 z-20 h-8 w-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <ExternalLink size={13} />
        </div>
      </button>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-ink-400 uppercase tracking-widest">{p.category}</span>
          <ArrowUpRight size={16} className="text-ink-400 group-hover:text-white group-hover:rotate-12 transition" />
        </div>

        <h3 className="heading-md text-lg mt-3">{p.title}</h3>
        <p className="text-sm text-ink-200 leading-relaxed mt-2 flex-1">{p.desc}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] text-ink-400 border border-white/10 rounded-full px-2.5 py-1">{t}</span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={() => onOpen(p)}
            data-cursor="link"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-gradient-static transition"
          >
            Read case study <ArrowUpRight size={14} />
          </button>
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-white transition"
          >
            Live <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
              Selected work
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="heading-lg mt-5">
              Real projects, <span className="text-gradient-static">real clients</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="body-lg mt-5">
              A selection of live products I&apos;ve designed, built and shipped — across hospitality, e-commerce, mobility, EdTech and creative portfolios.
            </motion.p>
          </div>
          <motion.a href="#contact" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="btn-secondary">
            Start a project <ArrowUpRight size={16} />
          </motion.a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} onOpen={setOpen} />)}
        </div>
      </div>

      <AnimatePresence>
        {open && <CaseStudyModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
