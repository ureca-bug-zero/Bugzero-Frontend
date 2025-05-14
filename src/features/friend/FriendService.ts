import instance from '@/api/axios';
import {
  IncomingFriendRequest,
  FriendRequestPayload,
  FriendResponsePayload,
  FriendRequestResponse,
} from '@/types/friend';

// 친구 요청 보내기
export const sendFriendRequest = async (payload: FriendRequestPayload) => {
  const res = await instance.post(
    `/friend/request`,
    {},
    {
      params: { email: payload.email },
    },
  );
  return res.data;
};

// 친구 요청 수락
export const acceptFriendRequest = async (payload: FriendResponsePayload) => {
  const res = await instance.post(`/friend/response/accept`, payload);
  return res.data;
};

// 친구 요청 거절
export const refuseFriendRequest = async (payload: FriendResponsePayload) => {
  const res = await instance.post(`/friend/response/refuse`, payload);
  return res.data;
};

// 받은 친구 요청 목록 조회
export const fetchFriendRequests = async (): Promise<
  IncomingFriendRequest[]
> => {
  const res = await instance.get<FriendRequestResponse>(`/friend/requests`);
  return res.data.data;
};
