// 로그인 훅
import { useAuthStore } from '@/store/auth';

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

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const json = await res.json();

      if (json.success) {
        const user = { ...json.data, token };
        setUser(user);
      }
    } catch (err) {
      console.error('카카오 로그인 처리 실패', err);
    }
  };

  const handleLogout = () => {
    logout(); //zustand 초기화
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao/logout`;
  };

  return {
    handleKakaoLogin,
    processKakaoCallback,
    handleLogout,
  };
};
