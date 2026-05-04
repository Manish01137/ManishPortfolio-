import { motion } from 'framer-motion'

export default function SplitText({ text, className = '', stagger = 0.025, delay = 0, as = 'span' }) {
  const Tag = motion[as] || motion.span
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" style={{ marginRight: '0.25em' }}>
          {Array.from(w).map((ch, ci) => (
            <motion.span
              key={ci}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: delay + (wi * 0.05) + (ci * stagger),
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block"
              style={{ overflow: 'hidden' }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
