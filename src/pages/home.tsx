import CalendarBox from '../components/home/CalendarBox';
import FriendItem from '../components/home/FriendItem';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';

export default function Home() {
  return (
    <main>
      <CalendarBox />
      <TimerBox />
      <TodoTemplate />
      <FriendItem email='shtnwls1111@naver.com' name='노수진'/>
    </main>
  );
}
