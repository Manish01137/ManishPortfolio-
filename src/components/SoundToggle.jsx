import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('sound') === 'on'
    setOn(saved)
  }, [])

  useEffect(() => {
    if (!on) return
    const ensureCtx = () => {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext
        if (Ctx) ctxRef.current = new Ctx()
      }
      return ctxRef.current
    }
    const blip = (freq = 480, dur = 0.05, type = 'sine') => {
      const ctx = ensureCtx()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.005)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + dur + 0.02)
    }
    const onClick = (e) => {
      if (e.target.closest('a, button, [role="button"]')) blip(620, 0.04, 'triangle')
    }
    const onHover = (e) => {
      if (e.target.closest('[data-cursor="card"], [data-cursor="link"]')) blip(280, 0.025, 'sine')
    }
    document.addEventListener('click', onClick)
    document.addEventListener('mouseover', onHover)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseover', onHover)
    }
  }, [on])

  const toggle = () => {
    setOn((v) => {
      const next = !v
      localStorage.setItem('sound', next ? 'on' : 'off')
      return next
    })
  }

  return (
    <button
      aria-label={on ? 'Mute UI sounds' : 'Enable UI sounds'}
      data-cursor="link"
      onClick={toggle}
      className="fixed bottom-6 right-[5.5rem] z-[55] h-12 w-12 rounded-full glass shadow-2xl flex items-center justify-center hover:bg-white/[0.07] transition"
    >
      {on ? <Volume2 size={16} /> : <VolumeX size={16} className="text-ink-400" />}
    </button>
  )
}
