import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, Bot } from 'lucide-react'
import { SKILLS, SERVICES, PROJECTS } from '../data/content'

/*
  Portfolio assistant.
  By default this answers locally from the site's own content data — no API key,
  works offline, ships free. To upgrade to a real LLM, set VITE_AI_ENDPOINT to a
  serverless function that proxies the Claude API (keep the key server-side) and
  this widget will POST { question } to it and render the streamed answer.
*/
const AI_ENDPOINT = import.meta.env?.VITE_AI_ENDPOINT

const SUGGESTIONS = [
  'What can you build?',
  'Show me your best projects',
  'What tech do you use?',
  'Are you available for work?',
  'How do I contact you?'
]

const allSkills = SKILLS.flatMap((s) => s.items)

function localAnswer(qRaw) {
  const q = qRaw.toLowerCase()
  const has = (...w) => w.some((x) => q.includes(x))

  if (has('hi', 'hello', 'hey') && q.length < 12)
    return "Hey! 👋 I'm Manish's portfolio assistant. Ask me about his skills, projects, availability or how to get in touch."

  if (has('available', 'hire', 'work', 'freelance', 'open'))
    return 'Yes — Manish is currently available for freelance and full-time work. He takes on a limited number of projects at a time. Hit “Let’s Talk” or scroll to the Contact section to start a conversation.'

  if (has('contact', 'reach', 'email', 'talk', 'call', 'book'))
    return 'You can reach Manish via the Contact section — send a message or book a 15-min discovery call. Email: hello@manishbeniwal.dev.'

  if (has('price', 'cost', 'rate', 'budget', 'charge'))
    return 'Pricing depends on scope — projects are quoted after a quick discovery call. Check the Pricing section for typical packages, then book a call to get an exact estimate.'

  if (has('tech', 'stack', 'tools', 'language', 'framework')) {
    const top = allSkills.slice(0, 10).join(', ')
    return `Manish works across the full stack. Core tools include: ${top}, and more. Frontend (React/Next.js), backend (Node/Express, Mongo/Postgres) and cloud (AWS, Docker, CI/CD).`
  }

  if (has('skill', 'know', 'can you do', 'expert')) {
    return SKILLS.map((s) => `• ${s.category}: ${s.items.slice(0, 5).join(', ')}`).join('\n')
  }

  if (has('service', 'offer', 'build', 'make', 'develop')) {
    return 'Services:\n' + SERVICES.map((s) => `• ${s.title} — ${s.desc.split('.')[0]}.`).join('\n')
  }

  if (has('project', 'work', 'portfolio', 'best', 'example', 'built')) {
    const top = PROJECTS.slice(0, 4).map((p) => `• ${p.title} (${p.category})`).join('\n')
    return `Here are a few highlights — open any card on the Projects section for the full case study:\n${top}`
  }

  // match a specific project by name
  const proj = PROJECTS.find((p) => q.includes(p.title.toLowerCase().split(' ')[0]))
  if (proj)
    return `${proj.title} — ${proj.category}. ${proj.desc} Tech: ${proj.tags.join(', ')}. It’s live at ${proj.url}.`

  // match a specific skill
  const skill = allSkills.find((s) => q.includes(s.toLowerCase()))
  if (skill)
    return `Yes — ${skill} is part of Manish's toolkit. He's used it across client projects in production.`

  if (has('experience', 'years', 'background', 'who'))
    return 'Manish is a full-stack & cloud engineer with 1+ year of freelancing and 30+ shipped projects for international clients across hospitality, e-commerce, mobility, EdTech and D2C brands.'

  return "I can answer questions about Manish's skills, services, projects, availability and contact details. Try one of the suggestions, or ask something like “Do you know AWS?”"
}

export default function AskWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [msgs, setMsgs] = useState([
    { role: 'bot', text: "Hi! I'm Manish's assistant 🤖 Ask me anything about his work, skills or availability." }
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, open])

  const ask = async (text) => {
    const question = (text ?? input).trim()
    if (!question || busy) return
    setInput('')
    setMsgs((m) => [...m, { role: 'user', text: question }])
    setBusy(true)

    if (AI_ENDPOINT) {
      try {
        const res = await fetch(AI_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        })
        const data = await res.json()
        setMsgs((m) => [...m, { role: 'bot', text: data.answer || localAnswer(question) }])
      } catch {
        setMsgs((m) => [...m, { role: 'bot', text: localAnswer(question) }])
      } finally { setBusy(false) }
      return
    }

    // local mode — tiny delay so it feels conversational
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'bot', text: localAnswer(question) }])
      setBusy(false)
    }, 380)
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
        onClick={() => setOpen((v) => !v)}
        data-cursor="link"
        aria-label="Open portfolio assistant"
        className="fixed bottom-[4.75rem] left-6 z-[56] h-12 w-12 rounded-full shadow-2xl flex items-center justify-center text-white"
        style={{ background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))' }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={18} /></motion.span>
            : <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Sparkles size={18} /></motion.span>}
        </AnimatePresence>
        {!open && <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: 'var(--c-cyan)' }} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-36 left-6 z-[56] w-[min(22rem,calc(100vw-3rem))] glass rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'min(32rem, 70vh)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
              <span className="h-9 w-9 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))' }}>
                <Bot size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium leading-tight">Portfolio Assistant</div>
                <div className="text-[11px] text-ink-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {AI_ENDPOINT ? 'AI online' : 'Online'}
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-ink-400 hover:text-white transition"><X size={16} /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line leading-relaxed
                    ${m.role === 'user'
                      ? 'text-white rounded-br-md'
                      : 'glass text-ink-100 rounded-bl-md'}`}
                    style={m.role === 'user' ? { background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))' } : undefined}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="glass rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msgs.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => ask(s)}
                    className="text-[11px] glass rounded-full px-2.5 py-1 text-ink-200 hover:text-white hover:bg-white/[0.07] transition">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); ask() }}
              className="flex items-center gap-2 p-3 border-t border-white/[0.08]"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my work…"
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-2.5 text-sm placeholder:text-ink-600 focus:outline-none focus:border-white/30 transition"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send"
                className="h-9 w-9 rounded-full flex items-center justify-center text-white shrink-0 disabled:opacity-50 transition"
                style={{ background: 'linear-gradient(135deg, var(--c-violet), var(--c-cyan))' }}>
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
