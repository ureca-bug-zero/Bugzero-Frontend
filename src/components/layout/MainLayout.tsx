// 공통 UI 컴포넌트
import React, { ReactNode } from 'react';
import UserGreeting from '../user/UserGreeting';

interface MainLayoutProps {
  children: ReactNode; // children 타입을 ReactNode로 지정
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <header>
        <h1>BugZero</h1>
        {/* <UserGreeting /> */}
        {/* 헤더 넣기! */}
      </header>
      <main>{children}</main> {/* children 부분 렌더링 */}
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
