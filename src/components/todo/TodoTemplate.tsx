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
          align: 'start',
          width: 'w-[421px]',
          gap: 'gap-[32px]',
        }),
        'tablet:w-[449px]',
        'tablet:gap-[36px]',
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
          // onClick={}
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
          <div className={clsx('pr-[60px] tablet:pr-[80px]')}>
            {todos
              .filter((todo) => todo.isMission)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
          </div>
          <div
            className={clsx(
              'h-[437px] tablet:h-[290px] desktop:h-[325px]',
              'overflow-y-auto scrollbar-hide',
              'pr-[60px] tablet:pr-[80px]',
            )}
          >
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
