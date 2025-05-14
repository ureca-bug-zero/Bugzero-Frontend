import { create } from 'zustand';

interface CalendarStore {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
