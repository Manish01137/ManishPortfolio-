import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const ITEMS = [
  {
    q: 'How long does a typical project take?',
    a: 'A landing page ships in 1-2 weeks. A full-stack MVP takes 3-5 weeks depending on scope. Larger platforms run 2-3 months. I share a clear timeline + milestones before we start.'
  },
  {
    q: 'How do you bill — fixed price or hourly?',
    a: 'Fixed price for well-scoped projects (most common). Weekly retainers for ongoing work or evolving products. I do not bill hourly — it incentivizes the wrong things.'
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, happy to sign mutual NDAs before any sensitive details are shared. I respect confidentiality and have worked under NDAs for multiple international clients.'
  },
  {
    q: 'Can you join an existing codebase / team?',
    a: 'Absolutely. I have onboarded into existing React, Next.js, Node.js and AWS codebases — picking up conventions quickly and shipping useful work in week one.'
  },
  {
    q: 'What does post-launch support look like?',
    a: 'Every project includes a 30-day support window for bug fixes and minor tweaks. Beyond that, I offer monthly maintenance retainers if you want me on standby.'
  },
  {
    q: 'Do you handle design, or do I need a designer?',
    a: 'I can take a Figma file and turn it into a polished, performant site. I can also design from scratch — my work leans modern, minimal and product-focused.'
  },
  {
    q: 'What time zones do you work across?',
    a: 'I am IST-based but routinely overlap with US Eastern and EU mornings. Async-first communication via Slack/Notion/Linear keeps things smooth across zones.'
  },
  {
    q: 'How do we get started?',
    a: 'Drop me a message via the contact form or book a 15-min discovery call. I respond within 24 hours and usually have a proposal ready within 48.'
  }
]

function Item({ item, i, open, setOpen }) {
  const isOpen = open === i
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04 }}
      className="border-b border-white/[0.06]"
    >
      <button
        data-cursor="link"
        onClick={() => setOpen(isOpen ? null : i)}
        className="w-full text-left py-5 flex items-center justify-between gap-6 group"
      >
        <span className={`font-display text-base sm:text-lg font-medium transition ${isOpen ? 'text-white' : 'text-ink-200 group-hover:text-white'}`}>
          {item.q}
        </span>
        <span
          className={`shrink-0 h-8 w-8 rounded-full glass flex items-center justify-center transition-transform ${isOpen ? 'rotate-45' : ''}`}
          style={isOpen ? { background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))', borderColor: 'transparent' } : {}}
        >
          <Plus size={14} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-sm text-ink-200 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container-page grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <span className="section-label">FAQ</span>
          <h2 className="heading-lg mt-5">Quick <span className="text-gradient-static">answers</span></h2>
          <p className="body-lg mt-5">Common questions from clients before we kick things off. If yours isn&apos;t here, just ask.</p>
          <a href="#contact" data-cursor="link" className="btn-secondary mt-6">Ask a question</a>
        </div>
        <div className="lg:col-span-8 spotlight-card glass rounded-3xl px-6 sm:px-8">
          {ITEMS.map((it, i) => (
            <Item key={i} item={it} i={i} open={open} setOpen={setOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
