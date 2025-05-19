import client from './client';

export const addFriend = async (email: string, token: string) => {
  const response = await client.post(
    `/friend/request`,
    {},
    {
      params: { email },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const getFriendRequests = async (token: string) => {
  const response = await client.get('/friend/requests', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const acceptFriend = async (senderId: number, token: string) => {
  const response = await client.post(
    '/friend/response/accept',
    {},
    {
      params: { senderId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const refuseFriend = async (senderId: number, token: string) => {
  const response = await client.post(
    '/friend/response/refuse',
    {},
    {
      params: { senderId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
