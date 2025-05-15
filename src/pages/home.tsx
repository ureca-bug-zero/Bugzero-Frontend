import CalendarBox from '../components/home/CalendarBox';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';

export default function Home() {
  return (
    <main>
      <CalendarBox />
      <TimerBox />
      <TodoTemplate/>
    </main>
  );
}
