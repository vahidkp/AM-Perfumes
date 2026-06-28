---
name: luxury-hero-section
description: Build cinematic, luxury hero sections and full-width editorial banner components for the AM Perfume website. Use this skill whenever the user wants to create the homepage hero (full-viewport, dark, animated), brand story split-section, product spotlight sections, or any full-width editorial dark/light editorial blocks. Trigger on: "hero section", "above the fold", "homepage banner", "product spotlight", "brand story section", "cinematic section", "full-bleed section", "editorial banner", or any request to build a visually impactful landing section with animations.
---

# Luxury Hero Section Skill

Build immersive, cinematic hero and editorial sections for AM Perfume. These sections define the visual identity of the brand and must feel premium, dark, and editorial.

## Design Principles

- **Full-viewport hero** — always `min-h-screen`, never feel cramped
- **Dark-first** — primary background `#0A2218` (deep green) or `#1A1A1A` (charcoal)
- **Gold accents** — CTAs, eyebrow tags, and decorative lines in `#C9A84C`
- **Serif type for all headings** — `font-display` (Cormorant Garamond) for hero, `font-heading` (Playfair Display) for subsections
- **Framer Motion** — all text and images animate in on scroll with `initial`, `whileInView`, and `viewport={{ once: true }}`
- **Parallax** — hero product image moves at 0.5x scroll speed via `useScroll` + `useTransform`

---

## Component 1: HeroSection (Full-Viewport Homepage Hero)

```tsx
// components/sections/HeroSection.tsx
'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />

      {/* Hero product image (parallax) */}
      <motion.div
        style={{ y: imageY }}
        className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0"
      >
        <Image
          src="/images/lifestyle/hero-bg.jpg"
          alt="AM Perfume Hero"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-content mx-auto px-6 md:px-12 w-full py-20"
      >
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6"
          >
            The Art of Fragrance
          </motion.p>

          {/* Hero heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-display-lg md:text-display-xl text-white leading-none mb-6"
          >
            Wear
            <br />
            <span className="text-gold italic">Your</span>
            <br />
            Story
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-cream/80 text-lg mb-10 max-w-sm leading-relaxed"
          >
            Two signature fragrances crafted for those who dare to leave an impression.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/fragrances/am-noir"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-primary font-body font-semibold text-sm tracking-wider uppercase transition-all hover:bg-gold-light hover:scale-105"
            >
              Shop AM Noir
            </Link>
            <Link
              href="/fragrances/am-lumiere"
              className="inline-flex items-center justify-center px-8 py-4 border border-cream/40 text-cream font-body font-semibold text-sm tracking-wider uppercase transition-all hover:border-gold hover:text-gold"
            >
              Shop AM Lumière
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent z-20" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-cream/40 font-body text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  )
}
```

---

## Component 2: Trust Strip (Below Hero)

```tsx
// components/sections/TrustStrip.tsx
const TrustStrip = () => {
  const items = [
    { icon: '🚚', text: 'Free Delivery Above ₹999' },
    { icon: '✨', text: '100% Authentic Fragrances' },
    { icon: '↩️', text: '7-Day Easy Returns' },
    { icon: '🔒', text: 'Secure Checkout' },
  ]
  return (
    <div className="bg-primary-light border-y border-gold/20">
      <div className="max-w-content mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.text} className="flex items-center gap-3 justify-center">
              <span className="text-lg">{item.icon}</span>
              <span className="font-body text-cream/80 text-xs tracking-wide">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## Component 3: ProductSpotlight (Full-Bleed Editorial)

Two variants: `dark` (for AM Noir) and `light` (for AM Lumière)

```tsx
// components/sections/ProductSpotlight.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'

interface ProductSpotlightProps {
  product: Product
  variant: 'dark' | 'light'
  imagePosition?: 'left' | 'right'
}

