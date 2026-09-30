import { apiRequest } from "./client";

// POST /api/users/register — sets the auth cookies and returns the user.
export function registerUser({ name, phoneNumber, bio }) {
  return apiRequest("/api/users/register", {
    method: "POST",
    body: { name, phoneNumber, bio },
  });
}
