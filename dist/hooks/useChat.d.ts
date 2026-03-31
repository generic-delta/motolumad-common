import { Socket } from 'socket.io-client';
import type { User, PmRoom, RoomMessage, Message } from '../types/room.types.js';
declare function useChat(baseUrl: string, user: User | undefined, motolumadJWT?: string | undefined): {
    subscribeReconnect: (callback: (attempts: number) => void) => () => void;
    subscibePmInvite: (callback: (payload: PmRoom) => void) => () => void;
    establishPmSocket: (recipientId: string) => Promise<PmRoom | null>;
    subscribeToMessage: (callback: (payload: RoomMessage) => void) => () => void;
    sendMessageToRoom: (roomId: number, message: Message) => Promise<boolean>;
    subscribeToDeleteMessage: (callback: (payload: {
        roomId: number;
        messageId: number;
    }) => void) => () => void;
    deleteMessage: (roomId: number, messageId: number) => Promise<void>;
    subscribeToDeleteAllMessage: (callback: (payload: {
        roomId: number;
    }) => void) => () => void;
    deleteAllMessage: (roomId: number) => Promise<void>;
    subscribeToLastSeen: (callback: (payload: {
        roomId: number;
        userId: string;
        messageId: number;
    }) => void) => () => void;
    lastSeenMessage: (roomId: number, messageId: number) => Promise<void>;
    subscribeConnectError: (callback: (err: Error) => void) => () => void;
    subscribeDisconnect: (callback: (reason: Socket.DisconnectReason) => void) => () => void;
};
export { useChat, };
//# sourceMappingURL=useChat.d.ts.map