import { io } from "socket.io-client";
import { getAuthToken } from "@/lib/auth";

let socketInstance = null;

// Backend's verifySocketConnection reads the JWT from handshake.auth.token;
// the JWT is stored in localStorage per-origin and in the `accessToken` cookie.
export function connectSocket() {
  if (typeof window === "undefined") return null;

  const token = getAuthToken();
  if (!token) {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
    return null;
  }

  // If already connected with current token, reuse it
  if (socketInstance) {
    if (!socketInstance.connected) {
      socketInstance.auth = { token };
      socketInstance.connect();
    }
    return socketInstance;
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  socketInstance = io(backendUrl, {
    auth: { token },
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  socketInstance.on("connect_error", (err) => {
    console.warn("[Socket connect_error]:", err.message);
  });

  return socketInstance;
}

export function getSocket() {
  return socketInstance || connectSocket();
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}
