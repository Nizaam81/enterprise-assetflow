import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function InputField({
  label,
  type = 'text',
  icon: Icon,
  error,
  hint,
  id,
  ...rest
}) {
  const autoId = useId()
  const inputId = id || autoId
  const isPassword = type === 'password'
  const [revealed, setRevealed] = useState(false)
  const resolvedType = isPassword ? (revealed ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-300 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={inputId}
          type={resolvedType}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`peer w-full h-12 rounded-xl border text-[15px] text-slate-100 placeholder:text-slate-500
            bg-white/[0.03] transition-all duration-300 outline-none
            hover:border-white/20
            focus:bg-white/[0.05] focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            ${Icon ? 'pl-11' : 'pl-4'} ${isPassword ? 'pr-11' : 'pr-4'}
            ${error ? 'border-red-400/50 bg-red-500/[0.06] focus:ring-red-400' : 'border-white/10'}
          `}
          {...rest}
        />

        {Icon && (
          <span className="absolute left-3.5 flex text-slate-500 pointer-events-none peer-focus:text-emerald-400 transition-colors duration-300">
            <Icon size={17} strokeWidth={1.8} />
          </span>
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            className="absolute right-3 flex items-center justify-center w-7 h-7 rounded-md text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors duration-200"
          >
            {revealed ? <EyeOff size={17} strokeWidth={1.8} /> : <Eye size={17} strokeWidth={1.8} />}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
}