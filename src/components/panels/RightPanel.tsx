// 타이머 + 친구 목록
import React from 'react';
import SetTimer from '@/components/timer/SetTimer';
import FriendList from '@/components/friend/FriendList';
import FriendRequestModal from '../modals/FriendRequestModal';
import FriendAddModal from '../modals/FriendAddModal';

const RightPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <SetTimer />
      <FriendList />
      <FriendAddModal />
      <FriendRequestModal />
    </div>
  );
};

export default RightPanel;
