"use client";
import React from "react";
import useSWR from "swr";
import { Message } from "../../typings";
import MessageComponent from "./MessageComponent";

type Props = {};

const MessageList = (props: Props) => {
  const { data: messages } = useSWR<Message[]>("/api/getMessages");
  return (
    <div className="max-w-2xl px-5 pt-8 pb-32 space-y-5 xl:max-w-4xl">
      {messages?.map((message) => {
        return <MessageComponent message={message} key={message.id} />;
      })}
    </div>
  );
};

export default MessageList;
