import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ShieldCheck } from 'lucide-react'
import AuthLayout from '../../Layout/AuthLayout.jsx'
import InputField from '../components/Input.jsx'
import Button from '../components/Button.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Enter your work email address.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Enter your password.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulated authentication request.
    setTimeout(() => {
      setLoading(false)
      navigate('/login')
    }, 1400)
  }

  return (
    <AuthLayout
      eyebrow={
        <>
          <ShieldCheck size={12} strokeWidth={2.5} />
          Secure access · AES-256
        </>
      }
    >
      <h1 className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-white mb-1.5">
        Welcome back
      </h1>
      <p className="text-[15px] text-slate-400 leading-relaxed mb-6">
        Sign in to manage your assets and resources.
      </p>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
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

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-sm font-medium text-slate-300 tracking-wide">
              Password
            </label>
            <Link
              to="#forgot-password"
              className="text-xs text-emerald-400 hover:opacity-80 transition-opacity duration-200"
            >
              Forgot password?
            </Link>
          </div>
          <InputField
            id="login-password"
            type="password"
            name="password"
            icon={Lock}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
          />
        </div>

        <Button type="submit" loading={loading} className="mt-1">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-semibold text-emerald-400 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}