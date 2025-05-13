import { NextResponse } from "next/server";
import { io } from "@/lib/initSocket";
import { tiktokLive } from "@/lib/tiktokInstance";

export async function POST(req: Request) {
  const { username } = await req.json();
  console.log(username);
  // Create a new wrapper object and pass the username
  const roomId = (await tiktokLive?.instance()?.fetchRoomId()) || null;

  if (roomId) {
    io.disconnect(roomId);

    // Connect to the chat (await can be used as well)
    try {
      tiktokLive.disconnect();
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Disconnected" },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return NextResponse.json(
      { message: "Disconnected" },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return NextResponse.json(
      { error: "You aren't in a room" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
