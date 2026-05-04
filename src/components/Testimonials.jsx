import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: 'Manish delivered our MVP in record time without compromising quality. His ability to own both frontend and backend made the project incredibly smooth.',
    name: 'International Client',
    role: 'Founder, SaaS Startup'
  },
  {
    quote: 'One of the most reliable engineers I have worked with. Communicates clearly, ships fast, and treats the product like his own.',
    name: 'Product Lead',
    role: 'E-commerce Platform'
  },
  {
    quote: 'From cloud setup to a polished UI, Manish handled every layer of our stack. The end result felt premium and performed flawlessly.',
    name: 'CTO',
    role: 'AI Startup'
  }
]

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label">Kind words</span>
          <h2 className="heading-lg mt-5">
            What clients <span className="text-gradient-static">say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="spotlight-card glass rounded-3xl p-7 flex flex-col"
            >
              <Quote size={24} style={{ color: 'var(--c-violet)' }} />
              <blockquote className="mt-4 text-ink-200 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <div className="flex gap-0.5 mt-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <figcaption className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full font-display font-bold text-sm flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))' }}
                >
                  {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm">{t.name}</div>
                  <div className="text-[11px] text-ink-400">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
