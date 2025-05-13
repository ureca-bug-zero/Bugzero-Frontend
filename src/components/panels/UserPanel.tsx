// 인사말 + 캘린더
import React from 'react';
import UserGreeting from '@/components/user/UserGreeting';
import UserCalendar from '@/components/user/UserCalendar';

const UserPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <UserGreeting />

      <UserCalendar />
    </div>
  );
};

export default UserPanel;
