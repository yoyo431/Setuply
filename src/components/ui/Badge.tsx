import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'electric' | 'muted'
}

// شارة عرض للمنتجات (اختيارنا، الأفضل للجيمنج...)
export function Badge({ children, variant = 'primary' }: BadgeProps) {
  const styles = {
    primary: 'bg-primary-600/90 text-white',
    electric: 'bg-electric/15 text-electric border border-electric/30',
    muted: 'bg-white/5 text-text-secondary border border-border-subtle',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${styles[variant]}`}
    >
      {children}
    </span>
  )
}
