import Image from "next/image";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function Home() {
  return (
    <main>
      {/* MessageList */}
      <MessageList />
      {/* ChatInput */}
      <ChatInput />
    </main>
  );
}
