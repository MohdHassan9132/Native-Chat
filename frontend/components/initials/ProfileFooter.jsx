import PillButton from "@/components/shared/PillButton";

export default function ProfileFooter({ canContinue, onContinue }) {
  return (
    <>
      <div className="flex items-center gap-2 px-1 mt-4 mb-2 text-neutral-500">
        <div className="w-5 h-5 rounded-full bg-brand-coralLight flex items-center justify-center text-brand-coral shrink-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-xs">End-to-end encrypted profile</span>
      </div>

      <div className="mt-2 flex flex-col gap-1.5">
        <PillButton
          type="button"
          variant="primary"
          disabled={!canContinue}
          onClick={onContinue}
          className="w-full justify-center py-3.5 text-sm uppercase tracking-wide"
        >
          <span>Continue to nativeChat</span>
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </PillButton>

        <p className="text-center text-xs text-neutral-500 mt-1">
          You can fine-tune your avatar, handle, and bubble colors anytime.
        </p>
      </div>
    </>
  );
}
