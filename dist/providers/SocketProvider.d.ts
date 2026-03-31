import React from 'react';
import { Socket } from 'socket.io-client';
import type { PmRoom, Message, RoomMessage, User } from '../types/room.types.js';
type SocketContextType = {
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
};
declare const SocketContext: React.Context<SocketContextType>;
declare function SocketProvider({ children, baseUrl, user, }: {
    children: React.ReactNode;
    baseUrl: string;
    user: User | undefined;
}): import("react/jsx-runtime").JSX.Element;
export { SocketContext, SocketProvider, };
//# sourceMappingURL=SocketProvider.d.ts.map