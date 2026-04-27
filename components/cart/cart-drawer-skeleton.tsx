import { Skeleton } from '@/components/ui/skeleton'

export function CartDrawerSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-24 w-24 shrink-0 rounded-md" />
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
