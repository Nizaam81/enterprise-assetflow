import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'


export default function AuthLayout({ eyebrow, children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header />

      <main className="relative flex-1 flex items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16">
        {/* Ambient backdrop: soft glow blobs + a quiet blueprint grid */}
        <div className="absolute inset-0 z-0 bg-surface" aria-hidden="true">
          <span className="absolute -top-36 -left-32 w-[520px] h-[520px] rounded-full opacity-50 blur-[90px] bg-[radial-gradient(circle,theme(colors.emerald.500)_0%,transparent_70%)] animate-drift-a" />
          <span className="absolute -bottom-44 -right-36 w-[560px] h-[560px] rounded-full opacity-50 blur-[90px] bg-[radial-gradient(circle,theme(colors.indigo.500)_0%,transparent_70%)] animate-drift-b" />
          <span
            className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:28px_28px]
              [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_85%)]"
          />
        </div>

        {/* Frosted-glass auth card */}
        <div className="relative z-10 w-full max-w-[440px] rounded-2xl sm:rounded-[28px] border border-white/10 bg-white/[0.04] shadow-card backdrop-blur-2xl px-6 py-7 sm:px-8 sm:py-9 overflow-hidden">
          <span className="pointer-events-none absolute top-0 left-[-30%] h-0.5 w-[30%] bg-gradient-to-r from-transparent via-emerald-400 to-indigo-400 animate-scan" />

          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 mb-5 px-2.5 py-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
              {eyebrow}
            </span>
          )}

          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}