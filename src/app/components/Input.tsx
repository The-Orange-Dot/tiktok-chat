import React from "react";
import { disconnectToUser } from "@/lib/disconnect";
import { connectToUser } from "@/lib/connect";

const Input = ({
  textSize,
  setTextSize,
  isConnected,
  setIsConnected,
  setUsername,
  username,
  setMessages,
  setGifts,
}: {
  textSize: number;
  setTextSize: React.Dispatch<React.SetStateAction<number>>;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setGifts: React.Dispatch<React.SetStateAction<GiftsType[]>>;
}) => {
  // Sets the loading of the input component to fix hydration error
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);

  // Connects to the socket and displays what channel user is connected to
  const connectHandler = async () => {
    const res = await connectToUser(username);

    localStorage.setItem("username", username);
    if (res.status == 200) {
      setIsConnected(true);
      setMessages([
        {
          type: "message",
          user: {
            username: "System",
            userId: "0",
            profilePic: "/placeholder.png",
            badges: [],
          },
          comment: `Now connected to ${username}'s LIVE`,
          msgId: "0",
        },
      ]);
    }
  };

  const disconnectHandler = async () => {
    const res = await disconnectToUser(username);
    console.log(res);

    setIsConnected(false);
    setMessages([]);
    setGifts([]);
    // setUsername("");
  };

  const buttonStyle = "px-8 max-sm:px-3 py-2 mx-2 rounded-full text-black";

  return (
    <div className="connection-form mb-4">
      <div className="mb-4">
        {loaded && (
          <input
            type="text"
            value={username || ""}
            onChange={(e) => {
              setUsername(e.target.value.toLowerCase());
            }}
            placeholder="@username"
            disabled={isConnected}
            className="lg:w-[200px] max-sm:w-28"
          />
        )}
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
