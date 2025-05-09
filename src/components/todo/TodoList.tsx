// 투두 목록 전체

import { useTodoStore } from '@/store/todo';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useTodoStore((s) => s.todos);

  const missionTodo = todos.find((t) => t.isMission);
  const normalTodos = todos.filter((t) => !t.isMission);

  return (
    <ul className="flex flex-col gap-2">
      {missionTodo && (
        <li className="border border-green-400 bg-green-50 rounded p-3">
          <div className="text-sm font-bold text-green-700 mb-1">
            🎯 오늘의 미션
          </div>
          <TodoItem todo={missionTodo} />
        </li>
      )}
      {normalTodos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
