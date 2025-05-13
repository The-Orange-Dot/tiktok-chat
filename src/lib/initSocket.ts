import { Server } from "socket.io";

let currentConnection: Server | null = null;

export const io = {
  connect: async (roomId: string) => {
    // Disconnect existing connection if any
    if (roomId) {
      currentConnection?.socketsLeave(roomId);
    }

    if (!currentConnection) {
      // Create new connection
      currentConnection = new Server(3001, {
        cors: {
          origin: ["http://localhost:3000", "192.168.1.240:3000"],
          allowedHeaders: ["my-custom-header"],
          credentials: true,
        },
      });
    }
    currentConnection?.socketsJoin(roomId);
    return currentConnection;
  },

  instance: () => {
    return currentConnection;
  },

  disconnect: async (roomId: string) => {
    if (currentConnection && roomId) {
      currentConnection.socketsLeave(roomId);
      currentConnection = null;
    }
  },

  getConnection: () => currentConnection,
};
