export interface Todo {
  id: number;
  content: string;
  date: string;
  mission: boolean;
  checked: boolean;
  link?: string;
  userId: number;
}

export type Type = 'me' | 'friend';

export interface TodoProps {
  handleClose: () => void;
  type: Type;
}
