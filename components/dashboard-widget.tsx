"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";

export default function DashboardWidget() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Bottom-center widget button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Button
          size="lg"
          className="relative overflow-hidden rounded-full h-12 min-w-[220px] px-5 border font-medium tracking-wide
                     bg-white text-black border-white/60
                     shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_24px_rgba(0,0,0,0.35)]
                     hover:bg-white focus-visible:ring-2 focus-visible:ring-white/40 transition-colors
                     before:content-[''] before:absolute before:inset-0 before:rounded-full before:ring-2 before:ring-white/30 before:pointer-events-none"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="inline-flex w-full items-center justify-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center">
              <Image src="/disk.png" alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
            </span>
            <span>{open ? "End call" : "Talk to Lolona"}</span>
          </span>
        </Button>
      </div>

      {/* Center card with envelope-like reveal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Click-away backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scaleY: 0, rotateX: 12, opacity: 0, y: 24 }}
                animate={{ scaleY: 1, rotateX: 0, opacity: 1, y: 0 }}
                exit={{ scaleY: 0, rotateX: 12, opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                style={{ transformOrigin: "bottom center", perspective: 1000 }}
                className="w-full max-w-lg"
              >
                <Card className="relative border border-border/60 shadow-xl">
                  <CardHeader>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Close widget"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full"
                      onClick={() => setOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardTitle>Talk to Lolona</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <div className="flex flex-col items-center justify-center py-6">
                      <Image
                        src="/cd.gif"
                        alt="Animated CD"
                        width={180}
                        height={180}
                        unoptimized
                        className="h-40 w-40"
                      />
                      <p className="mt-4 text-center max-w-sm">
                        This is your widget. Add any content or controls here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
