// 투두 상태

import { create } from 'zustand';
import { Todo } from '@/types/todo';
import {
  getTodosByDate,
  postTodo,
  patchTodo,
  deleteTodo,
  postCheckTodo,
} from '@/api/todo';

interface TodoState {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void; //todo setting
  fetchTodos: (userId: number, date: string) => Promise<void>;
  addTodo: (
    todo: Omit<Todo, 'id' | 'isChecked' | 'isMission'>,
  ) => Promise<void>;
  updateTodo: (id: number, data: Partial<Todo>) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  toggleCheck: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  fetchTodos: async (userId, date) => {
    const todos = await getTodosByDate(userId, date);
    set({ todos });
  },

  addTodo: async (todo) => {
    await postTodo({ ...todo });
    const { fetchTodos } = get();
    await fetchTodos(todo.userId, todo.date);
  },

  updateTodo: async (id, data) => {
    await patchTodo(id, data);
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...data } : todo,
      ),
    }));
  },

  removeTodo: async (id) => {
    await deleteTodo(id);
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  toggleCheck: async (id) => {
    await postCheckTodo(id);
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo,
      ),
    }));
  },
}));
