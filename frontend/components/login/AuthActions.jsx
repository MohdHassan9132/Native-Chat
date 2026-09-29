import PillButton from "@/components/shared/PillButton";

export default function AuthActions({ canSubmit }) {
  return (
    <div className="mt-6">
      <PillButton
        type="submit"
        variant="primary"
        disabled={!canSubmit}
        className="w-full justify-center py-3.5 text-sm"
      >
        <span>Continue</span>
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PillButton>
    </div>
  );
}
