# Product Requirements Document
# AM Perfume — E-Commerce Website
**Version:** 1.0  
**Tech Stack:** Next.js 14 (App Router) + Tailwind CSS + Antigravity  
**Scope:** 3 Core Pages — Homepage, Product Detail Page (PDP), Cart & Checkout  
**Brand Context:** AM Perfume sells exactly two signature perfumes, targeting premium/luxury buyers.

---

## 1. Brand Identity & Design System

### 1.1 Visual Language
Inspired by Sabiz Fragrances and Dehnee — both Arabic luxury perfume brands with:
- **Dark, moody hero sections** (deep greens, blacks, golds, warm ambers)
- **Full-bleed cinematic imagery** — products placed in nature, smoke, flowers
- **Serif + clean sans-serif typography** pairings (elegance + readability)
- **Rich editorial grid layouts** alternating full-width and split compositions
- **Gold/bronze accent colors** for CTAs, borders, and highlights
- **Subtle scroll-driven animations** and fade-in reveals

### 1.2 Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#0A2218` | Dark forest green (hero BG, navbars) |
| `--color-gold` | `#C9A84C` | CTA buttons, accents, price text |
| `--color-cream` | `#F5EDD6` | Section backgrounds, card fills |
| `--color-charcoal` | `#1A1A1A` | Body text, footer |
| `--color-white` | `#FFFFFF` | Text on dark BGs |
| `--color-accent-red` | `#8B2333` | Sale badges, urgency elements |

### 1.3 Typography
- **Display / Hero:** `Cormorant Garamond` (serif, 48–96px)
- **Section Headings:** `Playfair Display` (serif, 28–48px)
- **Body & UI:** `Inter` (sans-serif, 14–18px)
- **Arabic/Brand Script:** `Noto Naskh Arabic` (for AM brand mark alternate)

### 1.4 Spacing & Grid
- Max content width: `1440px`
- Gutter: `24px` (mobile), `48px` (desktop)
- Section padding: `80px 0` (desktop), `48px 0` (mobile)
- 12-column grid desktop, 4-column mobile

---

## 2. Products Catalog

### Product 1 — AM Noir
- **Type:** Eau de Parfum
- **Size:** 100ml
- **Scent Profile:** Dark Oud, Smoky Amber, Black Rose, Sandalwood
- **Mood:** Mysterious, Powerful, Nocturnal
- **Target:** Men & Unisex
- **Price:** ₹2,499

### Product 2 — AM Lumière
- **Type:** Eau de Parfum
- **Size:** 100ml
- **Scent Profile:** White Jasmine, Bergamot, Musk, Cedarwood
- **Mood:** Fresh, Luminous, Confident
- **Target:** Women & Unisex
- **Price:** ₹2,299

---

## 3. Page 1 — Homepage

### 3.1 Purpose
Establish brand identity, create desire, drive product discovery, and convert first-time visitors.

### 3.2 Section-by-Section Breakdown

#### SECTION 1: Navigation Bar
- **Layout:** Full-width, transparent overlay on hero → solid on scroll
- **Left:** AM logo (wordmark in gold on dark)
- **Center:** Nav links — `Home`, `Our Story`, `Fragrances`, `Contact`
- **Right:** Cart icon with item count badge, Search icon
- **Mobile:** Hamburger → full-screen overlay menu
- **Behavior:** Sticky, transitions from transparent to `--color-primary` bg with shadow on scroll

#### SECTION 2: Hero / Above the Fold
- **Layout:** Full-viewport height (100vh), split or centered composition
- **Background:** Deep green `#0A2218` with ambient product imagery
- **Left Side (60%):** 
  - Tag line in small caps gold: `"THE ART OF FRAGRANCE"`
  - Hero heading (serif 72–96px white): `"Wear Your Story"`
  - Subtext (16px cream, max 2 lines): Short brand promise
  - Two CTA buttons: `Shop AM Noir` (gold filled) + `Shop AM Lumière` (ghost/outline)
