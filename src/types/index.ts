// أنواع البيانات الأساسية للمنصة — GearFlux

export interface ProductSpecification {
  label: string
  value: string
}

export type ProductBadge =
  | 'اختيارنا'
  | 'الأفضل للجيمنج'
  | 'اقتصادي'
  | 'مناسب للطلاب'
  | 'Premium'
  | 'الأفضل للشغل'

export type RecommendedFor =
  | 'gaming'
  | 'students'
  | 'work'
  | 'budget'
  | 'wireless'
  | 'premium'

export interface Product {
  id: string
  name: string
  slug: string
  categoryId: string
  image: string
  gallery: string[]
  shortDescription: string
  description: string
  price: number
  oldPrice?: number
  currency: 'EGP'
  specifications: ProductSpecification[]
  pros: string[]
  cons: string[]
  badge?: ProductBadge
  featured: boolean
  recommendedFor: RecommendedFor[]
  tags: string[]
  amazonUrl: string
  affiliateUrl: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface SiteSettings {
  siteName: string
  siteTagline: string
  logoText: string
  primaryColor: string
  currency: 'EGP'
  affiliateDisclosure: string
  amazonMarketplaceUrl: string
  socialLinks: {
    facebook?: string
    instagram?: string
    tiktok?: string
    youtube?: string
  }
  contactEmail: string
}

export interface RecommendationCollection {
  id: string
  key: RecommendedFor
  title: string
  description: string
}
