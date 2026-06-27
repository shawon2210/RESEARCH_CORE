"use client";

import { Button } from "@/components/ui/Button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-surface-dark py-40 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] min-h-screen flex items-center">
      <div className="max-w-[var(--max-width)] mx-auto w-full">
        <div className="border-t border-status-err pt-4 max-w-xl">
          <p className="body-mono text-status-err mb-4 tracking-[0.1em]">
            CRITICAL // SYSTEM EXCEPTION
          </p>
          <h1 className="heading-lg text-text-on-dark mb-4">
            UNEXPECTED_FAULT
          </h1>
          <p className="body-mono text-text-on-dark opacity-60 mb-8 leading-relaxed max-w-md">
            The system encountered an unrecoverable error. Diagnostic code:{" "}
            <span className="opacity-100 text-status-err">
              {error.digest ?? "N/A"}
            </span>
          </p>
          <div className="flex gap-4">
            <Button variant="primary" onClick={reset}>
              RETRY SEQUENCE
            </Button>
            <Button variant="ghost" onClick={() => (window.location.href = "/")}>
              REBOOT SYSTEM
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
