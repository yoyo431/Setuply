import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cpu, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function AdminLogin() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = (location.state as { from?: string } | null)?.from || '/admin'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      navigate(from, { replace: true })
    } else {
      setError('كلمة المرور غير صحيحة، حاول تاني.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg bg-grid px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
            <Cpu size={22} />
          </span>
          <h1 className="text-lg font-bold text-text-primary">دخول لوحة التحكم</h1>
          <p className="mt-1 text-sm text-text-secondary">هذه المنطقة مخصصة لمدير المنصة فقط.</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-text-secondary">كلمة المرور</label>
            <div className="relative">
              <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="password"
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border-subtle bg-bg-elevated py-2.5 pr-9 pl-4 text-text-primary outline-none focus:border-primary-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary-600 py-2.5 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
          >
            دخول
          </button>
        </form>
      </motion.div>
    </div>
  )
}
