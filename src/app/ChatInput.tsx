"use client";
import React from "react";
import useSWR from "swr";

type Props = {};
import { v4 as uuid } from "uuid";
import { type Message } from "../../typings";
import { fetcher } from "../../utils/fetchMessages";

const ChatInput = (props: Props) => {
  const [input, setInput] = React.useState<string>("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  const addMessage: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = input;
    const id = uuid();
    setInput("");
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now().toString(),
      username: "Elliott Chong",
      profile_pic: "https://links.papareact.com/jne",
      email: "elliottchong16@gmail.com",
    };
    const uploadMessageToUpstash = async () => {
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return [...messages!, data.message];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [...messages!, message],
      rollbackOnError: true,
    });
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 bg-white border-t border-gray-100"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message..."
        type="text"
        className="flex-1 px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        disabled={!input}
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
