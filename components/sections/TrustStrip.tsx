import { IconTruck, IconShield, IconWallet, IconReturn } from '@/components/ui/icons'

const items = [
  { Icon: IconTruck, text: 'Free Delivery Across the UAE' },
  { Icon: IconShield, text: '100% Authentic Fragrances' },
  { Icon: IconWallet, text: 'Cash on Delivery Available' },
  { Icon: IconReturn, text: 'Easy Returns' },
]

export default function TrustStrip() {
  return (
    <div className="border-y border-gold/25 bg-cream">
      <div className="mx-auto max-w-content px-6 py-5 md:px-12">
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4">
          {items.map(({ Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-3">
              <Icon className="h-8 w-8 shrink-0 text-gold-deep" />
              <span className="font-body text-[13px] tracking-wide text-ink/80">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
