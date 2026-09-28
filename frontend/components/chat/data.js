export const CURRENT_USER_ID = "me";

// Keyed by conversation id so `getConversation(id)` is already shaped for a
// future `fetch(\`/api/conversations/${id}\`)` swap — see route notes in
// app/chat/[id]/page.js. Only one mock conversation exists for now.
const CONVERSATIONS_BY_ID = {
  "ahmad-syarif": {
    id: "ahmad-syarif",
    participant: {
      id: "ahmad-syarif",
      name: "Ahmad Syarif",
      status: "Online",
    },
    messages: [
      {
        id: "m1",
        senderId: CURRENT_USER_ID,
        type: "text",
        text: "I don't think I can join later\nIn the afternoon 😭",
        timestamp: "07:22 AM",
      },
      {
        id: "m2",
        senderId: "nina",
        senderName: "Nina",
        type: "text",
        text: "Really why can't it be? 😝",
        timestamp: "07:24 AM",
      },
      {
        id: "m3",
        senderId: CURRENT_USER_ID,
        type: "image",
        asset: "desk-flatlay",
        timestamp: null,
      },
      {
        id: "m4",
        senderId: CURRENT_USER_ID,
        type: "text",
        text: "Recap has not been completed",
        timestamp: "07:30 AM",
      },
      {
        id: "m5",
        senderId: "nina",
        senderName: "Nina",
        type: "text",
        text: "oh yeah already",
        timestamp: "07:35 AM",
      },
    ],
  },
};

// UI phase: every id currently resolves to the same mock conversation
// rather than crashing on an unknown id — see route notes for how this
// narrows to a real per-id lookup (and a real not-found state) once a
// backend exists.
export function getConversation(id) {
  return CONVERSATIONS_BY_ID[id] ?? CONVERSATIONS_BY_ID["ahmad-syarif"];
}
