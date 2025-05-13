import logo from '../assets/icons/landing/logo-landing.svg';
import iconTodo from '../assets/icons/landing/icon-todo.svg';
import iconDaily from '../assets/icons/landing/icon-goal.svg';
import iconTimer from '../assets/icons/landing/icon-timer.svg';
import iconFriend from '../assets/icons/landing/icon-friends.svg';
import kakaoLoginBtn from '../assets/icons/landing/kakao-login.svg';

import clsx from 'clsx';
import { Flex } from '../components/common/Wrapper';
import { theme } from '../styles/theme';

const descText = clsx(theme.textPalette.White, theme.typo.Heading7);

const iconStyle = clsx('w-10', 'h-10');

const LandingPage = () => {
  return (
    <main
      className={clsx(
        'min-h-screen',
        Flex({}),
        'flex-grow',
        'gap-[140px]',
        'px-20',
        theme.bgPalette.Primary,
      )}
    >
      {/* 화면 좌측*/}
      <img src={logo} alt="랜딩페이지 로고" className="h-40" />
      {/* 화면 우측 */}
      <div
        className={clsx(
          Flex({
            direction: 'column',
            align: 'start',
            gap: 'gap-5',
          }),
        )}
      >
        <p
          className={clsx(theme.typo.Heading1_Kor, theme.textPalette.Secondary)}
        >
          개발자를 위한
          <br />
          투두리스트
        </p>

        <div
          className={clsx(
            Flex({
              justify: 'between',
              width: 'w-[500px]',
            }),
          )}
        >
          <div
            className={clsx(
              Flex({
                direction: 'column',
              }),
            )}
          >
            <img
              src={iconTodo}
              alt="투두 관리 아이콘"
              // className="w-[3.125rem] h-[3.125rem] mb-1 mt-1"
              className={clsx('w-[3.125rem]', 'h-[3.125rem]')}
            />
            <p
              className={clsx(
                theme.textPalette.White,
                theme.typo.Heading7,
                '-translate-y-[5px]',
              )}
            >
              투두 관리
            </p>
          </div>
          <div
            className={Flex({
              direction: 'column',
            })}
          >
            <img
              src={iconDaily}
              alt="데일리 미션 아이콘"
              className={iconStyle}
            />
            <p className={descText}>데일리 미션</p>
          </div>
          <div
            className={Flex({
              direction: 'column',
            })}
          >
            <img
              src={iconTimer}
              alt="타이머 기능 아이콘"
              className={iconStyle}
            />
            <p className={descText}>타이머 기능</p>
          </div>
          <div
            className={Flex({
              direction: 'column',
            })}
          >
            <img
              src={iconFriend}
              alt="친구와 함께 아이콘"
              className={iconStyle}
            />
            <p className={descText}>친구와 함께</p>
          </div>
        </div>
        <button
          onClick={() => {
            window.location.href = 'http://52.78.163.213:8080/auth/kakao/login';
          }}
          className={clsx(
            'w-[300px]',
            'h-[73px]',
            'hover:opacity-90',
            'transition',
          )}
        >
          <img src={kakaoLoginBtn} />
        </button>
      </div>
    </main>
  );
};

export default LandingPage;
