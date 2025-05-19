// pages/FriendPage.tsx
import { useParams } from 'react-router-dom';
import FriendUserPanel from '@/components/friend/FriendUserPanel';
import FriendTodoPanel from '@/components/friend/FriendTodoPanel';
import { useState } from 'react';

const FriendPage = () => {
  const { friendId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!friendId) return null;

  const parsedFriendId = parseInt(friendId, 10);

  return (
    <div className="flex justify-center gap-[80px] pt-[60px]">
      <FriendUserPanel
        friendId={parsedFriendId}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <FriendTodoPanel friendId={parsedFriendId} selectedDate={selectedDate} />
    </div>
  );
};

export default FriendPage;
