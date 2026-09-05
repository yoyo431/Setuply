import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-2xl border border-border-subtle bg-bg-panel mb-3">
        <img src={images[active]} alt={name} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`صورة ${i + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                active === i ? 'border-primary-500' : 'border-border-subtle'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
