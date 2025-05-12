import clsx from 'clsx';
import { Flex } from './Wrapper';
import { theme } from '../../styles/theme';

export type HeaderType = 'home' | 'landing';

interface HeaderProps {
  type: HeaderType;
}

export default function Header({ type }: HeaderProps) {
  return (
    <header
      className={clsx(
        Flex({
          direction: 'row',
          justify: type === 'home' ? 'between' : 'start',
        }),
        'fixed top-0 left-0 w-full h-[100px] p-[0_40px]',
        theme.bgPalette.Secondary,
      )}
    >
      <img
        src="/src/assets/icons/logo.png"
        alt="BugZero"
        className="w-[158px] h-[44px]"
      />
      {type === 'home' && (
        <button className={(theme.typo.Nav, theme.textPalette.White)}>
          Logout
        </button>
      )}
    </header>
  );
}
