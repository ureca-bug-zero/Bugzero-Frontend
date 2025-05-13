import axios from '@/api/axios';
import { useAuthStore } from '@/store/auth';
import { UserInfoResponse, UserInfo } from '@/types/auth';

export const useAuth = () => {
  const { setUser, logout } = useAuthStore();

  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao/login`;
  };

  const processKakaoCallback = async () => {
    try {
      const raw = document.body.innerText;
      const { data: token } = JSON.parse(raw);
      localStorage.setItem('accessToken', token);

      // 타입 명시해서 응답 구조 안전하게 처리
      const { data: response }: { data: UserInfoResponse } =
        await axios.get('/user/info');

      if (response.success) {
        const user: UserInfo & { token: string } = {
          ...response.data,
          token,
        };
        setUser(user);
      }
    } catch (err) {
      console.error('카카오 로그인 처리 실패', err);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao/logout`;
  };

  return {
    handleKakaoLogin,
    processKakaoCallback,
    handleLogout,
  };
};
