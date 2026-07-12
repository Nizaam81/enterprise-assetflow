import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, Sparkles } from 'lucide-react'
import AuthLayout from '../../Layout/AuthLayout.jsx'
import InputField from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'

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

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Enter your full name.'
    if (!form.email.trim()) next.email = 'Enter your work email address.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.phone.trim()) next.phone = 'Enter a phone number.'
    if (!form.password) next.password = 'Create a password.'
    else if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (!form.confirmPassword) next.confirmPassword = 'Re-enter your password.'
    else if (form.password && form.confirmPassword !== form.password)
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
    }, 1400)
  }

  return (
    <AuthLayout
      eyebrow={
        <>
          <Sparkles size={12} strokeWidth={2.5} />
          New workspace account
        </>
      }
    >
      <h1 className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-white mb-1.5">
        Create your account
      </h1>
      <p className="text-[15px] text-slate-400 leading-relaxed mb-6">
        Set up access to track, assign, and audit every asset.
      </p>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <InputField
          label="Full name"
          type="text"
          name="fullName"
          icon={User}
          placeholder="Jordan Ellis"
          autoComplete="name"
          value={form.fullName}
          onChange={update('fullName')}
          error={errors.fullName}
        />

        <InputField
          label="Email address"
          type="email"
          name="email"
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
          icon={Phone}
          placeholder="+1 (555) 123-4567"
          autoComplete="tel"
          value={form.phone}
          onChange={update('phone')}
          error={errors.phone}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          icon={Lock}
          placeholder="Create a password"
          autoComplete="new-password"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
          hint={!errors.password ? 'Use at least 8 characters.' : undefined}
        />

        <InputField
          label="Confirm password"
          type="password"
          name="confirmPassword"
          icon={Lock}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          error={errors.confirmPassword}
        />

        <Button type="submit" loading={loading} className="mt-1">
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-emerald-400 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}