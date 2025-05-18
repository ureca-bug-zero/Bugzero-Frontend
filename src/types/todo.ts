export interface Todo {
  id: number;
  content: string;
  date: string;
  mission: boolean;
  checked: boolean;
  link?: string;
  userId: number;
}

export type TodoType = 'me' | 'friend';

export interface TodoProps {
  handleClose: () => void;
  type: TodoType;
}
