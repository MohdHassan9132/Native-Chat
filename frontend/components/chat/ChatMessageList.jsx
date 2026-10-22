"use client";

import ChatMessage from "./ChatMessage";

export default function ChatMessageList({
  messages,
  currentUserId,
  scrollContainerRef,
  endRef,
  onScroll,
}) {
  return (
    <main
      ref={scrollContainerRef}
      onScroll={onScroll}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10"
      aria-label="Conversation"
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
      <div ref={endRef} className="h-0" />
    </main>
  );
}
