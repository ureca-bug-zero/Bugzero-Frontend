import React, { useState } from 'react';
import { Todo } from '../../types/todo';
import { useTodoStore } from '../../store/todoStore';
import clsx from 'clsx';
import { Flex, Position } from '../common/Wrapper';

import emptyBox from '../../assets/icons/home/todo-empty.svg';
import filledBox from '../../assets/icons/home/todo-filled.svg';
import menuBar from '../../assets/icons/home/todo-menu.svg';
import { theme } from '../../styles/theme';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const toggleCheck = useTodoStore((s) => s.toggleCheck);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  // 플로팅버튼
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 체크박스 + 텍스트 + 메뉴
  const inner = (
    <div
      className={clsx(
        Flex({
          justify: 'between',
          height: 'h-[45px]',
          width: 'w-[277px]',
          padding: {
            x: 'px-[12px]',
            y: 'py-[10px]',
          },
        }),
        'tablet:w-[360px]',
        'tablet:h-[45px]',
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
          />
        </button>
        {/* <span
          className={clsx(
            todo.isMission ? theme.typo.Body1 : theme.typo.Body2,
            theme.textPalette.Secondary,
          )}
        >
          {todo.content}
        </span> */}
        {todo.link ? (
          <a
            href={
              todo.link.startsWith('http') ? todo.link : `https://${todo.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              todo.isMission ? theme.typo.Body1 : theme.typo.Body2,
              theme.textPalette.Secondary,
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
                  right: 'right-[-48px]',
                }),
                Flex({
                  direction: 'column',
                }),
                'w-[60px]',
              )}
            >
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  // 수정 기능 넣기
                }}
                className={clsx(
                  theme.typo.Body2,
                  Flex({
                    width: 'w-full',
                    height: 'h-[22.5px]',
                  }),
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
