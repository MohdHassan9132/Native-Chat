"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!username) return;

    // Pass username as query parameter during handshake
    const socket = io("http://localhost:8000", {
      query: {
        username: username,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      setConnected(true);
      setSocketId(socket.id);
    });

    // Server → React
    socket.on("new", (data) => {
      console.log("Message received from server:", data);
      setMessages((previousMessages) => [...previousMessages, data]);
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
  }, [username]);

  function handleJoin(e) {
    e.preventDefault();
    if (usernameInput.trim()) {
      setUsername(usernameInput.trim());
    }
  }

  function sendMessage() {
    if (!socketRef.current || !message.trim()) {
      return;
    }

    socketRef.current.emit("send", {
      message: message,
    });

    console.log("Message sent:", message);
    setMessage("");
  }

  // 1. Prompt for username first before establishing the socket connection
  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <form
          onSubmit={handleJoin}
          className="flex flex-col gap-4 rounded border border-gray-400 p-6"
        >
          <h2 className="text-xl font-bold">Enter your Username</h2>
          <input
            type="text"
            placeholder="e.g. alice"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="rounded border border-gray-400 bg-white px-3 py-2 text-black outline-none"
            autoFocus
          />
          <button
            type="submit"
            disabled={!usernameInput.trim()}
            className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Join Chat
          </button>
        </form>
      </div>
    );
  }

  // 2. Main Chat View once connected
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Socket.IO Test</h1>

      <p className="mt-2">
        User: <span className="font-semibold">{username}</span>
      </p>

      <p className="mt-1">
        Status: {connected ? "Connected 🟢" : "Disconnected 🔴"}
      </p>

      {connected && (
        <p className="mt-1 text-sm text-gray-500">Socket ID: {socketId}</p>
      )}

      {/* Messages */}
      <div className="mt-6 space-y-2">
        {messages.map((data, index) => (
          <div key={index} className="rounded border border-gray-400 p-3">
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
          onChange={(event) => setMessage(event.target.value)}
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