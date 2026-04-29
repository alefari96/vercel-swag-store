import { Skeleton } from '@/components/ui/skeleton'

export function ProductActionsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-5 w-24 rounded-full" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-[108px] shrink-0" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  )
}