import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStoreProps {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useUserStore = create(
  persist<UserStoreProps>(
    (set) => ({
      token: '',
      setToken: (newToken) => set({ token: newToken }),
      clearToken: () => {
        set({ token: '' });
      },
    }),
    {
      name: 'user-storage',
    },
  ),
);
