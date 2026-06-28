export interface Review {
  name: string
  rating: number
  comment: string
  location?: string
}

export interface Variant {
  size: string
  price: number
  compareAtPrice?: number
}

export interface Product {
  id: string
  slug: string
  name: string
  arabicName: string
  tagline: string
  type: string
  size: string // default size (50 ML)
  price: number // default price (50 ML)
  compareAtPrice?: number
  variants: Variant[]
  mood: string
  target: string
  accent: 'dark' | 'light'
  shortDescription: string
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
  applicationTips: string[]
  rating: number
  reviewCount: number
  images: string[]
  reviews: Review[]
}

// Shared studio / lifestyle photography (both products appear together).
const DUO_WHITE = '/images/duo-white.png'
const DUO_DARK = '/images/hero-dual-dark.png'
const LIFESTYLE_OFFICE = '/images/lifestyle-office.png'

export const products: Product[] = [
  {
    id: 'hayat',
    slug: 'hayat',
    name: 'Hayat',
    arabicName: 'حياة',
    tagline: 'Verdant. Alive. Endlessly Fresh.',
    type: 'Eau de Parfum',
    size: '50 ML',
    price: 199,
    compareAtPrice: 279,
    variants: [
      { size: '25 ML', price: 129, compareAtPrice: 179 },
      { size: '50 ML', price: 199, compareAtPrice: 279 },
      { size: '100 ML', price: 299, compareAtPrice: 399 },
    ],
    mood: 'Fresh',
    target: 'Unisex',
    accent: 'dark',
    shortDescription:
      'A green, aromatic celebration of life — crisp bergamot and cardamom over a heart of lavender and a warm woody base.',
    scentStory:
      'Hayat — “life” — opens like the first breath of a garden at dawn. Crisp bergamot and green apple sparkle against a whisper of cardamom, awakening the senses. At its heart, aromatic lavender and geranium unfold with quiet confidence, while jasmine lends an unexpected softness. As the hours pass, Hayat settles into a base of vetiver, cedarwood and amber — grounded, vital and effortlessly elegant. It is a fragrance for those who move through the world fully alive.',
    topNotes: ['Bergamot', 'Green Apple', 'Cardamom'],
    heartNotes: ['Lavender', 'Geranium', 'Jasmine'],
    baseNotes: ['Vetiver', 'Cedarwood', 'Amber', 'Musk'],
    attributes: {
      sillage: 72,
      longevity: 80,
      freshness: 90,
      sweetness: 40,
      intensity: 60,
    },
    occasions: ['Day Wear', 'Office', 'Spring/Summer', 'Everyday'],
    applicationTips: [
      'Spray on pulse points after a shower so the green top notes bloom on warm skin.',
      'Two sprays carry through a full working day without overwhelming.',
      'Mist lightly over clothing to extend the fresh, aromatic trail.',
    ],
    rating: 4.8,
    reviewCount: 112,
    images: ['/images/hayat-bottle.png', DUO_WHITE, DUO_DARK, LIFESTYLE_OFFICE],
    reviews: [
      {
        name: 'Imran S.',
        rating: 5,
        location: 'Dubai',
        comment:
          'Fresh and green but with real depth. Perfect for the office and lasts all day.',
      },
      {
        name: 'Aisha K.',
        rating: 5,
        location: 'Abu Dhabi',
        comment:
          'Clean, sophisticated and unisex. My husband and I both reach for it.',
      },
      {
        name: 'Khalid R.',
        rating: 4,
        location: 'Al Ain',
        comment:
          'Beautiful aromatic opening. The cardamom makes it feel premium and different.',
      },
    ],
  },
  {
    id: 'rooh',
    slug: 'rooh',
    name: 'Rooh',
    arabicName: 'روح',
    tagline: 'Soulful. Warm. Unforgettable.',
    type: 'Eau de Parfum',
    size: '50 ML',
    price: 229,
    compareAtPrice: 319,
    variants: [
      { size: '25 ML', price: 149, compareAtPrice: 209 },
      { size: '50 ML', price: 229, compareAtPrice: 319 },
      { size: '100 ML', price: 339, compareAtPrice: 469 },
    ],
    mood: 'Sensual',
    target: 'Unisex',
    accent: 'light',
    shortDescription:
      'A warm, soulful blend of saffron, Damask rose and oud resting on amber, sandalwood and vanilla.',
    scentStory:
      'Rooh — “soul” — is a fragrance of warmth and depth, made for moments that linger in memory. Saffron and red berries open with a glowing, almost velvety richness, leading into the timeless romance of Damask rose entwined with precious oud. Beneath it all, a base of amber, sandalwood and vanilla wraps the skin like silk, sensual and enveloping. Rooh is not simply worn — it is felt, long after you have left the room.',
    topNotes: ['Saffron', 'Red Berries', 'Bergamot'],
    heartNotes: ['Damask Rose', 'Oud', 'Jasmine'],
    baseNotes: ['Amber', 'Sandalwood', 'Vanilla', 'Musk'],
    attributes: {
      sillage: 90,
      longevity: 88,
      freshness: 25,
      sweetness: 65,
      intensity: 92,
    },
    occasions: ['Evening', 'Winter', 'Date Night', 'Special Events'],
    applicationTips: [
      'Apply to wrists and neck — the oud and amber project beautifully from pulse points.',
      'A single spray on a scarf or collar carries the scent gracefully into the next day.',
      'Layer with an unscented moisturiser to make the warm base last even longer.',
    ],
    rating: 4.9,
    reviewCount: 134,
    images: ['/images/rooh-bottle.png', DUO_WHITE, DUO_DARK, LIFESTYLE_OFFICE],
    reviews: [
      {
        name: 'Fatima A.',
        rating: 5,
        location: 'Sharjah',
        comment:
          'Absolutely intoxicating. The rose and oud together are pure luxury. Compliments everywhere.',
      },
      {
        name: 'Omar M.',
        rating: 5,
        location: 'Dubai',
        comment:
          'Rich, warm and long-lasting. Easily competes with fragrances three times the price.',
      },
      {
        name: 'Sara T.',
        rating: 5,
        location: 'Sharjah',
        comment:
          'My signature scent now. Soulful is the perfect word — it feels personal and elegant.',
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getOtherProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug !== slug)
}

// Lowest variant price — used for "From AED …" labels in listings.
export function priceFrom(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price))
}
