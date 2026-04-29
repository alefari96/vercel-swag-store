import { Suspense } from 'react'
import { getCategories } from '@/lib/api'
import { SearchControls } from '@/components/search/search-controls'
import { SearchControlsSkeleton } from '@/components/search/search-controls-skeleton'
import { SearchResults } from '@/components/search/search-results'
import { ProductGridSkeleton } from '@/components/product/product-card-skeleton'
import { Typography } from '@/components/ui/typography'

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams
  const title = q ? `Results for "${q}"` : 'Search'
  return {
    title,
    description: 'Search for Vercel swag products.',
    openGraph: {
      title,
      description: 'Search for Vercel swag products.',
    },
  }
}

type SearchParams = Promise<{ q?: string; category?: string }>

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { data: categories } = await getCategories()

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-8">
      <Typography variant="h1">Search</Typography>
      <Suspense fallback={<SearchControlsSkeleton />}>
        <SearchControls categories={categories} />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton count={5} />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
