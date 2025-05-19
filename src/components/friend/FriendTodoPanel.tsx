import { useEffect, useState } from 'react';
import TodoList from '@/components/todo/TodoList';
import TodoInput from '@/components/todo/TodoInput';
import axios from '@/api/axios';
import { Todo, UserTodoResponse } from '@/types/todo';

interface Props {
  friendId: number;
  selectedDate: Date;
}

const FriendTodoPanel = ({ friendId, selectedDate }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // ✅ 친구 Todo 불러오기
  useEffect(() => {
    const dateString = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

    axios
      .get<UserTodoResponse>(`/friend/todolist/${friendId}?date=${dateString}`)
      .then((res) => {
        const converted = res.data.data.map((todoFromApi) => ({
          ...todoFromApi,
          isChecked: todoFromApi.checked,
          isMission: todoFromApi.mission,
        }));
        setTodos(converted);
      })
      .catch(() => setTodos([]));
  }, [friendId, selectedDate]);

  // ✅ 마우스 진입 시 툴팁 표시 + 위치 추적
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-[360px] flex flex-col">
        <h2 className="text-[32px] font-semibold text-secondary-600 font-inter text-left">
          Todo-List
        </h2>

        {/* ✅ 입력창 + 툴팁 */}
        <div
          className="mt-[36px] w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <TodoInput selectedDate={selectedDate} readOnly />
        </div>

        {/* ✅ 툴팁 메시지 - 마우스 근처에 표시 */}
        {showTooltip && (
          <div
            className="fixed bg-gray-700 text-white text-xs rounded-md px-3 py-1 pointer-events-none z-50 whitespace-nowrap"
            style={{
              top: tooltipPos.y - 40,
              left: tooltipPos.x,
              transform: 'translateX(-50%)',
            }}
          >
            친구의 투두는 수정할 수 없어요!
          </div>
        )}

        {/* ✅ Todo 리스트 */}
        <div className="mt-[48px] max-h-[345px] overflow-y-auto hide-scrollbar w-full max-w-[360px]">
          <TodoList todos={todos} selectedDate={selectedDate} readOnly />
        </div>
      </div>
    </div>
  );
};

export default FriendTodoPanel;
