import { Skeleton } from '@/components/ui/skeleton'

export function SearchControlsSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-1 gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 min-w-32 shrink-0" />
      </div>
      <Skeleton className="h-9 w-full sm:w-48 shrink-0" />
    </div>
  )
}
