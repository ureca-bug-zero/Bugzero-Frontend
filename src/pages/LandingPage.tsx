// Landing page
import React from 'react';
import Header from '@/components/common/Header';
import logo from '@/assets/Landing-logo.png';
import kakaoLoginBtn from '@/assets/kakao-login.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-primary-500 text-secondary-600">
      <Header />
      <div className="flex justify-between items-center px-20 h-[calc(100vh-4rem)]">
        {/* 좌측: 로고 */}
        <img src={logo} alt="BugZero 로고" className="h-40" />

        {/* 우측: 설명 + 버튼 */}
        <div className="text-left">
          <p className="text-5xl font-extrabold mb-6 leading-snug">
            개발자를 위한
            <br />
            투두 리스트
          </p>

          <img
            src={kakaoLoginBtn}
            alt="카카오 로그인 버튼"
            className="cursor-pointer w-[300px] h-[73px] hover:opacity-90 transition"
            // onClick={handleKakaoLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
