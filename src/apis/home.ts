import client from './client';

export const userInfo = async (token: string) => {
  const response = await client.get('/user/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
