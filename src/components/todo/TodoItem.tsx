// 개별 투두 항목

import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/todo';
import { useState } from 'react';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCheck = useTodoStore((s) => s.toggleCheck);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);

  const handleEditSubmit = () => {
    if (editContent.trim() && editContent !== todo.content) {
      updateTodo(todo.id, { content: editContent });
    }
    setIsEditing(false);
  };

  return (
    <div className="relative flex justify-between items-center w-full max-w-[360px] h-[45px] bg-white rounded-[10px] border border-gray-200 px-[12px] py-[10px]">
      {/* 왼쪽: 체크박스 + 텍스트 */}
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
        ) : (
          <div className="flex flex-col">
            <span
              className={`text-base ${
                todo.isChecked ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
            >
              {todo.content}
            </span>

            {todo.link && (
              <a
                href={todo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline mt-0.5"
              >
                {todo.link}
              </a>
            )}
          </div>
        )}
      </div>

      {/* ⋮ 더보기 메뉴 */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-lg px-2 text-gray-500 hover:text-gray-700"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-[100px] bg-white border rounded-[10px] shadow z-10 text-base overflow-hidden">
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
        )}
      </div>
    </div>
  );
};

export default TodoItem;
