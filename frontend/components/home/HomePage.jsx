import StatusBar from "@/components/shared/StatusBar";
import HomeHeader from "./HomeHeader";
import StoriesRow from "./StoriesRow";
import ChatFilters from "./ChatFilters";
import ChatList from "./ChatList";
import FloatingComposeButton from "./FloatingComposeButton";
import BottomNavigation from "./BottomNavigation";
import HomeSocket from "./HomeSocket";

export default function HomePage() {
  return (
    <div className="h-dvh sm:h-auto sm:min-h-screen sm:py-6 flex items-center justify-center bg-brand-warmCanvas overflow-hidden sm:overflow-visible">
      {/* Self-contained phone-frame mockup: full-bleed (no bezel) below the
          sm breakpoint since the real device IS the frame there; a bordered,
          rounded, centered "device" card from sm+ — see Home implementation
          notes for why this screen departs from the other full-page screens. */}
      <main className="relative flex flex-col w-full h-full sm:h-[852px] sm:max-w-[393px] bg-brand-warmCanvas border-0 sm:border-[3px] border-brand-charcoal rounded-none sm:rounded-[46px] sm:shadow-2xl overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 flex flex-col">
          <StatusBar />
          <HomeHeader />
          <StoriesRow />
          <ChatFilters />
          <ChatList />
        </div>

        <HomeSocket />
        <FloatingComposeButton />
        <BottomNavigation />
      </main>
    </div>
  );
}
