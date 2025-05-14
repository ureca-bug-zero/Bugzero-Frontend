// 투두 관련 API

import { Todo } from '@/types/todo';
import axios from './axios';

interface CreateTodoDTO {
  date: string;
  content: string;
  link?: string;
}

interface UpdateTodoDTO {
  content?: string;
  link?: string;
}

interface GetTodosResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    id: number;
    content: string;
    date: string;
    checked: boolean;
    mission: boolean;
    link?: string;
    userId: number;
  }[];
}

// 1. 특정 날짜의 투두 목록 조회
export const getTodosByDate = async (
  userId: number,
  date: string,
): Promise<Todo[]> => {
  const res = await axios.get<GetTodosResponse>('/todolist/get', {
    params: { userId, date },
  });

  return res.data.data.map((item) => ({
    id: item.id,
    content: item.content,
    date: item.date,
    isMission: item.mission,
    isChecked: item.checked,
    link: item.link || undefined,
    userId: item.userId,
  }));
};

// 2. 새로운 할 일 추가
export const postTodo = async (todo: CreateTodoDTO): Promise<void> => {
  await axios.post('/todolist/new', todo);
};

// 3. 기존 투두 수정
export const patchTodo = async (
  id: number,
  todo: UpdateTodoDTO,
): Promise<void> => {
  console.log('🔧 PATCH 요청 전송:', id, todo); // ✅ 확인용
  await axios.patch(`/todolist/${id}`, todo);
};

// 4. 삭제
export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`/todolist/${id}`);
};

// 5. 체크 상태 토글
export const postCheckTodo = async (id: number): Promise<void> => {
  await axios.post(`/todolist/check/${id}`);
};

// 6. 미션 투두 불러오기
