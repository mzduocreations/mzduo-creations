"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // -1 = scrolling up, 1 = scrolling down, 0 = idle (used for the 3D tilt)
  const [tilt, setTilt] = useState(0);
  const lastY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (Math.abs(y - lastY.current) > 2) {
        setTilt(y > lastY.current ? 1 : -1);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => setTilt(0), 220);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 [perspective:900px] ${
        scrolled
          ? "bg-blush/90 shadow-soft backdrop-blur-md"
          : "bg-[#E7EEE6] shadow-soft backdrop-blur-md"
      }`}
    >
      <nav
        style={{
          transform: `rotateX(${tilt * -7}deg) translateY(${tilt === 0 ? 0 : -2}px)`,
          transformOrigin: "center top",
        }}
        className="section flex items-center justify-between py-3 transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      >
        <Link href="/#home" aria-label="MZDUO creations home" className="flex items-center">
          <Image
            src="/assets/logo-wordmark.png"
            alt="MZDUO creations"
            width={860}
            height={256}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-medium text-plum/80 transition-colors duration-300 hover:text-coral"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-plum transition-colors duration-500 md:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className={`px-5 pb-4 pt-2 backdrop-blur md:hidden ${
            scrolled ? "border-t border-plum/10 bg-blush/95" : "border-t border-plum/10 bg-[#E7EEE6]/97"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-3 font-medium text-plum/80 transition hover:bg-plum/5"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
