import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import ChooseAvatar from './pages/ChooseAvatar'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chat />} />
        <Route path='/chooseAvatar' element={<ChooseAvatar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
