import type { Product } from '@/types'
import { demoProducts } from '@/data/products'
import { storage, STORAGE_KEYS } from './storage'

const KEY = STORAGE_KEYS.products

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export const productService = {
  getAll(): Promise<Product[]> {
    return storage.getAll<Product>(KEY, demoProducts)
  },
  getById(id: string): Promise<Product | undefined> {
    return storage.getOne<Product>(KEY, demoProducts, id)
  },
  async getBySlug(slug: string): Promise<Product | undefined> {
    const items = await this.getAll()
    return items.find((p) => p.slug === slug)
  },
  async getByCategory(categoryId: string): Promise<Product[]> {
    const items = await this.getAll()
    return items.filter((p) => p.categoryId === categoryId)
  },
  async getFeatured(): Promise<Product[]> {
    const items = await this.getAll()
    return items.filter((p) => p.featured)
  },
  async getByRecommendation(key: string): Promise<Product[]> {
    const items = await this.getAll()
    return items.filter((p) => p.recommendedFor.includes(key as Product['recommendedFor'][number]))
  },
  async search(query: string): Promise<Product[]> {
    const items = await this.getAll()
    const q = query.trim().toLowerCase()
    if (!q) return []
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  },
  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug'> & { slug?: string }): Promise<Product> {
    const now = new Date().toISOString()
    const product: Product = {
      ...data,
      id: `p-${Date.now()}`,
      slug: data.slug || slugify(data.name),
      createdAt: now,
      updatedAt: now,
    }
    return storage.insert<Product>(KEY, demoProducts, product)
  },
  async update(id: string, patch: Partial<Product>): Promise<Product | undefined> {
    return storage.update<Product>(KEY, demoProducts, id, { ...patch, updatedAt: new Date().toISOString() })
  },
  async remove(id: string): Promise<void> {
    return storage.remove<Product>(KEY, demoProducts, id)
  },
}
