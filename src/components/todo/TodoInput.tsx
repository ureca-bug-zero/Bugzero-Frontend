import React, { useState } from 'react';
import { useTodoStore } from '@/store/todo';
import { useAuthStore } from '@/store/auth';
import { useCalendarStore } from '@/store/calendar';
import todo from '@/assets/todo-TodoInsert.png';
import todo_link from '@/assets/todo-link.png';

interface TodoInputProps {
  selectedDate: Date;
  readOnly?: boolean;
}

const TodoInput = ({ selectedDate, readOnly = false }: TodoInputProps) => {
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const addTodo = useTodoStore((s) => s.addTodo);
  const userId = useAuthStore((s) => s.user?.id);
  const triggerRefresh = useCalendarStore((s) => s.triggerRefresh);

  const handleAdd = async () => {
    if (!content.trim() || !userId) return;

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    await addTodo({
      content,
      link,
      date: dateStr,
      userId,
    });

    triggerRefresh();
    setContent('');
    setLink('');
  };

  return (
    <div
      className={`relative w-[360px] h-[60px] flex items-center gap-[24px] m-0 p-0 
        ${readOnly ? 'opacity-60 cursor-not-allowed group' : ''}`}
    >
      {/* 왼쪽 입력 영역 */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        <div className="flex items-center gap-5">
          <img src={todo} alt="할일 아이콘" className="w-[20.17px] h-[24px]" />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="할 일을 입력하세요."
            className="w-full text-sm font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
            disabled={readOnly}
          />
        </div>

        <div className="flex items-center gap-4">
          <img
            src={todo_link}
            alt="링크 아이콘"
            className="w-[22.42px] h-[10px]"
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="링크를 입력하세요."
            className="w-full text-sm font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
            disabled={readOnly}
          />
        </div>
      </div>

      {/* Add 버튼 */}
      <button
        onClick={readOnly ? undefined : handleAdd}
        disabled={readOnly}
        className={`w-[66px] h-[55px] bg-secondary-500 text-white text-[12px] font-medium font-inter rounded-md 
        ${
          readOnly
            ? 'cursor-not-allowed'
            : 'hover:opacity-80 transition-transform duration-200'
        }`}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
