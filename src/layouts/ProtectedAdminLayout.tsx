import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AdminLayout } from '@/layouts/AdminLayout'

// يحمي كل مسارات /admin ويحوّل لصفحة تسجيل الدخول لو المستخدم غير مسجل
export function ProtectedAdminLayout() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  return <AdminLayout />
}
