'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function PromoBanner() {
  return (
    <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-emerald">
      <Image
        src="/images/hero-dual-dark.png"
        alt="AM Perfume offer"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald/95 via-emerald/70 to-emerald/30" />

      <div className="absolute inset-0 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-content px-5 md:px-12"
        >
          <div className="max-w-xl">
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light">
              Exclusive Offer
            </p>
            <h2 className="mb-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-none text-ivory">
              Buy 2, Get 1 Free
            </h2>
            <p className="mb-7 max-w-md font-body text-base leading-relaxed text-cream/80">
              Build your signature wardrobe of scent. Free delivery across the UAE and
              cash on delivery available — for a limited time.
            </p>
            <Link
              href="/#fragrances"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-ivory px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-emerald transition-all duration-300 hover:bg-cream sm:w-auto"
            >
              Shop the Collection →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
