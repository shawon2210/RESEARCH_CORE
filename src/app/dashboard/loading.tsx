import { Skeleton, SkeletonCard, SkeletonTable } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <>
      <section className="bg-surface-dark py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] border-b border-white/15">
        <div className="max-w-[var(--max-width)] mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-3 w-64" />
          </div>
        </div>
      </section>

      <section className="bg-surface-dark-alt py-8 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
        <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} variant="dark" />
          ))}
        </div>
      </section>

      <section className="bg-surface-dark py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
        <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 border border-white/15 p-6">
            <Skeleton className="h-3 w-36 mb-6" />
            <SkeletonTable rows={5} />
          </div>
          <div className="md:col-span-4 border border-white/15 p-6">
            <Skeleton className="h-3 w-24 mb-6" />
            <SkeletonTable rows={3} />
          </div>
          <div className="md:col-span-12 border border-white/15 p-6">
            <Skeleton className="h-3 w-32 mb-6" />
            <SkeletonTable rows={4} />
          </div>
        </div>
      </section>
    </>
  );
}
