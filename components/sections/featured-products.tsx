// Async Server Component — fetches and renders featured products.
// Wrapping this in <Suspense> in page.tsx lets Next.js stream the page
// shell immediately and fill this section in when the fetch resolves.
import { getProducts } from '@/lib/api'
import { ProductCard } from '@/components/product/product-card'
import { Typography } from '@/components/ui/typography'

export async function FeaturedProducts() {
  const { data: products } = await getProducts({ featured: true })

  if (products.length === 0) {
    return (
      <section>
        <Typography variant="h2" className="border-none mb-8">
          Featured Products
        </Typography>
        <p className="text-muted-foreground">No featured products available.</p>
      </section>
    )
  }

  return (
    <section>
      <Typography variant="h2" className="border-none mb-8">
        Featured Products
      </Typography>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
