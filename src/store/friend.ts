// friend.ts
import { create } from 'zustand';

export interface FriendRequestUIModel {
  id: number;
  name: string;
  email: string;
}

export interface FriendListItem {
  friendId: number;
  friendName: string;
  friendEmail: string;
}

type ModalType = 'add' | 'request' | null;

interface FriendState {
  modalType: ModalType;
  friendRequests: FriendRequestUIModel[];
  friendList: FriendListItem[];
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  setFriendRequests: (list: FriendRequestUIModel[]) => void;
  setFriendList: (list: FriendListItem[]) => void;
}

export const useFriendStore = create<FriendState>((set) => ({
  modalType: null,
  friendRequests: [],
  friendList: [],
  openModal: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
  setFriendRequests: (list) => set({ friendRequests: list }),
  setFriendList: (list) => set({ friendList: list }),
}));
