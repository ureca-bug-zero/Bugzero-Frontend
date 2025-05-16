import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/home';
import { CommonType, SelectCommonProps } from './components/common/types';
import Footer from './components/common/Footer';
import LandingPage from './pages/landing';
import clsx from 'clsx';
import FriendPage from './pages/friend-home';
import { ToastContainer } from 'react-toastify';

function SelectCommon({ type }: SelectCommonProps) {
  const location = useLocation();
  let commonType: CommonType = 'home';

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
      <div className={clsx('flex flex-col min-h-screen')}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <SelectCommon type={'header'} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/:friendId" element={<FriendPage />} />
          </Routes>
        </main>
        <SelectCommon type={'footer'} />
      </div>
    </BrowserRouter>
  );
}

export default App;
