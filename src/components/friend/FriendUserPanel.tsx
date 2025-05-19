import React, { useEffect, useState } from 'react';
import UserCalendar from '@/components/user/UserCalendar';
import axios from '@/api/axios';
import { UserInfo } from '@/types/auth';

interface Props {
  friendId: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const FriendUserPanel = ({
  friendId,
  selectedDate,
  setSelectedDate,
}: Props) => {
  const [friend, setFriend] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 친구 정보 불러오기 (이름, 랭킹 등)
    axios
      .get<{ data: UserInfo }>(`/friend/info/${friendId}`)
      .then((res) => setFriend(res.data.data))
      .catch(() => setFriend(null));
  }, [friendId]);

  if (!friend) return null;

  return (
    <div className="space-y-[85px] w-[360px] flex flex-col items-center">
      <div className="w-[277px] flex flex-col items-left space-y-[47px] text-blackText">
        <h1 className="text-[36px] font-bold">{`Hello, ${friend.name}!`}</h1>
        <p className="text-[20px]">
          이번 주 순위는{' '}
          <span className="font-bold text-[24px] bg-green-200 px-0.5 py-1">
            {friend.rank ?? '0'}위
          </span>{' '}
          입니다!
        </p>
      </div>
      <UserCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        friendId={friendId}
      />
    </div>
  );
};

export default FriendUserPanel;