export default function ProductSpotlight({
  product,
  variant,
  imagePosition = 'left',
}: ProductSpotlightProps) {
  const isDark = variant === 'dark'

  return (
    <section className={`py-section ${isDark ? 'bg-primary' : 'bg-cream'}`}>
      <div className={`max-w-content mx-auto px-6 md:px-12 flex flex-col ${
        imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
      } gap-12 md:gap-20 items-center`}>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: imagePosition === 'left' ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 aspect-[3/4] relative"
        >
          <Image
            src={product.images[2]}
            alt={product.name}
            fill
            className="object-cover"
          />
          {/* Atmospheric overlay for dark variant */}
          {isDark && (
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          {/* Eyebrow */}
          <p className={`font-body text-xs tracking-[0.3em] uppercase mb-4 ${
            isDark ? 'text-gold' : 'text-gold'
          }`}>
            Signature Collection
          </p>

          {/* Product name */}
          <h2 className={`font-display text-display-md mb-4 ${
            isDark ? 'text-white' : 'text-primary'
          }`}>
            {product.name}
          </h2>

          {/* Tagline */}
          <p className={`font-heading text-xl italic mb-6 ${
            isDark ? 'text-cream/70' : 'text-charcoal/70'
          }`}>
            {product.tagline}
          </p>

          {/* Scent story */}
          <p className={`font-body text-base leading-relaxed mb-8 ${
            isDark ? 'text-cream/60' : 'text-charcoal/70'
          }`}>
            {product.scentStory.substring(0, 280)}…
          </p>

          {/* Scent Pyramid — mini */}
          <div className={`border-t ${isDark ? 'border-gold/20' : 'border-primary/20'} pt-6 mb-8`}>
            <p className={`font-body text-xs tracking-widest uppercase mb-3 ${
              isDark ? 'text-gold/60' : 'text-gold'
            }`}>Scent Notes</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Top', notes: product.topNotes.slice(0, 2) },
                { label: 'Heart', notes: product.heartNotes.slice(0, 2) },
                { label: 'Base', notes: product.baseNotes.slice(0, 2) },
              ].map(({ label, notes }) => (
                <div key={label}>
                  <p className={`font-body text-xs uppercase tracking-wider mb-1 ${
                    isDark ? 'text-cream/40' : 'text-charcoal/50'
                  }`}>{label}</p>
                  {notes.map(note => (
                    <p key={note} className={`font-body text-sm ${
                      isDark ? 'text-cream' : 'text-charcoal'
                    }`}>{note}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/fragrances/${product.slug}`}
            className={`inline-flex items-center gap-3 px-8 py-4 font-body font-semibold text-sm tracking-wider uppercase transition-all hover:scale-105 ${
              isDark
                ? 'bg-gold text-primary hover:bg-gold-light'
                : 'bg-primary text-cream hover:bg-primary-light'
            }`}
          >
            Shop {product.name} — ₹{product.price.toLocaleString('en-IN')}
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Component 4: BrandStory (50/50 Split)

```tsx
// components/sections/BrandStory.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function BrandStory() {
  return (
    <section className="bg-charcoal">
      <div className="max-w-content mx-auto flex flex-col md:flex-row">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[600px] relative"
        >
          <Image
            src="/images/lifestyle/brand-story.jpg"
            alt="AM Perfume Story"
            fill
            className="object-cover"
          />
          {/* Gold corner accent */}
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-gold opacity-60" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 bg-cream flex items-center px-12 py-16 md:py-20"
        >
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Our Philosophy
            </p>
            <h2 className="font-display text-display-md text-primary leading-tight mb-6">
              Crafted for Those Who Dare to Leave an Impression
            </h2>
            <div className="w-12 h-px bg-gold mb-6" />
            <p className="font-body text-base text-charcoal/70 leading-relaxed mb-4">
              AM Perfume was born from a belief that fragrance is the most intimate form of self-expression. When everything else fades from memory, scent remains — a signature as unique as a fingerprint.
            </p>
            <p className="font-body text-base text-charcoal/70 leading-relaxed mb-8">
              Each of our two fragrances is carefully composed from the world's finest ingredients, blending ancient Middle Eastern perfumery traditions with a modern sensibility that speaks to those who live boldly.
            </p>
            <a
              href="#"
              className="font-body text-sm tracking-wider uppercase text-primary border-b border-gold pb-1 hover:text-gold transition-colors"
            >
              Discover Our Story →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Animation Pattern Reference

Always use these Framer Motion patterns for consistency:

```tsx
// Fade up from below (most common)
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>

// Fade in from side
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>

// Stagger children
<motion.div
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.div
      key={item}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```
