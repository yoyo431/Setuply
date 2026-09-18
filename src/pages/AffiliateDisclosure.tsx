import { LegalPage } from '@/components/common/LegalPage'
import { useSettings } from '@/context/SettingsContext'
import { useSEO } from '@/utils/seo'

export function AffiliateDisclosure() {
  const { settings } = useSettings()

  useSEO({
    title: 'إفشاء الأفيليت',
    description: 'توضيح كيفية استخدام روابط التسويق بالعمولة (Affiliate Links) على Setuply.',
    path: '/affiliate-disclosure',
  })

  return (
    <LegalPage
      title="إفشاء الأفيليت"
      paragraphs={[
        settings.affiliateDisclosure,
        'يعني ذلك أنه عند الضغط على زر "شوف المنتج على Amazon" أو أي رابط مشابه على المنصة، ثم إتمام عملية شراء عبر أمازون، قد نحصل على نسبة عمولة بسيطة من أمازون، بدون أي زيادة في السعر الذي تدفعه أنت.',
        'هذا البرنامج يساعدنا في استمرار المنصة وتطويرها لتقديم محتوى أفضل ومقارنات أكثر دقة.',
        'نحن لا نختار المنتجات بناءً على قيمة العمولة، بل بناءً على مدى ملاءمتها لاحتياجات المستخدم المصري في مجال إكسسوارات الكمبيوتر والتقنية.',
        'أي رابط يوجهك خارج المنصة إلى أمازون يخضع لسياسات أمازون الخاصة بالخصوصية والشراء والشحن والاسترجاع.',
      ]}
    />
  )
}
