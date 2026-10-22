import { apiRequest } from "./client";

// PATCH /api/users/complete-profile — requires auth token/cookie.
export function completeProfile({ name, bio }) {
  return apiRequest("/api/users/complete-profile", {
    method: "PATCH",
    body: { name, bio },
  });
}

// GET /api/users/me — returns current logged-in user profile.
export async function getMe() {
  const data = await apiRequest("/api/users/me");
  if (data?.userId && typeof window !== "undefined") {
    localStorage.setItem("nativechat_userId", data.userId);
  }
  return data;
}
