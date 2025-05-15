import CalendarBox from '../components/home/CalendarBox';
import FriendBox from '../components/home/FriendBox';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';

export default function HomePage() {
  return (
    <main>
      <CalendarBox />
      <TimerBox />
      <TodoTemplate />
      <FriendBox />
    </main>
  );
}
