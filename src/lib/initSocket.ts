import { Server } from "socket.io";

export const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
