import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useMemo } from 'react';
import { useChat } from '../hooks/useChat.js';
import { SocketContextDefaultValues } from '../types/provider.types.js';
const SocketContext = createContext(SocketContextDefaultValues);
function SocketProvider({ children, baseUrl, user, }) {
    const chat = useChat(baseUrl, user);
    const providers = useMemo(() => ({ chat }), []);
    return (_jsx(SocketContext.Provider, { value: providers, children: children }));
}
function useSocketContext() {
    return useContext(SocketContext);
}
export { useSocketContext, SocketProvider, };
//# sourceMappingURL=SocketProvider.js.map