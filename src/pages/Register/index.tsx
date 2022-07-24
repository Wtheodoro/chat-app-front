import React from 'react'
import { Link } from 'react-router-dom'
import { FormContainter } from './styles'
import Logo from '../../assets/logo.svg'

const Register: React.FC = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault()
    alert('form')
  }

  const handleChange = (event: any) => {}

  return (
    <FormContainter>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'>
          <img src={Logo} />
          <h1>Snappy</h1>
        </div>

        <input
          typeof='text'
          placeholder='Username'
          name='username'
          onChange={(event) => handleChange(event)}
        />
        <input
          typeof='email'
          placeholder='Email'
          name='email'
          onChange={(event) => handleChange(event)}
        />
        <input
          typeof='password'
          placeholder='Password'
          name='password'
          onChange={(event) => handleChange(event)}
        />
        <input
          typeof='password'
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
  )
}

export default Register
