'use client'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function ScentPyramid({ product }: { product: Product }) {
  const isRooh = product.slug === 'rooh'
  const accentText = isRooh ? 'text-garnet' : 'text-emerald'
  const accentBg = isRooh ? 'bg-garnet' : 'bg-emerald'
  const accentBorder = isRooh ? 'border-t-garnet' : 'border-t-emerald'

  const layers = [
    { label: 'Top Notes', sub: 'First impression', notes: product.topNotes, width: '62%', n: '01' },
    { label: 'Heart Notes', sub: 'The character', notes: product.heartNotes, width: '82%', n: '02' },
    { label: 'Base Notes', sub: 'The lasting trail', notes: product.baseNotes, width: '100%', n: '03' },
  ]

  return (
    <div>
      <p className="eyebrow mb-2">Fragrance Structure</p>
      <h3 className="mb-8 font-heading text-heading-md text-ink">Scent Pyramid</h3>

      <div className="relative flex flex-col items-center gap-3">
        {/* apex marker */}
        <span className={`mb-1 h-2.5 w-2.5 rotate-45 ${accentBg}`} />

        {layers.map(({ label, sub, notes, width, n }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14, scaleX: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
            style={{ width }}
            className={`relative rounded-2xl border border-ink/10 ${accentBorder} border-t-2 bg-white px-5 py-4 text-center shadow-[0_16px_40px_-30px_rgba(35,32,27,0.5)]`}
          >
            <span
              className={`absolute -left-3 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full ${accentBg} font-body text-[10px] font-semibold text-cream sm:flex`}
            >
              {n}
            </span>
            <p className={`font-body text-[10px] uppercase tracking-[0.22em] ${accentText}`}>
              {label}
            </p>
            <p className="mt-1.5 font-heading text-base text-ink">{notes.join(' · ')}</p>
            <p className="mt-0.5 font-body text-[11px] italic text-ink/45">{sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
