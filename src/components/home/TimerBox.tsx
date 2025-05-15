import moment from "moment";
import { useEffect, useRef, useState } from "react";

interface TimerProps{
  minutes: number; //분 단위로 입력
}

export default function TimerBox({minutes}: TimerProps) {
  const [seconds, setSeconds] = useState<number>(minutes * 60); //초 단위로 변경
  const startTimeRef = useRef<number | null>(null); //Timer 시작 기준 
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const updateTimer = () => {
      if (!startTimeRef.current) return;
      const now = Date.now(); //지금 현재(ms 단위)
      const elapsed = Math.floor((now - startTimeRef.current) / 1000); //second 단위로 변경
      const updatedTime = minutes * 60 - elapsed;

      if (updatedTime > 0) {
        setSeconds(updatedTime);
        rafRef.current = requestAnimationFrame(updateTimer);
      } else {
        setSeconds(0);
        cancelAnimationFrame(rafRef.current!); //다시 실행하는 것을 막음
      }
    };
    rafRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current); //cleanup 함수
    }
  }, [minutes]);

  return (
    <div>
      {moment.utc(seconds * 1000).format('mm:ss')}
    </div>
  )
}
