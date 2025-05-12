import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';

interface CalendarResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    score: Record<string, number>;
  };
}

// 백엔드 농도 퍼센트를 기반으로 RGBA 색상 생성 (투명도 조절 방식)
const getColorFromPercentage = (percentage: number) => {
  const baseColor = '26, 226, 115'; // #1AE273 in RGB
  const alpha = (percentage / 100).toFixed(2); // 0.0 ~ 1.0
  return `rgba(${baseColor}, ${alpha})`;
};

const StyledCalendar = styled(Calendar)`
  border: none;

  .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 50px;
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
    background-color: transparent;
  }

  .react-calendar__tile:hover::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #606060;
    opacity: 0.5;
    border-radius: 50%;
    z-index: 0;
  }
`;

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [percentageMap, setPercentageMap] = useState<Record<string, number>>(
    {},
  );
  const [selectedKey, setSelectedKey] = useState<string>(''); // 선택된 날짜 키

  // 날짜를 "YYYY-MM-DD" 형식으로 변환
  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const yearMonthStr = `${year}-${month}`;
    fetchCalendarData(yearMonthStr);
  }, [selectedDate]); // 의존성 배열에 `selectedDate`만 포함

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === 'month' && activeStartDate) {
      const newDate = new Date(
        `${activeStartDate.getFullYear()}-${String(activeStartDate.getMonth() + 1).padStart(2, '0')}-01`,
      );

      // 새로운 날짜와 기존 날짜가 다를 경우에만 상태를 변경
      if (newDate.getTime() !== selectedDate.getTime()) {
        setSelectedDate(newDate);
      }
    }
  };

  const selectedDateKo = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`; // 한글 형식으로 변환

  return (
    <div>
      <StyledCalendar
        value={selectedDate}
        onChange={(value) => {
          if (value instanceof Date) {
            const key = formatDateKey(value);
            setSelectedDate(value);
            setSelectedKey(key); // 선택된 날짜 키 설정
          }
        }}
        onActiveStartDateChange={handleActiveStartDateChange} // 변경된 부분
        calendarType="hebrew"
        locale="en-US"
        next2Label={null}
        prev2Label={null}
        tileContent={({ date }) => {
          const key = formatDateKey(date);
          const percent = percentageMap[key];
          const isSelected = key === selectedKey;

          return (
            <>
              {percent !== undefined && (
                <div
                  style={{
                    width: 40,
                    height: 40,
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
                    width: 40,
                    height: 40,
                    border: '2px solid #333333',
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
      <p>{selectedDateKo}</p> {/* 클릭한 날짜를 한글 형식으로 출력 */}
    </div>
  );
};

export default UserCalendar;
