import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';

export default function GreetingBox() {
  return (
    <>
      <div
        className={clsx(
          Flex({ gap: 'gap-[10px]', justify: 'start' }),
          'mb-[20px] tablet:mb-[47px]',
        )}
      >
        <p className={clsx(theme.typo.Heading2_Eng)}>Hello,</p>
        <p className={clsx(theme.typo.Heading2_Kor)}>이주희!</p>
      </div>
      <div
        className={clsx(
          Flex({ gap: 'gap-[3px]', justify: 'start' }),
          'mb-[23px] tablet:mb-[78px]',
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
          5위
        </div>
        <p className={clsx(theme.typo.Heading4_Kor)}>입니다!</p>
      </div>
    </>
  );
}
