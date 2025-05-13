import clsx from 'clsx';
import { Flex, Position } from './Wrapper';
import { theme } from '../../styles/theme';
import { CommonProps } from './types';
import logo from '@/assets/icons/logo.png';

export default function Header({ type }: CommonProps) {
  return (
    <header
      className={clsx(
        Flex({
          justify: type === 'home' ? 'between' : 'start',
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
      <img src={logo} alt="BugZero" className="w-[158px] h-[44px]" />
      {type === 'home' && (
        <button className={clsx(theme.textPalette.White, theme.typo.Nav)}>
          Logout
        </button>
      )}
    </header>
  );
}
