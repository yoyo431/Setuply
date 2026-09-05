import type { ProductSpecification } from '@/types'

export function SpecsTable({ specs }: { specs: ProductSpecification[] }) {
  if (specs.length === 0) return null
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-panel overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr key={spec.label} className={i !== 0 ? 'border-t border-border-subtle' : ''}>
              <td className="p-3 text-text-muted w-1/3">{spec.label}</td>
              <td className="p-3 text-text-primary">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
