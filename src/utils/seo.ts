import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  path?: string
}

// مكوّن خفيف لضبط عنوان الصفحة والوصف وOpen Graph بدون تبعية خارجية
export function useSEO({ title, description, path }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | Setuply`

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    if (path) {
      setMeta('og:url', `https://gearflux.example${path}`, 'property')
    }
  }, [title, description, path])
}
