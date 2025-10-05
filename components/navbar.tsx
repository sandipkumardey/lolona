"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button, buttonVariants } from "./ui/button";
import { Logo } from "./icons/logo";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { createClient as createBrowserSupabase } from "@/utils/supabase/client";
import { signOut } from "@/app/actions/auth";

const navItems = [
  { name: "Our Story", href: "#our-story" },
  { name: "How it Works", href: "#our-story" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.history.replaceState(null, '', window.location.pathname);
  };

  const handleBookDemo = () => {
    // Scroll to top of page where the email input is
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Focus on email input after scroll completes
    setTimeout(() => {
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      if (emailInput) {
        emailInput.focus();
      }
    }, 800); // Wait for scroll animation to complete
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "px-inset py-4",
          // Always visible on mobile: light blur + border for contrast
          "backdrop-blur-xl bg-background/80 border-b border-border/20 md:backdrop-blur-0 md:border-0",
          // On md+ retain scroll-based background behavior
          scrolled && "md:backdrop-blur-xl md:bg-background/80 md:border-b md:border-border/20 md:shadow-sm",
          // Force black text on mobile for legibility
          "text-black md:text-foreground"
        )}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto" style={{ paddingTop: "env(safe-area-inset-top)" }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10"
          >
            <Link href="/" className="flex items-center">
              <span className="text-5xl font-galada text-[#EFE5D6] md:text-foreground">
                Lolona
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                    "hover:bg-primary/10 hover:text-primary",
                    "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="hidden md:block"
          >
            <div className="flex items-center gap-2">
              <Button size="sm" shine onClick={handleBookDemo}>
                Book a Demo
              </Button>
              <AuthButtonsDesktop />
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden relative z-10 text-[#EFE5D6] md:text-foreground"
            )}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Cross1Icon className="size-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HamburgerMenuIcon className="size-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/85 backdrop-blur-xl z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-20 left-inset right-inset z-40 md:hidden"
            >
              <div className="bg-card/95 text-black md:text-foreground backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-button">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                        className={cn(
                          "block px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-200 cursor-pointer",
                          "hover:bg-primary/10 hover:text-primary",
                          "text-black md:text-foreground"
                        )}
                      >
                        {item.name}
                      </a>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="pt-4 border-t border-border/20"
                  >
                    <div className="flex gap-3">
                      <Button className="w-full text-black md:text-foreground" shine onClick={handleBookDemo}>
                        Book a Demo
                      </Button>
                    </div>
                    <div className="mt-3">
                      <AuthButtonsMobile />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Auth helpers (module scope) ---
function useAuthUser() {
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const supabase = createBrowserSupabase();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: subscription } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);
  return { user, mounted } as const;
}

function AuthButtonsDesktop() {
  const { user, mounted } = useAuthUser();
  if (!mounted) return null;
  if (user) {
    return (
      <form action={signOut}>
        <Button size="sm" type="submit">Sign out</Button>
      </form>
    );
  }
  return (
    <Button size="sm" variant="default" asChild>
      <Link href="/login">Log in</Link>
    </Button>
  );
}

function AuthButtonsMobile() {
  const { user, mounted } = useAuthUser();
  if (!mounted) return null;
  if (user) {
    return (
      <form action={signOut}>
        <Button className="w-full" type="submit">Sign out</Button>
      </form>
    );
  }
  return (
    <Button className="w-full" variant="default" asChild>
      <Link href="/login">Log in</Link>
    </Button>
  );
}
