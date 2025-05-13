import { WebcastEvent } from "tiktok-live-connector";
import { NextResponse } from "next/server";
import { io } from "@/lib/initSocket";
import { tiktokLive } from "@/lib/tiktokInstance";

export async function POST(req: Request) {
  // Create a new wrapper object and pass the username

  const { username } = await req.json();

  // Connect to the chat (await can be used as well)
  tiktokLive
    .connect(username)
    .connect()
    .then((state) => {
      console.info(`Connected to roomId ${state.roomId}`);

      io.connect(state.roomId);
    })
    .catch((err) => {
      console.error("Failed to connect", err);

      throw NextResponse.json({ status: 500, message: "Error" });
    });

  // const roomId = await tiktokLive.instance().fetchRoomId();

  // Define the events that you want to handle
  // In this case we listen to chat messages (comments)

  tiktokLive.instance().on(WebcastEvent.CHAT, (data) => {
    console.log(
      `msgId: ${data.event?.msgId} - ${data?.user?.uniqueId} (userId:${data?.user?.uniqueId}) writes: ${data.comment}`
    );
    io.instance()?.emit("chat", {
      user: {
        username: data?.user?.nickname,
        userId: data?.user?.userId,
        profilePic: data?.user?.profilePicture?.urls[0] || "",
      },
      comment: data.comment,
      msgId: data.event?.msgId,
    });
  });

  // And here we receive gifts sent to the streamer
  tiktokLive.instance().on(WebcastEvent.GIFT, (data) => {
    console.log(
      `${data?.user?.uniqueId} (userId:${data?.user?.userId}) sends ${data.giftId}`
    );
    io.instance()?.emit("gifts", {
      user: {
        username: data?.user?.nickname,
        userId: data?.user?.userId,
        profilePic: data?.user?.profilePicture?.urls[0] || "",
        badges: data?.user?.badges,
      },
      gift: {
        name: data.giftDetails?.giftName,
        giftId: data.giftId,
        diamondCount: data.giftDetails?.diamondCount,
        count: data.repeatCount,
      },
    });
  });

  tiktokLive.instance().on(WebcastEvent.LIKE, (data) => {
    io.instance()?.emit("likes", {
      user: {
        username: data?.user?.nickname,
        userId: data?.user?.userId,
        profilePic: data?.user?.profilePicture?.urls[0] || "",
        badges: data?.user?.badges,
      },
    });
  });

  // // ...and more events described in the documentation below

  return NextResponse.json({ status: 200, message: "Connected" });
}
