import { create } from 'zustand';

// UI에서 사용하는 친구 요청 타입
export interface FriendRequestUIModel {
  id: number;
  name: string;
  email: string; // UI에서는 email이 필요한 경우 직접 가공해서 넣음
}

interface FriendState {
  isRequestModalOpen: boolean;
  isAddModalOpen: boolean;
  friendRequests: FriendRequestUIModel[];
  openRequestModal: () => void;
  closeRequestModal: () => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  setFriendRequests: (list: FriendRequestUIModel[]) => void;
}

export const useFriendStore = create<FriendState>((set) => ({
  isRequestModalOpen: false,
  isAddModalOpen: false,
  friendRequests: [],
  openRequestModal: () => set({ isRequestModalOpen: true }),
  closeRequestModal: () => set({ isRequestModalOpen: false }),
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  setFriendRequests: (list) => set({ friendRequests: list }),
}));
