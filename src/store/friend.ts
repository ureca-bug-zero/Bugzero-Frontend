// friend.ts
import { create } from 'zustand';

export interface FriendRequestUIModel {
  id: number;
  name: string;
  email: string;
}

type ModalType = 'add' | 'request' | null;

interface FriendState {
  modalType: ModalType;
  friendRequests: FriendRequestUIModel[];
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  setFriendRequests: (list: FriendRequestUIModel[]) => void;
}

export const useFriendStore = create<FriendState>((set) => ({
  modalType: null,
  friendRequests: [],
  openModal: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
  setFriendRequests: (list) => set({ friendRequests: list }),
}));
