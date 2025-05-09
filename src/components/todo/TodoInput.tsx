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
            <span className="text-xl text-green-500">✳️</span>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="할 일을 입력하세요."
              className="flex-1 text-base border-b border-gray-400 focus:outline-none placeholder:text-gray-400 text-black py-1"
            />
          </div>

          {/* 링크 입력 */}
          <div className="flex items-center gap-3">
            <span className="text-xl text-gray-600">🔗</span>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="링크를 입력하세요."
              className="flex-1 text-base border-b border-gray-400 focus:outline-none placeholder:text-gray-400 text-black py-1"
            />
          </div>
        </div>

        {/* 오른쪽 버튼 */}
        <div className="flex items-center">
          <button
            onClick={handleAdd}
            className="w-[60px] h-[60px] bg-gray-700 text-white text-sm rounded-md hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
