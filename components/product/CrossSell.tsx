'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { priceFrom, type Product } from '@/lib/products'
import ProductVisual from './ProductVisual'

export default function CrossSell({ product }: { product: Product }) {
  return (
    <section className="bg-ivory py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-5 md:px-12">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">Also From AM</p>
          <h2 className="font-display text-display-md text-ink">
            Complete Your Collection
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto grid max-w-2xl overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_24px_60px_-40px_rgba(35,32,27,0.5)] sm:grid-cols-[42%_1fr]"
        >
          <div className="relative min-h-[220px] bg-cream sm:min-h-[300px]">
            <ProductVisual product={product} index={0} />
          </div>
          <div className="flex flex-col justify-center gap-2.5 p-6 text-center sm:p-8 sm:text-left">
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-gold-deep">
              {product.type}
            </p>
            <h3 className="font-display text-heading-lg text-ink">{product.name}</h3>
            <p className="font-heading italic text-ink-soft">{product.tagline}</p>
            <p className="font-body text-lg text-gold-deep">
              From {formatPrice(priceFrom(product))}
            </p>
            <Link
              href={`/fragrances/${product.slug}`}
              className="btn-gold mt-2 w-full sm:w-fit"
            >
              Explore {product.name} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
