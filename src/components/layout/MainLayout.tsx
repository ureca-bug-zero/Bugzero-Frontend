// 공통 UI 컴포넌트
// src/components/layout/MainLayout.tsx
import React from 'react';
import Header from '@/components/common/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-on-background">
      <Header />
      <main className="flex-grow w-full px-6">{children}</main>
    </div>
  );
};

export default MainLayout;
