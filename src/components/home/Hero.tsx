import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Compass } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-600/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-electric/15 blur-3xl animate-blob-delay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-panel px-4 py-1.5 text-xs text-text-secondary mb-6"
        >
          <Compass size={14} className="text-electric" />
          منصة اكتشاف منتجات تقنية للسوق المصري
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold text-text-primary leading-tight mb-6"
        >
          طوّر الـ<span className="text-primary-400">Setup</span> بتاعك
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-text-secondary mb-10"
        >
          اكتشف أفضل إكسسوارات الكمبيوتر واللاب توب المختارة بعناية عشان تساعدك تختار الصح.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/categories"
            className="flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-medium text-white hover:bg-primary-500 hover:shadow-glow transition-all"
          >
            استكشف المنتجات
            <ArrowLeft size={16} />
          </Link>
          <Link
            to="/categories"
            className="flex items-center gap-2 rounded-full border border-border-subtle bg-bg-panel px-7 py-3.5 text-sm font-medium text-text-primary hover:border-primary-500 transition-all"
          >
            تصفح الأقسام
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
