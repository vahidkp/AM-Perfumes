'use client'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import ProductVisual from '@/components/product/ProductVisual'

// Bento layout — varied tile spans for an editorial feed (4-col × 3-row on desktop).
const tiles = [
  { product: products[1], index: 2, span: 'col-span-2 row-span-2' }, // hero tile
  { product: products[0], index: 0, span: 'col-span-2 row-span-1' },
  { product: products[1], index: 0, span: 'col-span-1 row-span-1' },
  { product: products[0], index: 3, span: 'col-span-1 row-span-1' },
  { product: products[0], index: 2, span: 'col-span-2 row-span-1' },
  { product: products[1], index: 3, span: 'col-span-2 row-span-1' },
]

export default function InstagramGrid() {
  return (
    <section className="bg-cream py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-5 md:px-12">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-4">@amperfume</p>
          <h2 className="font-display text-display-md text-ink">Follow Our World</h2>
        </div>

        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
          {tiles.map((tile, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/amperfume"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl ${tile.span}`}
            >
              <ProductVisual product={tile.product} index={tile.index} />
              <div className="absolute inset-0 flex items-center justify-center bg-emerald/0 transition-colors duration-300 group-hover:bg-emerald/55">
                <svg
                  className="h-8 w-8 text-ivory opacity-0 transition-all duration-300 group-hover:opacity-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.4A6.4 6.4 0 1018.4 12 6.4 6.4 0 0012 5.6zm0 10.6A4.2 4.2 0 1116.2 12 4.2 4.2 0 0112 16.2zm6.6-10.9a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
