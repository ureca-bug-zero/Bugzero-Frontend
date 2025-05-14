// 타이머 + 친구 목록
import React from 'react';
import SetTimer from '@/components/timer/SetTimer';
import FriendList from '@/components/friend/FriendList';
import FriendModalContainer from '../modals/FriendModalContainer';

const RightPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <SetTimer />
      <FriendList />
      <FriendModalContainer />
    </div>
  );
};

export default RightPanel;
