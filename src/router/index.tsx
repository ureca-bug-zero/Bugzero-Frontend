import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LandingPage from '@/pages/LandingPage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';
import FriendPage from '@/pages/FriendPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/kakao/callback" element={<KakaoCallbackPage />} />
        <Route path="/main" element={<HomePage />} />
        <Route path="/friend/:friendId" element={<FriendPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
