# AM Perfume — Luxury E-Commerce

Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Zustand storefront for AM
Perfume, built from `AM_PERFUME_PRD.md` and the `am-perfume-skills` skill set, with
visual direction inspired by Dehnee and Sabiz Fragrances.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Pages

- `/` — Homepage: hero, trust strip, brand story, featured grid, scent finder,
  two cinematic spotlights, reviews, Instagram grid, newsletter.
- `/fragrances/[slug]` — PDP for `am-noir` / `am-lumiere` (statically generated):
  gallery, info panel, scent story, animated pyramid + attribute bars, cross-sell,
  reviews. Includes `Product` JSON-LD.
- `/cart` — Single-page checkout with validation, delivery options, promo code
  (`AMFIRST10`), sticky order summary, Razorpay integration.
- `/order-success` — Confirmation with order number + WhatsApp confirm.

## Payments

Razorpay is wired in `app/cart/page.tsx` with a server order route
(`app/api/create-order`) and signature verification (`app/api/verify-payment`).
**With no keys set, checkout runs in demo mode** (simulates success) so the flow is
testable locally. Add real keys in `.env.local` (see `.env.example`) to go live.

## Notes

- Product imagery is rendered as self-contained inline-SVG bottle scenes
  (`components/product/ProductVisual.tsx`) so the site ships with no broken images.
  Drop real photos into `public/images/products/` and swap `ProductVisual` for
  `next/image` to use photography.
- Design tokens live in `tailwind.config.ts` + `app/globals.css`.
- Cart state persists to `localStorage` via Zustand.
