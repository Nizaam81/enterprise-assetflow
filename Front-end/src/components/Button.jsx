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
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={[
        'relative w-full h-12 inline-flex items-center justify-center gap-2.5 rounded-xl',
        'text-[14.5px] font-semibold tracking-[-0.01em]',
        'transition-all duration-200 select-none overflow-hidden',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'active:scale-[0.98]',
        variant === 'primary'
          ? 'btn-primary-gradient text-white shadow-btn-violet hover:shadow-btn-violet-hover hover:-translate-y-px'
          : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/16 hover:-translate-y-px',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {/* Shimmer sweep on hover (primary only) */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          style={{ transition: 'none' }}
          aria-hidden="true"
        />
      )}

      {loading ? (
        <>
          <Loader2 size={16} strokeWidth={2.5} className="animate-spin shrink-0" />
          <span className="opacity-75">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}