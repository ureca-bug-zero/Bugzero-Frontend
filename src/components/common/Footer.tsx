import clsx from 'clsx';
import { CommonProps } from './types';
import { Flex } from './Wrapper';
import { theme } from '../../styles/theme';

export default function Footer({ type }: CommonProps) {
  return (
    <footer
      className={clsx(
        Flex({ width: 'w-full', height: 'h-[80px]' }),
        type === 'landing' ? theme.bgPalette.Secondary : theme.bgPalette.Gray2,
      )}
    >
      <p
        className={clsx(
          theme.typo.Label3_Eng,
          type === 'landing'
            ? theme.textPalette.White
            : theme.textPalette.Secondary,
        )}
      >
        © 2025 BugZero. All rights reserved.
      </p>
    </footer>
  );
}
