'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, whatsappLink } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Product } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'
import Accordion from '@/components/ui/Accordion'
import {
  IconShield,
  IconTruck,
  IconReturn,
  IconWhatsApp,
  IconSparkle,
} from '@/components/ui/icons'

export default function ProductInfo({ product }: { product: Product }) {
  const [size, setSize] = useState(product.size)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const variant =
    product.variants.find((v) => v.size === size) ?? {
      size: product.size,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
    }

  const handleAddToCart = () => {
    setAdding(true)
    addItem(product, variant.size, variant.price, quantity)
    toast.success(`${product.name} (${variant.size}) × ${quantity} added to cart`, {
      icon: <IconSparkle className="h-4 w-4 text-gold" />,
    })
    setTimeout(() => setAdding(false), 600)
  }

  const handleBuyNow = () => {
    addItem(product, variant.size, variant.price, quantity)
    openCart()
  }

  const accordionItems = [
    {
      title: 'Description',
      content: <p>{product.shortDescription}</p>,
    },
    {
      title: 'Fragrance Notes',
      content: (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Top', notes: product.topNotes },
            { label: 'Heart', notes: product.heartNotes },
            { label: 'Base', notes: product.baseNotes },
          ].map(({ label, notes }) => (
            <div key={label}>
              <p className="mb-1.5 font-body text-[10px] uppercase tracking-[0.18em] text-gold-deep">
                {label}
              </p>
              {notes.map((n) => (
                <p key={n} className="text-ink/80">
                  {n}
                </p>
              ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'How to Apply',
      content: (
        <ul className="space-y-2">
          {product.applicationTips.map((tip) => (
            <li key={tip} className="flex gap-2.5">
              <IconSparkle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <p>
          Free delivery across the UAE on orders over AED 150 (flat AED 15 below
          that). Cash on delivery available. Enjoy easy 7-day returns on unopened
          items — your satisfaction is guaranteed.
        </p>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-3 font-body text-[11px] uppercase tracking-[0.3em] text-gold-deep">
        {product.type} · {variant.size}
      </p>

      <div className="mb-2 flex items-baseline gap-3">
        <h1 className="font-display text-display-md text-ink">{product.name}</h1>
        <span className="font-arabic text-2xl text-gold-deep">{product.arabicName}</span>
      </div>

      <p className="mb-5 font-heading text-lg italic text-ink-soft">{product.tagline}</p>

      <div className="mb-6 flex items-center gap-3">
        <StarRating rating={product.rating} />
        <a
          href="#reviews"
          className="font-body text-sm text-ink-soft transition-colors hover:text-gold-deep"
        >
          {product.rating} · {product.reviewCount} reviews
        </a>
      </div>

      <div className="mb-8 flex items-baseline gap-3 border-b border-ink/10 pb-8">
        <span className="font-display text-display-md text-gold-deep">
          {formatPrice(variant.price)}
        </span>
        {variant.compareAtPrice && (
          <span className="font-body text-lg text-ink/30 line-through">
            {formatPrice(variant.compareAtPrice)}
          </span>
        )}
      </div>

      {/* Size */}
      <div className="mb-6">
        <p className="mb-3 font-body text-xs uppercase tracking-widest text-ink-soft">Size</p>
        <div className="flex flex-wrap gap-2.5">
          {product.variants.map((v) => {
            const active = v.size === size
            return (
              <button
                key={v.size}
                onClick={() => setSize(v.size)}
                aria-pressed={active}
                className={`flex flex-col items-center rounded-2xl border px-5 py-2.5 transition-all ${
                  active
                    ? 'border-gold bg-cream'
                    : 'border-ink/20 bg-white hover:border-gold/50'
                }`}
              >
                <span
                  className={`font-body text-sm ${active ? 'text-gold-deep' : 'text-ink'}`}
                >
                  {v.size}
                </span>
                <span className="font-body text-[11px] text-ink-soft">
                  {formatPrice(v.price)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <p className="mb-3 font-body text-xs uppercase tracking-widest text-ink-soft">Quantity</p>
        <div className="flex w-fit items-center overflow-hidden rounded-full border border-ink/20">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center text-ink transition-colors hover:bg-ink/5"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="flex h-12 w-12 items-center justify-center font-body text-ink">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-12 w-12 items-center justify-center text-ink transition-colors hover:bg-ink/5"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="mb-8 flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-emerald py-4 font-body text-sm font-semibold uppercase tracking-wider text-cream shadow-[0_12px_34px_-16px_rgba(12,58,46,0.8)] transition-all hover:border-gold hover:bg-emerald-light disabled:opacity-70"
        >
          {adding ? 'Adding…' : `Add to Cart — ${formatPrice(variant.price * quantity)}`}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald/30 py-4 font-body text-sm uppercase tracking-wider text-emerald transition-all hover:bg-emerald hover:text-ivory"
        >
          Buy Now
        </button>
        <a
          href={whatsappLink(`Hi! I'm interested in ${product.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 py-4 font-body text-sm uppercase tracking-wider text-ink transition-all hover:border-gold hover:text-gold-deep"
        >
          <IconWhatsApp className="h-4 w-4" /> Ask About This Fragrance
        </a>
      </div>

      {/* Trust */}
      <div className="grid grid-cols-3 gap-3 border-t border-ink/10 pt-6 text-center">
        {[
          { Icon: IconShield, label: '100% Authentic' },
          { Icon: IconTruck, label: 'Free Delivery' },
          { Icon: IconReturn, label: 'Easy Returns' },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <Icon className="h-6 w-6 text-gold-deep" />
            <span className="font-body text-[10px] tracking-wide text-ink-soft">{label}</span>
          </div>
        ))}
      </div>

      {/* Details accordion */}
      <div className="mt-8">
        <Accordion items={accordionItems} />
      </div>
    </motion.div>
  )
}
