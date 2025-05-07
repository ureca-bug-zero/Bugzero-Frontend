// 공통 UI 컴포넌트
import React, { ReactNode } from 'react';
import Header from '../common/Header';

interface MainLayoutProps {
  children: ReactNode; // children 타입을 ReactNode로 지정
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <header>
        {/* <UserGreeting /> */}
        {/* 헤더 넣기! */}
        <Header />
      </header>
      <main>{children}</main> {/* children 부분 렌더링 */}
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
