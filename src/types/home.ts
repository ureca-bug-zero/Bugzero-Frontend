export interface UserInfo {
  name: string | undefined;
  rank: number | undefined;
}

export interface Home extends UserInfo {
  id: number;
  email: string;
  weekScore: number;
}

export type CalendarData = Record<string, number>;

export interface FriendItemProps {
  friendId: number;
  friendName: string;
  friendEmail: string;
  refetch: () => void;
}

export type Type = 'me' | 'friend';

export interface Props {
  friendId: string | undefined;
  type: Type;
}
