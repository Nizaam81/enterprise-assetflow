import { Boxes, LifeBuoy } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 sm:h-[72px] flex items-center backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-white/15 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 text-emerald-400"
            aria-hidden="true"
          >
            <Boxes size={20} strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg sm:text-xl font-semibold tracking-tight text-white">
            Asset<span className="text-emerald-400">Flow</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-6">
          <span
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[11px] text-slate-400 tracking-wide"
            title="System status"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.16)]" />
            All systems operational
          </span>
          
          <a
            href="#support"
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-200"
          >
            <LifeBuoy size={16} strokeWidth={2} />
            <span className="hidden xs:inline sm:inline">Help</span>
          </a>
        </div>
      </div>
    </header>
  )
}
