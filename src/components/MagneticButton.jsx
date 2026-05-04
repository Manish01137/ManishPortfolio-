import { useRef } from 'react'

export default function MagneticButton({ as: Tag = 'a', strength = 0.4, className = '', children, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0,0)'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
