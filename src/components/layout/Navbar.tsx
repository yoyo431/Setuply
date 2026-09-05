import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Cpu } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'

const NAV_LINKS = [
  { to: '/', label: 'الرئيسية' },
  { to: '/categories', label: 'الأقسام' },
  { to: '/featured', label: 'المنتجات المميزة' },
  { to: '/recommendations', label: 'اختياراتنا' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { settings } = useSettings()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setMobileOpen(false)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border-subtle shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-text-primary shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
            <Cpu size={18} />
          </span>
          {settings.logoText}
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors hover:text-electric ${isActive ? 'text-electric' : 'text-text-secondary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="hidden md:flex items-center relative max-w-xs w-full">
          <Search size={16} className="absolute right-3 text-text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="دور على منتج..."
            aria-label="بحث"
            className="w-full rounded-full border border-border-subtle bg-bg-panel py-2 pr-9 pl-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 outline-none"
          />
        </form>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="فتح القائمة"
          className="lg:hidden text-text-primary"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border-subtle bg-bg/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              <form onSubmit={handleSearch} className="relative">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="دور على منتج..."
                  aria-label="بحث"
                  className="w-full rounded-full border border-border-subtle bg-bg-panel py-2.5 pr-9 pl-4 text-sm text-text-primary placeholder:text-text-muted outline-none"
                />
              </form>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-2 text-base transition-colors ${isActive ? 'text-electric' : 'text-text-secondary'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
