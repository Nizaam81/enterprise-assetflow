import { Loader2 } from 'lucide-react'

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const base =
    'relative w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-[15px] tracking-wide transition-all duration-300 active:translate-y-px active:scale-[0.995] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0'

  const variants = {
    primary:
      'bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 shadow-glow-emerald hover:shadow-glow-emerald-lg hover:-translate-y-0.5',
    secondary:
      'bg-white/5 border border-white/15 text-white hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {loading && (
        <span className="inline-flex animate-spin" aria-hidden="true">
          <Loader2 size={18} strokeWidth={2.25} />
        </span>
      )}
      <span className={loading ? 'opacity-85' : ''}>{children}</span>
    </button>
  )
}