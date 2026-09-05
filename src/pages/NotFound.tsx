import { Link } from 'react-router-dom'
import { CompassIcon } from 'lucide-react'

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-400">
        <CompassIcon size={32} />
      </div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">الصفحة دي مش موجودة.</h1>
      <p className="text-text-secondary mb-8">تأكد من الرابط أو رجّع لصفحتنا الرئيسية.</p>
      <Link to="/" className="rounded-full bg-primary-600 px-7 py-3 text-sm font-medium text-white hover:bg-primary-500 transition-colors">
        العودة للرئيسية
      </Link>
    </div>
  )
}
