import Image from 'next/image'
import type { Product } from '@/lib/products'
import { cn } from '@/lib/utils'

/**
 * Renders a real product/lifestyle photograph for a given product.
 * `index` selects which shot from product.images (clamped to range).
 * The parent must establish size (aspect ratio / fixed h-w) — the image fills it.
 */
export default function ProductVisual({
  product,
  index = 0,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  product: Product
  index?: number
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const src = product.images[Math.min(index, product.images.length - 1)]
  const tint = product.accent === 'dark' ? 'bg-primary' : 'bg-cream-dark'

  return (
    <div className={cn('relative h-full w-full overflow-hidden', tint, className)}>
      <Image
        src={src}
        alt={`${product.name} — ${product.type}`}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  )
}
