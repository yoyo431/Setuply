import { createContext, useContext, useState, type ReactNode } from 'react'

interface CompareContextValue {
  ids: string[]
  categoryId: string | null
  toggle: (id: string, categoryId: string) => void
  clear: () => void
  isSelected: (id: string) => boolean
}

const CompareContext = createContext<CompareContextValue>({
  ids: [],
  categoryId: null,
  toggle: () => {},
  clear: () => {},
  isSelected: () => false,
})

const MAX_COMPARE = 3

// سياق مقارنة المنتجات — يسمح فقط بمقارنة منتجات من نفس التصنيف
export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const toggle = (id: string, catId: string) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((x) => x !== id)
        if (next.length === 0) setCategoryId(null)
        return next
      }
      if (categoryId && categoryId !== catId) {
        return prev
      }
      if (prev.length >= MAX_COMPARE) return prev
      setCategoryId(catId)
      return [...prev, id]
    })
  }

  const clear = () => {
    setIds([])
    setCategoryId(null)
  }

  const isSelected = (id: string) => ids.includes(id)

  return (
    <CompareContext.Provider value={{ ids, categoryId, toggle, clear, isSelected }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}
