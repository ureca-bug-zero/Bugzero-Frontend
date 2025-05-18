import { format } from 'date-fns';
import { create } from 'zustand';

interface dateStoreProps {
  selectedDate: string;
  setSelectedDate: (token: string) => void;
}

export const useDateStore = create<dateStoreProps>((set) => ({
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  setSelectedDate: (newDate) => set({ selectedDate: newDate }),
}));
