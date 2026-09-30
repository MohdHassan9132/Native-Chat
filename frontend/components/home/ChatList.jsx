"use client";

import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { SelfAvatarIcon } from "./avatars";
import { getChats } from "@/lib/api/chats";
import { getSessionUserId } from "@/lib/auth";

function ChatAvatar({ className }) {
  return <SelfAvatarIcon className={`${className} text-brand-charcoal`} />;
}

// The API only returns ids and timestamps (no names, avatars or messages),
// so the card shows what is real and leaves the rest neutral.
function toConversation(chat, userId) {
  const otherId = chat.user1Id === userId ? chat.user2Id : chat.user1Id;
  return {
    id: chat.chatId,
    name: otherId === userId ? "You" : `User ${otherId.slice(0, 8)}`,
    preview: "No messages yet",
    time: new Date(chat.createdAt).toLocaleDateString([], { day: "numeric", month: "short" }),
    bg: "#FFF3DF",
    Avatar: ChatAvatar,
  };
}

export default function ChatList() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getChats()
      .then((chats) => {
        if (cancelled) return;
        const userId = getSessionUserId();
        setConversations(chats.map((chat) => toConversation(chat, userId)));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mt-4 px-5 flex flex-col gap-4" aria-label="Conversations">
      {error && (
        <p role="alert" className="text-xs font-bold text-brand-coral">
          {error}
        </p>
      )}
      {conversations.map((conversation) => (
        <ChatListItem key={conversation.id} conversation={conversation} />
      ))}
    </section>
  );
}
