// 투두 입력 + 리스트

import { useEffect } from 'react';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';
import { useTodoStore } from '@/store/todo';
import { useAuthStore } from '@/store/auth';

interface Props {
  selectedDate: Date;
}

const TodoPanel = ({ selectedDate }: Props) => {
  useEffect(() => {
    console.log('🎇 todo!!! mounted');

    return () => {
      console.log('🎇 todo!!!! unmounted');
    };
  }, []);

  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const todos = useTodoStore((s) => s.todos) || [];
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) return; // user 객체가 아직 안 들어왔으면 아무것도 안 함
    const dateString = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    fetchTodos(user.id, dateString);
  }, [selectedDate, fetchTodos, user]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[360px] flex flex-col">
        {/* 제목 */}
        <h2 className="text-[32px] font-semibold text-secondary-600 font-inter text-left">
          Todo-List
        </h2>

        {/* 입력창 */}
        <div className="mt-[36px]">
          <TodoInput />
        </div>

        {/* 리스트 */}
        <div className="mt-[48px] max-h-[400px] overflow-y-auto hide-scrollbar w-full max-w-[360px]">
          <TodoList selectedDate={selectedDate} todos={todos} />
        </div>
      </div>
    </div>
  );
};

export default TodoPanel;
