'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import Input from '@/components/ui/Input'
import ProductVisual from '@/components/product/ProductVisual'
import Link from 'next/link'
import { IconWallet, IconCard, IconLock, IconShield, IconSparkle } from '@/components/ui/icons'

interface FormData {
  name: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  emirate: string
  area: string
  delivery: 'standard' | 'express'
  payment: 'card' | 'cod'
  promo: string
}

const EMIRATES = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah',
]

const EXPRESS_FEE = 30
const COD_FEE = 5
const PROMO_CODE = 'AMFIRST10'

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
  }
}

export default function CartPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '',
    address1: '', address2: '', city: '', emirate: '', area: '',
    delivery: 'standard', payment: 'cod', promo: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = total()
  const deliveryFee =
    form.delivery === 'express'
      ? EXPRESS_FEE
      : subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING
  const codFee = form.payment === 'cod' ? COD_FEE : 0
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const orderTotal = subtotal + deliveryFee + codFee - discount

  const set = (name: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [name]: value }))

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.replace(/[\s-]/g, '').match(/^(?:\+?971|0)?5\d{8}$/))
      e.phone = 'Valid UAE mobile required (e.g. 05X XXX XXXX)'
    if (!form.address1.trim()) e.address1 = 'Address is required'
    if (!form.city.trim()) e.city = 'City / area is required'
    if (!form.emirate) e.emirate = 'Emirate is required'
    if (!form.area.trim()) e.area = 'Area / district is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const finishOrder = (paymentId: string) => {
    clearCart()
    router.push(`/order-success?payment_id=${paymentId}`)
  }

  const handlePay = async () => {
    if (!validate()) {
      document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setLoading(true)

    // Cash on Delivery — confirm immediately, no gateway.
    if (form.payment === 'cod') {
      setTimeout(() => finishOrder(`cod_${Date.now()}`), 700)
      return
    }

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

    // Demo fallback when no payment key is configured.
    if (!key) {
      setTimeout(() => finishOrder(`demo_${Date.now()}`), 900)
      return
    }

    try {
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load payment gateway'))
          document.body.appendChild(script)
        })
      }

      let orderId: string | undefined
      try {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderTotal }),
        })
        if (res.ok) orderId = (await res.json()).orderId
      } catch {
        /* fall back to client-only checkout */
      }

      const options = {
        key,
        amount: orderTotal * 100,
        currency: 'AED',
        name: 'AM Perfume',
        description: items.map((i) => `${i.product.name} ×${i.quantity}`).join(', '),
        ...(orderId ? { order_id: orderId } : {}),
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#C9A84C' },
        handler: (response: { razorpay_payment_id: string }) =>
          finishOrder(response.razorpay_payment_id),
        modal: { ondismiss: () => setLoading(false) },
      }

      new window.Razorpay!(options).open()
    } catch (error) {
      console.error('Payment error:', error)
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
        <div className="text-center">
          <h1 className="mb-4 font-display text-display-md text-ink">Your cart is empty</h1>
          <p className="mb-6 font-body text-ink-soft">Discover your signature scent.</p>
          <Link href="/#fragrances" className="border-b border-gold pb-1 font-body text-gold-deep">
            Browse Fragrances →
          </Link>
        </div>
      </div>
    )
  }

  const payLabel = form.payment === 'cod' ? 'Place Order' : 'Pay Securely'

  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-content px-5 py-12 md:px-12">
        <h1 className="mb-10 font-display text-display-md text-ink">Checkout</h1>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* LEFT: Form */}
          <div id="checkout-form" className="w-full space-y-8 lg:w-[60%]">
            <div>
              <h2 className="mb-6 border-b border-ink/10 pb-3 font-heading text-xl text-ink">
                Contact Information
              </h2>
              <div className="space-y-4">
                <Input label="Full Name" name="name" value={form.name} placeholder="Your full name"
                  onChange={(e) => set('name', e.target.value)} error={errors.name} />
                <Input label="Email Address" name="email" type="email" value={form.email} placeholder="you@example.com"
                  onChange={(e) => set('email', e.target.value)} error={errors.email} />
                <Input label="Mobile Number" name="phone" type="tel" value={form.phone} placeholder="05X XXX XXXX"
                  onChange={(e) => set('phone', e.target.value)} error={errors.phone} />
              </div>
            </div>

            <div>
              <h2 className="mb-6 border-b border-ink/10 pb-3 font-heading text-xl text-ink">
                Delivery Address
              </h2>
              <div className="space-y-4">
                <Input label="Address (Villa / Building, Street)" name="address1" value={form.address1} placeholder="Villa / Flat no., Building, Street"
                  onChange={(e) => set('address1', e.target.value)} error={errors.address1} />
                <Input label="Address Line 2" name="address2" optional value={form.address2} placeholder="Landmark / nearby"
                  onChange={(e) => set('address2', e.target.value)} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="City / Town" name="city" value={form.city} placeholder="e.g. Abu Dhabi"
                    onChange={(e) => set('city', e.target.value)} error={errors.city} />
                  <Input label="Area / District" name="area" value={form.area} placeholder="e.g. Al Wahda"
                    onChange={(e) => set('area', e.target.value)} error={errors.area} />
                </div>
                <div>
                  <label htmlFor="emirate" className="mb-2 block font-body text-xs uppercase tracking-widest text-ink-soft">
                    Emirate <span className="text-gold-deep">*</span>
                  </label>
                  <select
                    id="emirate"
                    value={form.emirate}
                    onChange={(e) => set('emirate', e.target.value)}
                    className={`w-full border bg-white px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-gold ${
                      errors.emirate ? 'border-accent-red' : 'border-ink/20'
                    }`}
                  >
                    <option value="" className="bg-ivory">Select emirate</option>
                    {EMIRATES.map((s) => (
                      <option key={s} value={s} className="bg-ivory">{s}</option>
                    ))}
                  </select>
                  {errors.emirate && <p className="mt-1 font-body text-xs text-accent-red">{errors.emirate}</p>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 border-b border-ink/10 pb-3 font-heading text-xl text-ink">
                Delivery Method
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'standard' as const, label: 'Standard Delivery', desc: '2–4 business days', price: subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : formatPrice(STANDARD_SHIPPING) },
                  { value: 'express' as const, label: 'Express Delivery', desc: 'Next business day', price: formatPrice(EXPRESS_FEE) },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => set('delivery', option.value)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                      form.delivery === option.value ? 'border-gold bg-white' : 'border-ink/20 hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        form.delivery === option.value ? 'border-gold' : 'border-ink/30'
                      }`}>
                        {form.delivery === option.value && <div className="h-2 w-2 rounded-full bg-gold" />}
                      </div>
                      <div>
                        <p className="font-body text-sm text-ink">{option.label}</p>
                        <p className="font-body text-xs text-ink-soft">{option.desc}</p>
                      </div>
                    </div>
                    <span className={`font-body text-sm font-semibold ${option.price === 'FREE' ? 'text-gold-deep' : 'text-ink'}`}>
                      {option.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 border-b border-ink/10 pb-3 font-heading text-xl text-ink">
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'cod' as const, label: 'Cash on Delivery', desc: `Pay in cash when it arrives · +${formatPrice(COD_FEE)}` },
                  { value: 'card' as const, label: 'Card / Online Payment', desc: 'Secure card, Apple Pay & more' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => set('payment', option.value)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                      form.payment === option.value ? 'border-gold bg-white' : 'border-ink/20 hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        form.payment === option.value ? 'border-gold' : 'border-ink/30'
                      }`}>
                        {form.payment === option.value && <div className="h-2 w-2 rounded-full bg-gold" />}
                      </div>
                      <div>
                        <p className="font-body text-sm text-ink">{option.label}</p>
                        <p className="font-body text-xs text-ink-soft">{option.desc}</p>
                      </div>
                    </div>
                    {option.value === 'cod' ? (
                      <IconWallet className="h-5 w-5 text-gold-deep" />
                    ) : (
                      <IconCard className="h-5 w-5 text-gold-deep" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 border-b border-ink/10 pb-3 font-heading text-xl text-ink">
                Promo Code
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={form.promo}
                  onChange={(e) => set('promo', e.target.value.toUpperCase())}
                  placeholder={`Try ${PROMO_CODE}`}
                  disabled={promoApplied}
                  className="flex-1 border border-ink/20 bg-white px-4 py-3 font-body text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-gold disabled:opacity-60"
                />
                <button
                  onClick={() => form.promo === PROMO_CODE && setPromoApplied(true)}
                  disabled={promoApplied || !form.promo}
                  className="rounded-full border border-gold px-6 py-3 font-body text-sm tracking-wider text-gold-deep transition-all hover:bg-gold hover:text-emerald disabled:opacity-40"
                >
                  {promoApplied ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <p className="mt-2 flex items-center gap-1.5 font-body text-xs text-gold-deep">
                  <IconSparkle className="h-3.5 w-3.5" /> 10% discount applied!
                </p>
              )}
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="w-full lg:w-[40%]">
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_24px_60px_-44px_rgba(35,32,27,0.5)] lg:sticky lg:top-24">
              <h2 className="mb-6 border-b border-ink/10 pb-3 font-heading text-xl text-ink">
                Order Summary
              </h2>

              <div className="mb-6 space-y-4">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-cream">
                      <ProductVisual product={item.product} />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-primary">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm text-ink">{item.product.name}</p>
                      <p className="font-body text-xs text-ink-soft">{item.size}</p>
                    </div>
                    <p className="font-body text-sm text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-6 space-y-2 border-b border-t border-ink/10 py-4">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="text-ink">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-soft">Discount</span>
                    <span className="text-gold-deep">−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-sm">
                  <span className="text-ink-soft">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-gold-deep' : 'text-ink'}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {codFee > 0 && (
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-soft">Cash on Delivery</span>
                    <span className="text-ink">{formatPrice(codFee)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 font-body text-lg font-semibold">
                  <span className="text-ink">Total</span>
                  <span className="text-gold-deep">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-emerald py-4 font-body text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold hover:bg-emerald-light disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  `${payLabel} · ${formatPrice(orderTotal)}`
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-6">
                <span className="flex items-center gap-1.5 font-body text-xs text-ink/45">
                  <IconLock className="h-4 w-4" /> SSL Secured
                </span>
                <span className="flex items-center gap-1.5 font-body text-xs text-ink/45">
                  <IconShield className="h-4 w-4" /> Safe Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
