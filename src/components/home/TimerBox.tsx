import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Flex, Position } from "../common/Wrapper";
import { theme } from "../../styles/theme";

export default function TimerBox() {
  const totalSecondsRef = useRef<number>(0); //처음에 입력받는 시간
  const [isStart, setIsStart] = useState<boolean>(false); //입력을 받았는가
  const [time, setTime] = useState<string>('00:00'); //분 단위로 입력 
  const [seconds, setSeconds] = useState<number>(0); //초 단위로 변경
  const startTimeRef = useRef<number | null>(null); //Timer 시작 기준 
  const rafRef = useRef<number | null>(null);

  const convertToSeconds = (timeStr: string): number => {
    const [mm, ss] = timeStr.split(':').map(Number);
    return mm * 60 + ss;
  }

  const ConvertToStr = (seconds: number) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  useEffect(() => {
    totalSecondsRef.current = convertToSeconds(time);
    setSeconds(totalSecondsRef.current);
    startTimeRef.current = Date.now();

    const updateTimer = () => {
      if (!startTimeRef.current) return;
      const now = Date.now(); //지금 현재(ms 단위)
      const elapsed = Math.floor((now - startTimeRef.current) / 1000); //second 단위로 변경
      const updatedTime = totalSecondsRef.current - elapsed;

      if (updatedTime >= 0) {
        setSeconds(updatedTime);
        setTime(ConvertToStr(updatedTime));
        rafRef.current = requestAnimationFrame(updateTimer);
      } else {
        setSeconds(0);
        cancelAnimationFrame(rafRef.current!); //다시 실행하는 것을 막음
      }
    };

    //타이머 시작
    rafRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current); //cleanup
    };
  }, [isStart]);

  return (
    <div className={clsx(Flex({ gap: 'gap-[24px]' }))}>
      <div className={clsx(Position({ position: 'relative' }), 'w-[200px] h-[6px] rounded-[30px]', theme.bgPalette.Gray3)}>
        <div className={clsx(Position({ position: 'relative' }), 'h-[6px] rounded-[30px]', theme.bgPalette.Primary)} style={{ width: `${time == '00:00' ? 0 : (seconds / totalSecondsRef.current) * 200}px`}} />
      </div>
      <input className={clsx(theme.typo.Heading6)} value={time} onChange={(e) => { setTime(e.target.value); setIsStart(false); }} onKeyDown={(e) => {if (e.key == 'Enter') setIsStart(true);}} />
    </div>
  )
}
