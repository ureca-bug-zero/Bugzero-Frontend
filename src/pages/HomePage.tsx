import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPanel from '@/components/panels/UserPanel';
import TodoPanel from '@/components/panels/TodoPanel';
import RightPanel from '@/components/panels/RightPanel';
import { useViewport } from '@/hooks/useViewport';
import SetTimer from '@/components/timer/SetTimer';
import FriendList from '@/components/friend/FriendList';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const viewport = useViewport();

  return (
    <MainLayout>
      <div className="pt-[112px] px-4 lg:px-0">
        {/* 데스크탑: 가로 배치 */}
        {viewport === 'desktop' && (
          <div className="flex flex-row justify-center gap-[140px]">
            <div style={{ width: '360px' }}>
              <UserPanel
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div style={{ width: '360px' }}>
              <TodoPanel selectedDate={selectedDate} />
            </div>
            <div className="w-[360px]">
              <RightPanel />
            </div>
          </div>
        )}

        {/* 태블릿: 위에 유저+투두, 아래에 라이트 패널 */}
        {viewport === 'tablet' && (
          <div className="mx-auto max-w-[880px] grid grid-cols-2 gap-x-[40px] gap-y-8 px-4">
            <div className="w-full max-w-[360px]">
              <UserPanel
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div className="w-full max-w-[360px]">
              <TodoPanel selectedDate={selectedDate} />
            </div>
            <div className="w-full max-w-[360px]">
              <SetTimer />
            </div>
            <div className="w-full max-w-[360px]">
              <FriendList />
            </div>
          </div>
        )}

        {/* 모바일: 세로 배치 */}
        {viewport === 'mobile' && (
          <div className="mt-[24px] flex flex-col items-center gap-4 pb-12">
            <div style={{ width: '360px' }}>
              <UserPanel
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div style={{ width: '360px' }}>
              <TodoPanel selectedDate={selectedDate} />
            </div>
            <div style={{ width: '360px' }}>
              <RightPanel />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
