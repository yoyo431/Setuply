import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, FolderTree, Settings, Cpu, ArrowRight, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const ADMIN_LINKS = [
  { to: '/admin', label: 'نظرة عامة', icon: LayoutDashboard },
  { to: '/admin/products', label: 'المنتجات', icon: Package },
  { to: '/admin/categories', label: 'التصنيفات', icon: FolderTree },
  { to: '/admin/settings', label: 'الإعدادات', icon: Settings },
]

export function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden w-64 shrink-0 border-l border-border-subtle bg-bg-elevated p-5 lg:flex lg:flex-col">
        <div className="flex items-center gap-2 font-bold text-lg text-text-primary mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
            <Cpu size={18} />
          </span>
          لوحة التحكم
        </div>
        <nav className="flex flex-col gap-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-primary-600 text-white' : 'text-text-secondary hover:bg-white/5'
                  }`
                }
              >
                <Icon size={18} />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-1 pt-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-text-muted hover:text-electric px-3 py-2">
            <ArrowRight size={16} />
            العودة للموقع
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-red-400 px-3 py-2 text-right"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between border-b border-border-subtle bg-bg-elevated px-4 py-3">
          <span className="font-bold text-text-primary">لوحة التحكم</span>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-text-secondary">العودة للموقع</Link>
            <button type="button" onClick={handleLogout} aria-label="تسجيل الخروج" className="text-text-secondary hover:text-red-400">
              <LogOut size={16} />
            </button>
          </div>
        </header>
        <nav className="lg:hidden flex gap-2 overflow-x-auto border-b border-border-subtle bg-bg-elevated px-4 py-2">
          {ADMIN_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors ${
                  isActive ? 'bg-primary-600 text-white' : 'text-text-secondary bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