- **Right Side (40%):** Hero product shot — both bottles artfully composed against dark backdrop with soft smoke/mist effect
- **Bottom Bar:** Trust strip — `🚚 Free Delivery Above ₹999` | `✨ 100% Authentic` | `↩️ Easy Returns` | `🔒 Secure Checkout`
- **Animation:** Fade-in hero text on load, subtle parallax on product image

#### SECTION 3: Brand Story / Split Banner
- **Layout:** Full-width 50/50 split
- **Left:** Rich editorial lifestyle photo (person wearing perfume, moody lighting)
- **Right:** Background `--color-cream`
  - Eyebrow: `"OUR PHILOSOPHY"`
  - Heading: `"Crafted for Those Who Dare to Leave an Impression"`
  - Body: 3–4 sentences about AM Perfume's founding story
  - Link: `Discover Our Story →`

#### SECTION 4: Featured Products (2-up grid)
- **Layout:** Section title centered, then 2-column product card grid
- **Section heading:** `"Our Signature Fragrances"`
- **Each Card:**
  - Full-height image (3:4 ratio) — lifestyle/editorial product shot
  - Tag overlay: `FOR HIM & HER`
  - Product name (serif 24px)
  - Scent keywords (small caps, muted)
  - Price
  - `Shop Now` button (gold, full-width on card)
  - On hover: subtle scale-up + reveal secondary image (bottle close-up)
- **Background:** `--color-charcoal` section for contrast

#### SECTION 5: Scent Explorer / Mood Matcher
- **Layout:** Full-width dark section with gradient
- **Concept:** Visual interactive mood board — 4 mood tiles (Mysterious, Fresh, Bold, Sensual)
- **Each Tile:** Click to reveal which AM product matches that mood
- **Heading:** `"Find Your Scent"`
- **Subtext:** `"Every mood has a fragrance. What are you feeling today?"`
- **Implementation:** Client component with state toggle

#### SECTION 6: Cinematic Product Spotlight — AM Noir
- **Layout:** Full-bleed dark editorial — black/forest green background
- **Left:** Large atmospheric product photography (bottle with smoke, dark florals)
- **Right:**
  - Eyebrow: `"SIGNATURE COLLECTION"`
  - Name: `"AM Noir"`
  - Description: Scent story (3–4 evocative sentences)
  - Scent pyramid: `Top: Black Rose` | `Heart: Dark Oud` | `Base: Sandalwood`
  - CTA: `Shop AM Noir — ₹2,499`

#### SECTION 7: Cinematic Product Spotlight — AM Lumière
- **Layout:** Full-bleed light editorial — cream/warm white background
- **Mirror of Section 6** but for AM Lumière
- Right product image, left copy
- Lighter, fresh aesthetic

#### SECTION 8: Social Proof / Reviews
- **Layout:** Centered section, `--color-cream` background
- **Heading:** `"What Our Customers Say"`
- **Display:** 3 review cards in a row (mobile: carousel)
- **Each Card:** 5-star SVG, quote (2 sentences max), reviewer name, verified badge
- **Autoplay carousel on mobile**

#### SECTION 9: Instagram / Visual Gallery
- **Layout:** Full-width mosaic grid — 6 images, 2 rows of 3
- **Heading:** `"Follow Our World"` + `@amperfume` handle
- **Behavior:** Images link to Instagram; hover shows Instagram icon overlay
- **Images:** Mix of product, lifestyle, behind-the-scenes

#### SECTION 10: Newsletter Capture
- **Layout:** Full-width dark section (`--color-primary` bg)
- **Heading:** `"Be the First to Know"`
- **Subtext:** Exclusive offers, new launches, scent stories
- **Input + Button:** Email field with gold CTA `Subscribe`
- **Micro-copy:** `No spam. Unsubscribe anytime.`

