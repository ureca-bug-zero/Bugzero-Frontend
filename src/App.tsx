import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import { UserInfoResponse } from '@/types/auth';
import AppRouter from '@/router';

const App = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    axios
      .get<UserInfoResponse>(`${import.meta.env.VITE_API_BASE_URL}/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
