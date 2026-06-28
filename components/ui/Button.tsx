import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'ghost' | 'dark'

const base =
  'inline-flex items-center justify-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  gold: 'border border-gold/50 bg-emerald text-cream hover:border-gold hover:bg-emerald-light',
  ghost: 'border border-emerald/30 text-emerald hover:bg-emerald hover:text-ivory',
  dark: 'bg-emerald text-cream hover:bg-emerald-light',
}

interface CommonProps {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

export function Button({
  variant = 'gold',
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, 'px-8 py-4', variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'gold',
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={cn(base, 'px-8 py-4', variants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  )
}
