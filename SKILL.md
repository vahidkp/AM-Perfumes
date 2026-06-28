---
name: nextjs-ecommerce-setup
description: Scaffold and configure a luxury e-commerce project using Next.js 14 App Router + Tailwind CSS optimized for perfume/fashion brands. Use this skill whenever the user wants to set up a Next.js project with Tailwind, configure Google Fonts (Cormorant Garamond, Playfair Display, Inter), create the folder structure, set up global CSS design tokens, configure Zustand for cart state, or bootstrap any luxury e-commerce site. Trigger on phrases like "set up the project", "initialize next.js", "create folder structure", "configure tailwind for the site", or any task that involves starting or scaffolding the AM Perfume (or similar luxury brand) Next.js codebase.
---

# Next.js Luxury E-Commerce Setup Skill

This skill scaffolds a Next.js 14 App Router project for AM Perfume — a luxury perfume brand with exactly 2 products. Follow this in full when initializing or configuring the project.

## Project Overview

- **Framework:** Next.js 14 (App Router, not Pages Router)
- **Styling:** Tailwind CSS with custom design tokens
- **Fonts:** Google Fonts — Cormorant Garamond (display), Playfair Display (headings), Inter (body)
- **State:** Zustand (cart)
- **Animation:** Framer Motion
- **Payments:** Razorpay (India)

---

## Step 1: Initialize Project

```bash
npx create-next-app@latest am-perfume --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd am-perfume
npm install zustand framer-motion react-hot-toast razorpay
```

---

## Step 2: Folder Structure

Create this exact structure:

```
am-perfume/
├── app/
│   ├── layout.tsx              ← Root layout (Navbar + Footer wrapping)
│   ├── page.tsx                ← Homepage
│   ├── globals.css             ← Design tokens + Tailwind base
│   ├── fragrances/
│   │   └── [slug]/
│   │       └── page.tsx        ← Product Detail Page
│   └── cart/
│       └── page.tsx            ← Cart + Checkout
├── components/
│   ├── ui/                     ← Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── StarRating.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── CartDrawer.tsx
│   ├── sections/               ← Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── BrandStory.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── ScentExplorer.tsx
│   │   ├── ProductSpotlight.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── InstagramGrid.tsx
│   │   └── Newsletter.tsx
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductGallery.tsx
│       ├── ScentPyramid.tsx
│       ├── ScentAttributes.tsx
│       └── CrossSell.tsx
├── lib/
│   ├── products.ts             ← Static product data
│   ├── cart-store.ts           ← Zustand store
│   └── utils.ts                ← Helpers (formatPrice, cn)
└── public/
    └── images/
        ├── products/
        └── lifestyle/
```

Create these directories in bash:
```bash
mkdir -p components/{ui,layout,sections,product}
mkdir -p lib
mkdir -p public/images/{products,lifestyle}
mkdir -p app/fragrances/\[slug\]
mkdir -p app/cart
```

---

## Step 3: Design Tokens in globals.css

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Brand Colors */
  --color-primary: #0A2218;
  --color-primary-light: #173D2A;
  --color-gold: #C9A84C;
  --color-gold-light: #E8C96A;
  --color-cream: #F5EDD6;
  --color-cream-dark: #EDE0C4;
  --color-charcoal: #1A1A1A;
  --color-text-muted: #6B6B6B;
  --color-accent-red: #8B2333;
  --color-white: #FFFFFF;

  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;

  /* Spacing */
  --section-padding-desktop: 80px;
  --section-padding-mobile: 48px;
  --content-max-width: 1440px;
  --gutter-desktop: 48px;
  --gutter-mobile: 24px;

  /* Transitions */
  --transition-base: 0.3s ease;
  --transition-slow: 0.6s ease;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-charcoal); }
::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: 3px; }

/* Selection */
::selection {
  background: var(--color-gold);
  color: var(--color-primary);
}
```

---

## Step 4: Tailwind Config

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2218',
        'primary-light': '#173D2A',
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        cream: '#F5EDD6',
        'cream-dark': '#EDE0C4',
        charcoal: '#1A1A1A',
        muted: '#6B6B6B',
        'accent-red': '#8B2333',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-lg': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['56px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-xl': ['48px', { lineHeight: '1.15' }],
        'heading-lg': ['36px', { lineHeight: '1.2' }],
        'heading-md': ['28px', { lineHeight: '1.3' }],
      },
      maxWidth: {
        content: '1440px',
      },
      spacing: {
        'section': '80px',
        'section-sm': '48px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## Step 5: Font Setup in layout.tsx

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Playfair_Display, Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AM Perfume — Wear Your Story',
  description: 'Luxury fragrances crafted for those who dare to leave an impression. Shop AM Noir & AM Lumière.',
  openGraph: {
    title: 'AM Perfume',
    description: 'Luxury fragrances — AM Noir & AM Lumière',
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="font-body bg-charcoal text-white">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" toastOptions={{
          style: { background: '#1A1A1A', color: '#F5EDD6', border: '1px solid #C9A84C' }
        }} />
      </body>
    </html>
  )
}
```

---

## Step 6: Product Data

