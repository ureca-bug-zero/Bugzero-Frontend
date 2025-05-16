import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

export default function LoginSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const setToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    if (token) {
      //전역 상태 관리
      setToken(token);
      navigate('/');
    }
  }, []);

  return <div></div>;
}
