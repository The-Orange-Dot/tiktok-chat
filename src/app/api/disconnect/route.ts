import { NextResponse } from "next/server";
import { io } from "@/lib/initSocket";
import { tiktokLive } from "@/lib/tiktokInstance";

export async function POST() {
  // Create a new wrapper object and pass the username
  const roomId = await tiktokLive.instance().fetchRoomId();
  io.socketsLeave(roomId);

  // Connect to the chat (await can be used as well)
  tiktokLive.disconnect();

  return NextResponse.json({ message: "Hello World" });
}
