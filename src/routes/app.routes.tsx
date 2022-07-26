import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Chat from '../pages/Chat'
import ChooseAvatar from '../pages/ChooseAvatar'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path='/' element={<Chat />} />
    <Route path='/chooseAvatar' element={<ChooseAvatar />} />
  </Routes>
)

export default AppRoutes
