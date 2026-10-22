"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import StatusBar from "@/components/shared/StatusBar";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import MessageComposer from "./MessageComposer";
import { connectSocket } from "@/lib/socket/connect";
import { getChatById, getChatMessages } from "@/lib/api/chats";
import { getSessionUserId } from "@/lib/auth";

function formatServerMessage(msg, activeUserId) {
  const isOutgoing = Boolean(activeUserId) && msg.senderId === activeUserId;
  const date = msg.createdAt ? new Date(msg.createdAt) : new Date();
  const timeStr = !isNaN(date.getTime())
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return {
    id: msg.messageId || msg.id || `${Date.now()}-${Math.random()}`,
    senderId: msg.senderId,
    senderName: msg.sender?.name || (isOutgoing ? "You" : "Participant"),
    type: "text",
    text: msg.content || msg.text || "",
    timestamp: timeStr,
    isOutgoing,
  };
}

export default function ChatPage({ chatId, fallbackConversation }) {
  // Initialize to null so server render and initial client hydration match identically
  const [currentUserId, setCurrentUserId] = useState(null);
  const [participant, setParticipant] = useState(
    fallbackConversation?.participant || { id: chatId, name: "Chat", status: "Online" }
  );
  const [messages, setMessages] = useState(fallbackConversation?.messages || []);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const scrollContainerRef = useRef(null);
  const endRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const socketRef = useRef(null);

  // Load chat info and message history on client after mount
  useEffect(() => {
    let cancelled = false;
    const localUserId = getSessionUserId();
    if (localUserId) {
      setCurrentUserId(localUserId);
    }

    // Fetch chat metadata
    getChatById(chatId)
      .then((chat) => {
        if (cancelled || !chat) return;

        const activeUserId = chat.currentUserId || localUserId;
        if (chat.currentUserId) {
          setCurrentUserId(chat.currentUserId);
        }

        const isSelf = chat.user1?.userId === activeUserId && chat.user2?.userId === activeUserId;
        const otherUser = isSelf
          ? { name: `${chat.user1?.name || "You"} (You)` }
          : chat.user1?.userId === activeUserId
          ? chat.user2
          : chat.user1;

        if (otherUser) {
          setParticipant({
            id: otherUser.userId || chatId,
            name: otherUser.name || "Unknown",
            status: "Online",
          });
        }
      })
      .catch(() => {
        // Fall back to fallbackConversation metadata if backend lookup fails (e.g. mock id)
      });

    // Fetch existing message history
    getChatMessages(chatId)
      .then((res) => {
        if (cancelled) return;
        const history = res.messages || (Array.isArray(res) ? res : []);
        const activeUserId = res.currentUserId || localUserId;
        if (res.currentUserId) {
          setCurrentUserId(res.currentUserId);
        }

        if (Array.isArray(history) && (history.length > 0 || !fallbackConversation)) {
          setMessages(history.map((m) => formatServerMessage(m, activeUserId)));
        }
      })
      .catch(() => {
        // Fall back to fallbackConversation messages
      });

    return () => {
      cancelled = true;
    };
  }, [chatId, fallbackConversation]);

  // Initial scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
    isAtBottomRef.current = true;
  }, [chatId]);

  // WebSocket join and message listening
  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;
    socketRef.current = socket;

    const handleConnect = () => {
      socket.emit("chat:join", chatId);
    };

    if (socket.connected) {
      socket.emit("chat:join", chatId);
    } else {
      socket.on("connect", handleConnect);
    }

    const handleNewMessage = (newMsg) => {
      if (!newMsg || newMsg.chatId !== chatId) return;

      const activeUserId = currentUserId || getSessionUserId();
      const formatted = formatServerMessage(newMsg, activeUserId);

      setMessages((prev) => {
        // Deduplicate in case optimistic send or multiple events
        const exists = prev.some(
          (m) =>
            m.id === formatted.id ||
            (m.id.startsWith("temp-") && m.text === formatted.text && (m.senderId === formatted.senderId || m.isOutgoing))
        );
        if (exists) {
          return prev.map((m) =>
            m.id.startsWith("temp-") && m.text === formatted.text && (m.senderId === formatted.senderId || m.isOutgoing)
              ? formatted
              : m
          );
        }
        return [...prev, formatted];
      });

      const isOutgoing = formatted.isOutgoing;

      if (isOutgoing || isAtBottomRef.current) {
        // If at the latest (or outgoing message), auto-scroll down to render coming message
        requestAnimationFrame(() => {
          endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        });
      } else {
        // If user is above, increment the new messages count for the bottom-left arrow
        setNewMessagesCount((prev) => prev + 1);
      }
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message:new", handleNewMessage);
      socket.emit("chat:leave", chatId);
    };
  }, [chatId, currentUserId]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    const isAtBottom = distanceFromBottom < 70;

    isAtBottomRef.current = isAtBottom;

    if (isAtBottom) {
      setNewMessagesCount(0);
    }
  }, []);

  const handleScrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    isAtBottomRef.current = true;
    setNewMessagesCount(0);
  };

  const handleSendMessage = (text) => {
    const socket = socketRef.current || connectSocket();
    const activeUserId = currentUserId || getSessionUserId();
    const tempId = `temp-${Date.now()}`;
    const now = new Date();

    const optimisticMessage = {
      id: tempId,
      senderId: activeUserId,
      senderName: "You",
      type: "text",
      text,
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOutgoing: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });

    if (socket) {
      socket.emit(
        "message:send",
        {
          chatId,
          content: text,
        },
        (ack) => {
          if (ack?.success && ack?.data) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === tempId ? formatServerMessage(ack.data, activeUserId) : m
              )
            );
          }
        }
      );
    }
  };

  return (
    <div className="h-dvh flex flex-col items-center bg-brand-warmCanvas overflow-hidden">
      <div className="relative w-full max-w-[440px] h-full flex flex-col overflow-hidden bg-brand-warmCanvas">
        {/* Comic halftone paper texture */}
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
        <ChatHeader participant={participant} />

        <ChatMessageList
          messages={messages}
          currentUserId={currentUserId}
          scrollContainerRef={scrollContainerRef}
          endRef={endRef}
          onScroll={handleScroll}
        />

        {/* Arrow in the bottom left with number of new messages that came */}
        {newMessagesCount > 0 && (
          <button
            type="button"
            onClick={handleScrollToBottom}
            aria-label={`${newMessagesCount} new messages. Scroll to latest`}
            className="absolute bottom-20 left-4 z-30 flex items-center gap-2 bg-white text-brand-charcoal ink-border shadow-ink rounded-full px-3.5 py-2 hover:bg-brand-cyanLight active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <svg
              className="w-4 h-4 text-brand-charcoal animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 border-[1.5px] border-brand-charcoal text-white font-extrabold text-[10px] flex items-center justify-center">
              {newMessagesCount}
            </span>
            <span className="text-xs font-bold text-brand-charcoal">New</span>
          </button>
        )}

        <MessageComposer onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
