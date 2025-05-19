import React from 'react';
import { useAuthStore } from '@/store/auth';
import { useAuth } from '@/features/auth/useAuth';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const { handleLogout } = useAuth();
  return (
    <header className="w-full bg-secondary-600 text-white px-8 py-4 flex justify-between select-none">
      {/* 로고 이미지 */}
      <div className="flex items-center gap-2">
        <Link to="/main">
          <img src={logo} alt="BugZero Logo" className="h-8 cursor-pointer" />
        </Link>
      </div>

      {/* 로그아웃 버튼 */}
      {isLoggedIn && (
        <button
          className="bg-secondary-600 font-pretendard text-[15px] hover:opacity-80 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
