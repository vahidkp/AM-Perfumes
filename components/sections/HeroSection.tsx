'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    src: '/images/lifestyle-office.png',
    alt: 'Hayat and Rooh by AM Perfume',
    eyebrow: 'Modern Arabian Luxury',
    title: 'Wear Your Story',
    subtitle: 'Two signature scents — Hayat & Rooh — crafted in the heart of Abu Dhabi.',
  },
  {
    src: '/images/hero-dual-dark.png',
    alt: 'Hayat and Rooh fragrances',
    eyebrow: 'The Art of Fragrance',
    title: 'Presence, Bottled',
    subtitle: 'Heritage perfumery reimagined for the discerning few across the Emirates.',
  },
  {
    src: '/images/duo-white.png',
    alt: 'Hayat and Rooh gift sets',
    eyebrow: 'The Signature Duo',
    title: 'A Gift to Remember',
    subtitle: 'Elegantly boxed. Buy 2 Get 1 Free — with free delivery across the UAE.',
  },
]

const AUTOPLAY_MS = 5500

export default function HeroSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [])

  const slide = slides[index]

  return (
    <section
      className="relative h-[72vh] min-h-[480px] w-full overflow-hidden bg-cream md:h-[82vh]"
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      {/* Hero copy directly on the image */}
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="mx-auto w-full max-w-content px-5 pb-16 md:px-12 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light">
                  {slide.eyebrow}
                </span>
              </div>
              <h1 className="mb-5 font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[1.04] text-ivory drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                {slide.title}
              </h1>
              <p className="mb-8 max-w-md font-body text-base leading-relaxed text-cream/85 md:text-lg">
                {slide.subtitle}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/fragrances/rooh" className="btn-gold w-full sm:w-auto">
                  Shop Rooh
                </Link>
                <Link
                  href="/fragrances/hayat"
                  className="inline-flex w-full items-center justify-center rounded-full border border-ivory/60 px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:bg-ivory hover:text-emerald sm:w-auto"
                >
                  Shop Hayat
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-gold' : 'w-3 bg-ivory/70 hover:bg-ivory'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
