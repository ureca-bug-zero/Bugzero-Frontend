// 투두 타입

export interface Todo {
  id: number;
  content: string;
  date: string;
  isMission: boolean;
  isChecked: boolean;
  link?: string;
  userId: number;
}

export interface UserTodoResponse {
  success: boolean;
  code: string;
  message: string;
  data: Todo[];
}
