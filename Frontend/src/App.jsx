import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';
import authService from './config/authService';
import { login, logout } from './store/authSlice';


function App() {

  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrUser().then((userData) => {
      if(userData) dispatch(login(userData))
      else dispatch(logout());
    })
    .finally(() => setLoad(false));
  },[])

  return !load ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

