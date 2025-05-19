import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LandingPage from '@/pages/LandingPage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/kakao/callback" element={<KakaoCallbackPage />} />
        <Route path="/main" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
