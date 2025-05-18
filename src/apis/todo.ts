import client from './client';

export const todoList = async (info: any) => {
  const response = await client.get('/todolist/get', {
    params: {
      date: info.date,
    },
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return response.data;
};
