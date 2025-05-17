import clsx from 'clsx';
import { Flex, Position } from './Wrapper';
import { theme } from '../../styles/theme';
import { CommonProps } from './types';
import logo from '@/assets/icons/logo.png';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

export default function Header({ type }: CommonProps) {
  const clearToken = useUserStore((state) => state.clearToken);
  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao/logout`;
    clearToken();
  };
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
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </header>
  );
}
