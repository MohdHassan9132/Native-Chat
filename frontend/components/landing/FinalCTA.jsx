import PillButton from "./PillButton";

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-24 bg-brand-cyanLight/40 border-b-2 border-brand-charcoal relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-warmCanvas ink-border rounded-3xl p-8 sm:p-14 text-center shadow-ink-lg relative">
          <span className="absolute top-6 left-8 text-2xl text-brand-yellow select-none" aria-hidden="true">
            ✦
          </span>
          <span className="absolute bottom-6 right-8 text-2xl text-brand-coral select-none" aria-hidden="true">
            ★
          </span>
          <span className="absolute top-10 right-12 text-sm text-brand-cyanDark select-none" aria-hidden="true">
            ●
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            Ready to Start a Conversation?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-xl mx-auto font-medium">
            Experience the illustrated mobile chat interface in your browser
            or explore our live project repository.
          </p>

          {/* No Sign Up button, per design reference — Log In is the only auth CTA */}
          <div className="mt-8 flex justify-center">
            <PillButton href="/login" variant="primary" className="text-base sm:text-lg px-9 py-4">
              <span>Open nativeChat</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
