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
          style={{
            display: 'flex',
            justifyContent: isDesktop || isTablet ? 'center' : 'flex-start',
            flexDirection: isDesktop || isTablet ? 'row' : 'column',
            gap: isDesktop ? '140px' : isTablet ? '30px' : '16px',
          }}
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

          {/* 데스크탑에서만 라이트 패널을 함께 보여줌 */}
          {isDesktop && (
            <div style={{ width: '360px' }}>
              <RightPanel />
            </div>
          )}
        </div>

        {/* 태블릿에서만 라이트 패널을 아래에 별도로 보여줌 */}
        {isTablet && (
          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '360px' }}>
              <RightPanel />
            </div>
          </div>
        )}

        {/* 모바일에서 세로 정렬 */}
        {isMobile && (
          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <RightPanel />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
