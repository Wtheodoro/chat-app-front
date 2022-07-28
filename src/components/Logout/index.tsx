import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { Container } from './styles'

const Logout: React.FC = () => {
  const navigate = useNavigate()
  const { singOut } = useAuth()

  return (
    <Container onClick={singOut}>
      <BiPowerOff />
    </Container>
  )
}

export default Logout
