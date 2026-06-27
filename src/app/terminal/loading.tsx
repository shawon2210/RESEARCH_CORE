import { Skeleton } from "@/components/ui/Skeleton";

export default function TerminalLoading() {
  return (
    <>
      <section className="bg-surface-dark py-20 max-md:py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] border-b border-white/15">
        <div className="max-w-[var(--max-width)] mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-10 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]">
        <div className="max-w-[var(--max-width)] mx-auto">
          <div className="border border-white/15 p-6 min-h-[400px] flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-3"
                style={{ width: `${40 + Math.random() * 50}%` }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
