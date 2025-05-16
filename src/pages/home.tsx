import clsx from 'clsx';
import CalendarBox from '../components/home/CalendarBox';
import FriendBox from '../components/home/FriendBox';
import GreetingBox from '../components/home/GreetingBox';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';
import { Flex, Position } from '../components/common/Wrapper';
import { useState } from 'react';

export default function HomePage() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleOpen = () => {
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  const line = clsx(
    'border-[1px] h-[500px] border-solid border-gray-200 hidden desktop:block',
  );

  return (
    <main
      className={clsx(
        Flex({
          height: 'desktop:h-[620px]',
          align: 'start',
        }),
        ' overflow-hidden  mt-[41px] mb-[40.33px] tablet:mt-[60px] tablet:mb-[76.86px] desktop:mt-[112px] desktop:mb-[192px]',
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
          'tablet:pl-[80px] desktop:pl-0',
        )}
      >
        <GreetingBox />
        <CalendarBox />
        <div className="mt-[45.79px] tablet:mt-[52.45px] desktop:hidden">
          <FriendBox />
        </div>
      </div>
      <hr className={clsx(line, 'mx-[80px]')}></hr>
      <div
        className={
          (clsx(
            Flex({
              direction: 'column',
              height: 'h-full',
              justify: 'start',
              align: 'start',
            }),
          ),
          'hidden tablet:block')
        }
      >
        <TodoTemplate handleClose={handleClose} />
        <div className="tablet:mt-[63px] desktop:hidden">
          <TimerBox />
        </div>
      </div>
      <hr className={clsx(line, 'mr-[80px]')}></hr>
      <div
        className={clsx(
          Flex({
            direction: 'column',
            gap: 'gap-[83px]',
            height: 'h-full',
            justify: 'start',
            align: 'start',
          }),
          'hidden desktop:flex',
        )}
      >
        <TimerBox />
        <FriendBox />
      </div>
      {isClicked && (
        <div
          className={clsx(
            Position({ position: 'absolute', zIndex: 'z-index-[60px]' }),
            'pl-[60px] tablet:hidden',
          )}
        >
          <TodoTemplate handleClose={handleClose} />
        </div>
      )}
    </main>
  );
}
