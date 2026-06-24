import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ArrowRight, Command, CornerDownLeft,
  Home, User, Layers, FolderGit2, Mail, Download,
  Github, Palette, ExternalLink
} from 'lucide-react'
import { NAV_LINKS, PROJECTS } from '../data/content'

const EMAIL = 'hello@manishbeniwal.dev'
const GITHUB = 'https://github.com/Manish01137'
const THEMES = ['cosmic', 'sunset', 'ocean', 'forest', 'mono']

const navIcon = { About: User, Services: Layers, Skills: Command, Projects: FolderGit2, Process: ArrowRight, Contact: Mail }

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const go = (hash) => () => {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const actions = useMemo(() => {
    const nav = NAV_LINKS.map((l) => ({
      id: `nav-${l.href}`, group: 'Navigate', label: l.label,
      hint: 'Jump to section', icon: navIcon[l.label] || Home, run: go(l.href)
    }))
    const projects = PROJECTS.map((p) => ({
      id: `proj-${p.title}`, group: 'Projects', label: p.title,
      hint: p.category, icon: FolderGit2,
      run: () => window.open(p.url, '_blank', 'noopener')
    }))
    const utils = [
      { id: 'top', group: 'Navigate', label: 'Back to top', hint: 'Hero', icon: Home, run: go('#top') },
      { id: 'email', group: 'Actions', label: 'Copy email', hint: EMAIL, icon: Mail,
        run: () => navigator.clipboard?.writeText(EMAIL) },
      { id: 'mailto', group: 'Actions', label: 'Send an email', hint: 'Opens mail client', icon: Mail,
        run: () => { window.location.href = `mailto:${EMAIL}` } },
      { id: 'resume', group: 'Actions', label: 'Download résumé', hint: 'PDF', icon: Download,
        run: () => { const a = document.createElement('a'); a.href = '/resume.pdf'; a.download = ''; a.click() } },
      { id: 'github', group: 'Actions', label: 'Open GitHub', hint: GITHUB.replace('https://', ''), icon: Github,
        run: () => window.open(GITHUB, '_blank', 'noopener') },
      { id: 'theme', group: 'Actions', label: 'Cycle theme', hint: 'Switch color palette', icon: Palette,
        run: () => {
          const cur = document.documentElement.getAttribute('data-theme') || 'cosmic'
          const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length]
          document.documentElement.setAttribute('data-theme', next)
          localStorage.setItem('theme', next)
        } }
    ]
    return [...nav, ...projects, ...utils]
  }, [])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return actions
    return actions.filter((a) =>
      (a.label + ' ' + a.hint + ' ' + a.group).toLowerCase().includes(term))
  }, [q, actions])

  // global ⌘K / Ctrl+K toggle + "/" to open
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setOpen((v) => !v)
      } else if (e.key === '/' && !open && !/input|textarea/i.test(e.target.tagName)) {
        e.preventDefault(); setOpen(true)
      } else if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 40) }
  }, [open])

  useEffect(() => { setActive(0) }, [q])

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); fire(results[active]) }
  }

  const fire = (a) => { if (!a) return; setOpen(false); setTimeout(() => a.run(), 120) }

  useEffect(() => {
    const node = listRef.current?.querySelector(`[data-idx="${active}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <>
      {/* hint chip */}
      <button
        onClick={() => setOpen(true)}
        data-cursor="link"
        aria-label="Open command palette"
        className="fixed bottom-6 left-6 z-[55] hidden sm:inline-flex items-center gap-2 glass rounded-full pl-3 pr-2.5 py-2 text-xs text-ink-200 shadow-2xl hover:bg-white/[0.07] transition"
      >
        <Search size={13} /> Quick nav
        <kbd className="ml-1 inline-flex items-center gap-0.5 rounded-md border border-white/15 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-ink-200">
          <Command size={10} /> K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-start justify-center p-4 pt-[12vh]"
            onKeyDown={onListKey}
          >
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-bg-900/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: -16, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl glass rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 border-b border-white/[0.08]">
                <Search size={16} className="text-ink-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search sections, projects, actions…"
                  className="w-full bg-transparent py-4 text-sm placeholder:text-ink-600 focus:outline-none"
                />
                <kbd className="text-[10px] text-ink-400 border border-white/10 rounded-md px-1.5 py-0.5">ESC</kbd>
              </div>

              <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
                {results.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-ink-400">No matches for “{q}”.</div>
                )}
                {results.map((a, i) => {
                  const Icon = a.icon
                  const first = i === 0 || results[i - 1].group !== a.group
                  return (
                    <div key={a.id}>
                      {first && (
                        <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-ink-400">{a.group}</div>
                      )}
                      <button
                        data-idx={i}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => fire(a)}
                        className={`w-full flex items-center gap-3 px-3 mx-2 rounded-xl py-2.5 text-left transition
                                    ${active === i ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'}`}
                        style={{ width: 'calc(100% - 1rem)' }}
                      >
                        <span className="h-8 w-8 rounded-lg glass flex items-center justify-center shrink-0">
                          <Icon size={14} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm">{a.label}</span>
                          <span className="block text-[11px] text-ink-400 truncate">{a.hint}</span>
                        </span>
                        {a.group === 'Projects'
                          ? <ExternalLink size={13} className="text-ink-400" />
                          : active === i && <CornerDownLeft size={13} className="text-ink-400" />}
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] text-[10px] text-ink-400">
                <span className="inline-flex items-center gap-1.5"><ArrowRight size={11} className="-rotate-90" /> navigate</span>
                <span className="inline-flex items-center gap-1.5"><CornerDownLeft size={11} /> select</span>
                <span className="inline-flex items-center gap-1.5"><Command size={11} /> K to toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
