import { useTodoStore } from '../../store/todoStore';
import TodoItem from './TodoItem';

const TodoItemList = () => {
  const todos = useTodoStore((s) => s.todos);

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoItemList;
