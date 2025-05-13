import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/home';
import { CommonType, SelectCommonProps } from './components/common/types';
import Footer from './components/common/Footer';
import LandingPage from './pages/landing';

function SelectCommon({ type }: SelectCommonProps) {
  const location = useLocation();
  let commonType: CommonType = 'landing';

  if (location.pathname === '/') commonType = 'home';
  else if (location.pathname === '/landing') commonType = 'landing';

  return type === 'header' ? (
    <Header type={commonType} />
  ) : (
    <Footer type={commonType} />
  );
}

function App() {
  return (
    <BrowserRouter>
      <SelectCommon type={'header'} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      <SelectCommon type={'footer'} />
    </BrowserRouter>
  );
}

export default App;
