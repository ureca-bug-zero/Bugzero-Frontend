import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/home';
import { CommonType, SelectCommonProps } from './components/common/types';
import Footer from './components/common/Footer';
import LandingPage from './pages/landing';
import clsx from 'clsx';
import { Flex } from './components/common/Wrapper';

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
      <div
        className={clsx(Flex({ direction: 'column', height: 'min-h-screen' }))}
      >
        <SelectCommon type={'header'} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </main>
        <SelectCommon type={'footer'} />
      </div>
    </BrowserRouter>
  );
}

export default App;
