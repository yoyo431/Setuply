import { motion } from 'framer-motion'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { useSEO } from '@/utils/seo'

export function About() {
  useSEO({
    title: 'من نحن',
    description: 'تعرف على GearFlux، منصة اكتشاف إكسسوارات الكمبيوتر واللاب توب والجيمنج في مصر.',
    path: '/about',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'من نحن' }]} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-6">من نحن</h1>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            GearFlux هي منصة مصرية تساعدك تكتشف أفضل إكسسوارات الكمبيوتر واللاب توب وإكسسوارات الجيمنج، من خلال تصنيفات
            واضحة، مقارنات مبنية على مواصفات حقيقية، وتوصيات مناسبة لاستخدامك وميزانيتك.
          </p>
          <p>
            المنصة ليست متجرًا إلكترونيًا. لا نقوم ببيع أو شحن أو معالجة أي طلبات شراء. دورنا هو مساعدتك في اتخاذ قرار
            الشراء الصحيح، وبعد ذلك تكمّل عملية الشراء مباشرة من خلال أمازون مصر.
          </p>
          <p>
            رحلتك معنا تبدأ بالاكتشاف، تمر بالمقارنة والفهم، وتنتهي باختيار المنتج المناسب لك، ثم التوجه لأمازون لإتمام
            عملية الشراء.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
