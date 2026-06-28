'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart-store'
import {
  IconTruck,
  IconGift,
  IconWallet,
  IconShield,
} from '@/components/ui/icons'

const ANNOUNCEMENTS = [
  { text: 'Free Delivery Across the UAE', Icon: IconTruck },
  { text: 'Buy 2 Get 1 Free', Icon: IconGift },
  { text: 'Cash on Delivery Available', Icon: IconWallet },
  { text: '100% Authentic Fragrances', Icon: IconShield },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const openCart = useCartStore((s) => s.openCart)
  const itemCount = useCartStore((s) => s.itemCount)
  const count = itemCount()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/#story' },
    { label: 'Fragrances', href: '/#fragrances' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      {/* Announcement marquee (scrolls away) */}
      <div className="overflow-hidden bg-emerald">
        <div className="flex animate-marquee whitespace-nowrap py-2.5 text-[11px] uppercase tracking-[0.22em] text-cream/85">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex shrink-0">
              {ANNOUNCEMENTS.map(({ text, Icon }) => (
                <span key={text} className="mx-6 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold-light" /> {text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Sticky header */}
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? 'border-ink/10 bg-ivory/95 shadow-[0_8px_30px_-18px_rgba(35,32,27,0.4)] backdrop-blur-md'
            : 'border-transparent bg-ivory'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-content items-center justify-between px-5 md:px-12">
          <Link href="/" aria-label="AM Perfume — Home" className="flex items-center">
            <Image
              src="/images/am-logo.png"
              alt="AM Perfume"
              width={841}
              height={423}
              priority
              className="h-11 w-auto md:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[13px] uppercase tracking-[0.12em] text-ink/70 transition-colors hover:text-gold-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="hidden p-2 text-ink/70 transition-colors hover:text-gold-deep sm:block"
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </button>

            <button
              onClick={openCart}
              className="relative p-2 text-ink/70 transition-colors hover:text-gold-deep"
              aria-label={`Open cart, ${count} items`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {mounted && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-emerald">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-ink/70 transition-colors hover:text-gold-deep md:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <div className="w-5 space-y-1.5">
                <span className={`block h-px bg-current transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-px bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-current transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="absolute inset-x-0 top-full space-y-1 border-b border-ink/10 bg-ivory px-5 pb-6 pt-2 shadow-[0_18px_40px_-20px_rgba(35,32,27,0.45)] md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-body text-sm uppercase tracking-[0.12em] text-ink/75 transition-colors hover:text-gold-deep"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
