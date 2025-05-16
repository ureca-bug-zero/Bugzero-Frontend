import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cookieStorage } from 'zustand-cookie-storage';

interface UserStoreProps {
  token: string;
  setToken: (token: string) => void;
}

export const useUserStore = create(
  persist<UserStoreProps>(
    (set) => ({
      token: '',
      setToken: (newToken) => set({ token: newToken }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
