// 친구 목록 UI
import React, { useState } from 'react';

interface Friend {
  id: number;
  name: string;
}

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: '안민지' },
    { id: 2, name: '이은채' },
  ]);
  const [newFriend, setNewFriend] = useState('');

  const addFriend = () => {
    if (newFriend.trim()) {
      setFriends([...friends, { id: Date.now(), name: newFriend }]);
      setNewFriend('');
    }
  };

  const removeFriend = (id: number) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  return (
    <div>
      <div className="space-y-2">
        <h3 className="font-semibold">친구 목록</h3>
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="새 친구 이름"
          />
          <button
            onClick={addFriend}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            추가
          </button>
        </div>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className="flex justify-between items-center">
              <span>{friend.name}</span>
              <button
                onClick={() => removeFriend(friend.id)}
                className="text-red-500"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendList;
