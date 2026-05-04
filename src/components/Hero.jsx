import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Download, FileText } from 'lucide-react'
import profile from '../assets/doneeproj.jpeg'
import MagneticButton from './MagneticButton'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* animated mesh gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mesh-bg">
          <div className="mesh-bg-orb" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      </div>

      <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
        {/* LEFT */}
        <div className="lg:col-span-7">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="section-label">
              <Sparkles size={14} style={{ color: 'var(--c-cyan)' }} />
              Available for freelance &amp; full-time
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="heading-xl mt-6"
          >
            <span className="block">
              Hi, I&apos;m <span className="text-gradient">Manish Beniwal</span>
            </span>
            <span className="block mt-2">
              I build <em className="italic font-display text-ink-200">premium</em> digital products.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="body-lg mt-6 max-w-xl"
          >
            Full-stack &amp; cloud engineer with 1+ year of freelancing experience and{' '}
            <span className="text-white font-semibold">30+ shipped projects</span> for international clients —
            crafting fast, scalable and beautifully designed web experiences.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" className="btn-primary inline-flex" data-cursor="link">
              View My Work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-secondary inline-flex" data-cursor="link">
              Let&apos;s Talk
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/resume.pdf"
              download
              data-cursor="link"
              className="inline-flex items-center gap-2 text-sm text-ink-200 hover:text-white transition px-3 py-2"
            >
              <FileText size={14} /> Resume
              <Download size={14} className="opacity-60" />
            </MagneticButton>
          </motion.div>

          {/* Currently building / Now widget */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-8 inline-flex items-center gap-3 glass rounded-full pl-2 pr-5 py-1.5"
          >
            <span className="relative h-7 w-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs">
              <span className="text-ink-400">Currently building</span>{' '}
              <span className="text-white font-medium">an AI-powered SaaS dashboard</span>
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="mt-10 flex items-center gap-8"
          >
            <div>
              <div className="font-display text-3xl font-bold text-gradient-static">30+</div>
              <div className="text-xs uppercase tracking-widest text-ink-400 mt-1">Projects</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="font-display text-3xl font-bold text-gradient-static">15+</div>
              <div className="text-xs uppercase tracking-widest text-ink-400 mt-1">Clients</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="font-display text-3xl font-bold text-gradient-static">3</div>
              <div className="text-xs uppercase tracking-widest text-ink-400 mt-1">Stacks</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* rotating gradient ring */}
            <div className="absolute inset-0 rounded-full p-[3px] animate-spin-slow"
                 style={{ background: 'conic-gradient(from 0deg, var(--c-violet), var(--c-cyan), var(--c-pink), var(--c-violet))' }}>
              <div className="h-full w-full rounded-full bg-bg-900" />
            </div>
            {/* glow */}
            <div className="absolute inset-4 rounded-full blur-2xl"
                 style={{ background: 'linear-gradient(135deg, color-mix(in oklab, var(--c-violet) 40%, transparent), color-mix(in oklab, var(--c-cyan) 40%, transparent))' }} />
            {/* image */}
            <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10">
              <img
                src={profile}
                alt="Manish Beniwal"
                className="h-full w-full object-cover scale-[1.18] object-[center_22%]"
                style={{ filter: 'contrast(1.05) saturate(0.85) brightness(0.96)' }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(7,7,12,0.55)_85%,rgba(7,7,12,0.9)_100%)]" />
              <div className="absolute inset-0 mix-blend-color"
                   style={{ background: 'linear-gradient(135deg, color-mix(in oklab, var(--c-violet) 25%, transparent), transparent, color-mix(in oklab, var(--c-cyan) 20%, transparent))' }} />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-900/70 to-transparent" />
            </div>

            {/* floating badges */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-6 top-10 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-2xl"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium">Open to Work</span>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-4 top-24 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-2xl"
            >
              <span className="text-base">⚛️</span>
              <span className="text-xs font-medium">React · Node · AWS</span>
            </motion.div>

            <motion.div
              animate={{ y: [-4, 8, -4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-2xl"
            >
              <span className="text-base">🚀</span>
              <span className="text-xs font-medium">30+ Projects Shipped</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
