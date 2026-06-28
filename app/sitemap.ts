import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://amperfume.ae'

  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/cart`, changeFrequency: 'monthly', priority: 0.3 },
    ...products.map((p) => ({
      url: `${base}/fragrances/${p.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
