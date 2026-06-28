---
name: cart-checkout-flow
description: Build the cart drawer, cart page, and complete single-page checkout flow for AM Perfume including Razorpay payment integration. Use this skill whenever the user wants to build the cart drawer (slide-in panel), the /cart page, the checkout form, order summary, Razorpay payment gateway integration, promo code input, or thank-you/confirmation page. Trigger on: "cart drawer", "cart page", "checkout", "checkout form", "Razorpay", "payment integration", "order summary", "add to cart flow", "cart slide-in", "promo code", or any request involving the purchase/payment experience on the AM Perfume site.
---

# Cart & Checkout Flow Skill

Build the complete cart and checkout experience for AM Perfume. This covers 3 pieces:
1. **CartDrawer** — slide-in panel from the right
2. **Cart/Checkout Page** — full single-page checkout at `/cart`
3. **Razorpay Integration** — payment gateway for India

---

## Component 1: CartDrawer (Slide-in Panel)

```tsx
// components/layout/CartDrawer.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCartStore()

  const subtotal = total()
  const shipping = subtotal >= 999 ? 0 : 99
  const orderTotal = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-charcoal z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="font-heading text-xl text-white">
                Your Cart
                <span className="font-body text-sm text-cream/50 ml-2">({itemCount()} items)</span>
              </h2>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
                  <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="font-body text-cream/50 text-sm text-center">
                    Your cart is empty.
                    <br />Discover your signature scent.
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-body text-sm text-gold border-b border-gold pb-0.5 hover:text-gold-light transition-colors"
                  >
                    Browse Fragrances →
                  </button>
                </div>
              ) : (
                <div className="px-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 py-4 border-b border-white/10"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-20 bg-primary-light flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm text-white truncate">{item.product.name}</p>
                        <p className="font-body text-xs text-cream/50 mb-2">{item.product.size} · {item.product.type}</p>

                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-white/20">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-cream hover:bg-white/5 transition-colors text-sm"
                            >−</button>
                            <span className="w-7 h-7 flex items-center justify-center font-body text-sm text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-cream hover:bg-white/5 transition-colors text-sm"
                            >+</button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="font-body text-xs text-cream/30 hover:text-accent-red transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-body text-gold font-semibold text-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer: Summary + CTA */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6">
                {/* Shipping notice */}
                {subtotal < 999 && (
                  <div className="bg-primary-light border border-gold/20 px-4 py-2 mb-4">
                    <p className="font-body text-xs text-cream/60 text-center">
                      Add {formatPrice(999 - subtotal)} more for free delivery
                    </p>
                    <div className="mt-2 h-1 bg-white/10 rounded-full">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-cream/60">Subtotal</span>
                    <span className="text-cream">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-cream/60">Shipping</span>
                    <span className={shipping === 0 ? 'text-gold' : 'text-cream'}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-body font-semibold text-base pt-2 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-gold">{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-4 bg-gold text-primary font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout →
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full mt-3 font-body text-xs text-cream/40 hover:text-cream transition-colors tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## Component 2: Navbar (with Cart Icon)

```tsx
// components/layout/Navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, itemCount } = useCartStore()
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
      scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-content mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl text-gold tracking-wider">
          AM
          <span className="font-body text-xs text-cream/60 ml-1 tracking-[0.2em] uppercase align-middle">Perfume</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-cream/70 hover:text-gold transition-colors tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 text-cream/70 hover:text-gold transition-colors"
            aria-label={`Open cart, ${count} items`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-primary text-[9px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-cream/70 hover:text-gold transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-px bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal/98 border-t border-white/10 px-6 py-6 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-body text-cream/80 hover:text-gold py-2 transition-colors tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
```

---

## Component 3: Checkout Page (app/cart/page.tsx)

```tsx
// app/cart/page.tsx
'use client'
import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface FormData {
  name: string; email: string; phone: string
  address1: string; address2: string; city: string; state: string; pin: string
  delivery: 'standard' | 'express'
  promo: string
}

const INDIAN_STATES = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal',
]

export default function CartPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '',
    address1: '', address2: '', city: '', state: '', pin: '',
    delivery: 'standard', promo: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = total()
  const deliveryFee = form.delivery === 'express' ? 199 : (subtotal >= 999 ? 0 : 99)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const orderTotal = subtotal + deliveryFee - discount

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.match(/^\d{10}$/)) e.phone = '10-digit phone number required'
    if (!form.address1.trim()) e.address1 = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state) e.state = 'State is required'
    if (!form.pin.match(/^\d{6}$/)) e.pin = '6-digit PIN code required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleRazorpay = async () => {
    if (!validate()) return
    setLoading(true)

    try {
      // Load Razorpay script dynamically
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)

      await new Promise(res => script.onload = res)

      // In production: call your API to create Razorpay order
      // const { orderId } = await fetch('/api/create-order', {
      //   method: 'POST',
      //   body: JSON.stringify({ amount: orderTotal * 100 })
      // }).then(r => r.json())

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderTotal * 100, // in paise
        currency: 'INR',
        name: 'AM Perfume',
        description: items.map(i => `${i.product.name} x${i.quantity}`).join(', '),
        // order_id: orderId, // from backend
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#C9A84C' },
        handler: (response: { razorpay_payment_id: string }) => {
          clearCart()
          router.push(`/order-success?payment_id=${response.razorpay_payment_id}`)
        },
      }

      // @ts-ignore — Razorpay is loaded via script
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  const field = (
    name: keyof FormData,
    label: string,
    type = 'text',
    placeholder = ''
  ) => (
    <div>
      <label className="block font-body text-xs tracking-widest uppercase text-cream/50 mb-2">
        {label} <span className="text-gold">*</span>
      </label>
      <input
        type={type}
        value={form[name] as string}
        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-primary-light border px-4 py-3 font-body text-sm text-cream placeholder-cream/30 outline-none focus:border-gold transition-colors ${
          errors[name] ? 'border-accent-red' : 'border-white/20'
        }`}
      />
      {errors[name] && (
        <p className="font-body text-xs text-accent-red mt-1">{errors[name]}</p>
      )}
    </div>
  )

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-heading-xl text-white mb-4">Your cart is empty</h1>
          <a href="/" className="font-body text-gold border-b border-gold">Browse Fragrances →</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal pt-20">
      <div className="max-w-content mx-auto px-6 md:px-12 py-12">
        <h1 className="font-display text-heading-xl text-white mb-10">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Form */}
          <div className="w-full lg:w-[60%] space-y-8">

            {/* Contact */}
            <div>
              <h2 className="font-heading text-xl text-white mb-6 pb-3 border-b border-white/10">
                Contact Information
              </h2>
              <div className="space-y-4">
                {field('name', 'Full Name', 'text', 'Your full name')}
                {field('email', 'Email Address', 'email', 'you@example.com')}
                {field('phone', 'Phone Number', 'tel', '10-digit mobile number')}
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="font-heading text-xl text-white mb-6 pb-3 border-b border-white/10">
                Delivery Address
              </h2>
              <div className="space-y-4">
                {field('address1', 'Address Line 1', 'text', 'House/Flat no., Street, Area')}
                <div>
                  <label className="block font-body text-xs tracking-widest uppercase text-cream/50 mb-2">
                    Address Line 2 <span className="text-cream/30">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.address2}
                    onChange={e => setForm(f => ({ ...f, address2: e.target.value }))}
                    placeholder="Landmark, Building name"
                    className="w-full bg-primary-light border border-white/20 px-4 py-3 font-body text-sm text-cream placeholder-cream/30 outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {field('city', 'City')}
                  <div>
                    <label className="block font-body text-xs tracking-widest uppercase text-cream/50 mb-2">
                      State <span className="text-gold">*</span>
                    </label>
                    <select
                      value={form.state}
                      onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                      className={`w-full bg-primary-light border px-4 py-3 font-body text-sm text-cream outline-none focus:border-gold transition-colors ${
                        errors.state ? 'border-accent-red' : 'border-white/20'
                      }`}
                    >
                      <option value="" className="bg-charcoal">Select state</option>
                      {INDIAN_STATES.map(s => (
                        <option key={s} value={s} className="bg-charcoal">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {field('pin', 'PIN Code', 'text', '6-digit PIN')}
              </div>
            </div>

            {/* Delivery method */}
            <div>
              <h2 className="font-heading text-xl text-white mb-6 pb-3 border-b border-white/10">
                Delivery Method
              </h2>
              <div className="space-y-3">
                {[
                  {
                    value: 'standard' as const,
                    label: 'Standard Delivery',
                    desc: '3–5 business days',
                    price: subtotal >= 999 ? 'FREE' : '₹99',
                  },
                  {
                    value: 'express' as const,
                    label: 'Express Delivery',
                    desc: '1–2 business days',
                    price: '₹199',
                  },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setForm(f => ({ ...f, delivery: option.value }))}
                    className={`w-full flex items-center justify-between p-4 border transition-all text-left ${
                      form.delivery === option.value
                        ? 'border-gold bg-primary-light'
                        : 'border-white/20 hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        form.delivery === option.value ? 'border-gold' : 'border-white/30'
                      }`}>
                        {form.delivery === option.value && (
                          <div className="w-2 h-2 rounded-full bg-gold" />
                        )}
                      </div>
                      <div>
                        <p className="font-body text-sm text-white">{option.label}</p>
                        <p className="font-body text-xs text-cream/50">{option.desc}</p>
                      </div>
                    </div>
                    <span className={`font-body text-sm font-semibold ${
                      option.price === 'FREE' ? 'text-gold' : 'text-cream'
                    }`}>{option.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Promo code */}
            <div>
              <h2 className="font-heading text-xl text-white mb-6 pb-3 border-b border-white/10">
                Promo Code
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={form.promo}
                  onChange={e => setForm(f => ({ ...f, promo: e.target.value.toUpperCase() }))}
                  placeholder="Enter promo code"
                  className="flex-1 bg-primary-light border border-white/20 px-4 py-3 font-body text-sm text-cream placeholder-cream/30 outline-none focus:border-gold transition-colors"
                  disabled={promoApplied}
                />
                <button
                  onClick={() => {
                    if (form.promo === 'AMFIRST10') setPromoApplied(true)
                  }}
                  disabled={promoApplied || !form.promo}
                  className="px-6 py-3 border border-gold text-gold font-body text-sm tracking-wider hover:bg-gold hover:text-primary transition-all disabled:opacity-40"
                >
                  {promoApplied ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <p className="font-body text-xs text-gold mt-2">🎉 10% discount applied!</p>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary (sticky) */}
          <div className="w-full lg:w-[40%]">
            <div className="lg:sticky lg:top-24 bg-primary-light border border-white/10 p-6">
              <h2 className="font-heading text-xl text-white mb-6 pb-3 border-b border-white/10">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-18 bg-primary flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={56}
                        height={72}
                        className="object-cover w-full h-full"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm text-white">{item.product.name}</p>
                      <p className="font-body text-xs text-cream/50">{item.product.size}</p>
                    </div>
                    <p className="font-body text-sm text-cream">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 py-4 border-t border-b border-white/10 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-cream/60">Subtotal</span>
                  <span className="text-cream">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-cream/60">Discount</span>
                    <span className="text-gold">−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-sm">
                  <span className="text-cream/60">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-gold' : 'text-cream'}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between font-body font-semibold text-lg pt-2">
                  <span className="text-white">Total</span>
                  <span className="text-gold">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handleRazorpay}
                disabled={loading}
                className="w-full py-4 bg-gold text-primary font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay ${formatPrice(orderTotal)}`
                )}
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <span className="font-body text-xs text-cream/40">🔒 SSL Secured</span>
                <span className="font-body text-xs text-cream/40">✅ Safe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## API Route: Create Razorpay Order (Backend)

```ts
// app/api/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: NextRequest) {
  const { amount } = await req.json()

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // in paise
    currency: 'INR',
    receipt: `order_${Date.now()}`,
  })

  return NextResponse.json({ orderId: order.id })
}
```

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret_here
```

---

## Order Success Page

```tsx
// app/order-success/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function OrderSuccess() {
  const params = useSearchParams()
  const paymentId = params.get('payment_id')

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-heading-xl text-white mb-3">Order Confirmed!</h1>
        <p className="font-body text-cream/60 mb-2">
          Thank you for choosing AM Perfume.
        </p>
        {paymentId && (
          <p className="font-body text-xs text-cream/40 mb-8">
            Payment ID: {paymentId}
          </p>
        )}
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/+91XXXXXXXXXX?text=Hi! I just placed an order. Payment ID: ${paymentId}`}
            target="_blank"
            className="w-full py-3 bg-gold text-primary font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
          >
            💬 Confirm via WhatsApp
          </a>
          <Link
            href="/"
            className="w-full py-3 border border-white/20 text-cream font-body text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
```
