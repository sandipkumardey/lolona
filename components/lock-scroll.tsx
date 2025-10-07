"use client";

import { useEffect } from "react";

export default function LockScroll() {
  useEffect(() => {
    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevHeight = style.height;

    style.overflow = "hidden";
    style.height = "100dvh";

    return () => {
      style.overflow = prevOverflow;
      style.height = prevHeight;
    };
  }, []);

  return null;
}
