// 투두 상태

import { create } from 'zustand';
import { Todo } from '@/types/todo';

interface TodoStore {
  todos: Todo[];
  fetchTodos: () => void;
  addTodo: (todo: Omit<Todo, 'id' | 'isChecked'>) => void;
  updateTodo: (id: number, updated: Partial<Todo>) => void;
  removeTodo: (id: number) => void;
  toggleCheck: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  // 로컬에선 초기 fetch는 의미 없음
  fetchTodos: () => {},

  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          isChecked: false,
          ...todo,
        },
      ],
    })),

  updateTodo: (id, updated) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updated } : todo,
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  toggleCheck: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo,
      ),
    })),
}));
