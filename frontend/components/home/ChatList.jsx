"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ChatListItem from "./ChatListItem";
import { SelfAvatarIcon } from "./avatars";
import { getChats } from "@/lib/api/chats";
import { getSessionUserId } from "@/lib/auth";
import { connectSocket } from "@/lib/socket/connect";

function ChatAvatar({ className }) {
  return <SelfAvatarIcon className={`${className} text-brand-charcoal`} />;
}

function formatMessageTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { day: "numeric", month: "short" });
}

function toConversation(chat, userId) {
  const isSelf = chat.user1.userId === userId && chat.user2.userId === userId;
  let name;
  if (isSelf) {
    name = `${chat.user1.name || "You"} (You)`;
  } else {
    const otherUser = chat.user1.userId === userId ? chat.user2 : chat.user1;
    name = otherUser?.name || "Unknown";
  }

  const latestMessage = chat.messages?.[0];
  const preview = latestMessage ? latestMessage.content : "No messages yet";
  const time = latestMessage
    ? formatMessageTime(latestMessage.createdAt)
    : formatMessageTime(chat.createdAt);

  return {
    id: chat.chatId,
    name,
    preview,
    time,
    unread: 0,
    bg: "#FFF3DF",
    Avatar: ChatAvatar,
    rawTimestamp: latestMessage
      ? new Date(latestMessage.createdAt).getTime()
      : new Date(chat.createdAt).getTime(),
  };
}

export default function ChatList() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const socketRef = useRef(null);

  const joinRooms = useCallback((chatList) => {
    const socket = connectSocket();
    if (!socket || !chatList) return;
    chatList.forEach((chat) => {
      const chatId = chat.id || chat.chatId;
      if (chatId) {
        socket.emit("chat:join", chatId);
      }
    });
  }, []);

  const refreshChats = useCallback(() => {
    getChats()
      .then((chats) => {
        const userId = getSessionUserId();
        const mapped = chats.map((chat) => toConversation(chat, userId));
        setConversations(mapped);
        joinRooms(mapped);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [joinRooms]);

  useEffect(() => {
    let cancelled = false;

    getChats()
      .then((chats) => {
        if (cancelled) return;
        const userId = getSessionUserId();
        const mapped = chats.map((chat) => toConversation(chat, userId));
        setConversations(mapped);
        joinRooms(mapped);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [joinRooms]);

  // Connect socket and handle incoming messages on /home
  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;
    socketRef.current = socket;

    const handleConnect = () => {
      joinRooms(conversations);
    };

    const handleNewMessage = (newMsg) => {
      if (!newMsg || !newMsg.chatId) return;

      setConversations((prev) => {
        const existingIndex = prev.findIndex((c) => c.id === newMsg.chatId);
        const currentUserId = getSessionUserId();
        const isFromOther = newMsg.senderId !== currentUserId;
        const timeStr = formatMessageTime(newMsg.createdAt);

        if (existingIndex !== -1) {
          const existing = prev[existingIndex];
          const updated = {
            ...existing,
            preview: newMsg.content,
            time: timeStr,
            unread: isFromOther ? (existing.unread || 0) + 1 : existing.unread,
            rawTimestamp: new Date(newMsg.createdAt).getTime(),
          };
          const rest = prev.filter((_, idx) => idx !== existingIndex);
          return [updated, ...rest];
        } else {
          // If message is for a new chat not yet rendered, fetch all chats
          refreshChats();
          return prev;
        }
      });
    };

    socket.on("connect", handleConnect);
    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message:new", handleNewMessage);
    };
  }, [conversations, joinRooms, refreshChats]);

  const handleSelectChat = (chatId) => {
    // Clear unread for selected chat
    setConversations((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c))
    );
  };

  return (
    <section className="mt-4 px-5 flex flex-col gap-4" aria-label="Conversations">
      {error && (
        <p role="alert" className="text-xs font-bold text-brand-coral">
          {error}
        </p>
      )}
      {conversations.map((conversation) => (
        <ChatListItem
          key={conversation.id}
          conversation={conversation}
          onSelect={handleSelectChat}
        />
      ))}
    </section>
  );
}
