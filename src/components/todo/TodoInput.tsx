import React, { useState } from 'react';
import clsx from 'clsx';
import { Flex } from '../common/Wrapper';

import contentIcon from '../../assets/icons/todo/todo-content.svg';
import linkIcon from '../../assets/icons/todo/todo-link.svg';
import { theme } from '../../styles/theme';
import { Type } from '../../types/home';
import { useUserStore } from '../../store/userStore';
import { useDateStore } from '../../store/dateStore';
import { useMutation } from '@tanstack/react-query';
import { addTodo as addTodoAPI } from '../../apis/todo';

// const iconStyle = clsx('w-[22px]', 'h-[22px]');

type TodoInputProps = {
  type: Type;
  refetch?: (vars: { date: string; token: string }) => void;
};

const TodoInput: React.FC<TodoInputProps> = ({ type, refetch }) => {
  const token = useUserStore((state) => state.token);
  const selectedDate = useDateStore((state) => state.selectedDate);

  const [content, setContent] = useState('');
  const [link, setLink] = useState('');

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: { content: string; link: string }) =>
      addTodoAPI({
        date: selectedDate,
        content: newTodo.content,
        link: newTodo.link,
        token,
      }),
    onSuccess: () => {
      if (refetch) {
        refetch({ date: selectedDate, token });
        setContent('');
        setLink('');
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleAddTodo = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || type === 'friend') return;

    addTodoMutation.mutate({
      content: trimmedContent,
      link: link.trim(),
    });
  };

  return (
    // 전체 (아이콘,인풋 / 버튼) row
    <div
      className={clsx(
        Flex({
          justify: 'between',
          gap: 'gap-[25px]',
          width: 'w-[277px]',
          height: 'h-[60px]',
        }),
        'tablet:w-[360px]',
        'tablet:h-[60px]',
        'ml-[60px] tablet:ml-[0px]',
      )}
    >
      {/* 할 일/링크 col */}
      <div
        className={clsx(
          Flex({
            direction: 'column',
            justify: 'between',
            gap: 'gap-[10px]',
            width: 'w-[188px]',
          }),
          'tablet:w-[271px]',
        )}
      >
        {/* 할 일 입력 -> 아이콘/인풋 row */}
        <div
          className={clsx(
            Flex({
              justify: 'between',
              height: 'h-[24px]',
              gap: 'gap-[16px]',
            }),
            'tablet:gap-[25px]',
          )}
        >
          <img
            src={contentIcon}
            alt="할 일 아이콘"
            className={clsx('w-[22px]', 'h-[22px]', 'pb-[3px]')}
          />
          {/* 인풋/보더 col */}
          <div
            className={clsx(
              Flex({
                direction: 'column',
                width: 'w-[149px]',
                gap: 'g-[0.4px]',
              }),
              'tablet:w-[232px]',
            )}
          >
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="할 일을 입력하세요."
              className={clsx(
                Flex({
                  padding: {
                    x: 'px-[3px]',
                  },
                  width: 'w-full',
                  margin: 'my-[3px]',
                }),
                'placeholder-gray-700',
                'focus:placeholder-transparent',
                'bg-transparent',
                theme.typo.Body2,
              )}
            />
            <div className={clsx('w-full', 'h-[1px]', 'bg-gray-700')}></div>
          </div>
        </div>

        {/* 링크 입력 -> 아이콘/인풋 row */}
        <div
          className={clsx(
            Flex({
              justify: 'between',
              height: 'h-[24px]',
              gap: 'gap-[16px]',
            }),
            'tablet:gap-[25px]',
          )}
        >
          <img
            src={linkIcon}
            alt="할 일 아이콘"
            className={clsx('w-[22px]', 'h-[22px]', 'pb-[3px]')}
          />
          {/* 인풋/보더 col */}
          <div
            className={clsx(
              Flex({
                direction: 'column',
                width: 'w-[149px]',
                gap: 'g-[0.4px]',
              }),
              'tablet:w-[232px]',
            )}
          >
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="링크를 입력하세요."
              className={clsx(
                Flex({
                  padding: {
                    x: 'px-[3px]',
                  },
                  width: 'w-full',
                  margin: 'my-[3px]',
                }),
                'placeholder-gray-700',
                'focus:placeholder-transparent',
                'bg-transparent',
                theme.typo.Body2,
              )}
            />
            <div className={clsx('w-full', 'h-[1px]', 'bg-gray-700')}></div>
          </div>
        </div>
      </div>
      <button
        onClick={handleAddTodo}
        className={clsx(
          Flex({
            justify: 'center',
            width: 'w-[64px]',
            height: 'h-[55px]',
          }),
          'bg-gray-700',
          'rounded-[5px]',
          theme.typo.Body2,
          theme.textPalette.White,
        )}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
