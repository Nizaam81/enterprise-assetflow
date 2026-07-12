export default function Footer() {
  return (
    <footer className="min-h-16 flex items-center border-t border-white/10 bg-white/[0.02]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        <p className="text-xs text-slate-500">© 2026 AssetFlow. All rights reserved.</p>
        <nav aria-label="Legal" className="flex items-center gap-2 text-xs text-slate-500">
          <a href="#privacy" className="hover:text-slate-300 transition-colors duration-200">
            Privacy Policy
          </a>
          <span aria-hidden="true" className="opacity-60">
            ·
          </span>
          <a href="#terms" className="hover:text-slate-300 transition-colors duration-200">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  )
}