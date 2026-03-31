declare enum RoomType {
    PUBLIC = "public",
    PRIVATE = "private",
    UNLISTED = "unlisted"
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
    messageId?: number;
    attachmentType: 'image' | 'video' | 'file';
    url: string;
}
interface Message {
    messageId?: number;
    userId?: string;
    replyToMessageId?: number;
    message: string;
    attachments?: Attachments;
    createdAt?: string;
}
interface RoomMessage {
    roomId: number;
    message: Message;
}
export { RoomType, };
export type { Room, User, PmRoom, RoomMessage, Message, Attachments, };
//# sourceMappingURL=room.types.d.ts.map