export interface Todo {
  id: number;
  content: string;
  date: string;
  isMission: boolean;
  isChecked: boolean;
  link?: string;
  userId: number;
}

export interface TodoProps {
  handleClose: () => void;
}
