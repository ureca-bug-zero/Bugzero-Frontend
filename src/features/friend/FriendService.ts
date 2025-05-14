import instance from '@/api/axios';
import { FriendListItem } from '@/store/friend';
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
  const res = await instance.post(`/friend/response/accept`, null, {
    params: {
      senderId: payload.senderId,
    },
  });
  return res.data;
};

// 친구 요청 거절
export const refuseFriendRequest = async (payload: FriendResponsePayload) => {
  const res = await instance.post(`/friend/response/refuse`, null, {
    params: {
      senderId: payload.senderId,
    },
  });
  return res.data;
};

// 받은 친구 요청 목록 조회
export const fetchFriendRequests = async (): Promise<
  IncomingFriendRequest[]
> => {
  const res = await instance.get<FriendRequestResponse>(`/friend/requests`);
  return res.data.data;
};

export const fetchFriendList = async (): Promise<FriendListItem[]> => {
  const res = await instance.get<{ data: FriendListItem[] }>('/friend/list');
  return res.data.data;
};
