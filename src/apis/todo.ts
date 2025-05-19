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

export const addTodo = async (info: any) => {
  const response = await client.post(
    '/todolist/new',
    {
      date: info.date,
      content: info.content,
      link: info.link,
    },
    {
      headers: {
        Authorization: `Bearer ${info.token}`,
      },
    },
  );
  return response.data;
};

export const toggleCheck = async (id: number, token: string) => {
  const response = await client.post(`/todolist/check/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTodo = async (id: number, token: string) => {
  const response = await client.delete(`/todolist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editTodo = async (
  id: number,
  token: string,
  content: string,
  link: string,
) => {
  const response = await client.patch(
    `/todolist/${id}`,
    {
      content,
      link,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
