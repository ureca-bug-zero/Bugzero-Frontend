import clsx from 'clsx';
import CalendarBox from '../components/home/CalendarBox';
import FriendBox from '../components/home/FriendBox';
import GreetingBox from '../components/home/GreetingBox';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';
import { Flex } from '../components/common/Wrapper';
import { theme } from '../styles/theme';

export default function HomePage() {
  const line = clsx(
    'border-[1px] h-[500px] border-solid border-gray-200 mx-[50px]',
  );

  return (
    <main
      className={clsx(Flex({ height: 'h-[620px]' }), 'mt-[112px] mb-[192px]')}
    >
      {/*Desktop*/}
      <div className={clsx(Flex({ direction: 'column', height: 'h-full' }))}>
        <GreetingBox />
        <CalendarBox />
      </div>
      <hr className={line}></hr>
      <div className="h-full">
        <TodoTemplate />
      </div>
      <hr className={line}></hr>
      <div
        className={clsx(
          Flex({ direction: 'column', gap: 'gap-[83px]', height: 'h-full' }),
        )}
      >
        <TimerBox />
        <FriendBox />
      </div>
    </main>
  );
}
