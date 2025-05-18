import client from './client';

export const userInfo = async (token: string) => {
  const response = await client.get('/user/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const calendar = async (info: any) => {
  const response = await client.get('/calendar', {
    params: {
      yearMonth: info.yearMonth,
    },
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return response.data;
};

export const friendList = async (token: string) => {
  const response = await client.get('/friend/requests', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
