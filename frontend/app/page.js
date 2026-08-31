"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      setConnected(true);
      setSocketId(socket.id);
    });

    // Server → React
    socket.on("message", (data) => {
      console.log("Message received from server:", data);

      setMessages((previousMessages) => [
        ...previousMessages,
        data,
      ]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");

      setConnected(false);
      setSocketId(null);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  function sendMessage() {
    if (!socketRef.current || !message.trim()) {
      return;
    }

    socketRef.current.emit("message", {
      message: message,
    });

    console.log("Message sent:", message);

    setMessage("");
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">
        Socket.IO Test
      </h1>

      <p className="mt-2">
        Status:{" "}
        {connected
          ? "Connected 🟢"
          : "Disconnected 🔴"}
      </p>

      {connected && (
        <p className="mt-1 text-sm">
          Socket ID: {socketId}
        </p>
      )}

      {/* Messages */}
      <div className="mt-6 space-y-2">
        {messages.map((data, index) => (
          <div
            key={index}
            className="rounded border border-gray-400 p-3"
          >
            {data.message}
          </div>
        ))}
      </div>

      {/* Input + button */}
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          className="rounded border border-gray-400 bg-white px-3 py-2 text-black outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={!connected || !message.trim()}
          className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}