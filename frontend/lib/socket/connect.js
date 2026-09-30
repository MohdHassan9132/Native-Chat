import { io } from "socket.io-client";
import { readCookie } from "@/lib/auth";

// Backend's verifySocketConnection reads the JWT from handshake.auth.token;
// the JWT is the `accessToken` cookie set at registration.
export function connectSocket() {
  const token = readCookie("accessToken");
  if (!token) return null;
  return io(process.env.NEXT_PUBLIC_BACKEND_URL, { auth: { token } });
}
