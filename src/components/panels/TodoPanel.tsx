// 투두 입력 + 리스트
import React from 'react';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';

const TodoPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default TodoPanel;
