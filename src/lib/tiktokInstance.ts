import { TikTokLiveConnection } from "tiktok-live-connector";

let currentConnection: TikTokLiveConnection | null = null;

export const tiktokLive = {
  connect: (username: string) => {
    // Disconnect existing connection if any
    tiktokLive.disconnect();

    // Create new connection
    currentConnection = new TikTokLiveConnection(username, {
      signApiKey: process.env.TIKTOK_API_KEY,
      requestPollingIntervalMs: 100,
      // processInitialData: false,
    });

    return currentConnection;
  },

  instance: () => {
    return currentConnection as TikTokLiveConnection;
  },

  disconnect: () => {
    if (currentConnection) {
      currentConnection.disconnect();
      currentConnection = null;
    }
  },

  getConnection: () => currentConnection,
};
