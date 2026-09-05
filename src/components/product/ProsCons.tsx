import { CheckCircle2, XCircle } from 'lucide-react'

interface ProsConsProps {
  pros: string[]
  cons: string[]
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border-subtle bg-bg-panel p-5">
        <h3 className="font-semibold text-text-primary mb-3">المميزات</h3>
        <ul className="space-y-2">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-electric" />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-border-subtle bg-bg-panel p-5">
        <h3 className="font-semibold text-text-primary mb-3">العيوب</h3>
        <ul className="space-y-2">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-sm text-text-secondary">
              <XCircle size={16} className="mt-0.5 shrink-0 text-text-muted" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
