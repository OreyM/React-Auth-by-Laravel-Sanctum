import { Route, Routes } from 'react-router-dom'

import AuthLayout from '../views/layouts/AuthLayout'
import GuestLayout from '../views/layouts/GuestLayout'

import Home from '../views/pages/Home'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'
import ForgotPassword from '../views/pages/ForgotPassword'
import ResetPassword from '../views/pages/ResetPassword'

function App() {
  return (
    <div className={ 'bg-slate-100 min-h-screen' }>
      <Routes>
        <Route element={ <AuthLayout/> }>
          <Route path={ '/' } element={ <Home/> }/>
        </Route>
        <Route element={ <GuestLayout/> }>
          <Route path={ '/login' } element={ <Login/> }/>
          <Route path={ '/register' } element={ <Register/> }/>
          <Route path={ '/forgot-password' } element={ <ForgotPassword/> }/>
          <Route path={ '/password-reset/:token' } element={ <ResetPassword/> }/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
