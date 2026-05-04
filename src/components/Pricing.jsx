import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 499,
    yearly: 4990,
    desc: 'For founders validating an idea or shipping a focused MVP.',
    features: [
      'Landing page or marketing site',
      'Mobile-first, fully responsive',
      'CMS for self-editing content',
      'Basic SEO + analytics',
      '2 rounds of revisions',
      'Delivery in 1-2 weeks'
    ],
    cta: 'Start small',
    highlight: false
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 1499,
    yearly: 14990,
    desc: 'Most picked. End-to-end product build for serious launches.',
    features: [
      'Full-stack web application',
      'Auth, payments &amp; database',
      'Custom dashboard / admin',
      'CI/CD &amp; cloud deployment',
      'Performance + accessibility',
      'Delivery in 3-5 weeks',
      '30 days post-launch support'
    ],
    cta: 'Go premium',
    highlight: true
  },
  {
    id: 'custom',
    name: 'Custom',
    monthly: null,
    yearly: null,
    desc: 'Multi-month engagements, complex platforms or AI-heavy work.',
    features: [
      'Discovery + technical strategy',
      'Custom architecture &amp; team',
      'AI / ML integrations',
      'Long-term retainer available',
      'Dedicated Slack channel',
      'White-glove handover'
    ],
    cta: 'Talk to me',
    highlight: false
  }
]

export default function Pricing() {
  const [period, setPeriod] = useState('monthly')

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-label">
            <Sparkles size={14} style={{ color: 'var(--c-cyan)' }} />
            Pricing
          </span>
          <h2 className="heading-lg mt-5">Simple, <span className="text-gradient-static">transparent</span> packages</h2>
          <p className="body-lg mt-5">Pick a starting point — every engagement is tailored to scope after a quick discovery call.</p>

          <div className="mt-8 inline-flex glass rounded-full p-1 text-sm">
            {['monthly', 'yearly'].map((p) => (
              <button
                key={p}
                data-cursor="link"
                onClick={() => setPeriod(p)}
                className={`relative px-5 py-2 rounded-full transition-all ${period === p ? 'text-white' : 'text-ink-400 hover:text-white'}`}
              >
                {period === p && (
                  <motion.span
                    layoutId="period-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--c-violet), var(--c-cyan))' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  />
                )}
                <span className="relative capitalize">
                  {p}
                  {p === 'yearly' && <span className="ml-2 text-[10px] opacity-80">— save 17%</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative spotlight-card glass rounded-3xl p-7 flex flex-col ${t.highlight ? 'lg:scale-[1.03]' : ''}`}
              style={t.highlight ? { borderColor: 'color-mix(in oklab, var(--c-violet) 40%, transparent)' } : {}}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white font-semibold"
                      style={{ background: 'linear-gradient(90deg, var(--c-violet), var(--c-cyan))' }}>
                  Most popular
                </span>
              )}

              <div>
                <h3 className="font-display font-semibold text-xl">{t.name}</h3>
                <p className="text-sm text-ink-200 mt-2 min-h-[2.5em]">{t.desc}</p>
              </div>

              <div className="mt-6 flex items-end gap-1">
                {t.monthly == null ? (
                  <span className="font-display text-4xl font-bold">Custom</span>
                ) : (
                  <>
                    <span className="font-display text-5xl font-bold text-gradient-static">
                      ${period === 'monthly' ? t.monthly : t.yearly}
                    </span>
                    <span className="text-sm text-ink-400 mb-1.5">/{period === 'monthly' ? 'project' : 'year'}</span>
                  </>
                )}
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink-200">
                    <Check size={15} className="mt-0.5 text-emerald-400 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                data-cursor="link"
                className={`mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all
                            ${t.highlight ? 'btn-primary' : 'btn-secondary'}`}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
