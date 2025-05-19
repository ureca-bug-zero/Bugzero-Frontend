import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';
import clsx from 'clsx';
import { Flex, Position } from '../common/Wrapper';
import emptyBox from '../../assets/icons/todo/todo-empty.svg';
import filledBox from '../../assets/icons/todo/todo-filled.svg';
import menuBar from '../../assets/icons/todo/todo-menu.svg';
import { theme } from '../../styles/theme';
import { Type } from '../../types/home';
import { useUserStore } from '../../store/userStore';
import { useDateStore } from '../../store/dateStore';
import { deleteTodo, toggleCheck, editTodo } from '../../apis/todo';
import { useMutation } from '@tanstack/react-query';

type TodoItemProps = {
  todo: Todo;
  type: Type;
  refetch: (vars: { date: string; token: string }) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, type, refetch }) => {
  const token = useUserStore((state) => state.token);
  const selectedDate = useDateStore((state) => state.selectedDate);

  // 플로팅버튼
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);
  const [editLink, setEditLink] = useState(todo.link);

  const todoRef = useRef<HTMLDivElement>(null);

  const toggleCheckMutation = useMutation({
    mutationFn: () => toggleCheck(todo.id, token),
    onSuccess: () => {
      refetch({ date: selectedDate, token });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id, token),
    onSuccess: () => {
      refetch({ date: selectedDate, token });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: () => editTodo(todo.id, token, editContent, editLink || ''),
    onSuccess: () => {
      refetch({ date: selectedDate, token });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleToggleCheck = () => {
    if (type === 'me') {
      toggleCheckMutation.mutate();
    }
  };

  const handleDelete = () => {
    if (type === 'me') {
      deleteTodoMutation.mutate();
    }
  };

  const handleEdit = () => {
    if (type === 'me') {
      editTodoMutation.mutate();
      setIsEditMode(false);
    }
  };
  useEffect(() => {
    setEditContent(todo.content);
    setEditLink(todo.link);
  }, [todo.content, todo.link]);

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
          width: 'w-[277px] tablet:w-[360px]',
          padding: {
            x: 'px-[12px]',
            y: 'py-[10px]',
          },
        }),
        isEditMode ? 'h-auto' : 'h-[45px]',
        todo.mission ? '' : 'bg-white',
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
          onClick={() => {
            handleToggleCheck();
          }}
          className="w-[18px] h-[18px] focus:outline-none"
        >
          <img
            src={todo.checked ? filledBox : emptyBox}
            alt={todo.checked ? '완료' : '미완료'}
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
                todo.mission ? theme.typo.Body1 : theme.typo.Body2,
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
                todo.mission ? theme.typo.Body1 : theme.typo.Body2,
                theme.textPalette.Secondary,
              )}
            />
          </div>
        ) : editLink ? (
          <a
            href={
              editLink.startsWith('http') ? editLink : `https://${todo.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              todo.mission ? theme.typo.Body1 : theme.typo.Body2,
              theme.textPalette.Secondary,
              'w-[172px] break-all tablet:w-[255px]',
              'underline', // 링크에 밑줄 줄지 말지
            )}
          >
            {editContent}
          </a>
        ) : (
          <span
            className={clsx(
              todo.mission ? theme.typo.Body1 : theme.typo.Body2,
              theme.textPalette.Secondary,
              'w-[172px] break-all tablet:w-[255px]',
            )}
          >
            {editContent}
          </span>
        )}
      </div>

      {!todo.mission && (
        <div
          className={clsx(
            Position({ position: 'relative' }),
            type === 'me' ? 'visible' : 'invisible',
          )}
        >
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
                  handleDelete();
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
  return todo.mission ? (
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
