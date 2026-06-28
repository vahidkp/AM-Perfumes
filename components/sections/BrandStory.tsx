'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function BrandStory() {
  return (
    <section id="story" className="bg-ivory py-section-sm md:py-section">
      <div className="mx-auto grid max-w-content items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-12">
        {/* Lifestyle photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl md:aspect-[5/6]"
        >
          <Image
            src="/images/lifestyle-office.png"
            alt="Hayat and Rooh by AM Perfume in an executive setting"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="md:pr-4"
        >
          <p className="eyebrow mb-4">Our Philosophy</p>
          <h2 className="mb-6 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-tight text-ink">
            Crafted for Those Who Dare to Leave an Impression
          </h2>
          <div className="mb-6 h-px w-12 bg-gold" />
          <p className="mb-4 font-body text-base leading-relaxed text-ink-soft">
            Born in Abu Dhabi, AM Perfume was founded on a belief that fragrance is the
            most intimate form of self-expression. When everything else fades from
            memory, scent remains — a signature as unique as a fingerprint.
          </p>
          <p className="mb-8 font-body text-base leading-relaxed text-ink-soft">
            Each of our two fragrances — Hayat and Rooh — is composed from the finest
            ingredients, blending the rich heritage of Arabian perfumery with a modern
            sensibility made for those who live boldly across the Emirates and beyond.
          </p>
          <Link
            href="#fragrances"
            className="border-b border-gold pb-1 font-body text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:text-gold-deep"
          >
            Discover Our Story →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
