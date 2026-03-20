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
export { RoomType, };
export type { Room, };
//# sourceMappingURL=room.types.d.ts.map