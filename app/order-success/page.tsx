'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { whatsappLink } from '@/lib/utils'
import { IconWhatsApp } from '@/components/ui/icons'

function OrderSuccessInner() {
  const params = useSearchParams()
  const paymentId = params.get('payment_id')
  const orderNumber = `AM-${(paymentId || 'XXXX').slice(-6).toUpperCase()}`

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold">
          <svg className="h-10 w-10 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-3 font-display text-display-md text-ink">Order Confirmed!</h1>
        <p className="mb-1 font-body text-ink-soft">Thank you for choosing AM Perfume.</p>
        <p className="mb-2 font-body text-sm text-gold-deep">Order {orderNumber}</p>
        {paymentId && (
          <p className="mb-8 font-body text-xs text-ink/45">Payment ID: {paymentId}</p>
        )}
        <div className="flex flex-col gap-3">
          <a
            href={whatsappLink(`Hi! I just placed order ${orderNumber}. Payment ID: ${paymentId}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-emerald py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold hover:bg-emerald-light"
          >
            <IconWhatsApp className="h-4 w-4" /> Confirm via WhatsApp
          </a>
          <Link
            href="/"
            className="w-full rounded-full border border-ink/20 py-3.5 font-body text-sm uppercase tracking-wider text-ink transition-colors hover:border-gold hover:text-gold-deep"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <OrderSuccessInner />
    </Suspense>
  )
}
