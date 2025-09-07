"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { Navbar } from "@/components/navbar";
import { AppLoader } from "@/components/app-loader";
import { CompaniesTrust } from "@/components/companies-trust";
import { VideoPlayer } from "@/components/video-player";
import { HeroFooter } from "@/components/hero-footer";

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
              <Background src="/photo.jpg" />
              <Newsletter />
              <HeroFooter />
            </div>
          </section>

          {/* Video Section */}
          <section id="our-story">
            <VideoPlayer src="/lolona-teaser.mp4" />
          </section>

          {/* Companies Trust Section */}
          <CompaniesTrust />

          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
