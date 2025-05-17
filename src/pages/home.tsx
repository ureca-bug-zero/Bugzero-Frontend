import clsx from 'clsx';
import CalendarBox from '../components/home/CalendarBox';
import FriendBox from '../components/home/FriendBox';
import GreetingBox from '../components/home/GreetingBox';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';
import { Flex, Position } from '../components/common/Wrapper';
import { useEffect, useState } from 'react';
import { useUserStore } from '../store/user';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '../types/home';
import { userInfo } from '../apis/home';

export default function HomePage() {
  const token = useUserStore((state) => state.token);
  const [info, setInfo] = useState<UserInfo>();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  //Greeting
  const { data, isSuccess, error, isError, isLoading } = useQuery({
    queryKey: ['user_info', token],
    queryFn: ({ queryKey }) => userInfo(queryKey[1]),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInfo(data.data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      console.log(error);
    }
  }, [isError, error]);

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
        <GreetingBox name={info?.name} rank={info?.rank} />
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
    </div>
  );
}
