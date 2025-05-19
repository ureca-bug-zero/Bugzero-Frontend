import { useEffect, useState } from 'react';
import TodoList from '@/components/todo/TodoList';
import axios from '@/api/axios';
import { Todo } from '@/types/todo';

interface Props {
  friendId: number;
  selectedDate: Date;
}

interface UserTodoResponse {
  success: boolean;
  code: string;
  message: string;
  data: Todo[];
}

const FriendTodoPanel = ({ friendId, selectedDate }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const dateString = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

    axios
      .get<UserTodoResponse>(`/friend/todolist/${friendId}?date=${dateString}`)
      .then((res) => setTodos(res.data.data))
      .catch(() => setTodos([]));
  }, [friendId, selectedDate]);

  const missionTodos = todos.filter((t) => t.isMission);
  const normalTodos = todos.filter((t) => !t.isMission);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[360px] flex flex-col">
        <h2 className="text-[32px] font-semibold text-secondary-600 font-inter text-left">
          Todo-List
        </h2>

        {/* 미션 Todo 고정 */}
        {missionTodos.length > 0 && (
          <div className="mt-[48px] mb-[10px]">
            <TodoList
              todos={missionTodos}
              selectedDate={selectedDate}
              readOnly
            />
          </div>
        )}

        {/* 일반 Todo 스크롤 */}
        <div className="max-h-[275px] overflow-y-auto w-full">
          <TodoList todos={normalTodos} selectedDate={selectedDate} readOnly />
        </div>
      </div>
    </div>
  );
};

export default FriendTodoPanel;
