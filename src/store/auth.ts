// 로그인 상태
import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) =>
    set(() => ({
      user,
      isLoggedIn: true,
    })),
  logout: () =>
    set(() => {
      localStorage.removeItem('accessToken');
      return { user: null, isLoggedIn: false };
    }),
}));
