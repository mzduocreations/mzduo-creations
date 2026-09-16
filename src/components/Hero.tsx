import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-peach/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lilac/30 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-teal/20 blur-3xl" />

      <div className="section grid items-center gap-10 md:grid-cols-2">
        <div className="animate-fadeup">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-plum shadow-sm ring-1 ring-plum/10">
            🐾 Furry &amp; Anime Art Studio
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-tight text-plum sm:text-6xl">
            MZDUO <span className="heading-gradient">creations</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-plum/70">
            Custom furry &amp; anime artwork made with love from expressive
            fursonas and profile pictures to reference sheets, Discord banners,
            and real world fursuits. Every piece is crafted to make your
            character&apos;s personality shine.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#gallery" className="btn-primary">
              Explore the Gallery
            </a>
            <a href="#contact" className="btn-outline">
              Get in touch
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 m-auto h-[26rem] w-[26rem] rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-gradient-to-br from-coral/30 via-peach/30 to-cream/50 blur-md" />
          <div className="relative animate-floaty">
            <div className="overflow-hidden rounded-[42%_58%_60%_40%/45%_45%_55%_55%] shadow-card ring-4 ring-white/60">
              <Image
                src="/assets/hero-art.jpeg"
                alt="Featured furry artwork by MZDUO creations"
                width={520}
                height={640}
                priority
                className="h-[30rem] w-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
