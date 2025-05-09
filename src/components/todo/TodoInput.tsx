// 할 일 입력창

import React, { useState } from 'react';
import { useTodoStore } from '@/store/todo';

const TodoInput = () => {
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const addTodo = useTodoStore((s) => s.addTodo);

  const handleAdd = () => {
    if (!content.trim()) return;

    addTodo({
      content,
      link,
      date: new Date().toISOString().split('T')[0],
      isMission: false,
      userId: 1,
    });

    setContent('');
    setLink('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md px-6 py-4 w-full">
      <div className="flex gap-4 items-stretch">
        {/* 왼쪽: 투두 + 링크 인풋 */}
        <div className="flex flex-col flex-1 justify-between gap-4">
          {/* 할 일 입력 */}
          <div className="flex items-center gap-3">
            <img
              src="src\assets\todo-TodoInsert.png"
              alt="할일 아이콘"
              className="w-[20.17px] h-[24px]"
            />
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="할 일을 입력하세요."
              className="w-[232px] text-[12px] font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
            />
          </div>

          {/* 링크 입력 */}
          <div className="flex items-center gap-3">
            <img
              src="src\assets\todo-link.png"
              alt="링크 아이콘"
              className="w-[22.42px] h-[10px]"
            />
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="링크를 입력하세요."
              className="w-[232px] text-[12px] font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* 오른쪽 버튼 */}
        <div className="flex items-center">
          <button
            onClick={handleAdd}
            className="w-[66px] h-[55px] bg-secondary-500 text-[12px] font-medium text-white font-inter rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
