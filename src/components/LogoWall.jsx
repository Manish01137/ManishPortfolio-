const LOGOS = [
  'StayliaDXB', 'Mershil Tech', 'Zevolution', 'Kedar Shakti',
  'JaldiRide', 'KVS Academy', 'Pawan Hardu', 'CarSpace',
  'Lifeline Health', 'Cricket Live'
]

export default function LogoWall() {
  const list = [...LOGOS, ...LOGOS]
  return (
    <section className="relative py-16 border-y border-white/[0.06]">
      <div className="container-page">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-ink-400">Trusted by clients across</span>
          <p className="text-sm text-ink-200 mt-2">USA · UK · UAE · Germany · India · Singapore</p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {list.map((name, i) => (
            <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition">
              <span className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center font-display font-bold text-xs"
                    style={{ background: 'linear-gradient(135deg, color-mix(in oklab, var(--c-violet) 25%, transparent), color-mix(in oklab, var(--c-cyan) 15%, transparent))' }}>
                {name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
