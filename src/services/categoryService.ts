import type { Category } from '@/types'
import { demoCategories } from '@/data/categories'
import { productService } from './productService'
import { storage, STORAGE_KEYS } from './storage'

const KEY = STORAGE_KEYS.categories

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export const categoryService = {
  getAll(): Promise<Category[]> {
    return storage.getAll<Category>(KEY, demoCategories)
  },
  async getActive(): Promise<Category[]> {
    const items = await this.getAll()
    return items.filter((c) => c.active)
  },
  getById(id: string): Promise<Category | undefined> {
    return storage.getOne<Category>(KEY, demoCategories, id)
  },
  async getBySlug(slug: string): Promise<Category | undefined> {
    const items = await this.getAll()
    return items.find((c) => c.slug === slug)
  },
  async getProductCount(categoryId: string): Promise<number> {
    const products = await productService.getByCategory(categoryId)
    return products.length
  },
  async create(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'slug'> & { slug?: string }): Promise<Category> {
    const now = new Date().toISOString()
    const category: Category = {
      ...data,
      id: `cat-${Date.now()}`,
      slug: data.slug || slugify(data.name),
      createdAt: now,
      updatedAt: now,
    }
    return storage.insert<Category>(KEY, demoCategories, category)
  },
  async update(id: string, patch: Partial<Category>): Promise<Category | undefined> {
    return storage.update<Category>(KEY, demoCategories, id, { ...patch, updatedAt: new Date().toISOString() })
  },
  async remove(id: string): Promise<void> {
    return storage.remove<Category>(KEY, demoCategories, id)
  },
}
