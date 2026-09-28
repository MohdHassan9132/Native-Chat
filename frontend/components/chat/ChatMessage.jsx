import { CURRENT_USER_ID } from "./data";
import OutgoingMessage from "./OutgoingMessage";
import IncomingMessage from "./IncomingMessage";
import ImageMessage from "./ImageMessage";

export default function ChatMessage({ message }) {
  const isOutgoing = message.senderId === CURRENT_USER_ID;

  if (message.type === "image") {
    // Only outgoing images are in the current mock; incoming would mirror
    // IncomingMessage's avatar+sender treatment instead.
    return <ImageMessage asset={message.asset} />;
  }

  if (isOutgoing) {
    return <OutgoingMessage text={message.text} timestamp={message.timestamp} />;
  }

  return (
    <IncomingMessage senderName={message.senderName} text={message.text} timestamp={message.timestamp} />
  );
}
