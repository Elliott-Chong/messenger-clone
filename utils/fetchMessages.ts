import { Message } from "../typings";

export const fetcher = async () => {
  const res = await fetch("/api/messages");
  const data = await res.json();
  const messages: Message[] = data.messages;
  return messages;
};
