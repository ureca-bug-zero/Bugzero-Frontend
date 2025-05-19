import client from './client';

export const friendInfo = async (info: any) => {
  const response = await client.get(`/friend/info/${info.friendId}`, {
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return response.data;
};

export const friendCalendar = async (info: any) => {
  const response = await client.get(`/friend/calendar/${info.friendId}`, {
    params: {
      yearMonth: info.yearMonth,
    },
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return response.data;
};

export const friendTodoList = async (info: any) => {
  const response = await client.get(`/friend/todolist/${info.friendId}`, {
    params: {
      date: info.date,
    },
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return response.data;
};
