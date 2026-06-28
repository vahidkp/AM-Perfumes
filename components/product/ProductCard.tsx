'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import { priceFrom, type Product } from '@/lib/products'
import ProductVisual from './ProductVisual'
import Badge from '@/components/ui/Badge'
import { IconSparkle } from '@/components/ui/icons'
import toast from 'react-hot-toast'

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} added to cart`, {
      icon: <IconSparkle className="h-4 w-4 text-gold" />,
    })
  }

  return (
    <Link
      href={`/fragrances/${product.slug}`}
      className="group relative block aspect-[3/4] transform-gpu overflow-hidden rounded-3xl shadow-[0_24px_60px_-34px_rgba(35,32,27,0.5)] transition-all duration-500 [clip-path:inset(0_round_1.5rem)] hover:-translate-y-1 hover:shadow-[0_34px_80px_-38px_rgba(35,32,27,0.6)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image (swaps on hover) */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <ProductVisual product={product} index={0} />
      </div>
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isHovered ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        }`}
      >
        <ProductVisual product={product} index={2} />
      </div>

      {/* Caption scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

      {/* Badges */}
      <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between">
        <Badge tone="dark">{product.target}</Badge>
        {product.compareAtPrice && <Badge tone="red">Sale</Badge>}
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
        <div className="mb-1 flex items-center gap-2">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold-light">
            {product.mood}
          </p>
          <span className="font-arabic text-base text-gold-light/90">
            {product.arabicName}
          </span>
        </div>
        <h3 className="font-display text-3xl text-ivory">{product.name}</h3>
        <p className="mt-1 line-clamp-1 font-body text-xs text-cream/70">
          {product.topNotes.join(' · ')}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-body text-xs uppercase tracking-[0.12em] text-cream/60">
            From
          </span>
          <span className="font-body text-lg font-semibold text-gold-light">
            {formatPrice(priceFrom(product))}
          </span>
        </div>

        {/* Reveal-on-hover actions */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full border border-gold/50 bg-emerald py-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-cream transition-all hover:border-gold hover:bg-emerald-light"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <span className="rounded-full border border-ivory/40 px-4 py-2.5 font-body text-[11px] uppercase tracking-[0.15em] text-ivory">
                View →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
