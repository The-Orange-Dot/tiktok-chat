import Image from "next/image";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

export default function TikTokChat({
  socket,
  textSize,
  setMessages,
  messages,
}: {
  socket: Socket;
  textSize: number;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  messages: ChatMessage[];
}) {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on("chat", (msg: ChatMessage) => {
        if (!messages.length) {
          setMessages([msg]);
        } else if (messages[messages.length - 1].msgId != msg.msgId) {
          setMessages([...messages, msg]);
        }

        localStorage.setItem(
          "chat_history",
          JSON.stringify([...messages, msg])
        );
      });
    }
  }, [messages, socket, setMessages]);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [messages]); // Trigger when 'data' changes

  return (
    <div className="chat-container flex flex-col">
      <div className="w-full  border-y-1">
        <h2 style={{ fontSize: `${textSize + 8}px`, fontWeight: 800 }}>Chat</h2>
      </div>
      <div className="chat-messages w-full h-[50vh] flex">
        <div
          ref={scrollableDivRef}
          className="w-full flex flex-col overflow-auto"
        >
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg.user && (
                <div className="flex w-full items-center gap-2 mt-2">
                  <Image
                    src={msg.user.profilePic}
                    width={textSize * 2}
                    height={textSize * 2}
                    alt=""
                    className={`rounded-full w-[${textSize}px] h-[${textSize}px]`}
                  />
                  <p style={{ fontSize: `${textSize}px` }}>
                    <strong className={"text-blue-500"}>
                      {msg.user?.username} :
                    </strong>{" "}
                    {msg.comment}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
