import { apiRequest } from "./client";

// PATCH /api/users/complete-profile — requires the auth cookie.
export function completeProfile({ name, email }) {
  return apiRequest("/api/users/complete-profile", {
    method: "PATCH",
    body: { name, email },
  });
}
