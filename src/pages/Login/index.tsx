import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormContainter } from './styles'
import Logo from '../../assets/logo.svg'
import axios from 'axios'
import { LoginRoute } from '../../utils/APIRoutes'

interface IFormValues {
  username: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState<IFormValues>({
    username: '',
    password: '',
  })

  const toastErrorOptions: ToastOptions<{}> = {
    position: 'bottom-right',
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  useEffect(() => {
    if (localStorage.getItem('@chat-app-user')) navigate('/')
  }, [])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (formValidation()) {
      const { password, username } = formValues
      const { data } = await axios.post(LoginRoute, {
        username,
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
    const { password, username } = formValues

    if (username === '' || password === '')
      return toast.error('Username and Password is required', toastErrorOptions)

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
            min='3'
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(event) => handleChange(event)}
          />
          <button type='submit'>Login In</button>
          <span>
            Don't have an account? <Link to='/register'>Register</Link>
          </span>
        </form>
      </FormContainter>
      <ToastContainer />
    </main>
  )
}

export default Login
