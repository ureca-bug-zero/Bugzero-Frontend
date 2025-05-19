// 인사말 + 캘린더
import React from 'react';
import UserGreeting from '@/components/user/UserGreeting';
import UserCalendar from '@/components/user/UserCalendar';

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onDateClick?: () => void; // 날짜 클릭 시 호출되는 함수
}

const UserPanel = ({ selectedDate, setSelectedDate, onDateClick }: Props) => {
  return (
    <div className="space-y-[85px] w-[360px] flex flex-col items-start">
      <UserGreeting />

      <UserCalendar
        selectedDate={selectedDate}
        setSelectedDate={(date) => {
          setSelectedDate(date);
          onDateClick?.();
        }}
      />
    </div>
  );
};

export default UserPanel;
