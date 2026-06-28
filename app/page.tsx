import HeroSection from '@/components/sections/HeroSection'
import TrustStrip from '@/components/sections/TrustStrip'
import PromoBanner from '@/components/sections/PromoBanner'
import BrandStory from '@/components/sections/BrandStory'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import ProductSpotlight from '@/components/sections/ProductSpotlight'
import ReviewsSection from '@/components/sections/ReviewsSection'
import InstagramGrid from '@/components/sections/InstagramGrid'
import Newsletter from '@/components/sections/Newsletter'
import { getProductBySlug } from '@/lib/products'

export default function Home() {
  const hayat = getProductBySlug('hayat')!
  const rooh = getProductBySlug('rooh')!

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <BrandStory />
      <PromoBanner />
      <FeaturedProducts />
      <ProductSpotlight product={rooh} variant="dark" imagePosition="left" />
      <ProductSpotlight product={hayat} variant="light" imagePosition="right" />
      <ReviewsSection />
      <InstagramGrid />
      <Newsletter />
    </>
  )
}
