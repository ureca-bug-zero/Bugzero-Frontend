import { create } from 'zustand';
import { Todo } from '../types/todo.ts';

interface TodoStore {
  todos: Todo[];
  toggleCheck: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newContent: string) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'isChecked'>) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: 2,
      content: '미션 안함',
      isChecked: false,
      isMission: true,
      link: '',
      date: '2025-05-13',
      userId: 1,
    },
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
      id: 3,
      content: '이거 백준 링크',
      isChecked: false,
      isMission: false,
      link: 'https://www.acmicpc.net/problem/13460',
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
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id: Date.now(),
          isChecked: false,
        },
      ],
    })),
  editTodo: (id, newContent) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, content: newContent } : t,
      ),
    })),
}));
