// 메인 기능 3분할 페이지 <- 이 안에 컴포넌트로 기능들 넣기 (component폴더안 내용들)

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPanel from '@/components/panels/UserPanel';
import TodoPanel from '@/components/panels/TodoPanel';
import RightPanel from '@/components/panels/RightPanel';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="pt-[112px] px-4 lg:px-0">
        {/* 데스크탑 */}
        <div className="hidden lg:flex justify-center w-full">
          <div className="flex">
            {/* 각 패널에 padding-right 적용으로 간격 유지 */}
            <div className="pr-[35px] pl-[35px]">
              <div className="w-[470px]">
                <UserPanel />
              </div>
            </div>

            <div className="pr-[35px] pl-[35px]">
              <div className="w-[470px]">
                <TodoPanel />
              </div>
            </div>

            <div className="pr-[35px] pl-[35px]">
              <div className="w-[470px]">
                <RightPanel />
              </div>
            </div>
          </div>
        </div>

        {/* 태블릿 이하 */}
        <div className="flex flex-col lg:hidden gap-8">
          {/* 태블릿 */}
          <div className="hidden md:flex justify-center px-6">
            <div className="px-[35px] w-[360px]">
              <UserPanel />
            </div>
            <div className="px-[35px] w-[360px]">
              <TodoPanel />
            </div>
          </div>

          {/* 모바일 */}
          <div className="md:hidden flex flex-col items-center gap-6">
            <UserPanel />
            <TodoPanel />
            <RightPanel />
          </div>

          {/* 태블릿에서 친구 패널 하단 */}
          <div className="hidden md:block w-full px-6">
            <RightPanel />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
