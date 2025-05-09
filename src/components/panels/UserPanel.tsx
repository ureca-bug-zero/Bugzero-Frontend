// 인사말 + 캘린더
import React from 'react';
import UserGreeting from '@/components/user/UserGreeting';
import UserCalendar from '@/components/user/UserCalendar';
const exampleData = {
  '2025-05-01': 100,
  '2025-05-02': 60,
  '2025-05-03': 30,
  '2025-05-04': 90,
  '2025-05-95': 50,
  '2025-05-08': 20,
  '2025-05-09': 20,
  '2025-05-11': 20,
  '2025-05-12': 20,
  '2025-05-15': 20,
};
const UserPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <UserGreeting />

      <UserCalendar percentageMap={exampleData} />
    </div>
  );
};

export default UserPanel;
