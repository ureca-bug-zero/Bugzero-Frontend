// 메인 기능 3분할 페이지 <- 이 안에 컴포넌트로 기능들 넣기 (component폴더안 내용들)
// HomePage.tsx
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPanel from '@/components/panels/UserPanel';
import TodoPanel from '@/components/panels/TodoPanel';
import RightPanel from '@/components/panels/RightPanel';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-row h-screen overflow-hidden">
        {/* 왼쪽: 유저 패널 */}
        <section className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto flex flex-col">
          <UserPanel />
        </section>

        {/* 가운데: 투두 패널 */}
        <section className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto flex flex-col">
          <TodoPanel />
        </section>

        {/* 오른쪽: 타이머/친구 패널 */}
        <section className="w-1/3 p-4 overflow-y-auto flex flex-col">
          <RightPanel />
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;
