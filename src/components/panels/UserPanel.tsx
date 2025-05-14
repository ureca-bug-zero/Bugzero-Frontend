// 인사말 + 캘린더
import React from 'react';
import UserGreeting from '@/components/user/UserGreeting';
import UserCalendar from '@/components/user/UserCalendar';

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const UserPanel = ({ selectedDate, setSelectedDate }: Props) => {
  return (
    <div className="space-y-[85px] w-[360px] flex flex-col items-center">
      <UserGreeting />

      <UserCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default UserPanel;
