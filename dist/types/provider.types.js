export const SocketContextDefaultValues = {
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
};
//# sourceMappingURL=provider.types.js.map