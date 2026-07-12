import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, KeyRound, ArrowLeft } from 'lucide-react'
import AuthLayout from '../../Layout/AuthLayout.jsx'
import Button from '../../components/Button.jsx'

const CODE_LENGTH = 6
const RESEND_SECONDS = 30

export default function OTPVerification({
  flowType = 'signup',
  destination,
  onVerify,
  onResend,
  backTo = flowType === 'signup' ? '/signup' : '/login',
}) {
  const navigate = useNavigate()
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const [mounted, setMounted] = useState(false)
  const inputRefs = useRef([])

  const copy =
    flowType === 'reset'
      ? {
          eyebrowIcon: <KeyRound size={12} strokeWidth={2.5} />,
          eyebrow: 'Password reset',
          title: 'Reset Password Verification',
          body: 'Enter the 6-digit code sent to your email to authorize the password reset.',
        }
      : {
          eyebrowIcon: <Mail size={12} strokeWidth={2.5} />,
          eyebrow: 'Verify your email',
          title: 'Verify your email',
          body: "We've sent a 6-digit code to your email to activate your account.",
        }

  // Mount animation trigger
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  // Focus first box on load
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [secondsLeft])

  const formattedTime = `00:${String(secondsLeft).padStart(2, '0')}`

  const focusInput = (index) => {
    const el = inputRefs.current[index]
    if (el) el.focus()
  }

  const setDigitAt = (index, value) => {
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleChange = (index) => (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) {
      setDigitAt(index, '')
      return
    }
    // Only the last typed character occupies this box.
    const char = raw.slice(-1)
    setDigitAt(index, char)
    setError('')
    if (index < CODE_LENGTH - 1) focusInput(index + 1)
  }

  const handleKeyDown = (index) => (e) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        // Let default clear the current box; no navigation needed.
        return
      }
      e.preventDefault()
      if (index > 0) {
        setDigitAt(index - 1, '')
        focusInput(index - 1)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      e.preventDefault()
      focusInput(index + 1)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!pasted) return
    const next = Array(CODE_LENGTH).fill('')
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    setError('')
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1)
    focusInput(focusIndex)
  }

  const code = digits.join('')
  const isComplete = code.length === CODE_LENGTH

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isComplete) {
      setError('Enter all 6 digits.')
      return
    }
    setError('')
    setVerifying(true)
    try {
      if (onVerify) {
        await onVerify(code)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1400))
        navigate(flowType === 'reset' ? '/reset-password' : '/login')
      }
    } catch (err) {
      setError(err?.message || 'That code didn\u2019t work. Check it and try again.')
      setDigits(Array(CODE_LENGTH).fill(''))
      focusInput(0)
    } finally {
      setVerifying(false)
    }
  }

  const handleResend = useCallback(async () => {
    if (secondsLeft > 0 || resending) return
    setResending(true)
    setError('')
    try {
      if (onResend) {
        await onResend()
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800))
      }
      setDigits(Array(CODE_LENGTH).fill(''))
      setSecondsLeft(RESEND_SECONDS)
      focusInput(0)
    } catch (err) {
      setError(err?.message || 'Couldn\u2019t resend the code. Try again shortly.')
    } finally {
      setResending(false)
    }
  }, [secondsLeft, resending, onResend])

  return (
    <AuthLayout eyebrow={<>{copy.eyebrowIcon}{copy.eyebrow}</>}>
      <h1 className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-white mb-1.5">
        {copy.title}
      </h1>
      <p className="text-[15px] text-slate-400 leading-relaxed mb-1">{copy.body}</p>
      {destination && (
        <p className="text-[15px] text-slate-200 font-medium mb-6 break-all">{destination}</p>
      )}
      {!destination && <div className="mb-6" />}

      <form onSubmit={handleSubmit} noValidate>
        <div
          className="flex items-center justify-between gap-2 sm:gap-3"
          role="group"
          aria-label="6-digit verification code"
        >
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              onPaste={handlePaste}
              aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
              aria-invalid={!!error}
              className={`w-11 h-13 sm:w-12 sm:h-14 rounded-lg border text-center text-2xl font-bold
                bg-white/5 text-white outline-none
                transition-all duration-300 ease-out
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.07]
                hover:border-white/30
                ${error ? 'border-red-400/60 bg-red-500/[0.06]' : 'border-white/20'}
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
              style={{ transitionDelay: mounted ? `${index * 60}ms` : '0ms' }}
            />
          ))}
        </div>

        {error && (
          <p role="alert" className="mt-3 text-xs text-red-400 text-center">
            {error}
          </p>
        )}

        <div className="mt-5 text-center text-sm text-slate-400">
          {secondsLeft > 0 ? (
            <span>
              Resend code in{' '}
              <span className="font-mono text-slate-300 tabular-nums">{formattedTime}</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-semibold text-emerald-400 hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
            >
              {resending ? 'Sending…' : 'Resend code'}
            </button>
          )}
        </div>

        <Button type="submit" loading={verifying} disabled={!isComplete} className="mt-6">
          {verifying ? 'Verifying…' : 'Verify code'}
        </Button>
      </form>

      <Link
        to={backTo}
        className="mt-6 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200"
      >
        <ArrowLeft size={14} strokeWidth={2} />
        Back
      </Link>
    </AuthLayout>
  )
}