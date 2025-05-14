import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPanel from '@/components/panels/UserPanel';
import TodoPanel from '@/components/panels/TodoPanel';
import RightPanel from '@/components/panels/RightPanel';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [isDesktop, setIsDesktop] = useState<boolean>(
    window.innerWidth >= 1024,
  );
  const [isTablet, setIsTablet] = useState<boolean>(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsTablet(width >= 768 && width < 1024);
      setIsMobile(width < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MainLayout>
      <div className="pt-[112px] px-4 lg:px-0">
        {/* 공통: 유저 + 투두 패널 */}
        <div
          className={`flex ${
            isDesktop || isTablet ? 'flex-row justify-center' : 'flex-col'
          } ${isDesktop ? 'gap-[140px]' : isTablet ? 'gap-[30px]' : 'gap-4'}`}
        >
          <div style={{ width: '360px' }}>
            <UserPanel
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <div style={{ width: '360px' }}>
            <TodoPanel selectedDate={selectedDate} />
          </div>

          {/* 데스크탑에서만 라이트 패널 표시 */}
          {isDesktop && (
            <div className="w-[360px]">
              <RightPanel />
            </div>
          )}
        </div>

        {/* 태블릿 전용: 아래에 라이트 패널 */}
        {isTablet && (
          <div className="mt-[40px] flex justify-center">
            <div className="w-[360px]">
              <RightPanel />
            </div>
          </div>
        )}

        {/* 모바일 전용: 세로 정렬 + 아래 여백으로 footer 방지 */}
        {isMobile && (
          <div className="mt-[24px] flex flex-col items-center gap-4 pb-12">
            <RightPanel />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
