import Calendar from 'react-calendar';
import { format } from 'date-fns';
import rightIcon from '@/assets/icons/home/right-icon.svg';
import leftIcon from '@/assets/icons/home/left-icon.svg';
import clsx from 'clsx';
import { theme } from '../../styles/theme';
import { Flex, Position } from '../common/Wrapper';

export default function CalendarBox() {
  // useEffect(() => {
  //   Object.entries(opacityData).forEach(([dateStr, opacity]) => {
  //     const label = format(new Date(dateStr), 'yyyy년 M월 d일');
  //     const abbr = document.querySelector(
  //       `.react-calendar__tile abbr[aria-label="${label}"]`,
  //     ) as HTMLElement;

  //     if (abbr) {
  //       abbr.style.opacity = String(opacity);
  //     }
  //   });
  // }, [opacityData]);

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

  return (
    <>
      <div
        className={clsx(Position({ position: 'relative' }), 'w-[276.19781px]')}
      >
        <Calendar
          locale="ko"
          defaultView="month"
          calendarType="gregory"
          formatShortWeekday={(locale, date) =>
            ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
          }
          formatDay={(locale, date) => format(date, 'd')}
          formatMonthYear={(locale, date) => format(date, 'yyyy년 M월')}
          nextLabel={<img src={rightIcon} alt="right" />}
          prevLabel={<img src={leftIcon} alt="left" />}
          next2Label={null}
          prev2Label={null}
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
