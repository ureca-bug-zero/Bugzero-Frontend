import clsx from 'clsx';
import { CommonProps } from './types';
import { Flex } from './Wrapper';
import { theme } from '../../styles/theme';

export default function Footer({ type }: CommonProps) {
  return (
    <footer
      className={clsx(
        Flex({ width: 'w-full', height: 'h-80px' }),
        type === 'home' ? theme.bgPalette.Gray2 : theme.bgPalette.Secondary,
      )}
    >
      <p
        className={clsx(
          theme.typo.Label3_Eng,
          type === 'home'
            ? theme.textPalette.Secondary
            : theme.textPalette.White,
        )}
      >
        © 2025 BugZero. All rights reserved.
      </p>
    </footer>
  );
}
