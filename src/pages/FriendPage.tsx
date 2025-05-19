// pages/FriendPage.tsx

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import FriendUserPanel from '@/components/friend/FriendUserPanel';
import FriendTodoPanel from '@/components/friend/FriendTodoPanel';
import MainLayout from '@/components/layout/MainLayout';
import { useViewport } from '@/hooks/useViewport';

const FriendPage = () => {
  const { friendId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const viewport = useViewport();

  if (!friendId) return null;
  const parsedFriendId = parseInt(friendId, 10);

  return (
    <MainLayout>
      <div className="pt-[40px] tablet:pt-[60px] desktop:pt-[112px]">
        {/* 데스크탑: 가로 배치 */}
        {viewport === 'desktop' && (
          <div className="flex justify-center gap-[80px]">
            <FriendUserPanel
              friendId={parsedFriendId}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <FriendTodoPanel
              friendId={parsedFriendId}
              selectedDate={selectedDate}
            />
          </div>
        )}

        {/* 태블릿 & 모바일: 세로 배치 + 중앙 정렬 */}
        {(viewport === 'tablet' || viewport === 'mobile') && (
          <div className="flex flex-col items-center gap-[40px]">
            <FriendUserPanel
              friendId={parsedFriendId}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <FriendTodoPanel
              friendId={parsedFriendId}
              selectedDate={selectedDate}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FriendPage;
