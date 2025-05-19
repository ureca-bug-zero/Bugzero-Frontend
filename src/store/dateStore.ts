import { format } from 'date-fns';
import { create } from 'zustand';

interface dateStoreProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  friendSelectedDate: string;
  setFriendSelectedDate: (date: string) => void;
}

export const useDateStore = create<dateStoreProps>((set) => ({
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  setSelectedDate: (newDate) => set({ selectedDate: newDate }),
  friendSelectedDate: format(new Date(), 'yyyy-MM-dd'),
  setFriendSelectedDate: (newDate) => set({ friendSelectedDate: newDate }),
}));
