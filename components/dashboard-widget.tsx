"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Minimal widget that embeds ElevenLabs Convai at the exact same bottom-center spot
export default function DashboardWidget() {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const id = "elevenlabs-convai-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      s.async = true;
      s.type = "text/javascript";
      s.id = id;
      s.onload = () => {
        console.info("[Convai] script loaded");
        setScriptReady(true);
      };
      s.onerror = () => {
        console.error("[Convai] failed to load script from unpkg – retrying via jsDelivr");
        const s2 = document.createElement("script");
        s2.src = "https://cdn.jsdelivr.net/npm/@elevenlabs/convai-widget-embed";
        s2.async = true;
        s2.type = "text/javascript";
        s2.onload = () => {
          console.info("[Convai] script loaded from jsDelivr");
          setScriptReady(true);
        };
        s2.onerror = () => console.error("[Convai] failed to load script from jsDelivr");
        document.body.appendChild(s2);
      };
      document.body.appendChild(s);
    } else {
      setScriptReady(true);
    }
  }, []);

  // Ensure the custom element is visibly positioned; re-apply if the library mutates styles
  useEffect(() => {
    if (!scriptReady) return;
    const applyStyles = () => {
      const el = document.querySelector<HTMLElement>("elevenlabs-convai");
      if (el) {
        el.style.position = "fixed";
        el.style.left = "50%";
        el.style.transform = "translateX(-50%)";
        el.style.bottom = "calc(env(safe-area-inset-bottom, 0px) + 160px)";
        el.style.zIndex = "9999";
        el.style.pointerEvents = "auto";
      }
    };
    applyStyles();
    const mo = new MutationObserver(applyStyles);
    mo.observe(document.body, { subtree: true, childList: true, attributes: true });
    return () => mo.disconnect();
  }, [scriptReady]);

  return (
    <div className="pointer-events-auto">
      {/* ElevenLabs Convai embed */}
      <elevenlabs-convai agent-id="agent_8501k6zefvypfe9vytewetdy86c7" />

      {/* Fallback placeholder so you can see the intended spot while loading */}
      {!scriptReady && (
        <div
          className="fixed left-1/2 -translate-x-1/2 inline-flex h-12 min-w-[220px] items-center justify-center rounded-full bg-white text-black px-5 border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_24px_rgba(0,0,0,0.35)]"
          aria-hidden
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)", zIndex: 60 }}
        >
          Loading voice widget…
        </div>
      )}

      {/* Brand logo positioned just below the widget (matches navbar typography) */}
      <div
        className="fixed left-1/2 -translate-x-1/2 select-none pointer-events-none"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 110px)", zIndex: 50 }}
        aria-hidden
      >
        <span className="block text-center font-galada text-[36px] leading-none text-[#EFE5D6] drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
          Lolona
        </span>
      </div>

      {/* Force the custom element to position above bottom toolbars */}
      <style jsx global>{`
        elevenlabs-convai { z-index: 9999 !important; }
      `}</style>
    </div>
  );
}
