"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const shortcuts: Record<string, string> = {
  "1": "/",
  "2": "/dashboard",
  "3": "/terminal",
  "4": "/protocols",
};

export function KeyboardNav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const dest = shortcuts["2"];
        if (dest && dest !== pathname) router.push(dest);
        return;
      }

      if (!e.ctrlKey && !e.metaKey && !e.altKey && shortcuts[e.key] && e.key >= "1" && e.key <= "4") {
        const dest = shortcuts[e.key];
        if (dest !== pathname) router.push(dest);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, pathname]);

  return null;
}
