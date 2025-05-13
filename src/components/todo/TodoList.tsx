// 투두 목록 전체

import { useTodoStore } from '@/store/todo';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useTodoStore((s) => s.todos);

  const missionTodo = todos.find((t) => t.isMission);
  const normalTodos = todos.filter((t) => !t.isMission);

  return (
    <ul className="flex flex-col items-center">
      {/* 🎯 오늘의 미션 */}
      <li className="w-[360px] h-[70px] mb-[10px]">
        {missionTodo ? (
          <div className="w-full h-full overflow-hidden border border-[#1AE273] bg-[#DAFAE8] rounded-[10px] flex items-center px-4">
            <TodoItem todo={missionTodo} />
          </div>
        ) : (
          <div className="w-full h-full overflow-hidden border border-[#1AE273] bg-[#DAFAE8] rounded-[10px] flex items-center justify-center px-4">
            <span className="text-sm font-bold text-secondary-600">
              오늘의 미션을 불러오는 중...
            </span>
          </div>
        )}
      </li>

      {/* 일반 투두 리스트 */}
      {normalTodos.map((todo) => (
        <li key={todo.id} className="w-[360px]">
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
