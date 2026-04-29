import { Suspense } from 'react'
import { HeroBanner } from '@/components/sections/hero-banner'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { ProductGridSkeleton } from '@/components/product/product-card-skeleton'
import { PromotionBanner } from '@/components/sections/promotion-banner'
import { PromotionBannerSkeleton } from '@/components/sections/promotion-banner-skeleton'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Suspense fallback={<PromotionBannerSkeleton />}>
        <PromotionBanner />
      </Suspense>
      <HeroBanner
        title="Vercel Swag Store"
        subtitle="Exclusive merchandise for the modern developer. Premium quality, minimalist design, and developer-first aesthetics."
        ctaText="Shop Collection"
        ctaHref="/search"
        backgroundImage="https://images.unsplash.com/photo-1775531994622-9c7ec9f017c9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <main className="flex flex-col w-full mx-auto max-w-7xl px-6 py-20">
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <FeaturedProducts />
        </Suspense>
      </main>
    </div>
  )
}
