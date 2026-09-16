import Image from "next/image";

export default function WhatIsFurry() {
  return (
    <section id="about" className="py-16">
      <div className="section">
        <div className="reveal grid items-center gap-10 rounded-3xl bg-white/60 p-8 shadow-soft ring-1 ring-white/60 backdrop-blur md:grid-cols-2 md:p-12">
          <div className="order-2 md:order-1">
            <h2 className="font-display text-4xl font-extrabold text-plum">
              What is <span className="heading-gradient">furry…!</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-plum/75">
              Furry characters are{" "}
              <span className="font-semibold text-coral">anthropomorphic animals</span>{" "}
              with human like features, personalities, clothing, and emotions.
              They can be created as unique characters, avatars, or fursonas.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Unique, one-of-a-kind character designs",
                "Expressive personalities & emotions",
                "Perfect as avatars, PFPs, or fursonas",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-plum/80">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-teal/20 text-teal">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-lilac/30 to-peach/40 blur-lg" />
              <div className="relative overflow-hidden rounded-3xl shadow-card ring-4 ring-white/70">
                <Image
                  src="/assets/hero-art.jpeg"
                  alt="Example of a furry character"
                  width={420}
                  height={520}
                  className="h-80 w-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
