import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPanel from '@/components/panels/UserPanel';
import TodoPanel from '@/components/panels/TodoPanel';
import RightPanel from '@/components/panels/RightPanel';

type ScreenSize = 'desktop' | 'tablet' | 'mobile';

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    const width = window.innerWidth;
    if (width >= 1440) return 'desktop';
    if (width >= 760) return 'tablet';
    return 'mobile';
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1440) setScreenSize('desktop');
      else if (width >= 760) setScreenSize('tablet');
      else setScreenSize('mobile');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MainLayout>
      <div className="pt-[112px] px-4 lg:px-0">
        {/* 유저 + 투두 + RightPanel (줄바꿈 포함) */}
        <div
          className={`flex flex-wrap justify-center ${
            screenSize === 'desktop'
              ? 'flex-row gap-[140px]'
              : screenSize === 'tablet'
                ? 'flex-row gap-[30px]'
                : 'flex-col gap-4'
          }`}
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

          <div
            className={`${
              screenSize === 'desktop'
                ? 'w-[360px]'
                : screenSize === 'tablet'
                  ? 'w-[360px] mt-[40px]'
                  : 'w-full mt-[24px] px-4 pb-12'
            } flex ${screenSize === 'mobile' ? 'flex-col items-center gap-4' : 'justify-center'}`}
          >
            <RightPanel />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
