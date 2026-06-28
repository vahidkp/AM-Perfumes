---
name: responsive-layout-system
description: Apply mobile-first responsive layouts, spacing, typography scaling, and component behavior for the AM Perfume Next.js website. Use this skill whenever the user wants to make a page or component mobile-responsive, adjust layouts for different screen sizes, fix spacing/padding on mobile, implement responsive typography, make the navbar mobile-friendly, ensure product grids stack correctly on phones, or review any component for responsive correctness. Trigger on: "mobile responsive", "responsive layout", "mobile view", "tablet layout", "breakpoints", "fix mobile", "stack on mobile", "make it responsive", "responsive design", or any task involving screen-size adaptation on the AM Perfume site.
---

# Responsive Layout System Skill

This skill governs how all AM Perfume components adapt across screen sizes. Always apply mobile-first (smallest to largest).

## Breakpoint Reference

| Name | Tailwind Prefix | Min Width | Context |
|------|-----------------|-----------|---------|
| Mobile | (default) | 0px | Single column, full-width |
| Tablet | `md:` | 768px | 2-column grids, nav shows |
| Desktop | `lg:` | 1024px | Full layout, sticky sidebar |
| Wide | `xl:` | 1280px | Max content width caps |

**Max content width:** `max-w-[1440px] mx-auto`  
**Side padding:** `px-6` (mobile) → `md:px-12` (desktop)

---

## Typography Scaling Rules

Always scale down heading sizes on mobile:

```tsx
// Hero headline
className="font-display text-5xl md:text-7xl lg:text-display-xl"

// Section headings (h2)
className="font-display text-3xl md:text-5xl lg:text-heading-xl"

// Sub-headings (h3)
className="font-heading text-xl md:text-2xl lg:text-heading-md"

// Body
className="font-body text-sm md:text-base"

// Eyebrow tags
className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase"
```

---

## Section Padding Pattern

Every section uses this pattern:
```tsx
// Standard section
<section className="py-12 md:py-section"> {/* 48px → 80px */}

// Hero (full viewport)
<section className="min-h-screen py-20 md:py-0 flex items-center">

// Tight section
<section className="py-8 md:py-12">
```

---

## Layout Patterns

### 1. Two-Column Split (Hero, Brand Story, Product Spotlight)

```tsx
// Mobile: stack vertically. Desktop: side-by-side
<div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 items-center">
  <div className="w-full md:w-1/2"> {/* Image */} </div>
  <div className="w-full md:w-1/2"> {/* Content */} </div>
</div>

// Reverse on alternate sections (image right)
<div className="flex flex-col md:flex-row-reverse gap-8 md:gap-20 items-center">
```

### 2. Product Grid (2-up)

```tsx
// Mobile: single column stacked. Desktop: 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
  {products.map(p => <ProductCard key={p.id} product={p} />)}
</div>
```

### 3. Mood Tiles Grid (4-up)

```tsx
// Mobile: 2x2. Desktop: 4 in a row
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
```

### 4. Trust Strip

```tsx
// Mobile: 2x2 grid. Desktop: 4 in a row
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
```

### 5. Reviews Grid

```tsx
// Mobile: single column (carousel recommended). Desktop: 3-column
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
```

### 6. Footer

```tsx
// Mobile: single column stacked. Desktop: 4-column grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
```

### 7. Cart Drawer

```tsx
// Always full-height right panel. Mobile: full width. Desktop: max 400px
<div className="fixed right-0 top-0 h-full w-full max-w-md">
```

### 8. Checkout Layout

```tsx
// Mobile: single column (form first, summary below). Desktop: 60/40 side-by-side
<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
  <div className="w-full lg:w-[60%]"> {/* Form */} </div>
  <div className="w-full lg:w-[40%]">
    <div className="lg:sticky lg:top-24"> {/* Sticky summary */} </div>
  </div>
</div>
```

---

## Image Responsive Patterns

### Full-bleed hero image

```tsx
<div className="relative w-full aspect-[16/9] md:aspect-auto md:h-screen">
  <Image src="..." alt="..." fill className="object-cover object-center" />
</div>
```

### Product card image

```tsx
// Always 3:4 portrait ratio
<div className="relative aspect-[3/4]">
  <Image src="..." alt="..." fill className="object-cover" />
</div>
```

### Brand story split image

```tsx
// Square on mobile, full-height on desktop
<div className="relative aspect-square md:aspect-auto md:min-h-[500px]">
  <Image src="..." alt="..." fill className="object-cover" />
</div>
```

---

## Navbar Responsive Behavior

```tsx
// Desktop: horizontal links visible
// Mobile: links hidden, hamburger shown
<nav className="hidden md:flex items-center gap-8"> {/* Desktop links */}
<button className="md:hidden"> {/* Hamburger */}

// Mobile menu: full-screen or slide-down overlay
<div className={`md:hidden ${mobileOpen ? 'block' : 'hidden'} fixed inset-0 bg-charcoal z-50`}>
```

