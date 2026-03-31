import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import { useChat } from '../hooks/useChat.js';
const SocketContext = createContext({
    chat: {
        subscribeReconnect: () => () => { },
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
        subscribeConnectError: () => () => { },
        subscribeDisconnect: () => () => { },
    },
});
function SocketProvider({ children, baseUrl, user, }) {
    const chat = useChat(baseUrl, user);
    const providers = useMemo(() => ({ chat }), []);
    return (_jsx(SocketContext.Provider, { value: providers, children: children }));
}
export { SocketContext, SocketProvider, };
//# sourceMappingURL=SocketProvider.js.map