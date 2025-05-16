import logo from '../assets/icons/landing/logo-landing.svg';
import iconTodo from '../assets/icons/landing/icon-todo.svg';
import iconDaily from '../assets/icons/landing/icon-goal.svg';
import iconTimer from '../assets/icons/landing/icon-timer.svg';
import iconFriend from '../assets/icons/landing/icon-friends.svg';
import kakaoLoginBtn from '../assets/icons/landing/kakao-login.svg';

import clsx from 'clsx';
import { Flex } from '../components/common/Wrapper';
import { theme } from '../styles/theme';

const descText = clsx(
  theme.textPalette.White,
  theme.typo.Heading7,
  'select-none',
);

const iconStyle = clsx('w-10', 'h-10');

const LandingPage = () => {
  return (
    <div
      className={clsx(
        'min-h-screen w-full',
        'px-6',
        'tablet:px-12',
        'desktop:px-20',
        Flex({
          direction: 'column',
        }),
        'gap-y-[50px]',
        theme.bgPalette.Primary,
        'desktop:flex-row',
        'desktop:gap-[140px]',
      )}
    >
      {/* 화면 좌측*/}
      <img
        src={logo}
        alt="랜딩페이지 로고"
        className={clsx('tablet:h-[200px]', 'h-[123px]')}
      />
      {/* 화면 우측 */}
      <div
        className={clsx(
          Flex({
            direction: 'column',
            gap: 'gap-[26px]',
          }),
          'desktop:items-start',
          'tablet:gap-[40px]',
        )}
      >
        <p
          className={clsx(
            theme.typo.Heading1_Kor,
            theme.textPalette.Secondary,
            'select-none',
          )}
        >
          개발자를 위한<span className="inline desktop:hidden">&nbsp;</span>
          <br className="hidden desktop:inline" />
          투두리스트
        </p>

        <div
          className={clsx(
            Flex({
              justify: 'between',
              width: 'w-[399px]',
              gap: 'g-[28px]',
            }),
            'tablet:w-[534px]',
            'tablet:gap-[18px]',
            'desktop:-translate-x-[20px]',
          )}
        >
          <div
            className={clsx(
              Flex({
                direction: 'column',
              }),
              'tablet:w-[120px]',
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
                'select-none',
              )}
            >
              투두 관리
            </p>
          </div>
          <div
            className={clsx(
              Flex({
                direction: 'column',
              }),
              'tablet:w-[120px]',
            )}
          >
            <img
              src={iconDaily}
              alt="데일리 미션 아이콘"
              className={iconStyle}
            />
            <p className={descText}>데일리 미션</p>
          </div>
          <div
            className={clsx(
              Flex({
                direction: 'column',
              }),
              'tablet:w-[120px]',
            )}
          >
            <img
              src={iconTimer}
              alt="타이머 기능 아이콘"
              className={iconStyle}
            />
            <p className={descText}>타이머 기능</p>
          </div>
          <div
            className={clsx(
              Flex({
                direction: 'column',
              }),
              'tablet:w-[120px]',
            )}
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
            'w-[170px]',
            'h-[41px]',
            'tablet:w-[300px]',
            'tablet:h-[73px]',
            'hover:opacity-90',
            'transition',
            '-translate-y-[11px]',
          )}
        >
          <img src={kakaoLoginBtn} />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
