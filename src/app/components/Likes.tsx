import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Socket } from "socket.io-client";

const Likes = ({ socket, textSize }: { socket: Socket; textSize: number }) => {
  const [like, setLike] = useState<LikesType>();

  useEffect(() => {
    socket?.on("likes", (data) => {
      setLike(data);
    });
  }, [socket]);

  if (like) {
    return (
      <div className="w-screen fixed bottom-0 flex justify-center">
        <Image
          src={like?.user.profilePic}
          width={textSize * 2}
          height={textSize}
          alt=""
          className={`rounded-full w-[${textSize}px] h-[${textSize}px] mr-2`}
        />
        <div className="flex items-center">
          <p style={{ fontSize: `${textSize}px` }}>
            <strong className={"text-blue-500"}>{like?.user?.username}</strong>{" "}
            {" just liked the LIVE"}
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Likes;
