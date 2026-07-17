import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function InputField({
  label,
  type = 'text',
  icon: Icon,
  error,
  hint,
  id,
  className = '',
  ...rest
}) {
  const autoId = useId()
  const inputId = id || autoId
  const isPassword = type === 'password'
  const [revealed, setRevealed] = useState(false)
  const resolvedType = isPassword ? (revealed ? 'text' : 'password') : type

  const hasLeft = !!Icon
  const hasRight = isPassword

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[13px] font-medium text-slate-400 select-none"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={resolvedType}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined
          }
          className={[
            'auth-input',
            !hasLeft && 'no-left-icon',
            !hasRight && 'no-right-icon',
            error && 'has-error',
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />

        {/* Left icon */}
        {Icon && (
          <span className="pointer-events-none absolute left-0 top-0 h-full w-11 flex items-center justify-center text-slate-600">
            <Icon size={16} strokeWidth={1.75} />
          </span>
        )}

        {/* Right: password toggle */}
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-slate-600 hover:text-slate-400 transition-colors duration-150"
          >
            {revealed ? (
              <EyeOff size={15} strokeWidth={1.75} />
            ) : (
              <Eye size={15} strokeWidth={1.75} />
            )}
          </button>
        )}
      </div>

      {/* Error or hint text */}
      {error ? (
        <p id={`${inputId}-err`} role="alert" className="text-[12px] text-red-400 leading-tight">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-[12px] text-slate-600 leading-tight">
          {hint}
        </p>
      ) : null}
    </div>
  )
}