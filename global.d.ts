interface ChatMessage {
  type: string;
  user: {
    username: string;
    userId: string;
    profilePic: string;
    badges: {
      type: string;
      name?: string;
      url?: string;
      displayType?: number;
    }[];
  };
  comment?: string;
  msgId?: string;
}

interface GiftsType {
  type: string;
  user: {
    username: string;
    userId: string;
    profilePic: string;
  };

  gift: {
    name: string;
    giftId: string;
    diamondCount: number;
    count: number;
  };
}

interface LikesType {
  user: {
    username: string;
    userId: string;
    profilePic: string;
    badges: {
      type: string;
      name?: string;
      url?: string;
      displayType?: number;
    }[];
  };
}
