import CalendarBox from '../components/home/CalendarBox';
import TimerBox from '../components/home/TimerBox';

export default function Home() {
  return (
    <main>
      <CalendarBox />
      <TimerBox minutes={1}/>
    </main>
  );
}
