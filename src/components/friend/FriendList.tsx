import React, { useEffect, useState } from 'react';
import { useFriendStore, FriendListItem } from '@/store/friend';
import { fetchFriendList } from '@/features/friend/FriendService';

const FriendList: React.FC = () => {
  const { openModal } = useFriendStore();
  const [friends, setFriends] = useState<FriendListItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFriendList();
        setFriends(data);
      } catch (err) {
        console.error('친구 목록 불러오기 실패:', err);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">친구 목록</h3>

      {/* 친구 추가 버튼 */}
      <button
        onClick={() => openModal('add')}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        친구 추가
      </button>

      {/* 친구 목록 */}
      <ul className="space-y-2">
        {friends.length === 0 ? (
          <p className="text-gray-400">등록된 친구가 없습니다.</p>
        ) : (
          friends.map((friend) => (
            <li key={friend.friendId} className="flex flex-col border-b py-2">
              <span className="font-medium">{friend.friendName}</span>
              <span className="text-sm text-gray-500">
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
