const PILLARS = [
  {
    number: "01",
    title: "Pure Native Core",
    description: "Built for responsive touch, zero lag, smooth 60fps gesture navigation.",
    bg: "bg-brand-cyan",
    color: "text-brand-charcoal",
  },
  {
    number: "02",
    title: "Real-Time WebSockets",
    description: "Low-latency duplex messaging with typing presence & delivery receipts.",
    bg: "bg-brand-coral",
    color: "text-white",
  },
  {
    number: "03",
    title: "Encrypted Storage",
    description: "Local database caching and privacy-first media handling.",
    bg: "bg-brand-yellow",
    color: "text-brand-charcoal",
  },
  {
    number: "04",
    title: "Scalable Cloud Backend",
    description: "Tested and engineered for concurrent rooms and high-throughput feeds.",
    bg: "bg-brand-cyanLight",
    color: "text-brand-charcoal",
  },
];

export default function AboutProject() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-brand-warmCanvas border-b-2 border-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white ink-border rounded-3xl p-8 sm:p-12 lg:p-16 shadow-ink-lg relative overflow-hidden">
          <div className="absolute -top-4 -right-4 sm:top-8 sm:right-8 rotate-12 pointer-events-none">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-brand-charcoal bg-brand-yellow/20 flex flex-col items-center justify-center text-center p-2 shadow-ink-sm">
              <span className="text-[9px] font-black tracking-widest uppercase text-brand-charcoal">
                SEMESTER V
              </span>
              <span className="text-[11px] font-extrabold text-brand-cyanDark my-0.5">COMP SCI</span>
              <span className="text-[8px] font-bold text-neutral-600">PROJECT 2024</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-brand-yellowLight text-brand-charcoal font-bold text-xs uppercase tracking-wider rounded-md ink-border mb-4">
              ACADEMIC CAPSTONE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight mb-6">
              Built as a 5th Semester Project.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-neutral-700 font-medium leading-relaxed mb-10">
              <p className="p-4 bg-brand-warmCanvas rounded-2xl ink-border text-brand-charcoal font-semibold">
                nativeChat started as our 5th semester project with a simple
                goal: build a real messaging application from the ground up.
                Instead of stopping at a UI prototype, we built native chat,
                real-time communication, groups, media sharing, calls, status
                updates and the infrastructure needed to make the application
                scalable.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-4 rounded-2xl bg-brand-surface ink-border flex items-start gap-3"
                >
                  <span
                    className={`w-8 h-8 rounded-xl ink-border flex items-center justify-center font-bold text-xs shrink-0 ${pillar.bg} ${pillar.color}`}
                  >
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm text-brand-charcoal">{pillar.title}</h3>
                    <p className="text-xs text-neutral-600 mt-1 font-medium">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
