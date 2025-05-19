import Calendar from 'react-calendar';
import { format } from 'date-fns';
import rightIcon from '@/assets/icons/home/right-icon.svg';
import leftIcon from '@/assets/icons/home/left-icon.svg';
import clsx from 'clsx';
import { theme } from '../../styles/theme';
import { Flex, Position } from '../common/Wrapper';
import { useMutation } from '@tanstack/react-query';
import { calendar } from '../../apis/home';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { CalendarData } from '../../types/home';
import { useDateStore } from '../../store/dateStore';

interface ModalTemplateProps {
  handleOpen: () => void;
  friendId: string | undefined;
}

export default function FriendCalendarBox({
  handleOpen,
  friendId,
}: ModalTemplateProps) {
  const token = useUserStore((state) => state.token);
  const [calendarList, setCaldendarList] = useState<CalendarData>({});
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  /* 날짜마다 다른 opacity*/
  const calendarMutation = useMutation({
    mutationFn: calendar,
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
    calendarMutation.mutate({ yearMonth: yearMonth, token: token });
  }, [activeStartDate]);

  const tileClassName = ({ date }: { date: Date }) => {
    const key = format(date, 'yyyy-MM-dd');
    const percent = Math.round(calendarList[key] / 10);

    if (typeof percent === 'number') {
      return `bg-opacity-${percent}`;
    }
  };

  /* 색상 보여주는 표 */
  const circle = clsx(
    theme.bgPalette.Primary,
    'w-[15px] h-[15px] rounded-full',
  );

  const CircleList = () => {
    return (
      <div
        className={clsx(
          Flex({ direction: 'rowReverse', gap: 'gap-[3px]' }),
          'w-[93px] h-[37px]',
        )}
      >
        {/*_ : 요소 안 쓰니까 무시*/}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={circle} style={{ opacity: (i + 1) * 0.2 }} />
        ))}
      </div>
    );
  };

  /*날짜 선택 시, 해당 날짜의 todoList 나올 수 있도록 전역상태 관리하는 날짜*/
  const handleDate = (date: Date) => {
    setSelectedDate(format(date, 'yyyy-MM-dd'));
    handleOpen();
  };

  return (
    <>
      <div
        className={clsx(
          Position({ position: 'relative' }),
          'w-[276.19781px] h-[384.551px]',
        )}
      >
        <Calendar
          locale="ko"
          defaultView="month"
          onClickDay={handleDate}
          calendarType="gregory"
          formatShortWeekday={(_, date) =>
            ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
          }
          formatDay={(_, date) => format(date, 'd')}
          formatMonthYear={(_, date) => format(date, 'yyyy년 M월')}
          nextLabel={<img src={rightIcon} alt="right" />}
          prevLabel={<img src={leftIcon} alt="left" />}
          next2Label={null}
          prev2Label={null}
          onActiveStartDateChange={({ activeStartDate }) => {
            //Month바뀔때마다 진행
            if (activeStartDate) {
              setActiveStartDate(activeStartDate);
            }
          }}
          tileClassName={tileClassName}
        />
        <div
          className={clsx(Position({ position: 'absolute' }), 'right-0 top-0')}
        >
          <CircleList />
        </div>
      </div>
    </>
  );
}
