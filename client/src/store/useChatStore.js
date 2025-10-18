import { create } from "zustand";

export const useChatStore = create(( set, get ) => ({
    chats: {},
    activeChatId: null,
    setActiveChat: ( chatId ) => set({ activeChatId: chatId }),
    addMessage: ( chatId, message ) => set(( state ) => {
        const currentChat = state.chats[ chatId ] || [];
        return { 
            chats: {
                ...state.chats, 
                [ chatId ]: [ ...currentChat, message ]
            }
        };
    }),
    ensureChatExists: ( chatId ) => {
        const { chats } = get();

        if ( !chats[ chatId ] ) {
            set(( state ) => ({
                chats: {
                    ...state.chats,
                    [ chatId ]: []
                }
            }));
        }
    },
    getMessages: ( chatId ) => {
        const { chats } = get();
        return chats[ chatId ] || [];
    }
}));