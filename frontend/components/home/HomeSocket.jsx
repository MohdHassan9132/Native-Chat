"use client";

import { useEffect } from "react";
import { connectSocket } from "@/lib/socket/connect";

export default function HomeSocket() {
  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;
    const handleError = (err) => console.warn("Socket connection failed:", err.message);
    socket.on("connect_error", handleError);
    return () => {
      socket.off("connect_error", handleError);
    };
  }, []);

  return null;
}
