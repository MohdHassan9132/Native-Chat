"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState(""); // Your own username
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState(null);
  
  const [recipient, setRecipient] = useState(""); // Who you are sending to
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Array to hold chat history

  const socketRef = useRef(null);

  useEffect(() => {
    if (!username) return;

    // Pass your username in the query so backend's UserService can map it
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
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

    // Server → React (Receiving a message from someone else)
    socket.on("new", (incomingMessage) => {
      console.log("Message received from server:", incomingMessage);
      setMessages((prev) => [...prev, incomingMessage]);
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
    if (!socketRef.current || !message.trim() || !recipient.trim()) {
      return;
    }

    // Construct the payload expected by your backend message configuration
const messagePayload = {
  recieverName: recipient.trim(),
  senderName: username,
  text: message.trim(),
  timestamp: Date.now(),
};

    // Emit wrapped in { message: ... } to match args.message in backend eventRouter
    socketRef.current.emit("send", {
      message: messagePayload,
    });

    console.log("Message sent:", messagePayload);

    // Append to local state so you can see what you just sent
    setMessages((prev) => [...prev, messagePayload]);
    
    // Clear the input box
    setMessage("");
  }

  // 1. Join Screen
  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 bg-gray-50">
        <form
          onSubmit={handleJoin}
          className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
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

  // 2. Chat Screen
  return (
    <div className="min-h-screen p-8 bg-grey-50 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">Native Chat</h1>

        <div className="flex justify-between items-center bg-gray\-100 p-3 rounded mb-6">
          <p>
            Logged in as: <span className="font-semibold text-blue-600">{username}</span>
          </p>
          <p className="text-sm">
            Status: {connected ? "Connected 🟢" : "Disconnected 🔴"}
          </p>
        </div>

        {/* Messages List */}
        <div className="h-[400px] overflow-y-auto mb-6 space-y-3 p-4 border border-gray-200 rounded">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-20">No messages yet...</p>
          )}
          {messages.map((data, index) => {
            const isMe = data.senderName === username;
            return (
              <div
                key={index}
                className={`flex flex-col max-w-[80%] rounded-lg p-3 ${
                  isMe 
                    ? "ml-auto bg-blue-500 text-white" 
                    : "mr-auto bg-gray-200 text-black"
                }`}
              >
                <span className="text-xs font-semibold opacity-75 mb-1">
                  {isMe ? "You" : data.senderName}
                </span>
                <span>{data.text}</span>
              </div>
            );
          })}
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-sm">To:</span>
            <input
              type="text"
              placeholder="Recipient Username"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              className="rounded border border-gray-400 bg-white px-3 py-2 text-black outline-none w-1/3"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded border border-gray-400 bg-white px-3 py-2 text-black outline-none"
            />

            <button
              onClick={sendMessage}
              disabled={!connected || !message.trim() || !recipient.trim()}
              className="rounded border border-gray-400 bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}