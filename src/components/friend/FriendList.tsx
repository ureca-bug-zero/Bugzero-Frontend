import React from 'react';
import { useFriendStore } from '@/store/friend';

interface Friend {
  id: number;
  name: string;
}

const FriendList: React.FC = () => {
  const { openAddModal } = useFriendStore();

  const dummyFriends: Friend[] = [
    { id: 1, name: '안민지' },
    { id: 2, name: '이은채' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">친구 목록</h3>

      {/* 추가 버튼 */}
      <button
        onClick={openAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        친구 추가
      </button>

      {/* 친구 목록 */}
      <ul className="space-y-2">
        {dummyFriends.map((friend) => (
          <li
            key={friend.id}
            className="flex justify-between items-center border-b py-1"
          >
            <span>{friend.name}</span>
            <button className="text-red-500">삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
