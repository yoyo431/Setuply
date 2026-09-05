import type { SiteSettings } from '@/types'

// DEMO DATA — إعدادات افتراضية للموقع قابلة للتعديل من لوحة التحكم
export const defaultSettings: SiteSettings = {
  siteName: 'GearFlux',
  siteTagline: 'اكتشف. قارن. اختار الصح.',
  logoText: 'GearFlux',
  primaryColor: '#2563eb',
  currency: 'EGP',
  affiliateDisclosure:
    'بعض الروابط الموجودة على الموقع هي روابط تسويق بالعمولة (Affiliate Links)، وقد نحصل على عمولة عند إتمام عملية شراء من خلالها عبر أمازون، بدون أي تكلفة إضافية عليك.',
  amazonMarketplaceUrl: 'https://www.amazon.eg',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
  },
  contactEmail: 'hello@gearflux.example',
}
