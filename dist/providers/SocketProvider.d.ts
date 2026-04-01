import React from 'react';
import type { User } from '../types/room.types.js';
import { type SocketContextType } from '../types/provider.types.js';
declare function SocketProvider({ children, baseUrl, user, }: {
    children: React.ReactNode;
    baseUrl: string;
    user: User | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare function useSocketContext(): SocketContextType;
export { useSocketContext, SocketProvider, };
//# sourceMappingURL=SocketProvider.d.ts.map