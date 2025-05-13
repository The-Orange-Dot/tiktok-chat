import { Socket } from "socket.io-client";

export const disconnectToUser = async (socket: Socket, username: string) => {
  const res = await fetch("/api/disconnect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
    }),
  });

  return res;
};
