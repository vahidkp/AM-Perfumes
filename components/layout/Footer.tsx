import Link from 'next/link'
import Image from 'next/image'
import { whatsappLink } from '@/lib/utils'
import PaymentMarks from '@/components/ui/PaymentMarks'
import FooterNewsletter from '@/components/layout/FooterNewsletter'

const social = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/_am_perfumes_',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.4A6.4 6.4 0 1018.4 12 6.4 6.4 0 0012 5.6zm0 10.6A4.2 4.2 0 1116.2 12 4.2 4.2 0 0112 16.2zm6.6-10.9a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z',
  },
  {
    label: 'WhatsApp',
    href: whatsappLink('Hi AM Perfume! I have a question.'),
    path: 'M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5a.5.5 0 000-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 001.6.1c.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/amperfume',
    path: 'M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z',
  },
]

const columns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Our Story', href: '/#story' },
      { label: 'Fragrances', href: '/#fragrances' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping Policy', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Track Order', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gold/15 bg-primary">
      <div className="mx-auto max-w-content px-5 py-16 md:px-12">
        {/* Newsletter */}
        <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-2">Newsletter</p>
            <h3 className="font-display text-2xl text-cream md:text-3xl">Join the AM Circle</h3>
            <p className="mt-1 font-body text-sm text-cream/55">
              Exclusive offers, new launches and scent stories — to your inbox.
            </p>
          </div>
          <FooterNewsletter />
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/images/am-logo.png"
              alt="AM Perfume"
              width={841}
              height={423}
              className="h-16 w-auto"
            />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream/50">
              Modern Arabian luxury fragrances, crafted in Abu Dhabi for those who dare
              to leave an impression.
            </p>
            <div className="mt-6 flex gap-5">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-cream/70 transition-colors hover:text-gold"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-gold">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-cream/60 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-gold">
              Contact
            </h3>
            <ul className="space-y-2.5 font-body text-sm text-cream/60">
              <li>
                <a href={whatsappLink('Hi AM Perfume!')} className="transition-colors hover:text-gold">
                  WhatsApp: +971 55 588 9442
                </a>
              </li>
              <li>
                <a href="mailto:hello@amperfume.ae" className="transition-colors hover:text-gold">
                  hello@amperfume.ae
                </a>
              </li>
              <li>Al Wahda Mall, Abu Dhabi</li>
              <li>United Arab Emirates</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 md:flex-row">
          <p className="font-body text-xs text-cream/40">
            © {new Date().getFullYear()} AM Perfume. All rights reserved.
          </p>
          <PaymentMarks />
        </div>
      </div>
    </footer>
  )
}
