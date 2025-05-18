export interface Todo {
  id: number;
  content: string;
  date: string;
  isMission: boolean;
  isChecked: boolean;
  link?: string;
  userId: number;
}

export type TodoType = 'me' | 'friend';

export interface TodoProps {
  handleClose: () => void;
  type: TodoType;
}
