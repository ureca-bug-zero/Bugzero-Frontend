// // 캘린더 UI (달성 날짜 표시)
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

// 농도 퍼센트를 기반으로 RGBA 색상 생성 (투명도 조절 방식)
const getColorFromPercentage = (percentage) => {
  const baseColor = '26, 226, 115'; // #1AE273 in RGB
  const alpha = (percentage / 100).toFixed(2); // 0.0 ~ 1.0
  return `rgba(${baseColor}, ${alpha})`;
};

// StyledCalendar은 캘린더 전체 스타일 조정용 (선택 사항)
const StyledCalendar = styled(Calendar)`
  border: none;
  font-family: 'pretendard', sans-serif;

  .react-calendar__tile {
    height: 50px;
    position: relative;
    background: none;
  }

  .react-calendar__tile abbr {
    position: relative;
    z-index: 2;
  }
  .react-calendar__tile--active {
    border-radius: 50%;
    border: 2px solid #007bff; /* 원하는 색상 */
    background-color: transparent; /* 배경을 투명하게 */
  }

  .react-calendar__tile {
    border: none; /* 기본 테두리 제거 */
  }

  .react-calendar__tile:active {
    border-radius: 50%;
    border: 2px solid #007bff; /* 원하는 색상 */
    background-color: transparent; /* 배경을 투명하게 */
  }
`;

const UserCalendar = ({ percentageMap }) => {
  return (
    <StyledCalendar
      calendarType="hebrew"
      locale="en-US"
      next2Label={null}
      prev2Label={null}
      tileContent={({ date }) => {
        const key = date.toISOString().split('T')[0];
        const percent = percentageMap[key];
        if (!percent) return null;

        const color = getColorFromPercentage(percent);

        return (
          // 동그라미 그리기
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: color,
              border: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          />
        );
      }}
    />
  );
};

export default UserCalendar;
