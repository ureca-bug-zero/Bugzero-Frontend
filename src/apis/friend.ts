import client from './client';

//friendInfo 가져오는 API 필요..
// export const friendInfo = async (info: any) => {
//   const response = await client.get('');
// };

export const friendCalendar = async (info: any) => {
  const response = await client.get(`/friend/calendar/${info.friendId}`, {
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
