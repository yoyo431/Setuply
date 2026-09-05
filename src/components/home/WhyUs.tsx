import { motion } from 'framer-motion'
import { ListChecks, LayoutGrid, Scale, Wallet, Zap } from 'lucide-react'

const REASONS = [
  { icon: ListChecks, title: 'اختيارات مدروسة', description: 'كل منتج على المنصة تم اختياره بعناية بناءً على مواصفاته الفعلية.' },
  { icon: LayoutGrid, title: 'تصنيفات واضحة', description: 'تقدر توصل للمنتج المناسب بسهولة عبر تصنيفات منظمة.' },
  { icon: Scale, title: 'مقارنات تساعدك تختار', description: 'قارن بين المنتجات المتشابهة بناءً على مواصفاتها الحقيقية.' },
  { icon: Wallet, title: 'منتجات لمختلف الميزانيات', description: 'من الخيارات الاقتصادية لخيارات Premium حسب احتياجك.' },
  { icon: Zap, title: 'تجربة بسيطة وسريعة', description: 'تصفح، افهم، واتخذ قرارك بسرعة من غير تعقيد.' },
]

export function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-3">ليه تستخدم منصتنا؟</h2>
        <p className="text-text-secondary max-w-xl mx-auto">مش بس شوية منتجات من أمازون، دي منصة بتساعدك تلاقي المنتج المناسب فعليًا.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-border-subtle bg-bg-panel p-5 text-center hover:border-primary-600/50 transition-colors"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
              <reason.icon size={20} />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">{reason.title}</h3>
            <p className="text-sm text-text-secondary">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
