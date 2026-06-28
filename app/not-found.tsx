import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="text-center">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-gold-deep">404</p>
        <h1 className="mb-4 font-display text-display-md text-ink">Page Not Found</h1>
        <p className="mb-8 font-body text-ink-soft">
          The fragrance you&apos;re looking for has drifted away.
        </p>
        <Link href="/" className="border-b border-gold pb-1 font-body text-gold-deep">
          Return Home →
        </Link>
      </div>
    </div>
  )
}
