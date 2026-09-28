export default function LegalFooter() {
  return (
    <div className="mt-4 text-center px-2">
      <p className="text-xs text-neutral-500 leading-relaxed">
        By continuing, you agree to nativeChat&apos;s{" "}
        <a href="#terms" className="text-brand-cyanDark font-bold underline underline-offset-2">
          Terms
        </a>{" "}
        &amp;{" "}
        <a href="#privacy" className="text-brand-cyanDark font-bold underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
