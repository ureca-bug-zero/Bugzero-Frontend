import { create } from 'zustand';
import { Todo } from '../types/todo.ts';

interface TodoStore {
  todos: Todo[];
  toggleCheck: (id: number) => void;
  deleteTodo: (id: number) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'isChecked'>) => void;
  editTodo: (id: number, newContent: string, newLink: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: 2,
      content: '미션 안함',
      checked: false,
      mission: true,
      link: '',
      date: '2025-05-13',
      userId: 1,
    },
    {
      id: 1,
      content: '미션 아닌데 함',
      checked: true,
      mission: false,
      link: '',
      date: '2025-05-13',
      userId: 1,
    },
    {
      id: 3,
      content: '이거 백준 링크',
      checked: false,
      mission: false,
      link: 'https://www.acmicpc.net/problem/13460',
      date: '2025-05-13',
      userId: 1,
    },
  ],
  toggleCheck: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, isChecked: !t.checked } : t,
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
  editTodo: (id, newContent, newLink) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, content: newContent, link: newLink } : t,
      ),
    })),
}));
