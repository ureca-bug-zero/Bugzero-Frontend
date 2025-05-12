import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import logo from '@/assets/Landing-logo.png';
import kakaoLoginBtn from '@/assets/kakao-login.png';

// png icon import
import iconTodo from '@/assets/icon-check.png';
import iconMission from '@/assets/icon-goal.png';
import iconTimer from '@/assets/icon-timer.png';
import iconFriends from '@/assets/icon-friend.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-500 text-secondary-600 select-none">
      <Header />
      <main className="flex-grow overflow-x-auto flex justify-center items-center px-6 xl1440:px-20">
        <div
          className="flex flex-col xl1440:flex-row items-center 
          xl1440:items-center gap-12 
          xl1440:gap-[140px] text-center 
          xl1440:text-left
          overflow-hidden"
        >
          {/* 좌측: 로고 */}
          <img src={logo} alt="BugZero 로고" className="h-40 shrink-0" />

          {/* 우측: 설명 + 버튼 */}
          <div className="flex flex-col items-center xl1440:items-start text-center xl1440:text-left">
            <p className="text-[48px] xl1440:text-6xl font-pretendard font-extrabold mb-6 xl1440:leading-snug">
              <span className="hidden xl1440:inline">
                개발자를 위한
                <br />
                투두 리스트
              </span>
              <span className="inline xl1440:hidden whitespace-nowrap">
                개발자를 위한 투두 리스트
              </span>
            </p>
            {/* 아이콘 + 텍스트 */}
            <div className="flex gap-[70px] xl1440:gap-[40px] mb-10 text-white font-pretendard font-bold justify-center xl1440:justify-start">
              <div className="flex flex-col items-center text-sm">
                <img
                  src={iconTodo}
                  alt="투두 관리"
                  className="w-10 h-10 mb-1"
                />
                <span>투두 관리</span>
              </div>
              <div className="flex flex-col items-center text-sm">
                <img
                  src={iconMission}
                  alt="데일리 미션"
                  className="w-10 h-10 mb-1"
                />
                <span>데일리 미션</span>
              </div>
              <div className="flex flex-col items-center text-sm">
                <img
                  src={iconTimer}
                  alt="타이머 기능"
                  className="w-10 h-10 mb-1"
                />
                <span>타이머 기능</span>
              </div>
              <div className="flex flex-col items-center text-sm">
                <img
                  src={iconFriends}
                  alt="친구와 함께"
                  className="w-10 h-10 mb-1"
                />
                <span>친구와 함께</span>
              </div>
            </div>
            <img
              src={kakaoLoginBtn}
              alt="카카오 로그인 버튼"
              className="cursor-pointer w-[300px] h-[73px] hover:opacity-90 transition self-center xl1440:self-start"
              // onClick={handleKakaoLogin}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