```ts
// lib/products.ts
export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  type: string
  size: string
  price: number
  mood: string
  target: string
  scentStory: string
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
  attributes: {
    sillage: number
    longevity: number
    freshness: number
    sweetness: number
    intensity: number
  }
  occasions: string[]
  images: string[]
  reviews: { name: string; rating: number; comment: string }[]
}

export const products: Product[] = [
  {
    id: 'am-noir',
    slug: 'am-noir',
    name: 'AM Noir',
    tagline: 'Mysterious. Powerful. Unforgettable.',
    type: 'Eau de Parfum',
    size: '100ml',
    price: 2499,
    mood: 'Mysterious',
    target: 'Men & Unisex',
    scentStory: 'Born from the depths of twilight, AM Noir is a fragrance that commands presence without seeking it. Dark rose petals bruised by midnight air give way to the ancient wisdom of Indian oud — a note that has adorned royalty for centuries. As the evening deepens, rich sandalwood settles like velvet on the skin, leaving an impression that lingers long after you have left the room.',
    topNotes: ['Black Rose', 'Saffron', 'Bergamot'],
    heartNotes: ['Dark Oud', 'Patchouli', 'Jasmine Absolute'],
    baseNotes: ['Sandalwood', 'Amber', 'Musk', 'Vetiver'],
    attributes: {
      sillage: 90,
      longevity: 85,
      freshness: 20,
      sweetness: 35,
      intensity: 88,
    },
    occasions: ['Evening', 'Winter', 'Date Night', 'Special Events'],
    images: [
      '/images/products/am-noir-1.jpg',
      '/images/products/am-noir-2.jpg',
      '/images/products/am-noir-lifestyle.jpg',
      '/images/products/am-noir-detail.jpg',
    ],
    reviews: [
      { name: 'Arjun M.', rating: 5, comment: 'Absolutely magnetic. I get compliments every single time I wear this. Worth every rupee.' },
      { name: 'Rahul K.', rating: 5, comment: 'The longevity is incredible — 12+ hours on my skin. The oud is rich but not overpowering.' },
      { name: 'Priya S.', rating: 5, comment: 'Bought this for my husband and he refuses to wear anything else now.' },
    ],
  },
  {
    id: 'am-lumiere',
    slug: 'am-lumiere',
    name: 'AM Lumière',
    tagline: 'Luminous. Fresh. Confidently Feminine.',
    type: 'Eau de Parfum',
    size: '100ml',
    price: 2299,
    mood: 'Fresh',
    target: 'Women & Unisex',
    scentStory: 'AM Lumière was born to capture the feeling of morning light on your skin — that particular warmth that comes just before the world wakes up. White jasmine blooms in the opening, dewy and radiant, lifted by the sparkle of Sicilian bergamot. As the fragrance breathes, soft musk draws everything inward into a warmth that is unmistakably yours, grounded by the quiet elegance of cedarwood.',
    topNotes: ['White Jasmine', 'Bergamot', 'Peach Blossom'],
    heartNotes: ['Tuberose', 'Rose Centifolia', 'Iris'],
    baseNotes: ['Cedarwood', 'White Musk', 'Sandalwood', 'Vanilla'],
    attributes: {
      sillage: 70,
      longevity: 80,
      freshness: 85,
      sweetness: 60,
      intensity: 55,
    },
    occasions: ['Day Wear', 'Office', 'Spring/Summer', 'Brunch'],
    images: [
      '/images/products/am-lumiere-1.jpg',
      '/images/products/am-lumiere-2.jpg',
      '/images/products/am-lumiere-lifestyle.jpg',
      '/images/products/am-lumiere-detail.jpg',
    ],
    reviews: [
      { name: 'Sneha P.', rating: 5, comment: 'The most beautiful floral I have ever smelled. Elegant and fresh without being overwhelming.' },
      { name: 'Divya R.', rating: 5, comment: 'Perfect office scent. Subtle enough not to be intrusive but noticeable enough to stand out.' },
      { name: 'Nisha T.', rating: 4, comment: 'Beautiful bottle, even more beautiful fragrance. Lasts about 8 hours on my skin.' },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}
```

---

## Step 7: Cart Store (Zustand)

```ts
// lib/cart-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from './products'

interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => set((state) => {
        const existing = state.items.find(i => i.product.id === product.id)
        if (existing) {
          return { items: state.items.map(i =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )}
        }
        return { items: [...state.items, { product, quantity: 1 }], isOpen: true }
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.product.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: quantity <= 0
          ? state.items.filter(i => i.product.id !== productId)
          : state.items.map(i => i.product.id === productId ? { ...i, quantity } : i)
      })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'am-perfume-cart' }
  )
)
```

---

## Step 8: Utility Helpers

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwindcss/merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}
```

Install: `npm install clsx tailwind-merge`

---

## Verification Checklist
- [ ] `npm run dev` runs without errors
- [ ] Fonts load (check DevTools → Network → Font)
- [ ] Tailwind custom colors available (inspect computed styles)
- [ ] Zustand store persists in localStorage
- [ ] TypeScript reports no errors (`npm run build`)
