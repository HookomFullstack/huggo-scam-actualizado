import {useNavigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import {NextUIProvider} from "@nextui-org/react";
import { Dashboard } from './pages/Dashboard';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { PublicRoute } from './components/PublicRoute';
import { PrivateRoute } from './components/PrivateRoute';

export const App = () => {
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext)
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>

        <Route path='/'  element={ <PublicRoute Element={<Login/>} isAuth={auth}  />} />
        
        <Route path='/dashboard-huggo' element={<PrivateRoute Element={<Dashboard />} isAuth={auth} />} />
        
        <Route path='/*' element={<PublicRoute Element={<Login/>} isAuth={auth}  /> } />
        
      </Routes>
    </NextUIProvider >
  )
}
