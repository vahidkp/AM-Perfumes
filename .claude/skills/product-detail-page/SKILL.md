---
name: product-detail-page
description: Build the complete Product Detail Page (PDP) for AM Perfume, including the image gallery with switcher and zoom, product info panel (name, price, size, quantity, add-to-cart), scent story section, animated scent pyramid, scent attribute bars, occasion badges, cross-sell section, and customer reviews. Use this skill whenever the user wants to build or modify the PDP at /fragrances/[slug], any component within the PDP (gallery, pyramid, attributes, reviews), or the product page layout. Trigger on: "product detail page", "PDP", "product page", "scent pyramid", "product gallery", "product description page", "product info section", or any request to show product details for AM Noir or AM Lumière.
---

# Product Detail Page (PDP) Skill

Build the complete product detail page for AM Perfume. This is the most critical conversion page — every element must build desire and trust.

## Page Route

```
app/fragrances/[slug]/page.tsx
```

The page is **statically generated** at build time for both `am-noir` and `am-lumiere`.

---

## Step 1: Page Component (app/fragrances/[slug]/page.tsx)

```tsx
import { getProductBySlug, products } from '@/lib/products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ScentStory from '@/components/product/ScentStory'
import ScentPyramid from '@/components/product/ScentPyramid'
import ScentAttributes from '@/components/product/ScentAttributes'
import CrossSell from '@/components/product/CrossSell'
import ReviewsSection from '@/components/sections/ReviewsSection'

interface PageProps {
  params: { slug: string }
}

// Static paths for both products
export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

// SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — AM Perfume`,
    description: product.scentStory.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [product.images[0]],
    },
  }
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const otherProduct = products.find(p => p.slug !== product.slug)!

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-charcoal border-b border-white/10 py-3">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <p className="font-body text-xs text-cream/40">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <span className="mx-2">›</span>
            <a href="/fragrances" className="hover:text-gold transition-colors">Fragrances</a>
            <span className="mx-2">›</span>
            <span className="text-cream/80">{product.name}</span>
          </p>
        </div>
      </nav>

      {/* Hero: Gallery + Info */}
      <section className="bg-charcoal py-12 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            <div className="w-full md:w-[55%]">
              <ProductGallery product={product} />
            </div>
            <div className="w-full md:w-[45%]">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Scent Story */}
      <ScentStory product={product} />

      {/* Scent Pyramid + Attributes side by side */}
      <section className="py-section bg-charcoal">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <ScentPyramid product={product} />
            </div>
            <div className="w-full md:w-1/2">
              <ScentAttributes product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <CrossSell product={otherProduct} />

      {/* Reviews */}
      <ReviewsSection />
    </>
  )
}
```

---

## Step 2: ProductGallery Component

```tsx
// components/product/ProductGallery.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/5] bg-primary-light overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[activeIndex]}
              alt={`${product.name} — view ${activeIndex + 1}`}
              fill
              className="object-cover"
              priority={activeIndex === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1">
          <span className="font-body text-cream/70 text-xs">Hover to zoom</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden border-2 transition-all ${
              activeIndex === index ? 'border-gold' : 'border-transparent hover:border-gold/40'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
```

---

## Step 3: ProductInfo Component

```tsx
// components/product/ProductInfo.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Product } from '@/lib/products'

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const handleAddToCart = async () => {
    setAdding(true)
    for (let i = 0; i < quantity; i++) addItem(product)
    toast.success(`${product.name} × ${quantity} added to cart`, { icon: '✨' })
    setTimeout(() => setAdding(false), 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Type badge */}
      <p className="font-body text-[11px] tracking-[0.3em] uppercase text-gold mb-3">
        {product.type} · {product.size}
      </p>

      {/* Product name */}
      <h1 className="font-display text-display-md text-white mb-2">
        {product.name}
      </h1>

      {/* Tagline */}
      <p className="font-heading text-lg text-cream/60 italic mb-5">
        {product.tagline}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
        <a href="#reviews" className="font-body text-sm text-cream/50 hover:text-gold transition-colors">
          {product.reviews.length} reviews
        </a>
      </div>

      {/* Price */}
      <div className="mb-8 pb-8 border-b border-white/10">
        <span className="font-display text-heading-xl text-gold">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Size (single option, shown as selected) */}
      <div className="mb-6">
        <p className="font-body text-xs tracking-widest uppercase text-cream/50 mb-3">Size</p>
        <div className="inline-flex items-center border border-gold px-6 py-2">
          <span className="font-body text-sm text-gold">{product.size}</span>
        </div>
      </div>

      {/* Quantity stepper */}
      <div className="mb-6">
        <p className="font-body text-xs tracking-widest uppercase text-cream/50 mb-3">Quantity</p>
        <div className="flex items-center border border-white/20 w-fit">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-12 h-12 flex items-center justify-center text-cream hover:bg-white/5 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-12 h-12 flex items-center justify-center font-body text-white">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-12 h-12 flex items-center justify-center text-cream hover:bg-white/5 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 mb-8">
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full py-4 bg-gold text-primary font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {adding ? 'Adding…' : `Add to Cart — ${formatPrice(product.price * quantity)}`}
        </button>
        <a
          href={`https://wa.me/+91XXXXXXXXXX?text=Hi! I'm interested in ${product.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 border border-white/20 text-cream font-body text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-all flex items-center justify-center gap-2"
        >
          💬 Ask About This Fragrance
        </a>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 text-center border-t border-white/10 pt-6">
        {[
          { icon: '✅', label: '100% Authentic' },
          { icon: '🚚', label: 'Free Delivery' },
          { icon: '↩️', label: '7-Day Returns' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-xl">{icon}</span>
            <span className="font-body text-[10px] text-cream/50 tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
```

---

## Step 4: ScentPyramid Component

```tsx
// components/product/ScentPyramid.tsx
'use client'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function ScentPyramid({ product }: { product: Product }) {
  const layers = [
    { label: 'Top Notes', notes: product.topNotes, width: '60%', delay: 0 },
    { label: 'Heart Notes', notes: product.heartNotes, width: '80%', delay: 0.1 },
    { label: 'Base Notes', notes: product.baseNotes, width: '100%', delay: 0.2 },
  ]

  return (
    <div>
      <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">Fragrance Structure</p>
      <h3 className="font-heading text-heading-md text-white mb-8">Scent Pyramid</h3>

      <div className="flex flex-col gap-3 items-center">
        {layers.map(({ label, notes, width, delay }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            style={{ width }}
            className="bg-primary-light border border-gold/20 p-4 text-center"
          >
            <p className="font-body text-[10px] tracking-widest uppercase text-gold/60 mb-2">{label}</p>
            <p className="font-body text-sm text-cream">{notes.join(', ')}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

---

## Step 5: ScentAttributes Component

```tsx
// components/product/ScentAttributes.tsx
'use client'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function ScentAttributes({ product }: { product: Product }) {
  const attrs = [
    { label: 'Sillage', value: product.attributes.sillage, desc: 'How far it projects' },
    { label: 'Longevity', value: product.attributes.longevity, desc: 'How long it lasts' },
    { label: 'Freshness', value: product.attributes.freshness, desc: 'Light vs heavy feel' },
    { label: 'Sweetness', value: product.attributes.sweetness, desc: 'Sweet vs dry' },
    { label: 'Intensity', value: product.attributes.intensity, desc: 'Subtle vs bold' },
  ]

  return (
    <div>
      <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">Characteristics</p>
      <h3 className="font-heading text-heading-md text-white mb-8">Scent Profile</h3>

      <div className="flex flex-col gap-5">
        {attrs.map(({ label, value, desc }, i) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-body text-sm text-cream">{label}</span>
                <span className="font-body text-xs text-cream/40 ml-2">({desc})</span>
              </div>
              <span className="font-body text-xs text-gold">{value}/100</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className="h-full bg-gold rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Occasions */}
      <div className="mt-10">
        <p className="font-body text-xs tracking-widest uppercase text-gold/60 mb-4">Best For</p>
        <div className="flex flex-wrap gap-2">
          {product.occasions.map(occasion => (
            <span key={occasion} className="font-body text-xs border border-gold/30 text-cream/70 px-4 py-2 tracking-wider">
              {occasion}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## Step 6: ScentStory Section

```tsx
// components/product/ScentStory.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Product } from '@/lib/products'

export default function ScentStory({ product }: { product: Product }) {
  const isDark = product.slug === 'am-noir'

  return (
    <section className={`py-section ${isDark ? 'bg-primary' : 'bg-cream'}`}>
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">The Story</p>
            <h2 className={`font-display text-heading-xl mb-8 ${isDark ? 'text-white' : 'text-primary'}`}>
              The Story Behind the Scent
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <p className={`font-body text-lg leading-loose ${isDark ? 'text-cream/70' : 'text-charcoal/70'}`}>
              {product.scentStory}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

## Step 7: CrossSell Component

```tsx
// components/product/CrossSell.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/products'

export default function CrossSell({ product }: { product: Product }) {
  return (
    <section className="py-section bg-primary">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">Also From AM</p>
          <h2 className="font-display text-heading-xl text-white">Complete Your Collection</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-primary-light border border-gold/20 overflow-hidden"
        >
          <div className="relative aspect-[4/3]">
            <Image src={product.images[2]} alt={product.name} fill className="object-cover" />
          </div>
          <div className="p-8 text-center">
            <p className="font-body text-xs tracking-widest uppercase text-gold mb-2">{product.type}</p>
            <h3 className="font-display text-heading-lg text-white mb-2">{product.name}</h3>
            <p className="font-heading italic text-cream/60 mb-4">{product.tagline}</p>
            <p className="font-body text-gold text-xl mb-6">{formatPrice(product.price)}</p>
            <Link
              href={`/fragrances/${product.slug}`}
              className="inline-flex items-center gap-2 bg-gold text-primary px-8 py-3 font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors"
            >
              Explore {product.name} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```
