import axios from 'axios'
import React, { useRef, useState } from 'react'
import { sendMessageRoute } from '../../utils/APIRoutes'
import ChatInput from '../ChatInput'
import Logout from '../Logout'
import { Container } from './styles'

interface IChatContainer {
  currentChat: any
  currentUser: any
}

const ChatContainer: React.FC<IChatContainer> = ({
  currentChat,
  currentUser,
}) => {
  const [messages, setMessages] = useState<any[]>([])

  const scrollRef = useRef(null)

  const handleSendMessage = async (message: string) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message,
    })
  }

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
      <div className='chat-messages'>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={message}>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className='content '>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  )
}

export default ChatContainer
