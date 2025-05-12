// 투두 입력 + 리스트

// src/components/panels/TodoPanel.tsx

import React from 'react';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';

const TodoPanel: React.FC = () => {
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
        <div className="mt-4 overflow-y-auto max-h-[400px] pr-1 hide-scrollbar">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoPanel;
