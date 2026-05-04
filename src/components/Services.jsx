import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            What I do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mt-5"
          >
            Services tailored for <span className="text-gradient-static">modern teams</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg mt-5"
          >
            Whether you need an MVP shipped in weeks or a full-stack platform that scales,
            I cover the entire product lifecycle.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card-glow glass glass-hover group relative rounded-3xl p-7 flex flex-col h-full"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-violet/30 to-brand-cyan/20 border border-white/10 flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <ArrowUpRight size={18} className="text-ink-400 group-hover:text-white group-hover:rotate-12 transition" />
                </div>

                <h3 className="heading-md mt-6 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-ink-200 leading-relaxed flex-1">{s.desc}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[11px] text-ink-400 border border-white/10 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
