import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import arrowIcon from '../../assets/icons/todo/todo-arrow.svg';
import { theme } from '../../styles/theme';
import { useEffect, useState } from 'react';
import { Todo, TodoProps } from '../../types/todo';
import { useMutation } from '@tanstack/react-query';
import { todoList } from '../../apis/todo';
import { useUserStore } from '../../store/userStore';
import { useDateStore } from '../../store/dateStore';

const TodoTemplate = ({ handleClose, type }: TodoProps) => {
  const token = useUserStore((state) => state.token);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoListMutation = useMutation({
    mutationFn: todoList,
    onSuccess: (data) => {
      console.log(data);
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
            width: 'w-full',
            gap: 'gap-[3px]',
          }),
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
        <TodoInput type={type} />
        <div
          className={clsx(
            Flex({
              direction: 'column',
              gap: 'gap-[11px]',
            }),
          )}
        >
          {/* 미션 투두 */}
          <div className={clsx('pr-[60px] tablet:pr-[80px]')}>
            {todos
              .filter((todo) => todo.mission)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} type={type} />
              ))}
          </div>
          <div
            className={clsx(
              'h-[480px] tablet:h-[273px] desktop:h-[325px]',
              'overflow-y-auto scrollbar-hide',
              'pr-[60px] tablet:pr-[80px]',
            )}
          >
            {/* 미션 아닌 투두 */}
            {todos
              .filter((todo) => !todo.mission)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} type={type} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoTemplate;
