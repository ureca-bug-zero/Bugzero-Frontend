// 개별 투두 항목

import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/todo';
import { useState, useRef, useEffect } from 'react';
import DropdownPortal from '@/components/common/DropdownPortal';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleCheck = useTodoStore((s) => s.toggleCheck);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0 });

  const handleEditSubmit = async () => {
    if (editContent.trim() && editContent !== todo.content) {
      await updateTodo(todo.id, { content: editContent });
    }
    setIsEditing(false); // 무조건 실행되도록 조건문 바깥에 둠
  };

  // 메뉴 위치 계산
  useEffect(() => {
    if (menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [menuOpen]);

  return (
    <div className="relative flex justify-between items-center w-full max-w-[360px] h-[45px] bg-white rounded-[10px] px-[12px] py-[10px]">
      {/* 왼쪽 체크박스 + 텍스트 */}
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={todo.isChecked}
          onChange={() => toggleCheck(todo.id)}
          className="w-5 h-5 accent-gray-700 cursor-pointer"
        />
        {isEditing ? (
          <input
            className="w-full text-base border-b border-gray-300 focus:outline-none"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSubmit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            autoFocus
          />
        ) : todo.link ? (
          <a
            href={
              todo.link.startsWith('http') ? todo.link : `https://${todo.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`text-base font-medium ${
              todo.isChecked ? 'line-through text-gray-400' : 'black underline'
            }`}
          >
            {todo.content}
          </a>
        ) : (
          <span
            className={`text-base ${
              todo.isChecked ? 'line-through text-gray-400' : 'text-gray-900'
            }`}
          >
            {todo.content}
          </span>
        )}
      </div>

      {/* 오른쪽: 메뉴 버튼 */}
      {!todo.isMission && (
        <div className="relative ml-[12px]">
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1 hover:opacity-80"
          >
            <img
              src="src/assets/todo-Menu Vertical.png"
              alt="메뉴"
              className="w-[25px] h-[25px]"
            />
          </button>

          {/* Portal로 분리된 메뉴 */}
          {menuOpen && (
            <DropdownPortal>
              <div
                className="absolute w-[100px] bg-white border rounded-[10px] shadow z-[9999] text-base overflow-hidden"
                style={{
                  position: 'absolute',
                  top: `${menuStyle.top}px`,
                  left: `${menuStyle.left - 60}px`, // 버튼 기준 위치 보정
                }}
              >
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 border-b text-center hover:bg-gray-100"
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    removeTodo(todo.id);
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-center text-red-500 hover:bg-gray-100"
                >
                  삭제
                </button>
              </div>
            </DropdownPortal>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
