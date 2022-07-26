import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path='/register' element={<Register />} />
    <Route path='/' element={<Login />} />
  </Routes>
)

export default AuthRoutes
