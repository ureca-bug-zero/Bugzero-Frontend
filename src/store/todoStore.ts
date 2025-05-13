import { create } from 'zustand';
import { Todo } from '../types/todo.ts';

interface TodoStore {
  todos: Todo[];
  toggleCheck: (id: number) => void;
  deleteTodo: (id: number) => void;
  // editTodo: (id: number, newContent: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: 1,
      content: '미션 아닌데 함',
      isChecked: true,
      isMission: false,
      link: '',
      date: '2025-05-13',
      userId: 1,
    },
    {
      id: 2,
      content: '미션 안함',
      isChecked: false,
      isMission: true,
      link: '',
      date: '2025-05-13',
      userId: 1,
    },
  ],
  toggleCheck: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, isChecked: !t.isChecked } : t,
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));
