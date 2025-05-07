// 메인 기능 3분할 페이지 <- 이 안에 컴포넌트로 기능들 넣기 (component폴더안 내용들)
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="h-screen">
        <h2 className="text-2xl font-bold">메인 페이지 내용</h2>
      </div>
    </MainLayout>
  );
};

export default HomePage;
