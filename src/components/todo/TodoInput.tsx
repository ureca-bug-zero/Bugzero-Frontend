// 할 일 입력창

import React, { useState } from 'react';
import { useTodoStore } from '@/store/todo';
import { useAuthStore } from '@/store/auth';
import { useCalendarStore } from '@/store/calendar';

const TodoInput = ({ selectedDate }: { selectedDate: Date }) => {
  // 캘린더 선택 날짜 받아오기
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const addTodo = useTodoStore((s) => s.addTodo);
  const userId = useAuthStore((s) => s.user?.id); // 또는 s.user?.userId: 로그인된 사용자 ID 가져오기
  const triggerRefresh = useCalendarStore((s) => s.triggerRefresh); // 캘린더 새로고침 트리거 함수

  const handleAdd = async () => {
    if (!content.trim() || !userId) return;

    // 캘린더에서 선택된 날짜(한국시간대)를 지정 포맷으로 변경
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    await addTodo({
      content,
      link,
      date: dateStr, //캘린더에서 받아온 날짜
      userId,
    });
    console.log(addTodo);
    console.log(dateStr);
    triggerRefresh(); //투두 상태 변화(추가) 시 캘린더 새로고침
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
            className="w-full text-sm font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
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
            className="w-full text-sm font-medium font-pretendard text-secondary-500 placeholder:text-secondary-500 border-b border-gray-500 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* 오른쪽: Add 버튼 */}
      <button
        onClick={handleAdd}
        className="w-[66px] h-[55px] bg-[#212121] text-white text-[12px] font-medium font-inter rounded-md transition-colors duration-200 hover:bg-[#606060]"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
