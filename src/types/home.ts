export interface UserInfo {
  name: string | undefined;
  rank: number | undefined;
}

export interface Home extends UserInfo {
  id: number;
  email: string;
  weekScore: number;
}
