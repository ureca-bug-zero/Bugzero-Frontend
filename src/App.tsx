import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import axios from '@/api/axios'; // axios 인스턴스 경로에 맞게 수정
import { UserInfoResponse } from '@/types/auth';
import AppRouter from '@/router';

const App = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    axios
      .get<UserInfoResponse>('/user/info')
      .then((res) => {
        const user = res.data.data;
        setUser({ ...user, token });
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
      });
  }, []);

  return <AppRouter />;
};

export default App;
