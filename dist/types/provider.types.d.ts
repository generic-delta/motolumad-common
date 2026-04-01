import type { Socket } from 'socket.io-client';
import type { Message, PmRoom, RoomMessage } from './room.types.js';
interface SocketContextType {
    chat: {
        subscribeReconnect: (callback: (attempts: number) => void) => () => void;
        subscibePmInvite: (callback: (payload: PmRoom) => void) => () => void;
        establishPmSocket: (recipientId: string) => Promise<PmRoom | null>;
        sendMessageToRoom: (roomId: number, payload: Message) => Promise<boolean>;
        subscribeToMessage: (callback: (payload: RoomMessage) => void) => () => void;
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
}
export declare const SocketContextDefaultValues: SocketContextType;
export type { SocketContextType, };
//# sourceMappingURL=provider.types.d.ts.map