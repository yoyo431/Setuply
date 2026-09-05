import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { Home } from '@/pages/Home'
import { Categories } from '@/pages/Categories'
import { CategoryPage } from '@/pages/CategoryPage'
import { ProductDetails } from '@/pages/Product'
import { Search } from '@/pages/Search'
import { Featured } from '@/pages/Featured'
import { Recommendations } from '@/pages/Recommendations'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { AffiliateDisclosure } from '@/pages/AffiliateDisclosure'
import { Terms } from '@/pages/Terms'
import { NotFound } from '@/pages/NotFound'
import { AdminDashboard } from '@/admin/pages/AdminDashboard'
import { AdminProducts } from '@/admin/pages/AdminProducts'
import { AdminProductForm } from '@/admin/pages/AdminProductForm'
import { AdminCategories } from '@/admin/pages/AdminCategories'
import { AdminCategoryForm } from '@/admin/pages/AdminCategoryForm'
import { AdminSettings } from '@/admin/pages/AdminSettings'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProductForm />} />
        <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/categories/new" element={<AdminCategoryForm />} />
        <Route path="/admin/categories/:id/edit" element={<AdminCategoryForm />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}

export default App
