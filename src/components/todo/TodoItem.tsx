import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';
import { useTodoStore } from '../../store/todoStore';
import clsx from 'clsx';
import { Flex, Position } from '../common/Wrapper';

import emptyBox from '../../assets/icons/todo/todo-empty.svg';
import filledBox from '../../assets/icons/todo/todo-filled.svg';
import menuBar from '../../assets/icons/todo/todo-menu.svg';
import { theme } from '../../styles/theme';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const toggleCheck = useTodoStore((s) => s.toggleCheck);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const editTodo = useTodoStore((s) => s.editTodo);

  // 플로팅버튼
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);
  const [editLink, setEditLink] = useState(todo.link);

  const todoRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    if (editContent.trim()) {
      editTodo(todo.id, editContent.trim(), (editLink || '').trim());
      setIsEditMode(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEdit();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (todoRef.current && !todoRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsEditMode(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 체크박스 + 텍스트 + 메뉴
  const inner = (
    <div
      ref={todoRef}
      className={clsx(
        Flex({
          justify: 'between',
          width: 'w-[277px]',
          padding: {
            x: 'px-[12px]',
            y: 'py-[40px]',
          },
        }),
        'tablet:w-[360px]',
        isEditMode ? 'h-auto' : 'h-[45px]',
        todo.isMission ? '' : 'bg-white',
      )}
    >
      <div
        className={clsx(
          Flex({
            gap: 'gap-[16px]',
            justify: 'between',
          }),
        )}
      >
        <button
          onClick={() => toggleCheck(todo.id)}
          className="w-[18px] h-[18px] focus:outline-none"
        >
          <img
            src={todo.isChecked ? filledBox : emptyBox}
            alt={todo.isChecked ? '완료' : '미완료'}
            className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"
          />
        </button>

        {isEditMode ? (
          <div
            className={clsx(
              Flex({
                direction: 'column',
                width: 'w-full',
              }),
            )}
          >
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="할 일을 입력하세요."
              className={clsx(
                'bg-transparent',
                'w-full',
                'placeholder-gray-700',
                'focus:placeholder-transparent',
                todo.isMission ? theme.typo.Body1 : theme.typo.Body2,
                theme.textPalette.Secondary,
              )}
            />
            <input
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="링크를 입력하세요."
              className={clsx(
                'mt-[6px]',
                'bg-transparent',
                'w-full',
                'placeholder-gray-700',
                'focus:placeholder-transparent',
                todo.isMission ? theme.typo.Body1 : theme.typo.Body2,
                theme.textPalette.Secondary,
              )}
            />
          </div>
        ) : todo.link ? (
          <a
            href={
              todo.link.startsWith('http') ? todo.link : `https://${todo.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              todo.isMission ? theme.typo.Body1 : theme.typo.Body2,
              theme.textPalette.Secondary,
              'w-[172px] break-all tablet:w-[255px]',
              'underline', // 링크에 밑줄 줄지 말지
            )}
          >
            {todo.content}
          </a>
        ) : (
          <span
            className={clsx(
              todo.isMission ? theme.typo.Body1 : theme.typo.Body2,
              theme.textPalette.Secondary,
              'w-[172px] break-all tablet:w-[255px]',
            )}
          >
            {todo.content}
          </span>
        )}
      </div>

      {!todo.isMission && (
        <div className={clsx(Position({ position: 'relative' }))}>
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <img src={menuBar} alt="메뉴" className="w-[25px] h-[25px]" />
          </button>
          {isMenuOpen && (
            <div
              className={clsx(
                Position({
                  position: 'absolute',
                  top: 'top-[28px]',
                  right: 'right-[-44px]',
                  zIndex: 'z-50',
                }),
                Flex({
                  direction: 'column',
                }),
                'w-[60px]',
                'tablet:w-[80px]',
                'tablet:right-[-64px]',
              )}
            >
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsEditMode(true);
                }}
                className={clsx(
                  theme.typo.Body2,
                  Flex({
                    width: 'w-full',
                    height: 'h-[22.5px]',
                  }),
                  'tablet:h-[30px]',
                  'text-center',
                  'bg-white',
                  'border',
                  'border-gray-200',
                  'border-b-[0.5px]',
                  'rounded-t-[10px]',
                  'hover:bg-gray-200',
                )}
              >
                수정
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  // 삭제 기능
                  deleteTodo(todo.id);
                }}
                className={clsx(
                  theme.typo.Body2,
                  Flex({
                    width: 'w-full',
                    height: 'h-[22.5px]',
                  }),
                  'tablet:h-[30px]',
                  'text-center',
                  'bg-white',
                  'border',
                  'border-gray-200',
                  'border-t-[0.5px]',
                  'rounded-b-[10px]',
                  'hover:bg-gray-200',
                )}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // 미션 -> 박스
  return todo.isMission ? (
    <div
      className={clsx(
        Flex({
          width: 'w-[277px]',
          height: 'h-[70px]',
        }),
        'border-[1.5px]',
        'border-solid',
        'border-primary',
        'rounded-[10px]',
        'bg-[rgba(26,226,115,0.10)]',

        'tablet:w-[360px]',
        'tablet:h-[70px]',
      )}
    >
      {inner}
    </div>
  ) : (
    inner
  );
};

export default TodoItem;
