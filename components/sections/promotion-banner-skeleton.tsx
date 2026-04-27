import { Skeleton } from "@/components/ui/skeleton";

export function PromotionBannerSkeleton() {
  return (
    <Skeleton className="flex flex-col py-4">
      <div className="flex flex-col px-6">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Skeleton>
  );
}