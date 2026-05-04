import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg-900"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span className="font-display font-extrabold text-6xl sm:text-8xl tracking-tighter text-gradient">
              Manish.
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
              className="origin-left mt-3 h-px bg-gradient-to-r from-brand-violet via-brand-cyan to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-10 left-0 right-0 text-center text-xs uppercase tracking-[0.4em] text-ink-400"
          >
            Loading the experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
