enum RoomType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  UNLISTED = 'unlisted',
}

interface Room {
  roomId: number;
  name: string;
  roomType: RoomType;
  isAdmin: boolean;
  isRoomMember: boolean;
}

interface User {
  userId: string;
  name: string;
  picture: string;
  createdAt: string;
}

interface PmRoom {
  roomId: number;
  name: string;
  picture: string;
}

interface Attachments {
  messageId?: number,
  attachmentType: 'image' | 'video' | 'file',
  url: string,
}

interface Message {
  messageId?: number, // optional if being used as outbound type
  userId?: string, // optional if being used as outbound type
  replyToMessageId?: number, // always optional
  message: string,
  attachments?: Attachments, // always optional
  createdAt?: string // optional if being used as outbound type
}

interface RoomMessage {
  roomId: number;
  message: Message
}

export {
  RoomType,
};

export type {
  Room,
  User,
  PmRoom,
  RoomMessage,
  Message,
  Attachments,
};
