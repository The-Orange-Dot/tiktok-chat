"use client";
import TikTokChat from "./components/TikTokChat";
import Input from "./components/Input";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Gifts from "./components/Gifts";
import Likes from "./components/Likes";

export default function Home() {
  const [socket, setSocket] = useState<Socket>();
  const [textSize, setTextSize] = useState<number>(18);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [gifts, setGifts] = useState<GiftsType[]>([]);

  useEffect(() => {
    const socketInstance: Socket = io("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    // Checks if there is an open socket
    socketInstance.on("connect", () => {
      const connected = socketInstance;

      if (connected) {
        setIsConnected(true);
        const storedUserName = localStorage.getItem("username");
        if (storedUserName) {
          setUsername(storedUserName);
        }

        const storedMessages = localStorage.getItem("chat_history");
        if (storedMessages && storedUserName == username) {
          setMessages(JSON.parse(storedMessages));
        }

        const storedGifts = localStorage.getItem("gifts_history");
        if (storedGifts && storedUserName == username) {
          setGifts(JSON.parse(storedGifts));
        }
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("chat_history");
        localStorage.removeItem("gifts_history");
      }
    });

    socketInstance.connect();

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="p-20 w-screen justify-center items-center">
      <main className="">
        <Input
          setTextSize={setTextSize}
          textSize={textSize}
          socket={socket as Socket}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          username={username}
          setUsername={setUsername}
          setMessages={setMessages}
          setGifts={setGifts}
        />
        <TikTokChat
          socket={socket as Socket}
          textSize={textSize}
          messages={messages}
          setMessages={setMessages}
        />
        <Gifts
          socket={socket as Socket}
          textSize={textSize}
          gifts={gifts}
          setGifts={setGifts}
        />

        <Likes socket={socket as Socket} textSize={textSize} />
      </main>
    </div>
  );
}
