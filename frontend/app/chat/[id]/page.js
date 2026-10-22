import ChatPage from "@/components/chat/ChatPage";
import { getConversation } from "@/components/chat/data";

export const metadata = {
  title: "Chat — nativeChat",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ChatRoute({ params }) {
  const { id } = await params;
  const fallbackConversation = getConversation(id);

  return <ChatPage chatId={id} fallbackConversation={fallbackConversation} />;
}
