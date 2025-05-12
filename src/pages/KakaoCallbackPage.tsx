import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { UserInfoResponse } from '@/types/auth';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      navigate('/');
      return;
    }

    localStorage.setItem('accessToken', token);

    axios
      .get<UserInfoResponse>(`${import.meta.env.VITE_API_BASE_URL}/user/info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data.data;
        setUser({ ...user, token }); // token도 함께 저장
        navigate('/main');
      })
      .catch(() => {
        console.error('유저 정보 요청 실패');
        navigate('/');
      });
  }, []);

  return <div className="text-center mt-20">로그인 처리 중입니다...</div>;
};

export default KakaoCallbackPage;
