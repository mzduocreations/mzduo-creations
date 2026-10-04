import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 bg-plum text-blush">
      <div className="reveal section grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="inline-flex items-center rounded-2xl bg-blush px-4 py-2 shadow-sm">
            <Image
              src="/assets/logo-wordmark.png"
              alt="MZDUO creations"
              width={860}
              height={256}
              className="h-11 w-auto"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-blush/70">
            Custom furry and anime art from expressive fursonas and PFPs to reference sheets, Discord banners, and fursuits crafted to bring your character&apos;s unique personality to life.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-peach">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-blush/80">
            <li><a href="#home" className="hover:text-peach">Home</a></li>
            <li><a href="#about" className="hover:text-peach">About</a></li>
            <li><a href="#gallery" className="hover:text-peach">Gallery</a></li>
            <li><a href="#contact" className="hover:text-peach">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-peach">Connect with us</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href="https://instagram.com/mzduocreations"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-blush/85 hover:text-peach"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 group-hover:bg-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </span>
              @mzduocreations
            </a>
            <a
              href="https://facebook.com/mzduocreations"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-blush/85 hover:text-peach"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 group-hover:bg-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 22v-8h2.7l.4-3.1H13V8.9c0-.9.25-1.5 1.5-1.5H16V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7v3.1h2.8V22H13z" />
                </svg>
              </span>
              MZDUO creations
            </a>
            <a
              href="mailto:mzduocreations@gmail.com"
              className="group flex items-center gap-3 text-blush/85 hover:text-peach"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 group-hover:bg-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              mzduocreations@gmail.com
            </a>
                        <div className="flex items-start gap-3 text-blush/85">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.3 5.3A17 17 0 0 0 15 4l-.2.4a12.6 12.6 0 0 1 3.7 1.2 13.3 13.3 0 0 0-11-0A12.6 12.6 0 0 1 11.2 4.4L11 4a17 17 0 0 0-4.3 1.3C4 9.3 3.3 13.2 3.6 17a17 17 0 0 0 5.2 2.6l.6-1a11 11 0 0 1-1.8-.9l.4-.3a9.5 9.5 0 0 0 8 0l.4.3c-.6.4-1.2.7-1.8.9l.6 1A17 17 0 0 0 20.4 17c.5-4.4-.6-8.3-1.1-11.7ZM9.5 14.8c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Zm5 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Z" />
                </svg>
              </span>
              <div className="leading-relaxed">
                <p className="text-xs font-semibold uppercase tracking-wide text-blush/50">Discord</p>
                <p>ava_786</p>
                 <div className="flex items-start gap-3 text-blush/85">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.3 5.3A17 17 0 0 0 15 4l-.2.4a12.6 12.6 0 0 1 3.7 1.2 13.3 13.3 0 0 0-11-0A12.6 12.6 0 0 1 11.2 4.4L11 4a17 17 0 0 0-4.3 1.3C4 9.3 3.3 13.2 3.6 17a17 17 0 0 0 5.2 2.6l.6-1a11 11 0 0 1-1.8-.9l.4-.3a9.5 9.5 0 0 0 8 0l.4.3c-.6.4-1.2.7-1.8.9l.6 1A17 17 0 0 0 20.4 17c.5-4.4-.6-8.3-1.1-11.7ZM9.5 14.8c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Zm5 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Z" />
                </svg>
              </span>
              <div className="leading-relaxed">
                <p className="text-xs font-semibold uppercase tracking-wide text-blush/50">Discord</p>
                <p>softyfur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-blush/60">
        © {new Date().getFullYear()} MZDUO creations. All rights reserved.
      </div>
    </footer>
  );
}
