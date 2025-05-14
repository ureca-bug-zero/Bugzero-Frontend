import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, memo, useCallback } from 'react';
import axios from '@/api/axios';
import calendarBtn from '@/assets/calendar-Btn.png';
interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

interface CalendarResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    score: Record<string, number>;
  };
}
// 한국 시간대로 변경
const getKSTDate = (date: Date) => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 9 * 60 * 60000);
};
// 백엔드 농도 퍼센트를 기반으로 RGBA 색상 생성 (투명도 조절 방식)
const getColorFromPercentage = (percentage: number) => {
  const baseColor = '26, 226, 115'; // #1AE273 in RGB
  const alpha = (percentage / 100).toFixed(2); // 0.0 ~ 1.0
  return `rgba(${baseColor}, ${alpha})`;
};

const StyledCalendar = styled(Calendar)`
  color: #333333;
  width: 277px !important;
  height: 378px !important;
  font-family: 'Pretendard', sans-serif;
  border: none;

  /* 네비게이션바 css 설정 */
  .react-calendar__navigation {
    display: flex; /* 플렉스 박스로 설정 */
    width: 148px;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  /* 네비게이션 레이블 */
  .react-calendar__navigation__label {
    width: 100px; /* 레이블 너비 조정 */
    text-align: center; /* 레이블 가운데 정렬 */
    flex-shrink: 0; /* 레이블이 축소되지 않도록 설정 */
  }
  .react-calendar__navigation button,
  .react-calendar__navigation__label__labelText,
  .react-calendar__navigation__label__labelText--from {
    &:hover,
    &:focus,
    &:active {
      background-color: transparent;
    }
  }
  .react-calendar__navigation__label__labelText {
    font-size: 19px;
    font-weight: 700;
  }

  /* 이전 버튼 */
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    width: auto;
    height: 28px;
    min-width: unset !important;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px 17px; /* 이미지 크기 조정 */
    border: none; /* 기본 버튼 테두리 제거 */
    font-size: 0; /* 텍스트 숨기기 */
    background-image: url(${calendarBtn}); /* 이미지 적용 */
    flex-grow: 1; /* 버튼들이 남은 공간을 차지하도록 설정 */
  }

  /* 다음 버튼 */
  .react-calendar__navigation__next-button {
    transform: rotate(180deg); /* 오른쪽 버튼은 이미지를 뒤집어서 사용 */
  }

  /* 일자 공간 gap */
  .react-calendar__month-view__days {
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
  }

  /* 일월화수목금토 영역*/
  .react-calendar__month-view__weekdays__weekday {
    margin-bottom: 7.7px;
  }
  /*  */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    border-bottom: none;
    font-weight: 500;
    font-size: 13px;
    padding: 8px 0;
  }

  /* 잔디 */
  .react-calendar__tile {
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 37px;
    height: 37px;
  }

  .react-calendar__tile abbr {
    position: relative;
    z-index: 2;
  }

  .react-calendar__tile--active {
    color: inherit !important;
    background-color: transparent !important;
  }

  .react-calendar__tile:active {
    color: inherit !important;
    background-color: transparent !important;
  }

  .react-calendar__tile:hover {
    background-color: transparent !important;
  }

  .react-calendar__tile:hover::before {
    content: '';
    position: absolute;
    width: 37px;
    height: 37px;
    background-color: #606060;
    opacity: 0.5;
    border-radius: 50%;
    z-index: 2;
  }
  /* 전체 글씨 색 */
  .react-calendar__tile.sunday abbr,
  .react-calendar__tile.saturday abbr {
    color: #333333;
  }
  .react-calendar__tile abbr {
    color: #333333;
  }
`;

