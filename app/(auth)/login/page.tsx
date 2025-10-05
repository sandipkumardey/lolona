"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Iridescence from "@/components/iridescence";

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
    <main className="relative min-h-[100dvh] w-full overflow-hidden">
      <Iridescence className="absolute inset-0 w-full h-full" color={[0.85, 0.06, 0.06]} speed={0.35} amplitude={0.06} mouseReact={false} />
      <div className="relative z-10 flex items-center justify-center min-h-[100dvh] px-6">
        <Card className="w-full max-w-md rounded-3xl border border-border/50 bg-white/90 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="font-serif text-3xl md:text-4xl">Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmail} className="space-y-5">
              <div>
                <label className="block text-sm mb-2 text-foreground/90">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-full bg-white/80 border-white/60 shadow-sm text-black placeholder:text-neutral-400 caret-black"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-[#7A0A0A] text-[#EFE5D6] hover:bg-[#650808] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EFE5D6] shadow-md disabled:opacity-70 disabled:hover:bg-[#7A0A0A]"
                disabled={status === "sending" || cooldown > 0}
              >
                {status === "sending" ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Send magic link"}
              </Button>
            </form>

            {status === "sent" && (
              <p className="mt-4 text-sm text-green-700">Check your email for the login link.</p>
            )}
            {error && (
              <p className="mt-4 text-sm text-red-600">
                {error.toLowerCase().includes("rate") ? "Too many attempts. Please wait a bit before retrying." : error}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
