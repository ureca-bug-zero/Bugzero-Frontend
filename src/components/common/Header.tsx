import clsx from 'clsx';
import { Flex } from './Wrapper';
import { theme } from '../../styles/theme';
import { CommonProps } from './types';

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
        theme.bgPalette.Secondary,
        'fixed top-0 left-0 z-10',
      )}
    >
      <img
        src="/src/assets/icons/logo.png"
        alt="BugZero"
        className="w-[158px] h-[44px]"
      />
      {type === 'home' && (
        <button className={clsx(theme.textPalette.White, theme.typo.Nav)}>
          Logout
        </button>
      )}
    </header>
  );
}
