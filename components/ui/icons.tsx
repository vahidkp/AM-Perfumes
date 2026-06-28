import { cn } from '@/lib/utils'

type IconProps = {
  className?: string
  strokeWidth?: number
}

// Shared thin-line base — refined, luxury feel (24px grid, round joins).
function Line({
  className,
  strokeWidth = 1.5,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-7 w-7', className)}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function IconTruck(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M3 7.5a1 1 0 0 1 1-1h8.5a1 1 0 0 1 1 1v8.5H3z" />
      <path d="M13.5 10h3l3 3v3h-6z" />
      <circle cx="7" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
      <path d="M8.7 17.5h6.1" />
    </Line>
  )
}

export function IconShield(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M12 2.5l7.25 2.6v5.3c0 4.7-3.1 8-7.25 9.3-4.15-1.3-7.25-4.6-7.25-9.3V5.1z" />
      <path d="M8.7 12.1l2.3 2.3 4.3-4.6" />
    </Line>
  )
}

export function IconWallet(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M3.5 8.25a1.75 1.75 0 0 1 1.75-1.75h10.25a1 1 0 0 1 1 1v1.25" />
      <path d="M3.5 8.25v8.5a1.75 1.75 0 0 0 1.75 1.75h13a1.75 1.75 0 0 0 1.75-1.75v-5.5a1.75 1.75 0 0 0-1.75-1.75H5.25A1.75 1.75 0 0 1 3.5 7.75" />
      <circle cx="16.5" cy="13.5" r="1.2" />
    </Line>
  )
}

export function IconReturn(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M5 9.4A7.5 7.5 0 1 1 3.7 14.8" />
      <path d="M3.6 4.4v5.2h5.2" />
    </Line>
  )
}

export function IconSparkle(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M12 3.2c.55 4.4 1.2 5.05 5.6 5.6-4.4.55-5.05 1.2-5.6 5.6-.55-4.4-1.2-5.05-5.6-5.6 4.4-.55 5.05-1.2 5.6-5.6z" />
      <path d="M18.5 14.5c.28 1.9.6 2.22 2.5 2.5-1.9.28-2.22.6-2.5 2.5-.28-1.9-.6-2.22-2.5-2.5 1.9-.28 2.22-.6 2.5-2.5z" />
    </Line>
  )
}

export function IconLock(p: IconProps) {
  return (
    <Line {...p}>
      <rect x="5.5" y="10.25" width="13" height="9" rx="2" />
      <path d="M8.25 10.25V7.75a3.75 3.75 0 1 1 7.5 0v2.5" />
      <path d="M12 13.75v2" />
    </Line>
  )
}

export function IconCard(p: IconProps) {
  return (
    <Line {...p}>
      <rect x="2.75" y="5.75" width="18.5" height="12.5" rx="2" />
      <path d="M2.75 9.9h18.5" />
      <path d="M6 14.5h4M14.5 14.5h3.5" />
    </Line>
  )
}

export function IconLeaf(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M5 19c0-8.3 6-13.75 14.5-13.75C19.5 13.55 13.5 19 5 19z" />
      <path d="M9 15c2.3-3.3 4.8-5.2 8.5-6.4" />
    </Line>
  )
}

export function IconFlame(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M12 2.5c3.3 3.1 5.2 5.4 5.2 9.2a5.2 5.2 0 1 1-10.4 0c0-2.3 1-3.7 2.5-4.9.4 1.8 1.55 2.5 2.7 2.5-1.25-2.3-1.15-5.3 0-6.8z" />
    </Line>
  )
}

export function IconBloom(p: IconProps) {
  return (
    <Line {...p}>
      <circle cx="12" cy="11" r="2.4" />
      <path d="M12 4.6c1.6 0 2.7 1.3 2.7 2.8M12 4.6c-1.6 0-2.7 1.3-2.7 2.8" />
      <path d="M17.4 9c1.4.8 1.9 2.4 1.2 3.8M6.6 9c-1.4.8-1.9 2.4-1.2 3.8" />
      <path d="M15.4 15.6c.4 1.5-.4 3-1.9 3.6M8.6 15.6c-.4 1.5.4 3 1.9 3.6" />
      <path d="M12 19.4v-6" />
    </Line>
  )
}

export function IconCheckCircle(p: IconProps) {
  return (
    <Line {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
    </Line>
  )
}

export function IconGift(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M4.75 9.75h14.5v9.5H4.75z" />
      <path d="M3.75 9.75h16.5v-.5a1 1 0 0 0-1-1H4.75a1 1 0 0 0-1 1z" />
      <path d="M12 8.25v11" />
      <path d="M12 8.25C12 8.25 9.5 3.5 7.7 5.3 6.3 6.7 9.6 8.25 12 8.25z" />
      <path d="M12 8.25C12 8.25 14.5 3.5 16.3 5.3c1.4 1.4-1.9 2.95-4.3 2.95z" />
    </Line>
  )
}

// WhatsApp — brand glyph (filled).
export function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('h-5 w-5', className)}
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.1-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5a.5.5 0 000-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 001.6.1c.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z" />
    </svg>
  )
}
