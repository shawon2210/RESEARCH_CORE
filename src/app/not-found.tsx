import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-surface-dark py-40 px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] min-h-screen flex items-center">
      <div className="max-w-[var(--max-width)] mx-auto w-full">
        <div className="border-t border-brand-gold pt-4 max-w-xl">
          <p className="body-mono text-brand-gold mb-4 tracking-[0.1em]">
            ERROR 404 // ROUTE NOT FOUND
          </p>
          <h1 className="heading-lg text-text-on-dark text-glow mb-4">
            SYSTEM_MALFUNCTION
          </h1>
          <p className="body-mono text-text-on-dark opacity-60 mb-8 leading-relaxed max-w-md">
            The requested endpoint does not exist in the current system
            topology. The node may have been decommissioned or the address is
            malformed.
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="primary">RETURN TO BASE</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">VIEW STREAMS</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
