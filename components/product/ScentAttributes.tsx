'use client'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'
import { IconSparkle } from '@/components/ui/icons'

export default function ScentAttributes({ product }: { product: Product }) {
  const accentBar = product.slug === 'rooh' ? 'bg-garnet' : 'bg-emerald'
  const attrs = [
    { label: 'Sillage', value: product.attributes.sillage, desc: 'How far it projects' },
    { label: 'Longevity', value: product.attributes.longevity, desc: 'How long it lasts' },
    { label: 'Freshness', value: product.attributes.freshness, desc: 'Light vs heavy feel' },
    { label: 'Sweetness', value: product.attributes.sweetness, desc: 'Sweet vs dry' },
    { label: 'Intensity', value: product.attributes.intensity, desc: 'Subtle vs bold' },
  ]

  return (
    <div>
      <p className="eyebrow mb-2">Characteristics</p>
      <h3 className="mb-8 font-heading text-heading-md text-ink">Scent Profile</h3>

      <div className="flex flex-col gap-5">
        {attrs.map(({ label, value, desc }, i) => (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-body text-sm text-ink">{label}</span>
                <span className="ml-2 font-body text-xs text-ink/45">({desc})</span>
              </div>
              <span className="font-body text-xs text-gold-deep">{value}/100</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className={`h-full rounded-full ${accentBar}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Occasions */}
      <div className="mt-10">
        <p className="mb-4 font-body text-xs uppercase tracking-widest text-gold-deep">Best For</p>
        <div className="flex flex-wrap gap-2">
          {product.occasions.map((occasion) => (
            <span
              key={occasion}
              className="border border-gold/40 bg-white px-4 py-2 font-body text-xs tracking-wider text-ink-soft"
            >
              {occasion}
            </span>
          ))}
        </div>
      </div>

      {/* Application tips */}
      <div className="mt-10">
        <p className="mb-4 font-body text-xs uppercase tracking-widest text-gold-deep">
          Application Tips
        </p>
        <ul className="space-y-2">
          {product.applicationTips.map((tip) => (
            <li key={tip} className="flex gap-3 font-body text-sm text-ink-soft">
              <IconSparkle className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
