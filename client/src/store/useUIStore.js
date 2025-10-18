import { create } from "zustand";

export const useUIStore = create(( set ) => ({
    activeModule: "chats",
    setActiveModule: ( module ) => set({ activeModule: module }),
    activeView: "main",
    setActiveView: ( view ) => set({ activeView: view }),
    isCallActive: false,
    setIsCallActive: ( isActive ) => set({ isCallActive: isActive }),
}));