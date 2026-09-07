import { useState } from 'react'
import { KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'
import type { SiteSettings } from '@/types'
import { authService } from '@/services/authService'

export function AdminSettings() {
  const { settings, update } = useSettings()
  const [form, setForm] = useState<SiteSettings>(settings)
  const [saved, setSaved] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSaved, setPasswordSaved] = useState(false)

  const updateField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const updateSocial = (key: keyof SiteSettings['socialLinks'], value: string) => {
    setForm((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await update(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    if (newPassword.length < 6) {
      setPasswordError('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('كلمة المرور الجديدة والتأكيد غير متطابقين.')
      return
    }
    const success = authService.changePassword(currentPassword, newPassword)
    if (!success) {
      setPasswordError('كلمة المرور الحالية غير صحيحة.')
      return
    }
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 2500)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text-primary mb-1">الإعدادات</h1>
      <p className="text-text-secondary mb-8">إعدادات عامة للمنصة تُستخدم في كل الصفحات.</p>

      {saved && (
        <div className="mb-5 rounded-xl border border-electric/30 bg-electric/10 p-3 text-sm text-electric">
          تم حفظ الإعدادات بنجاح.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border-subtle bg-bg-panel p-5">
        <div>
          <label htmlFor="siteName" className="mb-1.5 block text-sm text-text-secondary">اسم الموقع</label>
          <input
            id="siteName"
            value={form.siteName}
            onChange={(e) => updateField('siteName', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="logoText" className="mb-1.5 block text-sm text-text-secondary">نص اللوجو</label>
          <input
            id="logoText"
            value={form.logoText}
            onChange={(e) => updateField('logoText', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="siteTagline" className="mb-1.5 block text-sm text-text-secondary">الشعار الفرعي (Tagline)</label>
          <input
            id="siteTagline"
            value={form.siteTagline}
            onChange={(e) => updateField('siteTagline', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="primaryColor" className="mb-1.5 block text-sm text-text-secondary">اللون الأساسي</label>
          <input
            id="primaryColor"
            type="color"
            value={form.primaryColor}
            onChange={(e) => updateField('primaryColor', e.target.value)}
            className="h-10 w-20 rounded-lg border border-border-subtle bg-bg-elevated"
          />
        </div>
        <div>
          <label htmlFor="amazonMarketplaceUrl" className="mb-1.5 block text-sm text-text-secondary">رابط سوق أمازون</label>
          <input
            id="amazonMarketplaceUrl"
            value={form.amazonMarketplaceUrl}
            onChange={(e) => updateField('amazonMarketplaceUrl', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="contactEmail" className="mb-1.5 block text-sm text-text-secondary">البريد الإلكتروني للتواصل</label>
          <input
            id="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={(e) => updateField('contactEmail', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="affiliateDisclosure" className="mb-1.5 block text-sm text-text-secondary">نص إفشاء الأفيليت</label>
          <textarea
            id="affiliateDisclosure"
            rows={3}
            value={form.affiliateDisclosure}
            onChange={(e) => updateField('affiliateDisclosure', e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="facebook" className="mb-1.5 block text-sm text-text-secondary">فيسبوك</label>
            <input
              id="facebook"
              value={form.socialLinks.facebook || ''}
              onChange={(e) => updateSocial('facebook', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="instagram" className="mb-1.5 block text-sm text-text-secondary">إنستجرام</label>
            <input
              id="instagram"
              value={form.socialLinks.instagram || ''}
              onChange={(e) => updateSocial('instagram', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="tiktok" className="mb-1.5 block text-sm text-text-secondary">تيك توك</label>
            <input
              id="tiktok"
              value={form.socialLinks.tiktok || ''}
              onChange={(e) => updateSocial('tiktok', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="youtube" className="mb-1.5 block text-sm text-text-secondary">يوتيوب</label>
            <input
              id="youtube"
              value={form.socialLinks.youtube || ''}
              onChange={(e) => updateSocial('youtube', e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <button type="submit" className="rounded-full bg-primary-600 px-7 py-3 text-sm font-medium text-white hover:bg-primary-500 transition-colors">
          حفظ الإعدادات
        </button>
      </form>

      <section className="mt-10 rounded-2xl border border-border-subtle bg-bg-panel p-5">
        <h2 className="flex items-center gap-2 font-semibold text-text-primary mb-1">
          <KeyRound size={16} />
          كلمة مرور لوحة التحكم
        </h2>
        <p className="text-sm text-text-secondary mb-5">
          {authService.hasCustomPassword()
            ? 'غيّر كلمة المرور الخاصة بالدخول على لوحة التحكم.'
            : 'حاليًا تستخدم كلمة المرور الافتراضية. ننصح بشدة بتغييرها لأمان أعلى.'}
        </p>

        {passwordSaved && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-electric/30 bg-electric/10 p-3 text-sm text-electric">
            <CheckCircle2 size={16} />
            تم تغيير كلمة المرور بنجاح.
          </div>
        )}
        {passwordError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle size={16} />
            {passwordError}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="mb-1.5 block text-sm text-text-secondary">كلمة المرور الحالية</label>
            <input
              id="currentPassword"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-sm text-text-secondary">كلمة المرور الجديدة</label>
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm text-text-secondary">تأكيد كلمة المرور الجديدة</label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary outline-none focus:border-primary-500"
              />
            </div>
          </div>
          <button type="submit" className="rounded-full bg-primary-600 px-7 py-3 text-sm font-medium text-white hover:bg-primary-500 transition-colors">
            تغيير كلمة المرور
          </button>
        </form>
      </section>
    </div>
  )
}
