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
        'w-full h-[100px] p-[0_40px]',
        theme.bgPalette.Secondary,
      )}
    >
      <div className={(theme.typo.Nav, theme.textPalette.White)}>Logo</div>
      {type === 'home' && (
        <div className={(theme.typo.Nav, theme.textPalette.White)}>Logout</div>
      )}
    </header>
  );
}
