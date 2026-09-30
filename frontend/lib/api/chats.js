import { apiRequest } from "./client";

// GET /api/chats/get — chats the backend returns for the logged-in user.
export function getChats() {
  return apiRequest("/api/chats/get");
}
