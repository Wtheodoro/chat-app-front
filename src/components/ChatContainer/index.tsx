import React from 'react'
import ChatInput from '../ChatInput'
import Logout from '../Logout'
import { Container } from './styles'

interface IChatContainer {
  currentChat: any
}

const ChatContainer: React.FC<IChatContainer> = ({ currentChat }) => {
  const handleSendMessage = async (message: string) => {}

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
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  )
}

export default ChatContainer
