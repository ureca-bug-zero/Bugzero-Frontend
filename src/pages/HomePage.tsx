import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPanel from '@/components/panels/UserPanel';
import TodoPanel from '@/components/panels/TodoPanel';
import RightPanel from '@/components/panels/RightPanel';
import { useViewport } from '@/hooks/useViewport';
import SetTimer from '@/components/timer/SetTimer';
import FriendList from '@/components/friend/FriendList';
import FriendModalContainer from '@/components/modals/FriendModalContainer';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const viewport = useViewport();
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  return (
    <>
      <MainLayout>
        <div className="pt-[40px] tablet:pt-[60px] desktop:pt-[112px]">
          {/* 데스크탑: 가로 배치 */}
          {viewport === 'desktop' && (
            <div className="flex flex-row justify-center gap-[70px]">
              <div style={{ width: '360px' }}>
                <UserPanel
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="w-[1px] h-[585px] bg-gray-300 self-start" />
              <div style={{ width: '360px' }}>
                <TodoPanel selectedDate={selectedDate} />
              </div>
              <div className="w-[1px] h-[500px] bg-gray-300 self-start" />
              <div className="w-[360px]">
                <RightPanel />
              </div>
            </div>
          )}

          {/* 태블릿: 위에 유저+투두, 아래에 라이트 패널 */}
          {viewport === 'tablet' && (
            <div className="mx-auto max-w-[880px] grid grid-cols-2 gap-x-[40px] gap-y-20 pl-4">
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
            <div className="flex flex-col items-center gap-4">
              <div style={{ width: '360px' }}>
                <UserPanel
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onDateClick={() => setIsTodoModalOpen(true)} // 날짜 클릭 시 모달 오픈
                />
              </div>
              <div style={{ width: '360px' }}>
                <FriendList />
              </div>

              {isTodoModalOpen && (
                <div className="fixed top-[64px] bottom-[48px] left-0 right-0 bg-white z-50 overflow-y-auto px-4">
                  <div className="relative w-full mx-auto pt-16">
                    <button
                      onClick={() => setIsTodoModalOpen(false)}
                      className="absolute top-0 right-0 text-secondary-500 hover:text-black text-xl"
                    >
                      ✕
                    </button>
                    <TodoPanel selectedDate={selectedDate} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <FriendModalContainer />
      </MainLayout>
    </>
  );
};

export default HomePage;
