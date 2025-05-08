// src/components/common/Header.tsx
import React from 'react';
import logo from '@/assets/logo.png';

const Header = () => {
  return (
    <header className="w-full bg-secondary-600 text-white px-8 py-4 flex justify-between">
      {/* 로고 이미지 */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="BugZero Logo" className="h-8" />
      </div>

      {/* 로그아웃 버튼 */}
      <button className="bg-secondary-600 hover: text-white px-4 py-2 rounded transition font-medium">
        Logout
      </button>
    </header>
  );
};

export default Header;
