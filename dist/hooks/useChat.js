import { useCallback, useEffect, useState, } from 'react';
import { io, Socket } from 'socket.io-client';
// Note: this will only be used in 'use client' code, because next.js server
// side code is not guaranteed to persist socket connection due to its statelessness
// while socket.io is stateful (the need to maintain connection)
// this is why socket ops is in custom hook instead of server action as to REST API
function useChat(baseUrl, user, motolumadJWT = undefined) {
    const [socket, setSocket] = useState();
    // Note: useEffect + useState for persisting socket as nextjs does not fire
    // useEffect twice on dev unlike useMemo
    useEffect(() => {
        // chat namespace
        const newSocket = io(`${baseUrl}/chat`, {
            // since this is being used in client side only, this will send the httpOnly cookies
            withCredentials: true,
            forceNew: true,
            // auth: authHeader,
            ackTimeout: 1000 * 10, // 10 secs before retry
            retries: 3,
            auth: {
                // if used in mobile
                motolumadJWT,
            },
        });
        setSocket(() => newSocket);
        // For now retain connection idefinitely while in dashboard
        return () => {
            newSocket.off();
            newSocket.disconnect();
        };
    }, [motolumadJWT]);
    // depending on the screen the user is on, this should be called to pull the
    // missing room or messages using the offset to paginate
    const subscribeReconnect = useCallback((callback) => {
        if (!socket)
            return () => { };
        socket.io.on('reconnect', callback);
        return () => {
            socket.io.off('reconnect');
        };
    }, [socket]);
    const establishPmSocket = useCallback(async (recipientId) => {
        if (!socket)
            return null;
        // to make it unique across full page refresh
        const newOffset = Date.now();
        // tell server to join me and the recipient into the room
        const res = await socket.emitWithAck('startPm', { recipientId, clientOffset: newOffset })
            .catch(() => null);
        return res;
    }, [socket]);
    const subscibePmInvite = useCallback((callback) => {
        if (!user || !socket)
            return () => { };
        // subscribe to join room request from other users
        socket.on('pmInvite', callback);
        return () => {
            socket.off(user.userId);
        };
    }, [socket, user]);
    const subscribeToMessage = useCallback((callback) => {
        if (!socket)
            return () => { };
        socket.on('message', callback);
        return () => {
            socket.off('message');
        };
    }, [socket]);
    const sendMessageToRoom = useCallback(async (roomId, message) => {
        if (!socket)
            return false;
        const newOffset = Date.now();
        try {
            await socket.emitWithAck('message', {
                roomId, message, clientOffset: newOffset,
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }, [socket]);
    const subscribeToDeleteMessage = (useCallback((callback) => {
        if (!socket)
            return () => { };
        socket.on('deleteMessage', callback);
        return () => {
            socket.off('deleteMessage');
        };
    }, [socket]));
    const deleteMessage = useCallback(async (roomId, messageId) => {
        if (!socket)
            return;
        const newOffset = Date.now();
        await socket.emitWithAck('deleteMessage', {
            clientOffset: newOffset,
            roomId,
            messageId,
        });
    }, [socket]);
    const subscribeToDeleteAllMessage = (useCallback((callback) => {
        if (!socket)
            return () => { };
        socket.on('deleteAllMessage', callback);
        return () => {
            socket.off('deleteAllMessage');
        };
    }, [socket]));
    const deleteAllMessage = useCallback(async (roomId) => {
        if (!socket)
            return;
        const newOffset = Date.now();
        await socket.emitWithAck('deleteAllMessage', {
            clientOffset: newOffset,
            roomId,
        });
    }, [socket]);
    const subscribeToLastSeen = (useCallback((callback) => {
        if (!socket)
            return () => { };
        socket.on('lastSeen', callback);
        return () => {
            socket.off('lastSeen');
        };
    }, [socket]));
    const lastSeenMessage = useCallback(async (roomId, messageId) => {
        if (!socket)
            return;
        const newOffset = Date.now();
        await socket.emitWithAck('lastSeen', {
            clientOffset: newOffset,
            roomId,
            messageId,
        });
    }, [socket]);
    const subscribeConnectError = useCallback((callback) => {
        if (!socket)
            return () => { };
        socket.on('connect_error', callback);
        return () => {
            socket.off('connect_error');
        };
    }, [socket]);
    const subscribeDisconnect = useCallback((callback) => {
        if (!socket)
            return () => { };
        socket.on('disconnect', callback);
        return () => {
            socket.off('disconnect');
        };
    }, [socket]);
    return {
        subscribeReconnect,
        subscibePmInvite,
        establishPmSocket,
        subscribeToMessage,
        sendMessageToRoom,
        subscribeToDeleteMessage,
        deleteMessage,
        subscribeToDeleteAllMessage,
        deleteAllMessage,
        subscribeToLastSeen,
        lastSeenMessage,
        subscribeConnectError,
        subscribeDisconnect,
    };
}
export { 
// eslint-disable-next-line import/prefer-default-export
useChat, };
//# sourceMappingURL=useChat.js.map