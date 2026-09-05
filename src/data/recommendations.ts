import type { RecommendationCollection } from '@/types'

// DEMO DATA — تجميعات التوصيات المنسقة
export const recommendationCollections: RecommendationCollection[] = [
  {
    id: 'rec-gaming',
    key: 'gaming',
    title: 'الأفضل للجيمنج',
    description: 'منتجات مختارة لتحسين تجربة الألعاب من كيبوردات وماوس وشاشات.',
  },
  {
    id: 'rec-budget',
    key: 'budget',
    title: 'أفضل اختيارات اقتصادية',
    description: 'منتجات موثوقة بأسعار مناسبة لمن يبحث عن قيمة جيدة بميزانية محدودة.',
  },
  {
    id: 'rec-students',
    key: 'students',
    title: 'الأفضل للطلاب',
    description: 'إكسسوارات عملية تساعد في المذاكرة والمشاريع الجامعية.',
  },
  {
    id: 'rec-work',
    key: 'work',
    title: 'الأفضل للشغل',
    description: 'أدوات تحسّن الإنتاجية وتجربة الشغل من المكتب أو المنزل.',
  },
  {
    id: 'rec-wireless',
    key: 'wireless',
    title: 'أفضل Wireless Setup',
    description: 'منتجات لاسلكية تمنحك مكتب أنظف بدون كابلات زائدة.',
  },
  {
    id: 'rec-premium',
    key: 'premium',
    title: 'اختيارات Premium',
    description: 'منتجات بمستوى جودة وأداء أعلى لمن يبحث عن تجربة متميزة.',
  },
]
