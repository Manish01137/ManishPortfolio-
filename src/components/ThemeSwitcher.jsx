import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check } from 'lucide-react'

const THEMES = [
  { id: 'cosmic', label: 'Cosmic', dots: ['#7C3AED','#06B6D4','#EC4899'] },
  { id: 'sunset', label: 'Sunset', dots: ['#EC4899','#F97316','#FBBF24'] },
  { id: 'ocean',  label: 'Ocean',  dots: ['#0EA5E9','#14B8A6','#22D3EE'] },
  { id: 'forest', label: 'Forest', dots: ['#10B981','#84CC16','#F59E0B'] },
  { id: 'mono',   label: 'Mono',   dots: ['#FFFFFF','#A0A0B0','#FFFFFF'] }
]

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('cosmic')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'cosmic'
    setActive(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const apply = (id) => {
    setActive(id)
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem('theme', id)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[55]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-14 right-0 glass rounded-2xl p-2 min-w-[180px] shadow-2xl"
          >
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink-400">Theme</div>
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => apply(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                            hover:bg-white/[0.05] ${active === t.id ? 'bg-white/[0.04]' : ''}`}
              >
                <span className="flex -space-x-1">
                  {t.dots.map((c, i) => (
                    <span key={i} className="h-3.5 w-3.5 rounded-full border border-white/20" style={{ background: c }} />
                  ))}
                </span>
                <span className="flex-1 text-left">{t.label}</span>
                {active === t.id && <Check size={14} className="text-emerald-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        aria-label="Theme switcher"
        data-cursor="link"
        onClick={() => setOpen((v) => !v)}
        className="h-12 w-12 rounded-full glass shadow-2xl flex items-center justify-center hover:bg-white/[0.07] transition"
      >
        <Palette size={16} />
      </button>
    </div>
  )
}
