---
name: product-card-component
description: Create luxury perfume product cards, featured product grids, and the FeaturedProducts section for the AM Perfume website. Use this skill whenever the user needs to build product cards, the 2-up featured products grid on the homepage, any listing of the two AM Perfume products, hover effects on product images, or product tiles with add-to-cart actions. Trigger on: "product card", "product grid", "featured products", "product listing", "shop grid", "collection grid", "product tile", or any request to display one or both AM Perfume products in a grid/card format.
---

# Product Card Component Skill

Build editorial luxury product cards and grids for AM Perfume's two products.

## Design Principles

- Cards must feel **editorial**, not generic e-commerce
- **3:4 image ratio** — portrait orientation for perfume bottles
- **Hover reveals** a second lifestyle image (crossfade)
- Dark card backgrounds (`--color-charcoal`) with gold accents
- Smooth transitions on all interactive states
- No box shadows — use borders and backgrounds instead

---

## Component 1: ProductCard

```tsx
// components/product/ProductCard.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/products'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'large' | 'compact'
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} added to cart`, {
      icon: '✨',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative bg-charcoal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/fragrances/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-primary-light">
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {/* Secondary image (reveal on hover) */}
          <Image
            src={product.images[2]}
            alt={`${product.name} lifestyle`}
            fill
            className={`object-cover transition-all duration-700 absolute inset-0 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />

          {/* Top badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary/80 backdrop-blur-sm font-body text-cream text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-gold/30">
              {product.target}
            </span>
          </div>

          {/* Quick add — appears on hover */}
          <motion.button
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 z-10 bg-gold text-primary font-body font-semibold text-xs tracking-wider uppercase py-3 hover:bg-gold-light transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </motion.button>
        </div>

        {/* Card body */}
        <div className="p-5">
          {/* Mood tag */}
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-2">
            {product.mood}
          </p>

          {/* Product name */}
          <h3 className="font-heading text-xl text-white mb-1 group-hover:text-gold transition-colors">
            {product.name}
          </h3>

          {/* Scent keywords */}
          <p className="font-body text-xs text-cream/50 mb-3 line-clamp-1">
            {product.topNotes.join(' · ')}
          </p>

          {/* Price row */}
          <div className="flex items-center justify-between">
            <span className="font-body text-gold font-semibold text-lg">
              {formatPrice(product.price)}
            </span>
            <span className="font-body text-cream/40 text-xs">
              {product.size}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
```

---

## Component 2: FeaturedProducts Section

```tsx
// components/sections/FeaturedProducts.tsx
'use client'
import { motion } from 'framer-motion'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/lib/products'

export default function FeaturedProducts() {
  return (
    <section className="py-section bg-charcoal">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Collection
          </p>
          <h2 className="font-display text-heading-xl text-white">
            Our Signature Fragrances
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </motion.div>

        {/* Product grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <ProductCard product={product} variant="large" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Component 3: ScentExplorer (Mood Matcher)

```tsx
// components/sections/ScentExplorer.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { products } from '@/lib/products'

const moods = [
  { id: 'mysterious', label: 'Mysterious', emoji: '🌑', color: 'from-primary to-charcoal', productSlug: 'am-noir' },
  { id: 'fresh', label: 'Fresh', emoji: '🌸', color: 'from-cream-dark to-cream', productSlug: 'am-lumiere', textDark: true },
  { id: 'bold', label: 'Bold & Intense', emoji: '🔥', color: 'from-charcoal to-primary', productSlug: 'am-noir' },
  { id: 'luminous', label: 'Luminous', emoji: '✨', color: 'from-cream to-gold/20', productSlug: 'am-lumiere', textDark: true },
]

export default function ScentExplorer() {
  const [activeMood, setActiveMood] = useState<string | null>(null)

  const activeProductSlug = moods.find(m => m.id === activeMood)?.productSlug
  const matchedProduct = products.find(p => p.slug === activeProductSlug)

  return (
    <section className="py-section bg-primary">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Scent Finder</p>
          <h2 className="font-display text-heading-xl text-white mb-4">Find Your Scent</h2>
          <p className="font-body text-cream/60 text-base">
            Every mood has a fragrance. What are you feeling today?
          </p>
        </div>

        {/* Mood tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood.id === activeMood ? null : mood.id)}
              className={`relative aspect-square bg-gradient-to-br ${mood.color} p-6 flex flex-col items-center justify-center gap-3 border transition-all duration-300 ${
                activeMood === mood.id
                  ? 'border-gold scale-105'
                  : 'border-white/10 hover:border-gold/50 hover:scale-102'
              }`}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className={`font-heading text-sm ${mood.textDark ? 'text-primary' : 'text-white'}`}>
                {mood.label}
              </span>
              {activeMood === mood.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 border-2 border-gold pointer-events-none"
                />
              )}
            </button>
          ))}
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {matchedProduct && (
            <motion.div
              key={matchedProduct.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="text-center border border-gold/30 bg-primary-light p-10"
            >
              <p className="font-body text-xs tracking-widest uppercase text-gold mb-3">
                Your Perfect Match
              </p>
              <h3 className="font-display text-heading-xl text-white mb-3">
                {matchedProduct.name}
              </h3>
              <p className="font-body text-cream/60 mb-6 max-w-md mx-auto">
                {matchedProduct.tagline}
              </p>
              <Link
                href={`/fragrances/${matchedProduct.slug}`}
                className="inline-flex items-center gap-2 bg-gold text-primary px-8 py-3 font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors"
              >
                Discover {matchedProduct.name} →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
```

---

## Component 4: ReviewsSection

```tsx
// components/sections/ReviewsSection.tsx
'use client'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-cream/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const allReviews = products.flatMap(p =>
    p.reviews.map(r => ({ ...r, product: p.name }))
  )

  return (
    <section className="py-section bg-cream">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Reviews</p>
          <h2 className="font-display text-heading-xl text-primary">What Our Customers Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allReviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 border border-primary/10"
            >
              <StarRating rating={review.rating} />
              <p className="font-body text-charcoal/80 text-sm leading-relaxed my-4">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between">
                <span className="font-body font-semibold text-charcoal text-sm">{review.name}</span>
                <span className="font-body text-gold text-xs">{review.product}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```
