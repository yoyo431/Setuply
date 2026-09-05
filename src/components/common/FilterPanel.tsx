import { SlidersHorizontal } from 'lucide-react'
import type { ProductFilters } from '@/hooks/useProductFilters'
import { RECOMMENDATION_LABELS } from '@/utils/labels'

interface FilterPanelProps {
  filters: ProductFilters
  setFilters: (filters: ProductFilters) => void
  allTags: string[]
  onReset: () => void
}

const PRICE_OPTIONS = [
  { label: 'كل الأسعار', value: null },
  { label: 'أقل من 500 جنيه', value: 500 },
  { label: 'أقل من 1000 جنيه', value: 1000 },
  { label: 'أقل من 2000 جنيه', value: 2000 },
  { label: 'أقل من 5000 جنيه', value: 5000 },
]

export function FilterPanel({ filters, setFilters, allTags, onReset }: FilterPanelProps) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-semibold text-text-primary">
          <SlidersHorizontal size={16} />
          الفلاتر
        </h3>
        <button type="button" onClick={onReset} className="text-xs text-primary-400 hover:text-primary-300">
          إعادة ضبط
        </button>
      </div>

      <div className="mb-5">
        <label htmlFor="price-filter" className="mb-2 block text-sm text-text-secondary">
          السعر
        </label>
        <select
          id="price-filter"
          value={filters.priceMax ?? ''}
          onChange={(e) => setFilters({ ...filters, priceMax: e.target.value ? Number(e.target.value) : null })}
          className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500"
        >
          {PRICE_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value ?? ''}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="recommended-filter" className="mb-2 block text-sm text-text-secondary">
          مناسب لمين؟
        </label>
        <select
          id="recommended-filter"
          value={filters.recommendedFor ?? ''}
          onChange={(e) => setFilters({ ...filters, recommendedFor: e.target.value || null })}
          className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500"
        >
          <option value="">الكل</option>
          {Object.entries(RECOMMENDATION_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {allTags.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-text-secondary">Tags</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const active = filters.tags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      tags: active ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag],
                    })
                  }
                  className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                    active ? 'bg-primary-600 border-primary-600 text-white' : 'border-border-subtle text-text-secondary hover:border-primary-500'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
