import { apiRequest } from "./client";

// GET /api/chats/get — chats the backend returns for the logged-in user.
export async function getChats() {
  const data = await apiRequest("/api/chats/get");
  if (Array.isArray(data)) return data;

  if (data?.currentUserId && typeof window !== "undefined") {
    localStorage.setItem("nativechat_userId", data.currentUserId);
  }

  return data?.chats || [];
}

// GET /api/chats/:chatId — details for a specific chat.
export async function getChatById(chatId) {
  const data = await apiRequest(`/api/chats/${chatId}`);
  if (data?.currentUserId && typeof window !== "undefined") {
    localStorage.setItem("nativechat_userId", data.currentUserId);
  }
  return data;
}

// GET /api/chats/:chatId/messages — message history for a specific chat.
export async function getChatMessages(chatId) {
  const data = await apiRequest(`/api/chats/${chatId}/messages`);
  if (data?.currentUserId && typeof window !== "undefined") {
    localStorage.setItem("nativechat_userId", data.currentUserId);
  }

  if (Array.isArray(data)) {
    return { messages: data, currentUserId: null };
  }

  return {
    messages: data?.messages || [],
    currentUserId: data?.currentUserId || null,
  };
}
