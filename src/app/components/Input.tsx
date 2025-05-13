"use client";
import React from "react";
import { disconnectToUser } from "@/lib/disconnect";
import { connectToUser } from "@/lib/connect";
import { Socket } from "socket.io-client";

const Input = ({
  textSize,
  setTextSize,
  socket,
  isConnected,
  setIsConnected,
  setUsername,
  username,
  setMessages,
  setGifts,
}: {
  textSize: number;
  setTextSize: React.Dispatch<React.SetStateAction<number>>;
  socket: Socket;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setGifts: React.Dispatch<React.SetStateAction<GiftsType[]>>;
}) => {
  const connectHandler = async () => {
    const res = await connectToUser(username);
    localStorage.setItem("username", username);
    if (res.status == 200) {
      setIsConnected(true);
    }
  };

  const disconnectHandler = async () => {
    const res = await disconnectToUser(socket, username);

    if (res.status == 200) {
      setIsConnected(false);
      setMessages([]);
      setGifts([]);
    }
  };

  const buttonStyle = "px-8 py-2 mx-2 rounded-full text-black";

  return (
    <div className="connection-form mb-4">
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="TikTok username"
          disabled={isConnected}
        />
        <button
          onClick={connectHandler}
          disabled={isConnected}
          className={`${buttonStyle} ${
            isConnected ? "bg-green-500" : "bg-white hover:opacity-80"
          }`}
        >
          {isConnected ? "Connected" : "Connect"}
        </button>

        {isConnected ? (
          <button
            onClick={disconnectHandler}
            disabled={!isConnected}
            className={`${buttonStyle} bg-white hover:opacity-80`}
          >
            {"Disconnect"}
          </button>
        ) : null}
      </div>
      <div className="flex gap-4 items-center">
        <p>Text Size</p>
        <button
          className={`${buttonStyle} bg-white hover:opacity-80`}
          onClick={() => {
            setTextSize(textSize + 4);
          }}
        >
          +
        </button>
        <button
          className={`${buttonStyle} bg-white hover:opacity-80`}
          onClick={() => {
            setTextSize(textSize - 4);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Input;
