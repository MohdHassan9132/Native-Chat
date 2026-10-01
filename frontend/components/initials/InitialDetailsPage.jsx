"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AppTopBar from "@/components/shared/AppTopBar";
import InitialsHeader from "./InitialsHeader";
import ProfileAvatar, { DEFAULT_AVATAR_SRC } from "./ProfileAvatar";
import ProfileNameCard from "./ProfileNameCard";
import ProfileBioCard from "./ProfileBioCard";
import ProfileFooter from "./ProfileFooter";
import OtpErrorBanner from "@/components/verification/OtpErrorBanner";
import { completeProfile } from "@/lib/api/users";

function HelpIcon() {
  return (
    <button
      type="button"
      aria-label="Help"
      className="w-8 h-8 rounded-full bg-brand-cyanLight text-brand-cyanDark ink-border flex items-center justify-center"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.09 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function InitialDetailsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR_SRC);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const nameInputRef = useRef(null);
  const bioTextareaRef = useRef(null);

  const canContinue = name.trim().length > 0;

  // Revoke the previous blob: URL whenever it's replaced/unmounted so we
  // don't leak memory across photo picks.
  useEffect(() => {
    return () => {
      if (avatarSrc.startsWith("blob:")) URL.revokeObjectURL(avatarSrc);
    };
  }, [avatarSrc]);

  function handleSelectMood(mood) {
    setBio(mood);
    bioTextareaRef.current?.focus();
  }

  // Saves the profile (PATCH /api/users/complete-profile); the auth cookie was
  // set when the OTP was verified.
  async function handleContinue() {
    if (!canContinue || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await completeProfile({ name: name.trim(), bio: bio.trim() });
      router.push("/home");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <>
      <AppTopBar onBack={() => router.back()} right={<HelpIcon />} />

      <main className="flex-1 flex justify-center bg-brand-warmCanvas">
        <div className="w-full max-w-[440px] px-5 pb-10">
          <InitialsHeader />

          <ProfileAvatar avatarSrc={avatarSrc} onAvatarChange={setAvatarSrc} />

          <div className="flex flex-col gap-4">
            <ProfileNameCard name={name} onNameChange={setName} inputRef={nameInputRef} />
            <ProfileBioCard
              bio={bio}
              onBioChange={setBio}
              onSelectMood={handleSelectMood}
              textareaRef={bioTextareaRef}
            />
          </div>

          {error && (
            <div className="mt-4">
              <OtpErrorBanner message={error} />
            </div>
          )}

          <ProfileFooter canContinue={canContinue && !submitting} onContinue={handleContinue} />
        </div>
      </main>
    </>
  );
}
