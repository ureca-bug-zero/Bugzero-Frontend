export interface UserInfo {
  id: number;
  email: string;
  name: string;
  rank: number;
  weekScore: number | null;
  token?: string;
}

export interface UserInfoResponse {
  success: boolean;
  code: string;
  message: string;
  data: UserInfo;
}
