import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LandingPage from '@/pages/LandingPage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';

const AppRouter: React.FC = () => {
  // useMemo를 사용하여 렌더링 최적화
  const memoizedRoutes = useMemo(() => (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/kakao/callback" element={<KakaoCallbackPage />} />
      <Route path="/main" element={<HomePage />} />
    </Routes>
  ), []);

  return (
    <Router>
      {memoizedRoutes}
    </Router>
  );
};

export default AppRouter;
