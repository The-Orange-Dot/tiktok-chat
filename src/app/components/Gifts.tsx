import React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Socket } from "socket.io-client";

const Gifts = ({
  socket,
  textSize,
  setGifts,
  gifts,
}: {
  socket: Socket;
  textSize: number;
  setGifts: React.Dispatch<React.SetStateAction<GiftsType[]>>;
  gifts: GiftsType[];
}) => {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on("gifts", (gift: GiftsType) => {
        if (!gifts.length) {
          setGifts([gift]);
        } else if (gifts[gifts.length - 1].gift.giftId != gift.gift.giftId) {
          setGifts([...gifts, gift]);
        }

        localStorage.setItem("gifts_history", JSON.stringify([...gifts, gift]));
      });
    }
  }, [gifts, socket, setGifts]);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [gifts]); // Trigger when 'data' changes

  return (
    <div className="chat-container flex flex-col mt-4">
      <div className="w-full border-y-1">
        <h2 style={{ fontSize: `${textSize + 8}px`, fontWeight: 800 }}>
          Gifts
        </h2>
      </div>
      <div
        ref={scrollableDivRef}
        className="chat-messages w-full h-[10vh] overflow-scroll"
      >
        {gifts.map((gift: GiftsType, index: number) => (
          <div key={index} className="gifts">
            {gift.gift && (
              <div className="flex w-full items-center gap-2 mt-2">
                <Image
                  src={gift.user.profilePic}
                  width={textSize * 2}
                  height={textSize * 2}
                  alt=""
                  className={`rounded-full w-[${textSize}px] h-[${textSize}px]`}
                />
                <p style={{ fontSize: `${textSize}px` }}>
                  <strong>{gift.user?.username}</strong> sent a gift:{" "}
                  {gift.gift.name}
                  {gift.gift.count && ` (x${gift.gift.count})`}
                  {gift.gift.diamondCount &&
                    ` (${gift.gift.diamondCount} diamonds)`}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gifts;
