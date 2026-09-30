"use client";

import { useEffect } from "react";
import { connectSocket } from "@/lib/socket/connect";

// Opens the authenticated WebSocket while Home is mounted. No events are
// handled yet — the message UI is still static.
export default function HomeSocket() {
  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;
    socket.on("connect_error", (err) => console.error("Socket connection failed:", err.message));
    return () => socket.disconnect();
  }, []);

  return null;
}
