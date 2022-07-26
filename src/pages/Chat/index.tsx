import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Contacts from '../../components/Contacts'
import { allUsersRoute } from '../../utils/APIRoutes'
import { Container } from './styles'

const Chat: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>()

  const navigate = useNavigate()

  useEffect(() => {
    const userStringfyed = localStorage.getItem('@chat-app-user')

    if (!userStringfyed) return

    setCurrentUser(JSON.parse(userStringfyed))
  }, [])

  useEffect(() => {
    if (!currentUser.isAvatarImageSet) return navigate('/chooseAvatar')

    const fetchContacts = async () => {
      const data: any = await axios.get(`${allUsersRoute}/${currentUser._id}`)
      setContacts(data)
    }
  }, [])

  return (
    <Container>
      <div className='wrapper'>
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  )
}

export default Chat
