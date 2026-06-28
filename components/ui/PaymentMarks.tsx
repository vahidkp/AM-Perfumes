import { cn } from '@/lib/utils'

const chip = 'flex h-7 w-11 items-center justify-center rounded-md border border-ink/10 bg-white'

function Visa() {
  return (
    <span className={chip}>
      <span className="font-body text-[11px] font-bold italic tracking-tight text-[#1A1F71]">
        VISA
      </span>
    </span>
  )
}

function Mastercard() {
  return (
    <span className={chip}>
      <svg viewBox="0 0 32 20" className="h-3.5">
        <circle cx="13" cy="10" r="7" fill="#EB001B" />
        <circle cx="19" cy="10" r="7" fill="#F79E1B" />
        <path
          d="M16 4.6a7 7 0 0 1 0 10.8 7 7 0 0 1 0-10.8z"
          fill="#FF5F00"
        />
      </svg>
    </span>
  )
}

function ApplePay() {
  return (
    <span className={chip}>
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ink" fill="currentColor">
        <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.643 0 2.96.06 4.485 2.28-.13.09-2.604 1.52-2.604 4.5 0 3.46 3.087 4.66 3.087 4.66z" />
      </svg>
      <span className="ml-0.5 font-body text-[10px] font-semibold text-ink">Pay</span>
    </span>
  )
}

function COD() {
  return (
    <span className={cn(chip, 'w-auto px-2')}>
      <span className="font-body text-[10px] font-semibold uppercase tracking-wide text-emerald">
        COD
      </span>
    </span>
  )
}

export default function PaymentMarks({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Visa />
      <Mastercard />
      <ApplePay />
      <COD />
    </div>
  )
}
