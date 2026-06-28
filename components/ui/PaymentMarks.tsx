'use client'
import {
  VisaFlatRoundedIcon,
  MastercardFlatRoundedIcon,
  AmericanExpressFlatRoundedIcon,
} from 'react-svg-credit-card-payment-icons'
import { cn } from '@/lib/utils'

export default function PaymentMarks({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <VisaFlatRoundedIcon width={44} aria-label="Visa" />
      <MastercardFlatRoundedIcon width={44} aria-label="Mastercard" />
      <AmericanExpressFlatRoundedIcon width={44} aria-label="American Express" />
      {/* Cash on Delivery — not a card brand */}
      <span className="flex h-[28px] items-center rounded-md border border-ink/10 bg-white px-2.5 font-body text-[10px] font-semibold uppercase tracking-wide text-emerald">
        COD
      </span>
    </div>
  )
}
