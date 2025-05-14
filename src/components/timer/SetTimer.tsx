import React, { useEffect, useRef, useState } from 'react';

const SetTimer = () => {
  const [duration, setDuration] = useState(0); // 전체 시간 (초)
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('00:00');
  const inputRef = useRef<HTMLInputElement>(null);

  // 타이머 작동
  useEffect(() => {
    if (timeLeft <= 0 || isEditing) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isEditing]);

  const handleSetTime = () => {
    const [minStr, secStr] = inputValue.split(':');
    const minutes = parseInt(minStr, 10);
    const seconds = parseInt(secStr, 10);
    const total = minutes * 60 + seconds;

    if (!isNaN(total) && total > 0) {
      setDuration(total);
      setTimeLeft(total);
    }
    setIsEditing(false);
  };

  const formatTime = (seconds: number) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const progress = duration > 0 ? (timeLeft / duration) * 100 : 0;

  return (
    <div className="w-[360px] flex flex-col mb-[70px]">
      {/* ✅ 타이틀 스타일 (Todo-List와 동일) */}
      <h2 className="text-[32px] font-semibold text-secondary-600 font-inter text-left">
        Set Timer
      </h2>

      {/* ✅ 타이틀과 내용 사이 간격 (Todo와 동일) */}
      <div className="mt-[64px] flex items-center gap-2">
        {/* 게이지 바 */}
        <div className="relative w-[200px] h-[6px] rounded-full bg-gray-200 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-[1000ms] ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 시간 텍스트 or 입력 */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSetTime();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            onBlur={handleSetTime}
            className="w-[60px] text-right border-b border-black text-[16px] font-semibold text-black focus:outline-none"
            placeholder="00:00"
            autoFocus
          />
        ) : (
          <span
            onClick={() => {
              setIsEditing(true);
              setInputValue(formatTime(timeLeft || duration));
            }}
            className="text-[16px] font-semibold text-black cursor-pointer select-none"
          >
            {formatTime(timeLeft || 0)}
          </span>
        )}
      </div>
    </div>
  );
};

export default SetTimer;
