'use client'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { Product } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'
import { IconSparkle } from '@/components/ui/icons'

export default function ProductReviews({ product }: { product: Product }) {
  // Plausible star distribution scaled to the review count.
  const pct = [0.82, 0.13, 0.03, 0.015, 0.005] // 5★ → 1★
  const counts = pct.map((p) => Math.round(p * product.reviewCount))

  return (
    <section id="reviews" className="bg-ivory py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-5 md:px-12">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-4">Reviews</p>
          <h2 className="font-display text-display-md text-ink">What Our Customers Say</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-fit rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-[0_18px_50px_-34px_rgba(35,32,27,0.4)] lg:sticky lg:top-24"
          >
            <p className="font-display text-6xl leading-none text-ink">
              {product.rating.toFixed(1)}
            </p>
            <div className="mt-3 flex justify-center">
              <StarRating rating={product.rating} size={18} />
            </div>
            <p className="mt-2 font-body text-sm text-ink-soft">
              Based on {product.reviewCount} reviews
            </p>

            <div className="mt-6 space-y-2 text-left">
              {[5, 4, 3, 2, 1].map((star, i) => {
                const max = Math.max(...counts, 1)
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-3 font-body text-xs text-ink-soft">{star}</span>
                    <IconSparkle className="h-3 w-3 text-gold" />
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full bg-gold"
                        style={{ width: `${(counts[i] / max) * 100}%` }}
                      />
                    </div>
                    <span className="w-7 text-right font-body text-xs text-ink/45">
                      {counts[i]}
                    </span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => toast.success('Review form coming soon ✨')}
              className="mt-7 w-full rounded-full border border-emerald/30 py-3 font-body text-xs font-semibold uppercase tracking-[0.15em] text-emerald transition-all hover:bg-emerald hover:text-ivory"
            >
              Write a Review
            </button>
          </motion.div>

          {/* Review cards */}
          <div className="space-y-5">
            {product.reviews.map((review, i) => (
              <motion.div
                key={`${review.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_18px_50px_-36px_rgba(35,32,27,0.4)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span className="inline-flex items-center gap-1.5 font-body text-[11px] uppercase tracking-wider text-emerald">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Verified Buyer
                  </span>
                </div>
                <p className="mb-4 font-body text-[15px] leading-relaxed text-ink/80">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-2 border-t border-ink/10 pt-4">
                  <span className="font-body text-sm font-semibold text-ink">
                    {review.name}
                  </span>
                  {review.location && (
                    <span className="font-body text-xs text-ink/45">· {review.location}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
