import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

// 백엔드 농도 퍼센트를 기반으로 RGBA 색상 생성 (투명도 조절 방식)
const getColorFromPercentage = (percentage) => {
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

const UserCalendar = ({ percentageMap }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateKey = (date) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);
    return localDate.toISOString().split('T')[0];
  };

  const selectedKey = formatDateKey(selectedDate);
  const selectedDateKo = selectedDate.toLocaleDateString('ko-KR'); // 한국식 날짜 문자열

  return (
    <div>
      <StyledCalendar
        value={selectedDate}
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value);
          }
        }}
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
              {percent && (
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
                    pointerEvents: 'none',
                  }}
                />
              )}
              {isSelected && (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '2px solid #333333',
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
      <p>{selectedDateKo}</p> {/* 클릭 날짜 (처음에는 오늘 날짜) */}
    </div>
  );
};

export default UserCalendar;
