"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/dashboard` : "/dashboard";

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return; // prevent spam
    setStatus("sending");
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    if (error) {
      setError(error.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
    // Start 30s cooldown
    setCooldown(30);
    const timer = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <Button type="submit" className="w-full" disabled={status === "sending" || cooldown > 0}>
              {status === "sending" ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Send magic link"}
            </Button>
          </form>

          {status === "sent" && (
            <p className="mt-4 text-sm text-green-600">Check your email for the login link.</p>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error.toLowerCase().includes("rate") ? "Too many attempts. Please wait a bit before retrying." : error}
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
