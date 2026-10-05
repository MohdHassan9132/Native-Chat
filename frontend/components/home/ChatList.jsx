"use client";

import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { SelfAvatarIcon } from "./avatars";
import { getChats } from "@/lib/api/chats";
import { getSessionUserId } from "@/lib/auth";

function ChatAvatar({ className }) {
  return <SelfAvatarIcon className={`${className} text-brand-charcoal`} />;
}


function toConversation(chat, userId) {
  const isSelf = chat.user1.userId === userId && chat.user2.userId === userId;
  let name;
  if(isSelf){
    name = `${chat.user1.name} (You)`
  }else{
    const otherUser = chat.user1.userId === userId ? chat.user2 : chat.user1
    name = otherUser.name
  }
  return {
    id: chat.chatId,
    name,
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
