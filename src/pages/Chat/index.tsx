import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContainer from '../../components/ChatContainer'
import Contacts from '../../components/Contacts'
import Welcome from '../../components/Welcome'
import { allUsersRoute, host } from '../../utils/APIRoutes'
import { Container } from './styles'
import { io } from 'socket.io-client'

const Chat: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>()
  const [currentChat, setCurrentChat] = useState<any>()

  const navigate = useNavigate()
  const socket: any = useRef()

  useEffect(() => {
    const userStringfyed = localStorage.getItem('@chat-app-user')

    if (!userStringfyed) return

    setCurrentUser(JSON.parse(userStringfyed))
  }, [])

  useEffect(() => {
    if (!currentUser) return

    socket.current = io(host)
    socket.current.emit('add-user', currentUser._id)
  }, [currentUser])

  useEffect(() => {
    if (!currentUser) return

    if (!currentUser.isAvatarImageSet) return navigate('/chooseAvatar')

    const fetchContacts = async () => {
      const contacts: any = await axios.get(
        `${allUsersRoute}/${currentUser._id}`
      )
      setContacts(contacts.data)
    }

    fetchContacts()
  }, [currentUser])

  const handleChatChage = (chat: any) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className='wrapper'>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChage}
        />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  )
}

export default Chat
