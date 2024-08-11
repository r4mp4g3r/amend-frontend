import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing.jsx'
import Signin from './Pages/Signin.jsx'
import Register from "./Pages/Register.jsx"
import Register1 from './Pages/Register1.jsx'
import OnBoard from './Pages/Register.jsx'
import Onboard from './Pages/Onboard.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Collections from './Pages/Collections.jsx'
import Redirect from './Pages/Redirect.jsx'
import ResetPasswordRequest from './Pages/ResetPasswordRequest';
import ResetPasswordForm from './Pages/ResetPasswordForm';
import PasswordChanged from './Pages/PasswordChanged';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/1" element={<Register1 />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/reset-password" element={<ResetPasswordRequest />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} /> 
        <Route path="/password-changed" element={<PasswordChanged />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:handle" element={<Dashboard />} />
        {/* <Route path="/collections/:id" element={<Redirect />} />
        <Route path="/collections/:id/:categoryId/:catName" element={<Dashboard />} /> */}
      </Routes>
    </>
  )
}

export default App