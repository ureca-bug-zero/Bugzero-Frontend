import Calendar from 'react-calendar';
import { format } from 'date-fns';
import rightIcon from '@/assets/icons/home/right-icon.svg';
import leftIcon from '@/assets/icons/home/left-icon.svg';

export default function CalendarBox() {
  return (
    <Calendar
      locale="ko"
      defaultView="month"
      formatShortWeekday={(locale, date) =>
        ['토', '일', '월', '화', '수', '목', '금'][date.getDay()]
      }
      formatDay={(locale, date) => format(date, 'd')}
      formatMonthYear={(locale, date) => format(date, 'yyyy년 M월')}
      nextLabel={<img src={rightIcon} alt="right" />}
      prevLabel={<img src={leftIcon} alt="left" />}
      next2Label={null}
      prev2Label={null}
    />
  );
}
