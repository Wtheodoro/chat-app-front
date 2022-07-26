import React from 'react'
import { Container } from '../../pages/Chat/styles'

interface IContacts {
  contacts: any
  currentUser: any
}

const Contacts: React.FC<IContacts> = ({ contacts, currentUser }) => (
  <Container>contacts</Container>
)

export default Contacts
