import { NextRequest, NextResponse } from "next/server";
import { Message } from "../../../../typings";
import redis from "../../../../redis";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { message } = await request.json();
    const newMessage: Message = {
      ...message,
      created_at: Date.now().toString(),
    };
    await redis.hset("messages", message.id, JSON.stringify(newMessage));
    return NextResponse.json({ message: newMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const messages = await redis.hgetall("messages");
  const messagesArray = Object.values(messages)
    .map((message) => JSON.parse(message))
    .sort((a, b) => Number(a.created_at) - Number(b.created_at));
  return NextResponse.json({ messages: messagesArray });
}
