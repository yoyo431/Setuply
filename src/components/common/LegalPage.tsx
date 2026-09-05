import { motion } from 'framer-motion'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

interface LegalPageProps {
  title: string
  paragraphs: string[]
}

export function LegalPage({ title, paragraphs }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: title }]} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-6">{title}</h1>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
