'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/lib/products'
import ProductVisual from './ProductVisual'

export default function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col gap-4">
      {/* Main visual */}
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-[0_30px_80px_-50px_rgba(35,32,27,0.5)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          >
            <ProductVisual product={product} index={activeIndex} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-4 top-4 bg-ink/40 px-3 py-1 backdrop-blur-sm">
          <span className="font-body text-xs text-ivory/90">Hover to zoom</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
              activeIndex === index ? 'border-gold' : 'border-transparent hover:border-gold/40'
            }`}
            aria-label={`View image ${index + 1}`}
            aria-current={activeIndex === index}
          >
            <ProductVisual product={product} index={index} />
          </button>
        ))}
      </div>
    </div>
  )
}
