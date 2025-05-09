// 투두 입력 + 리스트
import React from 'react';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';

const TodoPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Todo-List</h2>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default TodoPanel;
