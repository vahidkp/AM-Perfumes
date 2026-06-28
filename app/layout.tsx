import type { Metadata } from 'next'
import { Fraunces, Manrope, Noto_Naskh_Arabic } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import { Toaster } from 'react-hot-toast'
import './globals.css'

// Editorial serif for display & headings
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Refined geometric sans for body & UI
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const naskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-naskh',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://amperfume.ae'),
  title: {
    default: 'AM Perfume — Wear Your Story | Abu Dhabi, UAE',
    template: '%s · AM Perfume',
  },
  description:
    'Modern Arabian luxury fragrances crafted in Abu Dhabi. Shop Hayat & Rooh — free delivery across the UAE, cash on delivery available.',
  keywords: ['luxury perfume UAE', 'Abu Dhabi perfume', 'Hayat', 'Rooh', 'AM Perfume', 'eau de parfum', 'oud', 'attar'],
  openGraph: {
    title: 'AM Perfume — Wear Your Story',
    description: 'Modern Arabian luxury fragrances from Abu Dhabi — Hayat & Rooh',
    type: 'website',
    locale: 'en_AE',
    images: ['/images/hero-dual-dark.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${naskh.variable}`}
    >
      <body className="bg-ivory font-body text-ink antialiased">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#23201B',
              border: '1px solid #C9A84C',
              borderRadius: '0px',
              fontSize: '14px',
              boxShadow: '0 18px 50px -30px rgba(35,32,27,0.45)',
            },
          }}
        />
      </body>
    </html>
  )
}
