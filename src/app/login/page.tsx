"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/brand/Logo";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Authentication failed");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-surface-dark min-h-screen flex items-center justify-center px-[var(--margin-mobile)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <Card variant="dark" className="p-8">
          <div className="flex flex-col items-center mb-8">
            <Logo size={40} />
            <h1 className="heading-xs text-brand-gold mt-4">RESEARCH_CORE</h1>
            <p className="body-mono opacity-50 mt-2">AUTHENTICATION REQUIRED</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="label-caps text-text-on-dark opacity-70 block mb-1">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border border-white/20 px-3 py-2 text-text-on-dark body-mono focus:outline-none focus:border-brand-gold transition-colors"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label-caps text-text-on-dark opacity-70 block mb-1">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-white/20 px-3 py-2 text-text-on-dark body-mono focus:outline-none focus:border-brand-gold transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="body-mono text-status-err text-center">{error}</p>
            )}

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </section>
  );
}
