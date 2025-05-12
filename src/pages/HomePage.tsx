import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPanel from '@/components/panels/UserPanel';
import TodoPanel from '@/components/panels/TodoPanel';
import RightPanel from '@/components/panels/RightPanel';
import { useViewport } from '@/hooks/useViewport'; // 뷰포트 감지 훅

const HomePage: React.FC = () => {
  const viewport = useViewport(); // 'mobile' | 'tablet' | 'desktop'

  const renderPanels = () => {
    if (viewport === 'desktop') {
      return (
        <div className="flex justify-center w-full">
          <div className="flex">
            <div className="pr-[35px] pl-[35px] w-[470px]">
              <UserPanel />
            </div>
            <div className="pr-[35px] pl-[35px] w-[470px]">
              <TodoPanel />
            </div>
            <div className="pr-[35px] pl-[35px] w-[470px]">
              <RightPanel />
            </div>
          </div>
        </div>
      );
    }

    if (viewport === 'tablet') {
      return (
        <div className="flex justify-center px-6 gap-8">
          <div className="px-[35px] w-[360px]">
            <UserPanel />
          </div>
          <div className="px-[35px] w-[360px]">
            <TodoPanel />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-6">
        <UserPanel />
        <TodoPanel />
        <RightPanel />
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="pt-[112px] px-4 lg:px-0 flex flex-col gap-8">
        {renderPanels()}
        {viewport === 'tablet' && (
          <div className="w-full px-6">
            <RightPanel />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
