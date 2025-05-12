// 공통 UI 컴포넌트
import React, { ReactNode } from 'react';
import Header from '../common/Header';

interface MainLayoutProps {
  children: ReactNode; // children 타입을 ReactNode로 지정
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        {/* <UserGreeting /> */}
        {/* 헤더 넣기! */}
        <Header />
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>{' '}
      {/* children 부분 렌더링 */}
      <footer className="h-12 bg-gray-100 text-center text-xs flex items-center justify-center text-gray-500">
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
