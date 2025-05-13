import axios from 'axios';
import {
  IncomingFriendRequest,
  FriendRequestPayload,
  FriendResponsePayload,
  FriendRequestResponse,
} from '@/types/friend';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 친구 요청 보내기
export const sendFriendRequest = async (payload: FriendRequestPayload) => {
  const res = await axios.post(
    `${API_BASE_URL}/friend/request`,
    {},
    {
      ...getAuthHeader(),
      params: { email: payload.email },
    },
  );
  return res.data;
};

// 친구 요청 수락
export const acceptFriendRequest = async (payload: FriendResponsePayload) => {
  const res = await axios.post(
    `${API_BASE_URL}/friend/response/accept`,
    payload,
    getAuthHeader(),
  );
  return res.data;
};

// 친구 요청 거절
export const refuseFriendRequest = async (payload: FriendResponsePayload) => {
  const res = await axios.post(
    `${API_BASE_URL}/friend/response/refuse`,
    payload,
    getAuthHeader(),
  );
  return res.data;
};

// 받은 친구 요청 목록 조회
export const fetchFriendRequests = async (): Promise<
  IncomingFriendRequest[]
> => {
  const res = await axios.get<FriendRequestResponse>(
    `${API_BASE_URL}/friend/requests`,
    getAuthHeader(),
  );
  return res.data.data;
};
