import clsx from 'clsx';
import GreetingBox from '../components/home/GreetingBox';
import { Flex, Position } from '../components/common/Wrapper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FriendTodoTemplate } from '../components/friend/FriendTodoTemplate';
import FriendCalendarBox from '../components/friend/FriendCalendarBox';
import { CalendarData } from '../types/home';
import { useDateStore } from '../store/dateStore';
import { friendCalendar } from '../apis/friend';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useUserStore } from '../store/userStore';

export default function FriendPage() {
  const params = useParams();
  const token = useUserStore((state) => state.token);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [calendarList, setCaldendarList] = useState<CalendarData>({});
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
  const setFriendSelectedDate = useDateStore(
    (state) => state.setFriendSelectedDate,
  );

  const friendCalendarMutation = useMutation({
    mutationFn: friendCalendar,
    onSuccess: (data) => {
      const yearMonth = format(activeStartDate, 'yyyy-MM');
      const newData: CalendarData = {};

      Object.entries(data.data.score).forEach(([day, percent]) => {
        const paddedDay = day.padStart(2, '0');
        const fullDate = `${yearMonth}-${paddedDay}`;
        newData[fullDate] = percent as number;
      });
      setCaldendarList((prev) => ({ ...prev, ...newData }));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const yearMonth = format(activeStartDate, 'yyyy-MM');
    friendCalendarMutation.mutate({
      friendId: params.friendId,
      yearMonth: yearMonth,
      token: token,
    });
  }, [activeStartDate]);

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
    <div
      className={clsx(
        Position({ position: 'relative' }),
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
        <FriendCalendarBox handleOpen={handleOpen} friendId={params.friendId} />
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
        <FriendTodoTemplate
          handleClose={handleClose}
          type="friend"
          friendId={params.friendId}
        />
      </div>
      {isClicked && (
        <div
          className={clsx(Position({ position: 'absolute' }), 'tablet:hidden')}
        >
          <FriendTodoTemplate
            handleClose={handleClose}
            type="friend"
            friendId={params.friendId}
          />
        </div>
      )}
    </div>
  );
}
