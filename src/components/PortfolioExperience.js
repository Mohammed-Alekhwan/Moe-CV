"use client";

import { useEffect } from "react";

/** Progressive enhancement: the full portfolio is readable before JavaScript loads. */
export default function PortfolioExperience() {
  useEffect(() => {
    let disposed = false;
    let cleanup;
    import("../main.js").then(({ initializePortfolio }) => {
      if (!disposed) cleanup = initializePortfolio();
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
