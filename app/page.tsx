"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { Navbar } from "@/components/navbar";
import { AppLoader } from "@/components/app-loader";
import { CompaniesTrust } from "@/components/companies-trust";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem("lolona-visited");
    if (visited) {
      setHasVisited(true);
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    localStorage.setItem("lolona-visited", "true");
  };

  return (
    <main className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isLoading && !hasVisited && (
          <AppLoader key="loader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      {(!isLoading || hasVisited) && (
        <>
          <Navbar />
          
          {/* Hero Section */}
          <section className="h-[100dvh] w-full">
            <div className="relative h-full w-full p-inset">
              <Background src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4" placeholder="/alt-placeholder.png" />
              <Newsletter />
              <Footer />
            </div>
          </section>

          {/* Companies Trust Section */}
          <CompaniesTrust />
        </>
      )}
    </main>
  );
}
