import StatusBar from "@/components/shared/StatusBar";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import MessageComposer from "./MessageComposer";

export default function ChatPage({ conversation }) {
  return (
    <div className="h-dvh flex flex-col items-center bg-brand-warmCanvas overflow-hidden">
      <div className="relative w-full max-w-[440px] h-full flex flex-col overflow-hidden bg-brand-warmCanvas">
        {/* Comic halftone paper texture — decorative, matches the reference's
            subtle dotted background exactly (8px grid, 5% opacity). */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(#252525 0.75px, transparent 0.75px)",
            backgroundSize: "8px 8px",
            opacity: 0.05,
          }}
          aria-hidden="true"
        />

        <StatusBar />
        <ChatHeader participant={conversation.participant} />
        <ChatMessageList messages={conversation.messages} />
        <MessageComposer />
      </div>
    </div>
  );
}
