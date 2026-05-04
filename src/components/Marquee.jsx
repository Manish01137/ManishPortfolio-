const ITEMS = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'AWS',
  'MongoDB', 'PostgreSQL', 'Tailwind', 'Docker', 'Express',
  'Framer Motion', 'GraphQL', 'Stripe', 'Vercel'
]

export default function Marquee() {
  const list = [...ITEMS, ...ITEMS]
  return (
    <section className="relative py-10 border-y border-white/[0.06] bg-white/[0.015]">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {list.map((item, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-3xl font-semibold text-ink-400/70 hover:text-gradient-static transition"
            >
              {item} <span className="mx-6 text-brand-violet/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
