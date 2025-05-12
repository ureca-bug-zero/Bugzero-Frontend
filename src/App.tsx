import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header, { HeaderType } from './components/common/Header';
import Home from './pages/home';
import LandingPage from './pages/landing.tsx';

function HeaderWithProps() {
  const location = useLocation();
  let type: HeaderType = 'landing';

  if (location.pathname === '/') type = 'home';
  else if (location.pathname === '/landing') type = 'landing';

  return <Header type={type} />;
}

function App() {
  return (
    <BrowserRouter>
      <HeaderWithProps />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
