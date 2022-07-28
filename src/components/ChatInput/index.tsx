import React, { useState } from 'react'
import { Container } from './styles'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import Picker from 'emoji-picker-react'

interface IChatInput {
  handleSendMessage: (message: string) => void
}

const ChatInput: React.FC<IChatInput> = ({ handleSendMessage }) => {
  const [msg, setMsg] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setMsg(`${msg}${emojiObject.emoji}`)
  }

  const sendChat = (event: any) => {
    event.preventDefault()
    if (!msg) return

    handleSendMessage(msg)
    setMsg('')
  }

  return (
    <Container>
      <div className='button-container'>
        <div className='emoji'>
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className='input-container' onSubmit={(event) => sendChat(event)}>
        <input
          type='text'
          placeholder='type your message here'
          onChange={(event) => setMsg(event.target.value)}
          value={msg}
        />
        <button type='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

export default ChatInput
