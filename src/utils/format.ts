// تنسيق العملة المصرية (جنيه)، قابل للتوسعة لعملات أخرى مستقبلًا
export function formatPrice(amount: number, currency: string = 'EGP'): string {
  const formatted = amount.toLocaleString('ar-EG')
  const label = currency === 'EGP' ? 'جنيه' : currency
  return `${formatted} ${label}`
}

export function calculateDiscountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}