---

## Touch & Mobile UX Rules

1. **Minimum tap target:** All buttons/links must be at least `44px × 44px`
   ```tsx
   className="min-h-[44px] min-w-[44px]" // or py-3 for most buttons
   ```

2. **Mobile carousel for reviews:** Use horizontal scroll snap
   ```tsx
   // Mobile: horizontal scroll. Desktop: grid
   <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0">
     {reviews.map(r => (
       <div className="snap-start flex-shrink-0 w-[80vw] md:w-auto">
         {/* Review card */}
       </div>
     ))}
   </div>
   ```

3. **Product gallery swipe on mobile:**
   ```tsx
   // Mobile: touch swipe. Desktop: click thumbnails
   // Use state for active index + touch events
   const [touchStart, setTouchStart] = useState(0)
   const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
   const handleTouchEnd = (e: React.TouchEvent) => {
     const delta = touchStart - e.changedTouches[0].clientX
     if (delta > 50) setActiveIndex(i => Math.min(i + 1, images.length - 1))
     if (delta < -50) setActiveIndex(i => Math.max(i - 1, 0))
   }
   ```

4. **Cart drawer full-width on mobile:**
   ```tsx
   className="fixed right-0 top-0 h-full w-full sm:max-w-md"
   // On mobile this takes full screen, on larger screens it's 400px wide
   ```

---

## Responsive Component Checklist

Before marking any component done, verify:

- [ ] Renders correctly at 375px (iPhone SE)
- [ ] Renders correctly at 768px (iPad)
- [ ] Renders correctly at 1440px (Desktop)
- [ ] All text is readable (min 14px on mobile)
- [ ] Tap targets are ≥ 44px tall
- [ ] No horizontal overflow (no scrollbar on mobile)
- [ ] Images don't distort or overflow
- [ ] Spacing feels comfortable (not cramped, not too airy)
- [ ] Navigation works on mobile (hamburger, full menu)
- [ ] Cart drawer is full-screen on mobile
- [ ] Hero is full-viewport-height on all sizes

---

## Footer Component (Responsive)

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/10">
      <div className="max-w-content mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-3xl text-gold mb-3">AM</p>
            <p className="font-body text-xs text-cream/50 leading-relaxed mb-5 max-w-[220px]">
              Luxury fragrances crafted for those who dare to leave an impression.
            </p>
            <div className="flex gap-4">
              {['instagram', 'whatsapp', 'facebook'].map(social => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold transition-all"
                  aria-label={social}
                >
                  <span className="text-xs capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Navigate</p>
            <ul className="space-y-3">
              {['Home', 'Our Story', 'AM Noir', 'AM Lumière', 'Contact'].map(link => (
                <li key={link}>
                  <Link href="#" className="font-body text-sm text-cream/50 hover:text-gold transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Help</p>
            <ul className="space-y-3">
              {['Shipping Policy', 'Return Policy', 'Track Order', 'FAQ'].map(link => (
                <li key={link}>
                  <Link href="#" className="font-body text-sm text-cream/50 hover:text-gold transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/+91XXXXXXXXXX" className="font-body text-sm text-cream/50 hover:text-gold transition-colors flex items-center gap-2">
                  <span>💬</span> WhatsApp Us
                </a>
              </li>
              <li>
                <a href="mailto:hello@amperfume.in" className="font-body text-sm text-cream/50 hover:text-gold transition-colors">
                  hello@amperfume.in
                </a>
              </li>
              <li className="font-body text-sm text-cream/40 leading-relaxed">
                Mon–Sat, 10am–7pm IST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/30">
            © {new Date().getFullYear()} AM Perfume. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <Link key={link} href="#" className="font-body text-xs text-cream/30 hover:text-gold transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## Newsletter Section

```tsx
// components/sections/Newsletter.tsx
'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-12 md:py-section bg-primary">
      <div className="max-w-content mx-auto px-6 md:px-12 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Stay Connected</p>
        <h2 className="font-display text-3xl md:text-heading-xl text-white mb-3">
          Be the First to Know
        </h2>
        <p className="font-body text-cream/60 mb-8 text-sm md:text-base">
          Exclusive offers, new launches, and scent stories — delivered to your inbox.
        </p>

        {submitted ? (
          <div className="text-gold font-heading text-lg">✨ Thank you for subscribing!</div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-primary-light border border-white/20 px-4 py-3 font-body text-sm text-cream placeholder-cream/40 outline-none focus:border-gold transition-colors"
            />
            <button
              onClick={() => { if (email) setSubmitted(true) }}
              className="px-6 py-3 bg-gold text-primary font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        )}
        <p className="font-body text-xs text-cream/30 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
```
