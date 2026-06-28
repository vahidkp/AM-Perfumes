import { cn } from '@/lib/utils'

export default function Badge({
  children,
  className,
  tone = 'gold',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'gold' | 'red' | 'dark'
}) {
  const tones = {
    gold: 'border-gold/50 bg-white/85 text-gold-deep backdrop-blur-sm',
    red: 'border-garnet bg-garnet text-white',
    dark: 'border-emerald/40 bg-emerald/85 text-cream backdrop-blur-sm',
  }
  return (
    <span
      className={cn(
        'inline-block rounded-full border px-3.5 py-1 font-body text-[10px] uppercase tracking-[0.2em]',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
