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
    <div className="w-[360px] h-[60px] flex items-center gap-[24px] m-0 p-0">
      {/* 왼쪽: 입력 영역 */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* 할 일 입력 */}
        <div className="flex items-center gap-5">
          <img
            src="src/assets/todo-TodoInsert.png"
            alt="할일 아이콘"
            className="w-[20.17px] h-[24px]"
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="할 일을 입력하세요."
            className="w-full text-[12px] font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
          />
        </div>

        {/* 링크 입력 */}
        <div className="flex items-center gap-4">
          <img
            src="src/assets/todo-link.png"
            alt="링크 아이콘"
            className="w-[22.42px] h-[10px]"
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="링크를 입력하세요."
            className="w-full text-[12px] font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* 오른쪽: Add 버튼 */}
      <button
        onClick={handleAdd}
        className="w-[66px] h-[55px] bg-secondary-500 text-white text-[12px] font-medium font-inter rounded-md"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
