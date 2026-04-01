import React, { createContext, useContext, useMemo } from 'react';
import { useChat } from '../hooks/useChat.js';
import type { User } from '../types/room.types.js';
import { SocketContextDefaultValues, type SocketContextType } from '../types/provider.types.js';

const SocketContext = createContext<SocketContextType>(SocketContextDefaultValues);

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

function useSocketContext() {
  return useContext(SocketContext);
}

export {
  useSocketContext,
  SocketProvider,
};
