import React, { useEffect, useRef, useState } from 'react';

const SetTimer = () => {
  const [duration, setDuration] = useState(0); // 전체 시간 (초)
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('00:00');
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부
  const inputRef = useRef<HTMLInputElement>(null);

  // 타이머 작동
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      setIsRunning(false); // 시간 다 흐르면 자동 멈춤
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSetTime = () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(inputValue)) {
      alert('잘못된 시간 형식입니다. 예: 05:30');
      setIsEditing(false);
      return;
    }

    const [minStr, secStr] = inputValue.split(':');
    const minutes = parseInt(minStr, 10);
    const seconds = parseInt(secStr, 10);

    if (
      isNaN(minutes) ||
      isNaN(seconds) ||
      minutes < 0 ||
      seconds < 0 ||
      seconds >= 60
    ) {
      alert('시간은 00:01 ~ 59:59 범위여야 하며, 초는 60 미만이어야 합니다.');
      setIsEditing(false);
      return;
    }

    const total = minutes * 60 + seconds;

    if (total <= 0) {
      alert('0초 이상의 시간을 입력해주세요.');
      setIsEditing(false);
      return;
    }

    setDuration(total);
    setTimeLeft(total);
    setIsRunning(true); // ✅ 시간 설정과 동시에 타이머 시작
    setIsEditing(false);
  };

  const formatTime = (seconds: number) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const progress = duration > 0 ? (timeLeft / duration) * 100 : 0;

  const handlePlayPause = () => {
    if (timeLeft > 0) {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = () => {
    setTimeLeft(0);
    setDuration(0);
    setIsRunning(false);
    setInputValue('00:00');
  };

  return (
    <div className="w-[360px] flex flex-col mb-[80px]">
      <h2 className="text-[32px] font-semibold text-secondary-600 font-inter text-left">
        Set Timer
      </h2>

      {/* 타이머 영역 (게이지 + 시간 + 버튼) */}
      <div className="mt-[55px] flex items-center justify-between gap-4">
        {/* 게이지 바 + 시간 */}
        <div className="flex items-center gap-6">
          <div className="relative w-[200px] h-[6px] rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-[1000ms] ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 시간 입력 or 텍스트 */}
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

        {/* 컨트롤 버튼 */}
        <div className="flex gap-3 items-center">
          <button
            onClick={handlePlayPause}
            className="hover:opacity-80 hover:scale-110 transition-transform duration-150"
          >
            <img
              src={isRunning ? 'src/assets/pause.png' : 'src/assets/play.png'}
              alt="Play/Pause"
              className={isRunning ? 'w-[16px] h-[16px]' : 'w-[14px] h-[14px]'}
            />
          </button>
          <button
            onClick={handleReset}
            className="hover:opacity-80 hover:scale-110 transition-transform duration-150 -translate-y-[1px]"
          >
            <img
              src="src/assets/arrow-repeat.png"
              alt="Reset"
              className="w-[16px] h-[16px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetTimer;
