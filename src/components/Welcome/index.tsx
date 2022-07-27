import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import Robot from '../../assets/robot.gif'

const Welcome = () => {
  const [userName, setUserName] = useState<string>()
  useEffect(() => {
    const user = localStorage.getItem('@chat-app-user')

    if (!user) return
    setUserName(JSON.parse(user).username)
  }, [])
  return (
    <Container>
      <img src={Robot} alt='' />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a some one to Start messaging.</h3>
    </Container>
  )
}

export default Welcome
