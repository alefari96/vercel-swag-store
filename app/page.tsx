import { Suspense } from 'react'
import { HeroBanner } from '@/components/sections/hero-banner'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { ProductGridSkeleton } from '@/components/product/product-card-skeleton'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <HeroBanner
        title="Vercel Swag Store"
        subtitle="Exclusive merchandise for the modern developer. Premium quality, minimalist design, and developer-first aesthetics."
        ctaText="Shop Collection"
        ctaHref="/search"
        backgroundImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070"
      />

      <main className="flex flex-col w-full mx-auto max-w-7xl px-6 py-20">
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <FeaturedProducts />
        </Suspense>
      </main>
    </div>
  )
}
