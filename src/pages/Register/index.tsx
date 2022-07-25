import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormContainter } from './styles'
import Logo from '../../assets/logo.svg'
import axios from 'axios'
import { RegisterRoute } from '../../utils/APIRoutes'

interface IFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState<IFormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const toastErrorOptions: ToastOptions<{}> = {
    position: 'bottom-right',
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (formValidation()) {
      const { password, username, email } = formValues
      const { data } = await axios.post(RegisterRoute, {
        username,
        email,
        password,
      })

      if (data.status === false) toast.error(data.msg, toastErrorOptions)

      if (data.status === true) {
        localStorage.setItem('@chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleChange = (event: any) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  const formValidation = () => {
    const { password, confirmPassword, username, email } = formValues

    if (username.length < 3)
      return toast.error(
        'Username should be greater than 3 characters',
        toastErrorOptions
      )

    if (email === '') return toast.error('Email is required', toastErrorOptions)

    if (password.length < 4)
      return toast.error(
        'Password should be equal or greater than 4 characters',
        toastErrorOptions
      )

    if (password !== confirmPassword)
      return toast.error(
        'Password and confirm password should be the same.',
        toastErrorOptions
      )

    return true
  }

  return (
    <main>
      <FormContainter>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} />
            <h1>Snappy</h1>
          </div>

          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(event) => handleChange(event)}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(event) => handleChange(event)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(event) => handleChange(event)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={(event) => handleChange(event)}
          />

          <button type='submit'>Create User</button>
          <span>
            Already have an account? <Link to='/login'>Login</Link>
          </span>
        </form>
      </FormContainter>
      <ToastContainer />
    </main>
  )
}

export default Register
