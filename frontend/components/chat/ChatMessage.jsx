import { CURRENT_USER_ID } from "./data";
import OutgoingMessage from "./OutgoingMessage";
import IncomingMessage from "./IncomingMessage";
import ImageMessage from "./ImageMessage";

export default function ChatMessage({ message, currentUserId }) {
  // If currentUserId is known, it strictly decides whether this message is outgoing (sent by me)
  // or incoming (sent by the other participant).
  const isOutgoing = Boolean(currentUserId)
    ? message.senderId === currentUserId || message.isOutgoing === true
    : message.isOutgoing === true ||
      message.senderId === CURRENT_USER_ID ||
      message.senderId === "me";

  if (message.type === "image") {
    return <ImageMessage asset={message.asset} />;
  }

  if (isOutgoing) {
    return <OutgoingMessage text={message.text} timestamp={message.timestamp} />;
  }

  return (
    <IncomingMessage
      senderName={message.senderName}
      text={message.text}
      timestamp={message.timestamp}
    />
  );
}
