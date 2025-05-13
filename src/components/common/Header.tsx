import React from 'react';
import { useAuthStore } from '@/store/auth';
// import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  // const navigate = useNavigate();
  return (
    <header className="w-full bg-secondary-600 text-white px-8 py-4 flex justify-between select-none">
      {/* 로고 이미지 */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="BugZero Logo" className="h-8" />
      </div>

      {/* 로그아웃 버튼 */}
      {isLoggedIn && (
        <button className="bg-secondary-600 hover: text-white rounded transition font-pretendard text-[15px]">
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
