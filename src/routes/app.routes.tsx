import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from '../pages/Chat'
import ChooseAvatar from '../pages/ChooseAvatar'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path='/' element={<Chat />} />
    <Route path='/chooseAvatar' element={<ChooseAvatar />} />

    <Route path='/*' element={<Navigate to='/' />} />
  </Routes>
)

export default AppRoutes
