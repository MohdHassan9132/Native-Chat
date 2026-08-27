"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      setConnected(true);
      setSocketId(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");

      setConnected(false);
      setSocketId(null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Socket.IO Test</h1>

      <p>
        Status: {connected ? "Connected 🟢" : "Disconnected 🔴"}
      </p>

      {connected && <p>Socket ID: {socketId}</p>}
    </div>
  );
}