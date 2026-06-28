'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { IconSparkle } from '@/components/ui/icons'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email')
      return
    }
    toast.success('Welcome to AM Perfume', {
      icon: <IconSparkle className="h-4 w-4 text-gold" />,
    })
    setEmail('')
  }

  return (
    <section className="bg-sand py-section-sm md:py-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl px-6 text-center md:px-12"
      >
        <p className="eyebrow mb-4">Newsletter</p>
        <h2 className="mb-4 font-display text-display-md text-ink">
          Be the First to Know
        </h2>
        <p className="mb-8 font-body text-base text-ink-soft">
          Exclusive offers, new launches, and scent stories — straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="flex-1 border border-ink/20 bg-white px-4 py-3.5 font-body text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-gold"
          />
          <button
            type="submit"
            className="whitespace-nowrap border border-gold/50 bg-emerald px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-all hover:border-gold hover:bg-emerald-light"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4 font-body text-xs text-ink/45">
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  )
}
