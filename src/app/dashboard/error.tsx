"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-surface-dark py-20 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] min-h-[60vh] flex items-center">
      <div className="max-w-[var(--max-width)] mx-auto w-full">
        <EmptyState
          icon="warning"
          title="STREAM MONITOR OFFLINE"
          description={`Unable to establish connection to the monitoring cluster. Diagnostic code: ${error.digest ?? "N/A"}`}
          action={
            <div className="flex gap-3 justify-center">
              <Button variant="primary" onClick={reset}>
                RECONNECT
              </Button>
              <Button variant="ghost" onClick={() => (window.location.href = "/")}>
                RETURN HOME
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
}
