import Image from "next/image";
import AppTopBar from "@/components/shared/AppTopBar";

export default function TopBar() {
  return (
    <AppTopBar
      backHref="/"
      right={
        <Image
          src="/assets/login/avatar-placeholder.jpg"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover ink-border"
        />
      }
    />
  );
}
