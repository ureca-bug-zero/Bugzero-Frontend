import clsx from 'clsx';
import CalendarBox from '../components/home/CalendarBox';
import GreetingBox from '../components/home/GreetingBox';
import TodoTemplate from '../components/todo/TodoTemplate';
import { Flex, Position } from '../components/common/Wrapper';
import { useState } from 'react';

export default function FriendPage() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // const handleOpen = () => {
  //   setIsClicked(true);
  // };

  const handleClose = () => {
    setIsClicked(false);
  };

  const line = clsx(
    'border-[1px] h-[500px] border-solid border-gray-200 hidden desktop:block',
  );

  return (
    <div
      className={clsx(
        Flex({
          height: 'desktop:h-[620px]',
          align: 'start',
        }),
        ' overflow-hidden  pt-[5px] mt-[41px] mb-[40.33px] tablet:mt-[60px] tablet:mb-[76.86px] desktop:mt-[112px] desktop:mb-[192px]',
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
        <GreetingBox name={'이주희'} rank={1} />
        <CalendarBox />
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
    </div>
  );
}
