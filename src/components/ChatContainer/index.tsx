import React from 'react'
import Logout from '../Logout'
import { Container } from './styles'

interface IChatContainer {
  currentChat: any
}

const ChatContainer: React.FC<IChatContainer> = ({ currentChat }) => {
  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt='avatar'
            />
          </div>
          <h3 className='username'>{currentChat.username}</h3>
        </div>
        <Logout />
      </div>
    </Container>
  )
}

export default ChatContainer
