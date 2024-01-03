import HrefPage from '@pages/HrefPage/HrefPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import Cookies from 'js-cookie';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LkPage from '@pages/LkPage/LkPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import TasksPage from './layouts/TasksPage/TasksPage';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token && location.pathname !== '/' && location.pathname !== '/register') {
      // Если токена нет, перенаправляем пользователя на страницу входа
      navigate('/login');
    }
  }, [navigate]);
  return (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HrefPage />} />
        <Route path="/lk" element={<LkPage />} />
        <Route path='/tasks' element={<TasksPage />} />
      </Routes>
  )
}

export default App
