import React, { useEffect, useState } from 'react';
import { useFriendStore, FriendListItem } from '@/store/friend';
import { fetchFriendList } from '@/features/friend/FriendService';

const FriendList: React.FC = () => {
  const { openModal, friendRequests } = useFriendStore();
  const [friends, setFriends] = useState<FriendListItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFriendList();
        setFriends(data ?? []);
      } catch (err) {
        console.error('친구 목록 불러오기 실패:', err);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-4">
      <div
        className="flex justify-between items-center gap-2 
      text-[32px] font-semibold text-secondary-600
      font-inter text-left'"
      >
        Friends
        <img
          src={
            friendRequests.length > 0
              ? '/public/icons/friend-req-icon.svg'
              : '/public/icons/friend-icon.svg'
          }
          className="w-7 h-7 cursor-pointer hover:opacity-80"
          alt="icon"
          onClick={() => openModal('add')}
        />
      </div>

      {/* 친구 목록 */}
      <ul className="space-y-2">
        {!friends || friends.length === 0 ? (
          <p className="text-secondary-600">친구를 추가해보세요!</p>
        ) : (
          friends.map((friend) => (
            <li
              key={friend.friendId}
              className="flex flex-col px-4 py-3 gap-y-1 
              cursor-pointer hover:bg-secondary-200 
              transition-colors duration-200 rounded-lg"
            >
              <span className="text-secondary-600 font-medium">
                {friend.friendName}
              </span>
              <span className="text-sm text-secondary-500">
                {friend.friendEmail}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FriendList;
