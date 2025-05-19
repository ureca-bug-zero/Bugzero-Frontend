import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import arrowIcon from '../../assets/icons/todo/todo-arrow.svg';
import { theme } from '../../styles/theme';
import { useEffect, useState } from 'react';
import { Todo } from '../../types/todo';
import { useMutation } from '@tanstack/react-query';
import { todoList } from '../../apis/todo';
import { useUserStore } from '../../store/userStore';
import { useDateStore } from '../../store/dateStore';
import { Type } from '../../types/home';

interface TodoProps {
  handleClose: () => void;
  type: Type;
  calRefetch: () => void;
}

const TodoTemplate = ({ handleClose, type, calRefetch }: TodoProps) => {
  const token = useUserStore((state) => state.token);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoListMutation = useMutation({
    mutationFn: todoList,
    onSuccess: (data) => {
      setTodos(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    todoListMutation.mutate({ date: selectedDate, token: token });
  }, [selectedDate]);

  return (
    <div
      className={clsx(
        Flex({
          direction: 'column',
          align: 'start',
          gap: 'gap-[32px]',
        }),
        'tablet:w-[449px]',
        'tablet:gap-[36px]',
        theme.bgPalette.White,
      )}
    >
      {/* 제목 */}
      <div
        className={clsx(
          Flex({
            justify: 'start',
            width: 'w-[337px] tablet:w-[full]',
            gap: 'gap-[3px]',
          }),
          'ml-[60px] tablet:ml-[0px]',
        )}
      >
        <img
          src={arrowIcon}
          alt="화살표"
          className={clsx('w-[20px]', 'h-[20px]', 'tablet:hidden')}
          onClick={handleClose}
        />
        <h1 className={clsx(theme.typo.Heading3_Eng)}>Todo-List</h1>
      </div>

      {/* 입력 + 리스트 */}
      <div
        className={clsx(
          Flex({
            direction: 'column',
            align: 'start',
            gap: 'gap-[28px] tablet:gap-[48px]',
          }),
        )}
      >
        <TodoInput
          type={type}
          refetch={todoListMutation.mutate}
          calRefetch={calRefetch}
        />
        <div
          className={clsx(
            Flex({
              direction: 'column',
              gap: 'gap-[11px]',
            }),
          )}
        >
          {/* 미션 투두 */}
          <div
            className={clsx(
              'h-[70px] px-[60px] tablet:pr-[80px] tablet:px-[0px]',
            )}
          >
            {todos.filter((todo) => todo.mission).length === 0 ? (
              <div
                className={clsx(
                  Flex({
                    width: 'w-[277px]',
                    height: 'h-[70px]',
                    justify: 'center',
                    align: 'center',
                  }),
                  'border-[1.5px]',
                  'border-solid',
                  'border-primary',
                  'rounded-[10px]',
                  'bg-primary/10',
                  'tablet:w-[360px]',
                  'tablet:h-[70px]',
                )}
              >
                <span
                  className={clsx(
                    theme.typo.Body1,
                    theme.textPalette.Secondary,
                    'text-center',
                  )}
                >
                  미션은 자정에 업데이트됩니다.
                </span>
              </div>
            ) : (
              todos
                .filter((todo) => todo.mission)
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    type={type}
                    refetch={todoListMutation.mutate}
                    calRefetch={calRefetch}
                  />
                ))
            )}
          </div>
          <div
            className={clsx(
              'h-[500px] tablet:h-[290px] desktop:h-[325px]',
              'overflow-y-auto scrollbar-hide',
              'px-[60px] tablet:pr-[80px] tablet:px-[0px]',
            )}
          >
            {/* 미션 아닌 투두 */}
            {todos
              .filter((todo) => !todo.mission)
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  type={type}
                  refetch={todoListMutation.mutate}
                  calRefetch={calRefetch}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoTemplate;
