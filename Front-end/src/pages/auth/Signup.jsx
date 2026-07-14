import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock } from 'lucide-react'
import AuthLayout from '../../Layout/AuthLayout.jsx'
import InputField from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'

/* ── Password strength indicator ─────────────────────── */
function StrengthMeter({ password }) {
  if (!password) return null

  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400']

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={[
              'strength-bar',
              i < score && `active-${score}`,
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>
      {score > 0 && (
        <p className={`text-[11.5px] font-medium ${colors[score]}`}>
          {labels[score]} password
        </p>
      )}
    </div>
  )
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = 'That doesn\'t look like a valid email.'
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    if (!form.password) next.password = 'Please create a password.'
    else if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password.'
    else if (form.confirmPassword !== form.password)
      next.confirmPassword = 'Passwords don\u2019t match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulated account creation request.
    setTimeout(() => {
      setLoading(false)
      navigate('/login')
    }, 1500)
  }

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="mb-7">
        <h1 className="font-display text-[28px] font-bold tracking-[-0.02em] text-white leading-tight mb-2">
          Create an account
        </h1>
        <p className="text-[14px] text-slate-500 leading-relaxed">
          Get started with AssetFlow. It only takes a minute.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <InputField
          label="Full name"
          type="text"
          name="fullName"
          id="signup-name"
          icon={User}
          placeholder="Your full name"
          autoComplete="name"
          value={form.fullName}
          onChange={update('fullName')}
          error={errors.fullName}
        />

        <InputField
          label="Work email"
          type="email"
          name="email"
          id="signup-email"
          icon={Mail}
          placeholder="you@company.com"
          autoComplete="email"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
        />

        <InputField
          label="Phone number"
          type="tel"
          name="phone"
          id="signup-phone"
          icon={Phone}
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
          value={form.phone}
          onChange={update('phone')}
          error={errors.phone}
        />

        {/* Divider */}
        <div className="pt-1">
          <div className="auth-divider">
            <span className="text-[11px] text-slate-700 font-medium tracking-wide uppercase select-none">
              Password
            </span>
          </div>
        </div>

        <div>
          <InputField
            label="Create password"
            type="password"
            name="password"
            id="signup-password"
            icon={Lock}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
          />
          <StrengthMeter password={form.password} />
        </div>

        <InputField
          label="Confirm password"
          type="password"
          name="confirmPassword"
          id="signup-confirm"
          icon={Lock}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          error={errors.confirmPassword}
        />

        <div className="pt-2">
          <Button
            type="submit"
            loading={loading}
            id="signup-submit"
          >
            {loading ? 'Creating account' : 'Create account'}
          </Button>
        </div>
      </form>

      {/* Disclaimer */}
      <p className="mt-4 text-center text-[11.5px] text-slate-700 leading-relaxed px-2">
        By creating an account you agree to our{' '}
        <a href="#terms" className="text-slate-500 hover:text-slate-400 transition-colors duration-150 underline underline-offset-2">
          Terms
        </a>{' '}
        and{' '}
        <a href="#privacy" className="text-slate-500 hover:text-slate-400 transition-colors duration-150 underline underline-offset-2">
          Privacy Policy
        </a>.
      </p>

      {/* Sign in */}
      <p className="mt-5 text-center text-[13px] text-slate-600">
        Already have an account?{' '}
        <Link
          to="/login"
          id="go-to-login"
          className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-150"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}