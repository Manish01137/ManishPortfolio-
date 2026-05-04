import { SOCIALS } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-20">
      <div className="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan font-display font-extrabold text-sm">
            MB
          </span>
          <span className="text-sm text-ink-400">
            © {new Date().getFullYear()} Manish Beniwal. Crafted with care.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full glass glass-hover flex items-center justify-center text-ink-200 hover:text-white transition"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