#### SECTION 11: Footer
- **Layout:** 4-column dark footer
- **Column 1:** AM Logo + tagline + social icons (Instagram, WhatsApp, Facebook)
- **Column 2:** Quick Links — Home, Our Story, Fragrances, Contact
- **Column 3:** Help — Shipping Policy, Returns, Track Order, FAQ
- **Column 4:** Contact — WhatsApp number, Email, Address
- **Bottom Bar:** Copyright | Privacy Policy | Terms

---

## 4. Page 2 — Product Detail Page (PDP)

### 4.1 Purpose
Convert intent to purchase. Provide full scent story, sensory context, and confidence to buy.

### 4.2 Breadcrumb
`Home > Fragrances > AM Noir`

### 4.3 Section Breakdown

#### ABOVE THE FOLD: Product Hero
- **Layout:** 60/40 split — Left: image gallery, Right: product info
- **Left — Image Gallery:**
  - Primary large image (4:5 aspect ratio)
  - 4 thumbnail switchers below (different angles, lifestyle shots)
  - Zoom on hover (desktop)
  - Pinch-to-zoom / swipe gallery (mobile)
- **Right — Product Info:**
  - Eyebrow tag: `EAU DE PARFUM · 100ML`
  - Product name (serif 48px)
  - Star rating summary: `4.9 ★ (128 reviews)` → scrolls to reviews
  - Price: `₹2,499` (prominent, gold)
  - Size selector: Single option `100ml` (styled as selected pill)
  - Quantity stepper: `− 1 +`
  - Primary CTA: `Add to Cart` (full-width, gold, 56px tall)
  - Secondary CTA: `Buy Now` (outline)
  - Trust bar: Authentic | Free Delivery | 7-Day Returns
  - WhatsApp CTA: `💬 Ask About This Fragrance` → opens WhatsApp
  
#### SCENT STORY SECTION
- Full-width editorial block
- Background: dark gradient
- Heading: `"The Story Behind the Scent"`
- Paragraph: Long-form scent narrative (4–6 sentences, evocative language)
- Scent Pyramid (visual):
  - Top notes → Heart notes → Base notes
  - Displayed as vertical pyramid SVG with note labels

#### SCENT ATTRIBUTES
- 5 visual attribute bars (0–100 scale):
  - Sillage (Projection)
  - Longevity
  - Freshness
  - Sweetness
  - Intensity
- Illustrated with thin animated progress bars

#### USAGE GUIDE
- Icon grid: Best for → `Evening`, `Winter`, `Date Night`, `Office`
- Application tips: 3 bullet points

#### CROSS-SELL — You May Also Like
- Full-width section showing the **other product** with CTA
- Heading: `"Complete Your Collection"`
- Single product card (large, editorial)

#### CUSTOMER REVIEWS
- Summary: Average rating + 5 star bar breakdown
- Individual review cards (expandable)
- `Write a Review` button (opens modal)

---

## 5. Page 3 — Cart & Checkout

### 5.1 Cart Drawer (Slide-in)
- Triggered by cart icon click from any page
- **Right-side slide-in panel** (400px wide, full-height)
- **Header:** `Your Cart (2 items)` + close X
- **Line Items:**
  - Product thumbnail (60x60)
  - Name + Size
  - Quantity stepper
  - Remove button
  - Line total
- **Order Summary:**
  - Subtotal
  - Shipping: `FREE above ₹999` / `₹99`
  - **Total (bold, gold)**
- **Promo Code field** + Apply button
- **Checkout CTA** (full-width gold, 56px)
- **Continue Shopping** text link

### 5.2 Checkout Page — Full Page
Single-page checkout, no multi-step wizard. All fields visible at once.

#### Left Column (60%) — Order Form
**Contact:**
- Full Name *
- Email *
- Phone (WhatsApp-enabled) *

**Delivery Address:**
- Address Line 1 *
- Address Line 2
- City *
- State (dropdown) *
- PIN Code *

**Delivery Method:**
- Standard Delivery (3–5 days) — FREE above ₹999, else ₹99
- Express Delivery (1–2 days) — ₹199

