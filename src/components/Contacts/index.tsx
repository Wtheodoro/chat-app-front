import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.svg'
import { Container } from './styles'

interface IContacts {
  contacts: any[]
  currentUser: any
  changeChat: (contact: any) => void
}

const Contacts: React.FC<IContacts> = ({
  contacts,
  currentUser,
  changeChat,
}) => {
  const [currentUserName, setCurrentUserName] = useState<string>()
  const [currentUserImage, setCurrentUserImage] = useState<string>()
  const [currentSelected, setCurrentSelected] = useState<any>()
  const [currentChat, setCurrentChat] = useState()

  useEffect(() => {
    if (!currentUser) return

    setCurrentUserName(currentUser.username)
    setCurrentUserImage(currentUser.avatarImage)
  }, [currentUser])

  const changeCurrentChat = (index: number, contact: any) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className='brand'>
            <img src={Logo} alt='logo' onClick={() => console.log(contacts)} />
            <h3>snappy</h3>
          </div>
          <div className='contacts'>
            {contacts?.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? 'selected' : ''
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className='avatar'>
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=''
                  />
                </div>
                <div className='username'>
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt='avatar'
              />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

export default Contacts
