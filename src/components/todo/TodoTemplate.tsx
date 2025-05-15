import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import TodoInput from './TodoInput';
import { useTodoStore } from '../../store/todoStore';
import TodoItem from './TodoItem';

import arrowIcon from '../../assets/icons/todo/todo-arrow.svg';
import { theme } from '../../styles/theme';

const TodoTemplate = () => {
  const todos = useTodoStore((s) => s.todos);

  return (
    <div
      className={clsx(
        Flex({
          direction: 'column',
          width: 'w-[361px]',
          margin: 'mx-[16px]',
          gap: 'gap-[32px]',
        }),
        'tablet:w-[369px]',
        'tablet:mx-[8px]',
        'desktop:w-[360px]',
        'desktop:items-start',
        'tablet:gap-[36px]',
      )}
    >
      {/* 입력 + 리스트 */}
      <div
        className={clsx(
          Flex({
            direction: 'column',
            gap: 'gap-[28px]',
            padding: {
              x: 'px-[42px]',
            },
          }),
          'pb-[19px]',
          'tablet:px-0',
          'tablet:gap-[48px]',
        )}
      >
        <TodoInput />
        <div
          className={clsx(
            Flex({
              direction: 'column',
              gap: 'gap-[11px]',
            }),
          )}
        >
          {/* 미션 투두 */}
          {todos
            .filter((todo) => todo.isMission)
            .map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          <div>
            {/* 미션 아닌 투두 */}
            {todos
              .filter((t) => !t.isMission)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoTemplate;
