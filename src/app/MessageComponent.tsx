import React from "react";
import { Message } from "../../typings";
import Image from "next/image";

type Props = { message: Message };

const MessageComponent = (props: Props) => {
  const isUser = false;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="mx-2 rounded-full"
          height={10}
          width={50}
          alt="profile pic"
          src={props.message.profile_pic}
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {props.message.username}
        </p>
        <div className={`flex items-end ${isUser && "flex-row-reverse"}`}>
          <div
            className={`px-3 py-2 text-white ${
              isUser ? "bg-blue-400" : "bg-red-400"
            } rounded-lg w-fit`}
          >
            <p>{props.message.message}</p>
          </div>
          <p className="text-[0.65rem] italic px-2 text-gray-300">
            {new Date(parseInt(props.message.created_at)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
