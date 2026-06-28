'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { priceFrom, type Product } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import ProductVisual from '@/components/product/ProductVisual'

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
  // "dark" = warm blush panel (Rooh) · "light" = cream panel (Hayat)
  const panel = variant === 'dark' ? 'bg-blush' : 'bg-cream'
  const accent = product.slug === 'rooh' ? 'text-garnet' : 'text-emerald'

  return (
    <section className={`${panel} py-section-sm md:py-section`}>
      <div
        className={`mx-auto flex max-w-content flex-col items-center gap-10 px-6 md:gap-16 md:px-12 ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
        }`}
      >
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: imagePosition === 'left' ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_80px_-50px_rgba(35,32,27,0.5)] md:w-1/2"
        >
          <ProductVisual product={product} index={0} />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full md:w-1/2"
        >
          <p className="eyebrow mb-4">Signature Collection</p>
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="font-display text-display-md text-ink">{product.name}</h2>
            <span className={`font-arabic text-2xl ${accent}`}>{product.arabicName}</span>
          </div>
          <p className="mb-6 font-heading text-xl italic text-ink-soft">{product.tagline}</p>
          <p className="mb-8 font-body text-base leading-relaxed text-ink-soft">
            {product.scentStory.substring(0, 260)}…
          </p>

          <div className="mb-8 border-t border-ink/15 pt-6">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-gold-deep">
              Scent Notes
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Top', notes: product.topNotes.slice(0, 2) },
                { label: 'Heart', notes: product.heartNotes.slice(0, 2) },
                { label: 'Base', notes: product.baseNotes.slice(0, 2) },
              ].map(({ label, notes }) => (
                <div key={label}>
                  <p className="mb-1 font-body text-xs uppercase tracking-wider text-ink/45">
                    {label}
                  </p>
                  {notes.map((note) => (
                    <p key={note} className="font-body text-sm text-ink">
                      {note}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Link href={`/fragrances/${product.slug}`} className="btn-gold">
            Shop {product.name} — From {formatPrice(priceFrom(product))} →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
