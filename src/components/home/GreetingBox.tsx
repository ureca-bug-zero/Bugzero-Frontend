import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';
import { UserInfo } from '../../types/home';

export default function GreetingBox({ name, rank }: UserInfo) {
  return (
    <>
      <div
        className={clsx(
          Flex({ gap: 'gap-[10px]', justify: 'start' }),
          'mb-[20px] tablet:mb-[31px]',
        )}
      >
        <p className={clsx(theme.typo.Heading2_Eng)}>Hello,</p>
        <p className={clsx(theme.typo.Heading2_Kor)}>{name}!</p>
      </div>
      <div
        className={clsx(
          Flex({ gap: 'gap-[3px]', justify: 'start' }),
          'mb-[20px] tablet:mb-[70px]',
        )}
      >
        <p className={clsx(theme.typo.Heading4_Kor)}>이번 주 순위는</p>
        <div
          className={clsx(
            Flex({
              width: 'w-[24px] tablet:w-[40px]',
              height: 'h-[22px] tablet:h-[35px]',
            }),
            theme.typo.Heading3_Kor,
            'bg-primary/50',
          )}
        >
          {rank === 0 ? '-' : rank}위
        </div>
        <p className={clsx(theme.typo.Heading4_Kor)}>입니다!</p>
      </div>
    </>
  );
}
