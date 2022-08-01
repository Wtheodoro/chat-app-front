import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { getAllMessages, sendMessageRoute } from '../../utils/APIRoutes'
import ChatInput from '../ChatInput'
import Logout from '../Logout'
import { Container } from './styles'
import { v4 as uuidv4 } from 'uuid'

interface IChatContainer {
  currentChat: any
  currentUser: any
  socket: any
}

const ChatContainer: React.FC<IChatContainer> = ({
  currentChat,
  currentUser,
  socket,
}) => {
  const [messages, setMessages] = useState<any[]>([])
  const [arrivalMessage, setArrivalMessage] = useState<any>()

  const scrollRef: any = useRef(null)

  useEffect(() => {
    if (!socket.current) return

    socket.current.on('msg-recieve', (message: any) => {
      setArrivalMessage({ fromSelf: false, message })
    })
  }, [])

  useEffect(() => {
    if (arrivalMessage) setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    fetchMessages()
  }, [currentChat])

  const fetchMessages = async () => {
    if (!currentUser._id || !currentChat._id) return

    const messagesResponse = await axios.post(getAllMessages, {
      from: currentUser._id,
      to: currentChat._id,
    })

    setMessages(messagesResponse.data)
  }

  const handleSendMessage = async (message: string) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message,
    })

    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message,
    })

    const msgs = [...messages]
    msgs.push({ fromSelf: true, message })
    setMessages(msgs)
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
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}
            >
              <div className='content '>
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  )
}

export default ChatContainer
