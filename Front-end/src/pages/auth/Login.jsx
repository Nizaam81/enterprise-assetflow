import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, BarChart3, Users, RefreshCw, Quote } from 'lucide-react'
import AuthLayout from '../../Layout/AuthLayout.jsx'
import InputField from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'

/* ── Left panel capability row ────────────────────────────────── */
function Capability({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
        <Icon size={16} strokeWidth={1.75} className="text-violet-400" />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-slate-200 leading-snug mb-0.5">{title}</p>
        <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

/* ── Left panel ───────────────────────────────────────────────── */
function LoginSidebar() {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2.5 group w-fit mb-auto animate-fade-up"
        style={{ animationDelay: '0ms' }}
        aria-label="AssetFlow home"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/25 text-violet-400 transition-all duration-300 group-hover:bg-violet-600/28 group-hover:border-violet-400/38">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </span>
        <span className="font-display text-[21px] font-bold tracking-[-0.01em] text-white">
          Asset<span className="brand-gradient">Flow</span>
        </span>
      </Link>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center py-12">
        {/* Headline */}
        <div className="mb-10 animate-fade-up" style={{ animationDelay: '40ms' }}>
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-violet-500 mb-4">
            Enterprise Asset Management
          </p>
          <h2 className="font-display text-[36px] xl:text-[42px] font-bold tracking-[-0.03em] leading-[1.1] text-white">
            One platform for<br />
            <span className="brand-gradient">every asset</span><br />
            you own.
          </h2>
          <p className="mt-5 text-[14.5px] text-slate-500 leading-[1.75] max-w-[340px]">
            Track, assign, and audit your organization's physical and digital resources — from procurement to retirement, with complete visibility.
          </p>
        </div>

        {/* Capabilities */}
        <div className="space-y-6 mb-12 animate-fade-up" style={{ animationDelay: '80ms' }}>
          <Capability
            icon={BarChart3}
            title="Real-time asset tracking"
            description="Know where every asset is, who holds it, and what it's worth — updated live."
          />
          <Capability
            icon={Users}
            title="Team & role management"
            description="Assign assets to individuals or departments with configurable permission levels."
          />
          <Capability
            icon={RefreshCw}
            title="Full lifecycle visibility"
            description="From onboarding to disposal — every handoff, service event, and status change is logged."
          />
        </div>

        {/* Testimonial */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: '120ms' }}
        >
          <div
            className="rounded-2xl px-5 py-5"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <Quote size={18} className="text-violet-500/60 mb-3" strokeWidth={1.5} />
            <p className="text-[13.5px] text-slate-400 leading-[1.7] mb-4">
              "Switching to AssetFlow cut our audit preparation time by over 60%. We went from spreadsheets to a single source of truth in one week."
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-violet-300"
                style={{ background: 'rgba(109,40,217,0.25)' }}
              >
                SR
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-slate-300 leading-none mb-0.5">
                  Sana R.
                </p>
                <p className="text-[11.5px] text-slate-600">
                  Head of IT Operations, Meridian Group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
        <p className="text-[12px] text-slate-800">© 2026 AssetFlow, Inc.</p>
      </div>
    </div>
  )
}

/* ── Login page ───────────────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "That doesn't look like a valid email."
    if (!form.password) next.password = 'Please enter your password.'
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
    }, 1500)
  }

  return (
    <AuthLayout sidebar={<LoginSidebar />}>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-display text-[26px] font-bold tracking-[-0.02em] text-white leading-tight mb-2">
          Sign in
        </h1>
        <p className="text-[14px] text-slate-500 leading-relaxed">
          Enter your credentials to access your workspace.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <InputField
          label="Email"
          type="email"
          name="email"
          id="login-email"
          icon={Mail}
          placeholder="you@company.com"
          autoComplete="email"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="text-[13px] font-medium text-slate-400 select-none"
            >
              Password
            </label>
            <Link
              to="#forgot"
              className="text-[12px] text-violet-400 hover:text-violet-300 transition-colors duration-150"
            >
              Forgot password?
            </Link>
          </div>
          <InputField
            id="login-password"
            type="password"
            name="password"
            icon={Lock}
            placeholder="••••••••"
            autoComplete="current-password"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
          />
        </div>

        <div className="pt-1">
          <Button type="submit" loading={loading} id="login-submit">
            {loading ? 'Signing in' : 'Sign in'}
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="mt-6 mb-5 flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <span className="text-[11.5px] text-slate-700 select-none">or</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* SSO option */}
      <Button variant="secondary" id="login-sso">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </Button>

      {/* Sign up */}
      <p className="mt-6 text-center text-[13px] text-slate-600">
        Don&apos;t have an account?{' '}
        <Link
          to="/signup"
          id="go-to-signup"
          className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-150"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}