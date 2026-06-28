'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IconSparkle } from '@/components/ui/icons'

export default function FooterNewsletter() {
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
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className="min-w-0 flex-1 border border-cream/25 bg-white/5 px-4 py-3 font-body text-sm text-cream placeholder-cream/40 outline-none transition-colors focus:border-gold"
      />
      <button
        type="submit"
        className="shrink-0 whitespace-nowrap bg-ivory px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-emerald transition-colors hover:bg-cream"
      >
        Subscribe
      </button>
    </form>
  )
}
