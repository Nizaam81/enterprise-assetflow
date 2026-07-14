import { Link } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

/*
  AuthLayout supports two modes:
  - Centered (default):  used for Signup and other single-column pages
  - Split    (sidebar):  used for Login — shows a left branding panel on lg+
*/
export default function AuthLayout({ children, sidebar }) {
  return (
    <div className="relative min-h-screen flex overflow-hidden auth-mesh">

      {/* ── Atmospheric background (shared across both panels) ── */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div
          className="orb-violet fixed w-[700px] h-[700px] rounded-full -top-64 -left-48 animate-mesh-1"
          style={{ willChange: 'transform' }}
        />
        <div
          className="orb-indigo fixed w-[600px] h-[600px] rounded-full -bottom-48 -right-36 animate-mesh-2"
          style={{ willChange: 'transform' }}
        />
        <div
          className="orb-purple fixed w-[380px] h-[380px] rounded-full top-1/2 left-1/4 -translate-y-1/2 animate-mesh-3"
          style={{ willChange: 'transform' }}
        />
        <div
          className="fixed inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 100% 80% at 30% 50%, black 10%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 100% 80% at 30% 50%, black 10%, transparent 85%)',
          }}
        />
      </div>

      {sidebar ? (
        /* ══ SPLIT LAYOUT ══════════════════════════════════════════ */
        <>
          {/* Left branding panel */}
          <div className="hidden lg:flex relative z-10 flex-col justify-between w-[52%] xl:w-[55%] px-14 xl:px-20 py-12">
            {sidebar}
          </div>

          {/* Vertical separator */}
          <div
            className="hidden lg:block relative z-10 w-px flex-shrink-0 self-stretch my-0"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent 100%)' }}
          />

          {/* Right form panel */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-10">
            {/* Mobile logo (hidden on lg+) */}
            <div className="lg:hidden mb-10 animate-fade-up w-full max-w-[400px]" style={{ animationDelay: '0ms' }}>
              <BrandLogo />
            </div>

            <div
              className="w-full max-w-[400px] animate-fade-up"
              style={{ animationDelay: '60ms' }}
            >
              {children}
            </div>

            <FooterLinks className="mt-10 animate-fade-up" style={{ animationDelay: '120ms' }} />
          </div>
        </>
      ) : (
        /* ══ CENTERED LAYOUT ═══════════════════════════════════════ */
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="mb-10 animate-fade-up" style={{ animationDelay: '0ms' }}>
            <BrandLogo />
          </div>

          <div
            className="w-full max-w-[400px] animate-fade-up"
            style={{ animationDelay: '80ms' }}
          >
            {children}
          </div>

          <FooterLinks className="mt-10 animate-fade-up" style={{ animationDelay: '160ms' }} />
        </div>
      )}
    </div>
  )
}

/* ── Shared subcomponents ─────────────────────────────────────── */

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group w-fit" aria-label="AssetFlow home">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/25 text-violet-400 transition-all duration-300 group-hover:bg-violet-600/28 group-hover:border-violet-400/38">
        <LayoutGrid size={17} strokeWidth={2} />
      </span>
      <span className="font-display text-[21px] font-bold tracking-[-0.01em] text-white">
        Asset<span className="brand-gradient">Flow</span>
      </span>
    </Link>
  )
}

function FooterLinks({ className = '', style }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} style={style}>
      {['Privacy', 'Terms', 'Help'].map((label, i, arr) => (
        <span key={label} className="flex items-center gap-1">
          <a
            href={`#${label.toLowerCase()}`}
            className="px-1.5 py-0.5 text-[12px] text-slate-700 hover:text-slate-500 transition-colors duration-200"
          >
            {label}
          </a>
          {i < arr.length - 1 && (
            <span className="text-slate-800 text-[10px] select-none">·</span>
          )}
        </span>
      ))}
    </div>
  )
}