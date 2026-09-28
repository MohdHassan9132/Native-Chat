import Link from "next/link";

export const metadata = {
  title: "Log In — nativeChat",
  description: "Log in to nativeChat.",
};

// Placeholder route only — the real Login screen (UI/Login/) is out of scope
// for this implementation. No auth, OTP, or backend calls here.
export default function LoginPage() {
  return (
    <main className="flex-1 flex min-h-screen items-center justify-center p-8 bg-brand-warmCanvas text-brand-charcoal">
      <div className="text-center max-w-sm">
        <h1 className="text-2xl font-extrabold tracking-tight mb-2">Log In</h1>
        <p className="text-sm text-neutral-600 font-medium mb-6">
          The login screen is coming soon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-brand-charcoal text-sm font-bold px-6 py-2.5 rounded-full ink-border shadow-ink-sm hand-wiggle"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
