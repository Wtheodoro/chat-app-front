import React from 'react'
import { ButtonContainer } from './styles'

interface IButton {
  children: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const Button: React.FC<IButton> = ({ children, onClick, type = 'button' }) => (
  <ButtonContainer type='submit' onClick={onClick}>
    {children}
  </ButtonContainer>
)

export default Button