const UserCalendar = ({ selectedDate, setSelectedDate }: Props) => {
  useEffect(() => {
    console.log('🟢 UserCalendar mounted');

    return () => {
      console.log('🔴 UserCalendar unmounted');
    };
  }, []);

  // 날짜를 "YYYY-MM-DD" 형식으로 변환
  // useCallback 사용하여 불필요한 함수 재생성을 방지
  const formatDateKey = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // selectedDate 기준으로 selectedKey 초기값 설정
  const [selectedKey, setSelectedKey] = useState(() =>
    formatDateKey(getKSTDate(selectedDate)),
  );
  const [percentageMap, setPercentageMap] = useState<Record<string, number>>(
    {},
  );
  const [prevYearMonth, setPrevYearMonth] = useState(''); //  이전 연-월 저장하고 변경시에만 달성률 조회

  const fetchCalendarData = async (yearMonthStr: string) => {
    try {
      const response = await axios.get<CalendarResponse>('/calendar', {
        params: { yearMonth: yearMonthStr },
      });

      const dayScores = response.data.data.score;

      const newMap = Object.entries(dayScores).reduce(
        (acc, [day, score]) => {
          const dayStr = String(day).padStart(2, '0');
          acc[`${yearMonthStr}-${dayStr}`] = score;
          return acc;
        },
        {} as Record<string, number>,
      );

      setPercentageMap(newMap);
    } catch (error) {
      console.log(error);
      console.error('캘린더 데이터 요청 실패:', error);
    }
  };

  useEffect(() => {
    const kstSelected = getKSTDate(selectedDate);
    const year = kstSelected.getFullYear();
    const month = String(kstSelected.getMonth() + 1).padStart(2, '0');
    const yearMonthStr = `${year}-${month}`;

    // 이전 연-월과 다를 때만 fetch
    if (yearMonthStr !== prevYearMonth) {
      fetchCalendarData(yearMonthStr);
      setPrevYearMonth(yearMonthStr); // 요청 후 이전 연-월 갱신
    }
  }, [selectedDate]); // selectedDate 변경 시 호출

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === 'month' && activeStartDate) {
      const kstDate = getKSTDate(activeStartDate);
      const newDate = new Date(
        `${kstDate.getFullYear()}-${String(kstDate.getMonth() + 1).padStart(2, '0')}-01`,
      );

      // 새로운 날짜와 기존 날짜가 다를 경우에만 상태를 변경
      if (newDate.getTime() !== selectedDate.getTime()) {
        setSelectedDate(newDate);
      }
    }
  };

  const selectedDateKo = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  return (
    <div className="relative flex flex-col items-center">
      {/* 이미지 추가 */}
      <div className="absolute right-[3px] top-[2px] w-[90px]">
        <img alt="Calendar Button" src="/src/assets/gradation.png" />
      </div>
      <StyledCalendar
        value={selectedDate}
        onChange={(value) => {
          if (value instanceof Date) {
            const kstDate = getKSTDate(value);
            const key = formatDateKey(kstDate);
            setSelectedDate(kstDate);
            setSelectedKey(key); // 선택된 날짜 키 설정
          }
        }}
        onActiveStartDateChange={handleActiveStartDateChange}
        calendarType="hebrew"
        locale="ko-KR" // 한글로 표시
        formatDay={(locale, date) => String(date.getDate())} //1일 -> 1
        next2Label={null}
        prev2Label={null}
        tileClassName={({ date }) => {
          const day = date.getDay(); // 0: 일요일, 6: 토요일
          if (day === 0) return 'sunday';
          if (day === 6) return 'saturday';
          return null;
        }}
        tileContent={({ date }) => {
          const kstDate = getKSTDate(date);
          const key = formatDateKey(kstDate);
          const percent = percentageMap[key];
          const isSelected = key === selectedKey;
          return (
            <>
              {percent !== undefined && (
                <div
                  style={{
                    width: 37,
                    height: 37,
                    borderRadius: '50%',
                    backgroundColor: getColorFromPercentage(percent),
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                />
              )}
              {isSelected && (
                <div
                  style={{
                    width: 37,
                    height: 37,
                    border: '2px dashed #333333',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    backgroundColor: 'transparent',
                  }}
                />
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default memo(UserCalendar);
