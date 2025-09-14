import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: number;
  email: string;
  username: string;
  iat: number;
  exp: number;
  image?: string;
};

type State = {
  user: User | null;
  isAuthenticated: boolean;
  refreshTrigger: number; // Add this
  setUser: (user: User) => void;
  setIsAuthenticated: (value: boolean) => void;
  clearUser: () => void;
  triggerRefresh: () => void; // Add this
};

const useUserStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      refreshTrigger: 0,
      setUser: (user: User) => set({ user }),
      setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
      clearUser: () => set({ user: null }),
      triggerRefresh: () =>
        set((state: any) => ({ refreshTrigger: state.refreshTrigger + 1 })),
    }),
    {
      name: "user-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
      onRehydrateStorage: () => (state: any) => {
        if (state) {
          state.fetchingUserInfo = false;
        }
      },
    },
  ),
);

export default useUserStore;
