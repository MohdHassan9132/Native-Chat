"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatMessageList({ messages }) {
  const endRef = useRef(null);

  // Land on the latest message when the conversation opens — a no-op for
  // this short mock (everything already fits), but the correct default
  // once real, longer conversations are loaded.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, []);

  return (
    <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10" aria-label="Conversation">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={endRef} />
    </main>
  );
}
