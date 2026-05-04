import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-bg-900/70 backdrop-blur-xl border-b border-white/[0.06]'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan font-display font-extrabold text-sm">
            MB
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan opacity-0 blur-md group-hover:opacity-60 transition" />
          </span>
          <span className="hidden sm:block font-display font-semibold tracking-tight">
            Manish<span className="text-gradient-static">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 text-sm text-ink-200 rounded-full hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-xs">
          Hire Me
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full glass"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <ul className="container-page py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-ink-200 hover:bg-white/[0.05] hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
