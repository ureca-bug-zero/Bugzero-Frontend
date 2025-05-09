// 투두 관련 API

import { Todo } from '@/types/todo';
import axios from './axios';

// 1. 특정 날짜의 투두 목록 조회
export const getTodosByDate = async (
  userId: number,
  date: string,
): Promise<Todo[]> => {
  const res = await axios.get<Todo[]>('/todos', { params: { userId, date } });
  return res.data;
};

// 2. 새로운 할 일 추가
export const postTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const res = await axios.post<Todo>('/todos', todo);
  return res.data;
};

// 3. 기존 투두 수정
export const putTodo = async (
  id: number,
  todo: Partial<Todo>,
): Promise<void> => {
  await axios.put(`/todos/${id}`, todo);
};

// 4. 삭제
export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`/todos/${id}`);
};

// 5. 체크 상태 토글 (예: PATCH)
export const patchCheckTodo = async (id: number): Promise<void> => {
  await axios.patch(`/todos/${id}/check`);
};
