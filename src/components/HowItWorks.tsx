const STEPS = [
  {
    n: "01",
    title: "Share Your Requirements",
    text: "Tell us what you'd like to create Furry or Anime? Whether you need a furry fursona, an anime OC, PFP, reference sheet, banner, or another custom artwork, please share all the details and ideas you have so we can bring your vision to life.",
    accent: "coral",
    icon: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  },
  {
    n: "02",
    title: "Unlimited Revisions",
    text: "You'll receive unlimited revisions during the sketch stage, allowing you to request changes and adjustments until you're happy with the direction of your artwork.",
    accent: "peach",
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
  },
  {
    n: "03",
    title: "Upfront Payment",
    text: "A 40 to 50% upfront payment is required to begin your commission. The remaining balance can be paid after the final artwork is completed and ready for delivery.",
    accent: "lilac",
    icon: (
      <>
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  },
  {
    n: "04",
    title: "Weekly & Monthly Payment Plans",
    text: "If you're working with a limited budget, you can choose a weekly or monthly installment plan to make your commission more manageable and flexible.",
    accent: "teal",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
  },
  {
    n: "05",
    title: "Reserve Your Commission Slot",
    text: "To reserve your commission slot, provide your name and email along with a 20% reservation payment of the total artwork cost. Your slot will be secured once the reservation payment is received.",
    accent: "plum",
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
];

const dot: Record<string, string> = {
  coral: "bg-coral",
  peach: "bg-peach",
  lilac: "bg-lilac",
  teal: "bg-teal",
  plum: "bg-plum",
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="section">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-plum shadow-sm ring-1 ring-plum/10">
            🐾 Simple &amp; Stress Free
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold text-plum sm:text-5xl">
            How <span className="heading-gradient">Commissions</span> Work
          </h2>
          <p className="mt-4 text-lg text-plum/70">
            From first message to final art here&apos;s exactly how we bring your character to life.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* vertical line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-plum/15 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`reveal relative flex items-start gap-6 pl-16 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:mr-auto md:pr-14 md:text-right"
                    : "md:ml-auto md:flex-row-reverse md:pl-14 md:text-left"
                }`}
              >
                {/* dot on the line */}
                <span
                  className={`absolute left-6 top-5 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full ring-4 ring-blush ${dot[s.accent]} md:left-auto ${
                    i % 2 === 0 ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                  }`}
                />

                <div className="flex-1 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-white/60 transition hover:-translate-y-1 hover:shadow-card">
                  <div
                    className={`flex items-center gap-3 ${
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white ${dot[s.accent]}`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {s.icon}
                      </svg>
                    </span>
                    <div>
                      <span className="font-display text-sm font-bold text-plum/40">
                        Step {s.n}
                      </span>
                      <h3 className="font-display text-xl font-bold text-plum">{s.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-plum/70">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
