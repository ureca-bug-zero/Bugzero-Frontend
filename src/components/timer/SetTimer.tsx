// 타이머 UI 및 제어
import React, { useEffect } from 'react';

const SetTimer: React.FC = () => {
  useEffect(() => {
    console.log('🟢 right!!! mounted');

    return () => {
      console.log('🔴 right!!!! unmounted');
    };
  }, []);
  return (
    <div>
      <h2>Timer Panel</h2>
      <p>타이머 기능 관련 UI가 들어갈 자리!</p>
    </div>
  );
};

export default SetTimer;
