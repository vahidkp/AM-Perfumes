'use client'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'

export default function ReviewsSection() {
  const allReviews = products.flatMap((p) =>
    p.reviews.map((r) => ({ ...r, product: p.name }))
  )

  return (
    <section id="reviews" className="bg-ivory py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:mb-14"
        >
          <p className="eyebrow mb-4">Reviews</p>
          <h2 className="font-display text-display-md text-ink">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {allReviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={`${review.name}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-ink/10 bg-white p-8 shadow-[0_18px_50px_-34px_rgba(35,32,27,0.4)]"
            >
              <StarRating rating={review.rating} />
              <p className="my-4 font-body text-sm leading-relaxed text-ink-soft">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                <div>
                  <span className="block font-body text-sm font-semibold text-ink">
                    {review.name}
                  </span>
                  {review.location && (
                    <span className="font-body text-xs text-ink/45">
                      {review.location}
                    </span>
                  )}
                </div>
                <span className="font-body text-xs text-gold-deep">{review.product}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
