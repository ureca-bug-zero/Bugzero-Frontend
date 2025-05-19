import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import CustomToast from '@/components/common/CustomTimerToast'; // 경로는 실제 위치에 맞게 수정
import Lottie from 'lottie-react';
import completeAnimation from '@/assets/complete.json';
import play from '@/assets/play.png';
import pause from '@/assets/pause.png';

const SetTimer = () => {
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('00:00');
  const [isRunning, setIsRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showAnimation, setShowAnimation] = useState(false); //애니메이션 상태관리
  // timeLeft, duration, isEditing가 변할 때 애니메이션 상태 제어
  useEffect(() => {
    if (timeLeft === 0 && duration > 0 && !isEditing) {
      setShowAnimation(true);
    }
  }, [timeLeft, duration, isEditing]);

  // showAnimation이 true 되면 3초 후 false로 변경
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  // 타이머 작동
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (isRunning && timeLeft <= 0) {
        toast.success(
          () => (
            <CustomToast type="success" message={`시간이 모두 지났어요!`} />
          ),
          { autoClose: 2000 },
        );
      }
      setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSetTime = () => {
    const timeRegex = /^\d{1,3}:\d{1,2}$/;
    if (!timeRegex.test(inputValue)) {
      toast.error(
        () => (
          <CustomToast
            type="error"
            message={`잘못된 시간 형식입니다.\n예: 05: 30 또는 123: 45`}
          />
        ),
        { autoClose: 2000 },
      );
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
      toast.error(
        () => (
          <CustomToast
            type="error"
            message={`시간은 00:01 ~ xxx:59 범위여야 하며,\n 초는 60 미만이어야 합니다.`}
          />
        ),
        { autoClose: 2000 },
      );
      setIsEditing(false);
      return;
    }

    const total = minutes * 60 + seconds;

    if (total <= 0) {
      toast.error(
        () => (
          <CustomToast
            type="error"
            message={`0초 이상의 시간을 입력해주세요.`}
          />
        ),
        { autoClose: 2000 },
      );
      setIsEditing(false);
      return;
    }

    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    setInputValue(formatted);
    setDuration(total);
    setTimeLeft(total);
    setIsRunning(true);
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

      <div className="mt-[55px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="relative w-[200px] h-[6px] rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-[1000ms] ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

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
          {showAnimation && (
            <div className="fixed bottom-[80px] left-1/2 transform -translate-x-1/2 z-50">
              <div className="w-[120px] h-[120px]">
                <Lottie animationData={completeAnimation} loop={true} />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={handlePlayPause}
            className="hover:opacity-80 hover:scale-110 transition-transform duration-150"
          >
            <img
              src={isRunning ? pause : play}
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
