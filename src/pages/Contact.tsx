import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Globe, Camera, PlayCircle, Mail } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { useSettings } from '@/context/SettingsContext'
import { useSEO } from '@/utils/seo'

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Contact() {
  const { settings } = useSettings()
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  useSEO({
    title: 'اتصل بنا',
    description: 'تواصل مع فريق Setuply لأي استفسار أو اقتراح.',
    path: '/contact',
  })

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'الاسم مطلوب.'
    if (!form.email.trim()) {
      next.email = 'البريد الإلكتروني مطلوب.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'صيغة البريد الإلكتروني غير صحيحة.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'الرسالة يجب أن تكون 10 أحرف على الأقل.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'اتصل بنا' }]} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-3">اتصل بنا</h1>
        <p className="text-text-secondary mb-8">عندك استفسار أو اقتراح؟ راسلنا وهنرد عليك في أقرب وقت.</p>

        {submitted && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-electric/30 bg-electric/10 p-4 text-sm text-electric">
            <CheckCircle2 size={18} />
            تم استلام رسالتك بنجاح، شكرًا لتواصلك معنا.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-text-secondary">الاسم</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border-subtle bg-bg-panel px-4 py-2.5 text-text-primary outline-none focus:border-primary-500"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-text-secondary">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border-subtle bg-bg-panel px-4 py-2.5 text-text-primary outline-none focus:border-primary-500"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-text-secondary">الرسالة</label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-border-subtle bg-bg-panel px-4 py-2.5 text-text-primary outline-none focus:border-primary-500"
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>

          <button type="submit" className="rounded-full bg-primary-600 px-7 py-3 text-sm font-medium text-white hover:bg-primary-500 transition-colors">
            إرسال الرسالة
          </button>
        </form>

        <div className="mt-10 flex items-center gap-5 border-t border-border-subtle pt-6">
          <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-electric">
            <Mail size={16} />
            {settings.contactEmail}
          </a>
          {settings.socialLinks.facebook && (
            <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك" className="text-text-secondary hover:text-electric">
              <Globe size={18} />
            </a>
          )}
          {settings.socialLinks.instagram && (
            <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="إنستجرام" className="text-text-secondary hover:text-electric">
              <Camera size={18} />
            </a>
          )}
          {settings.socialLinks.youtube && (
            <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="يوتيوب" className="text-text-secondary hover:text-electric">
              <PlayCircle size={18} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}
