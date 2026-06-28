import { getProductBySlug, getOtherProduct, products } from '@/lib/products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ScentPyramid from '@/components/product/ScentPyramid'
import ScentAttributes from '@/components/product/ScentAttributes'
import CrossSell from '@/components/product/CrossSell'
import ProductReviews from '@/components/product/ProductReviews'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.scentStory.substring(0, 160),
    openGraph: {
      title: `${product.name} — AM Perfume`,
      description: product.tagline,
      images: ['/images/og-image.jpg'],
    },
  }
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const otherProduct = getOtherProduct(product.slug)!

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    brand: { '@type': 'Brand', name: 'AM Perfume' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AED',
      lowPrice: Math.min(...product.variants.map((v) => v.price)),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="border-b border-ink/10 bg-ivory">
        <div className="mx-auto max-w-content px-6 py-4 md:px-12">
          <p className="font-body text-xs text-ink/50">
            <Link href="/" className="transition-colors hover:text-gold-deep">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/#fragrances" className="transition-colors hover:text-gold-deep">
              Fragrances
            </Link>
            <span className="mx-2">›</span>
            <span className="text-ink">{product.name}</span>
          </p>
        </div>
      </nav>

      {/* Hero: Gallery + Info */}
      <section className="bg-ivory py-8 md:py-12">
        <div className="mx-auto max-w-content px-5 md:px-12">
          <div className="flex flex-col items-start gap-10 md:flex-row lg:gap-16">
            <div className="w-full md:sticky md:top-24 md:w-[46%] md:self-start">
              <ProductGallery product={product} />
            </div>
            <div className="w-full md:w-[54%]">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Story + scent details (one cohesive band) */}
      <section className="bg-cream py-section-sm md:py-section">
        <div className="mx-auto max-w-content px-5 md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">The Story</p>
            <h2 className="mb-6 font-display text-display-md text-ink">
              The Story Behind the Scent
            </h2>
            <div className="mx-auto mb-8 h-px w-16 bg-gold" />
            <p className="font-body text-lg leading-loose text-ink-soft">
              {product.scentStory}
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-20 lg:gap-16">
            <ScentPyramid product={product} />
            <ScentAttributes product={product} />
          </div>
        </div>
      </section>

      <CrossSell product={otherProduct} />

      <ProductReviews product={product} />
    </>
  )
}
