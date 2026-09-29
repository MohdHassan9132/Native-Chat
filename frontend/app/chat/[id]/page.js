import ChatPage from "@/components/chat/ChatPage";
import { getConversation } from "@/components/chat/data";

export const metadata = {
  title: "Chat — nativeChat",
  robots: {
    index: false,
    follow: false,
  },
};

// `id` is a real dynamic segment: /chat/ahmad-syarif, /chat/<future-id>, ...
// Only one mock conversation exists today, so every id currently resolves
// to it (see getConversation) — swapping in a real per-id fetch later
// doesn't require touching this route or ChatPage.
export default async function ChatRoute({ params }) {
  const { id } = await params;
  const conversation = getConversation(id);

  return <ChatPage conversation={conversation} />;
}
