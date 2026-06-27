import { Skeleton } from "@/components/ui/Skeleton";
import { SkeletonCard } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div className="bg-surface-dark min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Skeleton className="w-12 h-12 rounded-none" variant="dark" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-3 w-40" variant="dark" />
          <Skeleton className="h-3 w-24" variant="dark" />
          <Skeleton className="h-3 w-32 mt-4" variant="dark" />
          <Skeleton className="h-3 w-20" variant="dark" />
        </div>
      </div>
    </div>
  );
}
