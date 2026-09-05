import { Link } from 'react-router-dom'
import { Cpu, Globe, Camera, PlayCircle } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'

const FOOTER_LINKS = [
  {
    title: 'المنصة',
    links: [
      { to: '/about', label: 'من نحن' },
      { to: '/categories', label: 'الأقسام' },
      { to: '/featured', label: 'المنتجات المميزة' },
      { to: '/contact', label: 'اتصل بنا' },
    ],
  },
  {
    title: 'قانوني',
    links: [
      { to: '/privacy-policy', label: 'سياسة الخصوصية' },
      { to: '/terms', label: 'الشروط والأحكام' },
      { to: '/affiliate-disclosure', label: 'إفشاء الأفيليت' },
    ],
  },
]

export function Footer() {
  const { settings } = useSettings()

  return (
    <footer className="border-t border-border-subtle bg-bg-elevated mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-text-primary mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Cpu size={18} />
              </span>
              {settings.logoText}
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">{settings.siteTagline}</p>
            <div className="flex items-center gap-3 mt-4">
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
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-text-primary mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-text-secondary hover:text-electric transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-text-primary mb-3">إفشاء الأفيليت</h4>
            <p className="text-xs text-text-muted leading-relaxed">{settings.affiliateDisclosure}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} {settings.siteName}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}
