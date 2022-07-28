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
    let message = msg
    message += emojiObject.emoji
    setMsg(message)
  }

  const sendChat = (event: any) => {
    event.preventDefault()
    if (msg.length > 0) {
      handleSendMessage(msg)
      setMsg('')
    }
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
          onChange={(e) => setMsg(e.target.value)}
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
