import React, { createContext, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import { useChat } from '../hooks/useChat.js';
import type {
  PmRoom, Message, RoomMessage, User,
} from '../types/room.types.js';

type SocketContextType = {
  chat: {
    subscribeReconnect: (callback: (attempts: number) => void) => () => void
    subscibePmInvite: (callback: (payload: PmRoom) => void) => () => void
    establishPmSocket: (recipientId: string) => Promise<PmRoom | null>
    sendMessageToRoom: (roomId: number, payload:Message) => Promise<boolean>;
    subscribeToMessage: (callback: (payload:RoomMessage)=>void) => ()=>void;
    subscribeToDeleteMessage: (callback: (payload: {
      roomId: number;
      messageId: number;
    }) => void) => () => void;
    deleteMessage: (roomId: number, messageId: number) => Promise<void>
    subscribeToDeleteAllMessage: (callback: (payload: {
      roomId: number;
    }) => void) => () => void
    deleteAllMessage: (roomId: number) => Promise<void>
    subscribeToLastSeen: (callback: (payload: {
      roomId: number;
      userId: string;
      messageId: number;
    }) => void) => () => void
    lastSeenMessage: (roomId: number, messageId: number) => Promise<void>
    subscribeConnectError: (callback: (err: Error) => void) => () => void
    subscribeDisconnect: (callback: (reason: Socket.DisconnectReason) => void) => () => void
  }
};

const SocketContext = createContext<SocketContextType>({
  chat: {
    subscribeReconnect: () => () => {},
    subscibePmInvite: () => () => { },
    establishPmSocket: async () => null,
    sendMessageToRoom: async () => false,
    subscribeToMessage: () => () => { },
    subscribeToDeleteMessage: () => () => { },
    deleteMessage: async () => { },
    subscribeToDeleteAllMessage: () => () => { },
    deleteAllMessage: async () => { },
    subscribeToLastSeen: () => () => { },
    lastSeenMessage: async () => { },
    subscribeConnectError: () => () => {},
    subscribeDisconnect: () => () => {},
  },
});

function SocketProvider({
  children,
  baseUrl,
  user,
}:{
  children:React.ReactNode,
  baseUrl:string,
  user: User | undefined
}) {
  const chat = useChat(baseUrl, user);

  const providers = useMemo(() => ({ chat }), []);

  return (
    <SocketContext.Provider value={providers}>
      {children}
    </SocketContext.Provider>
  );
}

export {
  SocketContext,
  SocketProvider,
};
