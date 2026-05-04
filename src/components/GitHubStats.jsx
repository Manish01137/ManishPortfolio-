import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, GitCommit, Star, GitBranch, Activity, Flame } from 'lucide-react'

const USERNAME = 'Manish01137'
const WEEKS = 22 // ~5 months
const DAYS  = WEEKS * 7

export default function GitHubStats() {
  const [user, setUser] = useState(null)
  const [days, setDays] = useState([])      // [{date,count,level}]
  const [totalRange, setTotalRange] = useState(0)
  const [totalAllTime, setTotalAllTime] = useState(null)
  const [streak, setStreak] = useState(0)
  const [longest, setLongest] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const [uRes, cRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`)
        ])
        const u = uRes.ok ? await uRes.json() : null
        const c = cRes.ok ? await cRes.json() : null
        if (cancelled) return

        if (u) setUser(u)

        if (c?.contributions) {
          // API returns multi-year data in non-chronological order (2026 chunk first,
          // then 2025, 2024, 2023). Sort ascending and clip future dates before slicing.
          const today = new Date().toISOString().slice(0, 10)
          const sorted = c.contributions
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .filter((x) => x.date <= today)

          const last = sorted.slice(-DAYS)
          setDays(last)
          setTotalRange(last.reduce((s, d) => s + d.count, 0))

          const grand = Object.values(c.total || {}).reduce((s, n) => s + n, 0)
          setTotalAllTime(grand)

          // current streak — count back from today through the chronologically-sorted array
          let cur = 0
          for (let i = sorted.length - 1; i >= 0; i--) {
            if (sorted[i].count > 0) cur++
            else break
          }
          setStreak(cur)

          // longest streak in the displayed range
          let best = 0, run = 0
          for (const d of last) {
            if (d.count > 0) { run++; if (run > best) best = run }
            else run = 0
          }
          setLongest(best)
        }
      } catch {/* keep skeleton */}
      finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const colorForLevel = (lvl) => {
    if (lvl === 0) return 'bg-white/[0.05]'
    if (lvl === 1) return 'bg-[color:color-mix(in_oklab,var(--c-violet)_30%,transparent)]'
    if (lvl === 2) return 'bg-[color:color-mix(in_oklab,var(--c-violet)_55%,transparent)]'
    if (lvl === 3) return 'bg-[color:color-mix(in_oklab,var(--c-cyan)_70%,transparent)]'
    return 'bg-[color:color-mix(in_oklab,var(--c-pink)_80%,transparent)]'
  }

  const startDate = days[0]?.date
  const endDate   = days[days.length - 1]?.date
  const fmt = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'

  // top languages — heuristic placeholder; GitHub does not expose per-user language totals without scraping
  const languages = ['JavaScript', 'TypeScript', 'React', 'Node.js']

  const stats = [
    { icon: GitBranch, label: 'Public repos',       value: user?.public_repos ?? '—' },
    { icon: GitCommit, label: 'Last 5 months',      value: loading ? '—' : `${totalRange}` },
    { icon: Flame,     label: 'Current streak',     value: loading ? '—' : `${streak} d` },
    { icon: Activity,  label: 'Longest in range',   value: loading ? '—' : `${longest} d` }
  ]

  return (
    <section className="relative py-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="spotlight-card glass rounded-3xl p-7 sm:p-10 grid lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl glass flex items-center justify-center">
                <Github size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-400">GitHub</div>
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="font-display font-semibold hover:text-gradient-static transition"
                >
                  @{USERNAME}
                </a>
              </div>
            </div>

            <h3 className="heading-md text-2xl mt-5">
              I ship <span className="text-gradient-static">every single day.</span>
            </h3>
            <p className="body-lg mt-3">
              Open source, client work and side projects all flow through here.
              {totalAllTime != null && (
                <> Total contributions tracked: <span className="text-white font-semibold">{totalAllTime.toLocaleString()}+</span>.</>
              )}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="rounded-2xl border border-white/10 p-4">
                    <Icon size={14} className="text-ink-400" />
                    <div className="font-display text-2xl font-bold text-gradient-static mt-2">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-400 mt-1">{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between mb-3">
              <div className="text-xs text-ink-400">
                {loading ? 'Loading contributions...' : `${fmt(startDate)} → ${fmt(endDate)}`}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-ink-400">
                {WEEKS} weeks · daily
              </div>
            </div>

            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {Array.from({ length: DAYS }).map((_, i) => {
                const d = days[i]
                const col = Math.floor(i / 7)
                return (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: col * 0.012, duration: 0.25 }}
                    className={`block aspect-square w-full rounded-sm cursor-help ${d ? colorForLevel(d.level) : 'bg-white/[0.02]'}`}
                    title={d ? `${d.date} — ${d.count} contribution${d.count === 1 ? '' : 's'}` : ''}
                  />
                )
              })}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-ink-400">
                Less
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <span key={lvl} className={`h-3 w-3 rounded-sm ${colorForLevel(lvl)}`} />
                ))}
                More
              </div>
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="text-xs text-ink-200 hover:text-white inline-flex items-center gap-1.5"
              >
                View on GitHub <Github size={12} />
              </a>
            </div>

            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-widest text-ink-400 mb-2">Languages I work with</div>
              <div className="flex flex-wrap gap-2">
                {languages.map((l, i) => (
                  <span key={l} className="text-xs glass rounded-full px-3 py-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ['var(--c-violet)','var(--c-cyan)','var(--c-pink)','var(--c-gold)'][i % 4] }} />
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
