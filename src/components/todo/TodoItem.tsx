import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/todo';
import { useState, useRef, useEffect } from 'react';
import DropdownPortal from '@/components/common/DropdownPortal';
import { useCalendarStore } from '@/store/calendar';
import menuVertical from '@/assets/todo-Menu Vertical.png';

interface Props {
  todo: Todo;
  readOnly?: boolean;
}

const TodoItem = ({ todo, readOnly = false }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);
  const [editLink, setEditLink] = useState(todo.link ?? '');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCheck = useTodoStore((s) => s.toggleCheck);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0 });
  const triggerRefresh = useCalendarStore((s) => s.triggerRefresh);

  const handleEditSubmit = async () => {
    const trimmedContent = editContent.trim();
    const trimmedLink = editLink.trim();
    setIsEditing(false);

    if (
      (trimmedContent && trimmedContent !== todo.content) ||
      trimmedLink !== (todo.link ?? '')
    ) {
      await updateTodo(todo.id, {
        content: trimmedContent,
        link: trimmedLink || undefined,
      });
    }
  };

  // 수정 모드에서 외부 클릭 시 자동 저장
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isEditing &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleEditSubmit();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing, editContent, editLink]);

  // 메뉴 열릴 때 위치 계산
  useEffect(() => {
    if (menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [menuOpen]);

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuOpen &&
        !containerRef.current?.contains(target) &&
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  return (
    <div
      className="relative flex justify-between items-start w-full max-w-[360px] rounded-[10px] px-[12px] py-[10px]"
      ref={containerRef}
    >
      {/* 왼쪽 체크박스 + 텍스트 */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.isChecked}
            onChange={async () => {
              if (readOnly) return;
              await toggleCheck(todo.id);
              triggerRefresh();
            }}
            className="w-5 h-5 accent-gray-700 cursor-pointer"
            disabled={readOnly}
          />
          {isEditing ? (
            <input
              className="w-full text-base border-b border-gray-300 focus:outline-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditSubmit();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              autoFocus
              disabled={readOnly}
            />
          ) : todo.link ? (
            <a
              href={
                todo.link.startsWith('http')
                  ? todo.link
                  : `https://${todo.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base font-medium ${
                todo.isChecked
                  ? 'line-through text-gray-400'
                  : 'text-black underline'
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

        {/* 링크 input (수정 모드일 때만 노출) */}
        {isEditing && !readOnly && (
          <div className="ml-[28px]">
            <input
              className="text-xs border-b border-gray-300 text-black w-full placeholder:text-gray-400 focus:outline-none"
              placeholder="링크 입력 (선택)"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditSubmit();
                if (e.key === 'Escape') setIsEditing(false);
              }}
            />
          </div>
        )}
      </div>

      {/* 오른쪽 ⋮ 메뉴 */}
      {!todo.isMission && !readOnly && (
        <div className="relative ml-[12px]">
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1 hover:opacity-80"
          >
            <img src={menuVertical} alt="메뉴" className="w-[25px] h-[25px]" />
          </button>

          {menuOpen && (
            <DropdownPortal>
              <div
                ref={menuRef} // 메뉴 ref 적용
                className="absolute w-[100px] bg-white border rounded-[10px] shadow z-[9999] text-base overflow-hidden"
                style={{
                  top: `${menuStyle.top}px`,
                  left: `${menuStyle.left - 60}px`,
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
                  onClick={async () => {
                    await removeTodo(todo.id);
                    triggerRefresh();
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
