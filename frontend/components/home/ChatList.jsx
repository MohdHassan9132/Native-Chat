import ChatListItem from "./ChatListItem";
import { CONVERSATIONS } from "./data";

export default function ChatList() {
  return (
    <section className="mt-4 px-5 flex flex-col gap-4" aria-label="Conversations">
      {CONVERSATIONS.map((conversation) => (
        <ChatListItem key={conversation.id} conversation={conversation} />
      ))}
    </section>
  );
}
