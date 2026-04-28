import { Suspense } from 'react'
import { getCategories } from '@/lib/api'
import { SearchControls } from '@/components/search/search-controls'
import { SearchResults } from '@/components/search/search-results'
import { ProductGridSkeleton } from '@/components/product/product-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams
  return {
    title: q ? `Results for "${q}"` : 'Search',
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
      <Suspense fallback={
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 sm:w-48" />
        </div>
      }>
        <SearchControls categories={categories} />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton count={5} />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
