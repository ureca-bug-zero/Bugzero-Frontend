import clsx from 'clsx';
import CalendarBox from '../components/home/CalendarBox';
import FriendBox from '../components/home/FriendBox';
import GreetingBox from '../components/home/GreetingBox';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';
import { Flex } from '../components/common/Wrapper';

export default function HomePage() {
  const line = clsx(
    'border-[1px] h-[500px] border-solid border-gray-200 mx-[50px] hidden desktop:block',
  );

  return (
    <main
      className={clsx(
        Flex({ height: 'tablet:h-[841.14px] desktop:h-[620px]' }),
        'mt-[112px] mb-[192px]',
      )}
    >
      <div
        className={clsx(
          Flex({
            direction: 'column',
            height: 'h-full',
            justify: 'start',
            align: 'start',
          }),
          'tablet:mr-[28px] desktop:mr-0',
        )}
      >
        <GreetingBox />
        <CalendarBox />
        <div className="tablet:mt-[52.45px] desktop:hidden">
          <FriendBox />
        </div>
      </div>
      <hr className={line}></hr>
      <div
        className={clsx(
          Flex({
            direction: 'column',
            height: 'h-full',
            justify: 'start',
            align: 'start',
          }),
        )}
      >
        <TodoTemplate />
        <div className="tablet:mt-[63px] desktop:hidden">
          <TimerBox />
        </div>
      </div>
      <hr className={line}></hr>
      <div
        className={clsx(
          Flex({
            direction: 'column',
            gap: 'gap-[83px]',
            height: 'h-full',
            justify: 'start',
            align: 'start',
          }),
          'tablet:hidden desktop:flex',
        )}
      >
        <TimerBox />
        <FriendBox />
      </div>
    </main>
  );
}
