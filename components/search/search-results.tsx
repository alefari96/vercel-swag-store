import { getProducts } from '@/lib/api'
import { ProductCard } from '@/components/product/product-card'

type SearchParams = Promise<{ q?: string; category?: string }>

export async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const { q, category } = await searchParams
  const { data: products } = await getProducts({ search: q, category, limit: 5 })

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No products found{q ? ` for "${q}"` : ''}.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {products.map((p, i) => <ProductCard key={i} product={p} eager={i < 2} />)}
    </div>
  )
}
