'use client'
import { motion } from 'framer-motion'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/lib/products'

export default function FeaturedProducts() {
  return (
    <section id="fragrances" className="bg-ivory py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="eyebrow mb-4">Collection</p>
          <h2 className="font-display text-display-md text-ink">
            Our Signature Fragrances
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
