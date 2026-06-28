'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCartStore, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import ProductVisual from '@/components/product/ProductVisual'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } =
    useCartStore()

  const subtotal = total()
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
  const orderTotal = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-heading text-xl text-ink">
                Your Cart
                <span className="ml-2 font-body text-sm text-ink-soft">
                  ({itemCount()} items)
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:text-ink"
                aria-label="Close cart"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40">
                    <svg className="h-7 w-7 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-center font-body text-sm text-ink-soft">
                    Your cart is empty.
                    <br />
                    Discover your signature scent.
                  </p>
                  <button
                    onClick={closeCart}
                    className="border-b border-gold pb-0.5 font-body text-sm text-gold-deep transition-colors hover:text-ink"
                  >
                    Browse Fragrances →
                  </button>
                </div>
              ) : (
                <div className="space-y-1 px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 border-b border-ink/10 py-4"
                      >
                        <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-cream">
                          <ProductVisual product={item.product} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-heading text-sm text-ink">
                            {item.product.name}
                          </p>
                          <p className="mb-2 font-body text-xs text-ink-soft">
                            {item.size} · {item.product.type}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-ink/20">
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center text-sm text-ink transition-colors hover:bg-ink/5"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="flex h-7 w-7 items-center justify-center font-body text-sm text-ink">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center text-sm text-ink transition-colors hover:bg-ink/5"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.key)}
                              className="font-body text-xs text-ink/40 transition-colors hover:text-garnet"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="flex-shrink-0 text-right">
                          <p className="font-body text-sm font-semibold text-gold-deep">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ink/10 bg-white px-6 py-6">
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="mb-4 border border-gold/30 bg-cream px-4 py-2">
                    <p className="text-center font-body text-xs text-ink-soft">
                      Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free delivery
                    </p>
                    <div className="mt-2 h-1 rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-ink-soft">Shipping</span>
                    <span className={shipping === 0 ? 'text-gold-deep' : 'text-ink'}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-ink/10 pt-2 font-body text-base font-semibold">
                    <span className="text-ink">Total</span>
                    <span className="text-gold-deep">{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-emerald py-4 font-body text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold hover:bg-emerald-light"
                >
                  Proceed to Checkout →
                </Link>
                <button
                  onClick={closeCart}
                  className="mt-3 w-full font-body text-xs tracking-wider text-ink-soft transition-colors hover:text-ink"
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