**Payment:**
- Razorpay integration (cards, UPI, netbanking, wallets)
- COD toggle (if applicable)

#### Right Column (40%) — Order Summary (Sticky)
- Product thumbnails + names + quantities
- Subtotal
- Shipping
- Discount (if any)
- **Total (large, gold)**
- Security badges: `🔒 SSL Secured` | `✅ Safe Checkout`

#### Post-Order
- Thank you page with order number
- WhatsApp confirmation option
- Continue Shopping CTA

---

## 6. Technical Architecture

### 6.1 Next.js App Router Structure
```
/app
  /page.tsx                    → Homepage
  /fragrances/[slug]/page.tsx  → PDP (am-noir | am-lumiere)
  /cart/page.tsx               → Cart & Checkout
  /layout.tsx                  → Root layout (Nav + Footer)
  /globals.css                 → Design tokens + base styles

/components
  /ui/                         → Button, Badge, Input, Rating
  /layout/                     → Navbar, Footer, CartDrawer
  /sections/                   → HeroSection, ProductSpotlight, Reviews
  /product/                    → ProductCard, ProductGallery, ScentPyramid

/lib
  /products.ts                 → Static product data (2 products)
  /cart-store.ts               → Zustand cart state
  /utils.ts                    → Formatters

/public
  /images/                     → Product + lifestyle images
```

### 6.2 Key Dependencies
| Package | Purpose |
|---|---|
| `next` 14 | Framework |
| `tailwindcss` | Styling |
| `framer-motion` | Scroll animations, page transitions |
| `zustand` | Cart state management |
| `react-hot-toast` | Cart notifications |
| `razorpay` | Payment gateway |
| `next-optimized-images` | Image optimization |
| `@next/font` | Cormorant Garamond + Inter |

### 6.3 Performance Requirements
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms
- All images served via `next/image` with blur placeholders
- Static generation (SSG) for Homepage + PDP
- Cart state persisted in localStorage via Zustand middleware

### 6.4 SEO Requirements
- `generateMetadata` for each page
- OG images for social sharing
- Structured data: `Product`, `BreadcrumbList`, `Organization`
- Sitemap.xml
- Robots.txt

---

## 7. Antigravity Skills Required

The following Antigravity skills must be created to support efficient development:

| # | Skill Name | Purpose |
|---|---|---|
| 1 | `nextjs-ecommerce-setup` | Scaffold Next.js 14 project with Tailwind, fonts, folder structure |
| 2 | `luxury-hero-section` | Build cinematic full-viewport hero sections with animations |
| 3 | `product-card-component` | Create editorial perfume product cards with hover states |
| 4 | `product-detail-page` | Build full PDP with gallery, scent pyramid, reviews |
| 5 | `cart-checkout-flow` | Implement cart drawer + single-page checkout with Razorpay |
| 6 | `responsive-layout-system` | Apply mobile-first responsive layouts across all pages |

---

## 8. Accessibility & Quality Standards

- WCAG 2.1 AA color contrast on all text
- All interactive elements keyboard-navigable
- ARIA labels on icon-only buttons (cart, close, search)
- Focus rings visible
- `alt` text on all product images
- Form validation with accessible error messages
- Loading states on all async actions (add to cart, checkout submit)

---

## 9. Launch Checklist

- [ ] Brand assets received (logo, product photos × 8 minimum)
- [ ] WhatsApp Business number confirmed
- [ ] Razorpay merchant account active
- [ ] Domain & hosting configured (Vercel)
- [ ] Google Analytics 4 tag installed
- [ ] Meta Pixel installed
- [ ] All 3 pages QA'd on iPhone SE, iPhone 14, iPad, MacBook
- [ ] Page speed audit passed (>90 Lighthouse score)
- [ ] Checkout test transaction completed

---

*Document Owner: AM Perfume Team | Last Updated: June 2026*
