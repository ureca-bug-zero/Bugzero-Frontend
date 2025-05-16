import clsx from 'clsx';
import { Flex, Position } from './Wrapper';
import { theme } from '../../styles/theme';
import { CommonProps } from './types';
import logo from '@/assets/icons/logo.png';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/user';

export default function Header({ type }: CommonProps) {
  const setToken = useUserStore((state) => state.setToken);

  return (
    <header
      className={clsx(
        Flex({
          justify: type === 'landing' ? 'start' : 'between',
          width: 'w-full',
          height: 'h-[100px]',
          padding: {
            x: 'px-[40px]',
            y: 'py-[0px]',
          },
        }),
        Position({
          position: 'fixed',
          top: 'top-0',
          left: 'left-0',
          zIndex: 'z-10',
        }),
        theme.bgPalette.Secondary,
      )}
    >
      <Link to={'/'}>
        <img src={logo} alt="BugZero" className="w-[158px] h-[44px]" />
      </Link>
      {type === 'home' && (
        <button
          className={clsx(theme.textPalette.White, theme.typo.Nav)}
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao/logout`;
            setToken('');
          }}
        >
          Logout
        </button>
      )}
    </header>
  );
}
