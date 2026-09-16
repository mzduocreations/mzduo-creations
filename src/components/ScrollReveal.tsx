"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    let ticking = false;
    
    document.documentElement.classList.add("reveal-ready");

    const reveal = () => {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-in)").forEach((el) => {
        const top = el.getBoundingClientRect().top;
       
        if (top < vh * 0.9) el.classList.add("reveal-in");
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(reveal);
    };

    reveal(); // initial pass
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, []);

  return null;
}
