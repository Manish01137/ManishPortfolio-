import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircle, Send, Check, AlertCircle, Calendar } from 'lucide-react'

// Sign up at https://formspree.io and paste the endpoint here.
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'
// Sign up at https://calendly.com and paste your link below.
const CALENDLY_URL  = 'https://calendly.com/your-username/15min'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [tab, setTab] = useState('message')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    if (!FORMSPREE_URL.includes('YOUR_FORM_ID')) {
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST', body: data, headers: { Accept: 'application/json' }
        })
        if (res.ok) { setStatus('success'); form.reset() }
        else setStatus('error')
      } catch { setStatus('error') }
    } else {
      setTimeout(() => { setStatus('success'); form.reset() }, 700)
    }
    setTimeout(() => setStatus('idle'), 4500)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[80%] rounded-full blur-[120px]"
             style={{ background: 'color-mix(in oklab, var(--c-violet) 20%, transparent)' }} />
      </div>

      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="section-label">Get in touch</span>
            <h2 className="heading-lg mt-5">Have a project in <span className="text-gradient-static">mind?</span></h2>
            <p className="body-lg mt-5">
              I&apos;m taking on a limited number of new projects. Send a message, or jump straight to a 15-min discovery call.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@manishbeniwal.dev' },
                { icon: MessageCircle, label: 'Available', value: 'Mon — Sat · 10am to 8pm IST' },
                { icon: MapPin, label: 'Based in', value: 'India · Working globally' }
              ].map((c) => {
                const Icon = c.icon
                return (
                  <div key={c.label} className="flex items-center gap-4 glass rounded-2xl px-5 py-4">
                    <div className="h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center"
                         style={{ background: 'linear-gradient(135deg, color-mix(in oklab, var(--c-violet) 30%, transparent), color-mix(in oklab, var(--c-cyan) 20%, transparent))' }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-ink-400">{c.label}</div>
                      <div className="text-sm">{c.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7 spotlight-card glass rounded-3xl p-7 sm:p-10"
          >
            <div className="inline-flex glass rounded-full p-1 text-sm">
              {[
                { id: 'message', label: 'Send a message', icon: Send },
                { id: 'call', label: 'Book a call', icon: Calendar }
              ].map((t) => {
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    data-cursor="link"
                    onClick={() => setTab(t.id)}
                    className={`relative px-4 py-2 rounded-full transition flex items-center gap-2 ${tab === t.id ? 'text-white' : 'text-ink-400 hover:text-white'}`}
                  >
                    {tab === t.id && (
                      <motion.span
                        layoutId="contact-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--c-violet), var(--c-cyan))' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      />
                    )}
                    <span className="relative inline-flex items-center gap-2">
                      <Icon size={13} /> {t.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {tab === 'message' ? (
              <form onSubmit={onSubmit} className="mt-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your name" name="name" placeholder="Jane Doe" />
                  <Field label="Email" name="email" placeholder="jane@company.com" type="email" />
                </div>
                <div className="mt-5">
                  <Field label="Subject" name="subject" placeholder="New project enquiry" />
                </div>
                <div className="mt-5">
                  <label className="block text-xs uppercase tracking-widest text-ink-400 mb-2">Message</label>
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="Tell me about your project, timeline and budget..."
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm placeholder:text-ink-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition resize-none"
                  />
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
                    {status === 'sending' ? 'Sending...' : status === 'success' ? <>Message sent <Check size={16} /></> : <>Send Message <Send size={16} /></>}
                  </button>
                  {status === 'success' && (
                    <span className="inline-flex items-center gap-2 text-sm text-emerald-400">
                      <Check size={14} /> Thanks — I&apos;ll be in touch within 24h.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="inline-flex items-center gap-2 text-sm text-rose-400">
                      <AlertCircle size={14} /> Something went wrong. Email me directly.
                    </span>
                  )}
                </div>
              </form>
            ) : (
              <div className="mt-6">
                <div className="rounded-2xl border border-white/10 overflow-hidden h-[520px] bg-bg-800">
                  {!CALENDLY_URL.includes('your-username') ? (
                    <iframe
                      src={CALENDLY_URL}
                      title="Book a call"
                      className="w-full h-full"
                      frameBorder="0"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <Calendar size={28} className="text-ink-400" />
                      <h3 className="heading-md text-xl mt-4">Calendly embed slot</h3>
                      <p className="text-sm text-ink-200 mt-2 max-w-sm">
                        Sign up at <a className="text-gradient-static underline" href="https://calendly.com" target="_blank" rel="noreferrer">calendly.com</a> and paste your link in <code className="text-ink-200">CALENDLY_URL</code> at the top of <code className="text-ink-200">Contact.jsx</code>.
                      </p>
                      <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary mt-6">
                        Open scheduler <Calendar size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest text-ink-400 mb-2">{label}</label>
      <input
        id={name} name={name} type={type} placeholder={placeholder} required
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-sm placeholder:text-ink-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition"
      />
    </div>
  )
}
