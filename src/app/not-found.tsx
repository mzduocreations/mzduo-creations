import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "404 Page Not Found | MZDUO creations",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden">
      {/* decorative blobs (same palette as hero) */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-peach/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lilac/30 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-teal/20 blur-3xl" />

      <div className="section grid items-center gap-10 py-16 md:grid-cols-2">
        <div className="animate-fadeup">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-plum shadow-sm ring-1 ring-plum/10">
            🐾 Oops, you wandered off the trail
          </span>
          <h1 className="mt-5 font-display text-7xl font-extrabold leading-none text-plum sm:text-8xl">
            <span className="heading-gradient">404</span>
          </h1>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-plum sm:text-4xl">
            Page Not Found
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-plum/70">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            But don&apos;t worry there&apos;s plenty of furry &amp; anime art
            waiting for you back home.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/#gallery" className="btn-outline">
              Explore the Gallery
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 m-auto h-[26rem] w-[26rem] rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-gradient-to-br from-coral/30 via-peach/30 to-cream/50 blur-md" />
          <div className="relative animate-floaty">
            <div className="overflow-hidden rounded-[42%_58%_60%_40%/45%_45%_55%_55%] shadow-card ring-4 ring-white/60">
              <Image
                src="/assets/hero-art.jpeg"
                alt="Furry artwork by MZDUO creations"
                width={520}
                height={640}
                priority
                className="h-[26rem] w-auto object-cover sm:h-[30rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
