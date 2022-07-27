import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import { Container } from './styles'
import loader from '../../assets/loader.gif'
import axios from 'axios'
import { Buffer } from 'buffer'
import Button from '../../components/Button'
import { ChooseAvatarRoute } from '../../utils/APIRoutes'

const TEST = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231"><path d="M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z" style="fill:#ff7520;"/><path d="m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z" style="fill:#7b401e;"/><path d="m141.75 194.98a114.79 114.78 0 0 1 38 16.498 115.53 115.52 0 0 1-128.46 0 114.79 114.78 0 0 1 38-16.498l15.71 15.748h21z" style="fill:#c7d4e2;"/><path d="m70 200.88v20.77c-2.22-0.95325-4.3999-1.9698-6.5399-3.0496h-0.10088v-14.621c2.17-1.1 4.39-2.1399 6.64-3.0996z" style="fill:#435363;"/><path d="m161 200.88v20.77c1.9-0.80986 3.7702-1.6798 5.6201-2.5898l0.0989-0.0494 0.82005-0.40997h0.10088v-14.621c-2.17-1.1-4.39-2.1399-6.6402-3.0996z" style="fill:#435363;"/><polygon transform="matrix(1 0 0 .99987 4e-5 -3e-5)" points="97.32 201.93 115.5 223.72 133.68 201.93" style="fill:#141720;"/><path d="m111.2 230.88 1.31-16.908c0.32992 1.2798 5.6399 1.2798 5.9999 0l1.3201 16.938c-1.4301 0.0494-2.8601 0.089-4.3 0.089s-2.87 0-4.3-0.089z" style="fill:#141720;"/><path d="m115.49 201.79v0.0692l-7.55 12.678-7.0001 11.809-19.19-26.487c0.60999-0.42995 1.22-0.89985 1.8001-1.3899a52 51.993 0 0 0 10.07-10.619l21.79 13.878z" style="fill:#e7ecf2;"/><path d="m149.24 199.86-19.08 26.517-7.0001-11.809-7.57-12.678-0.0593-0.10086 21.94-13.998a52.21 52.203 0 0 0 10.08 10.699c0.58013 0.47009 1.1502 0.92002 1.7301 1.3399z" style="fill:#e7ecf2;"/><path d="m156.1 15.879c-0.38556 5.3015-1.7049 9.4762-3.6602 12.76-0.41226 23.773-9.2343 35.229-15.154 42.797l15.062-4.6641c-0.66253 2.8135-2.4628 7.156-0.34766 12.137 1.6334-2.3144 7.9395-5.807 13-3.3477-0.43442 3.5532-0.95271 7.094-1.4512 10.639l8.9648 0.85937c0.83453 3.8792 0.51719 9.3449-0.59961 11.736l5.5508 2.0098c0.20764 2.7646 0.10001 5.4906-0.74609 8.875 8.4545-1.7225 14.213-4.3896 19.641-13.188 2.8639-4.7524 4.9018-10.483 4.7305-17.242-4.1612 4.916-9.6484 7.2485-15.26 10.109 6.507-11.065 8.8648-22.768 8.1367-30.58-7.3456 10.251-11.649 13.06-19.918 16.9 1.2386-11.4 5.5249-18.582 12.461-27.27-11.392-1.3025-16.301 1.4749-24.891 6.4395 4.5466-14.036 2.2208-26.679-5.5195-38.971zm-117.76 28.682c9.3378 3.6366 19.581 9.0234 21.129 18.549-7.6182 0.0414-14.897-3.5072-20.242-7.1894-0.15967 8.2309 2.8451 12.252 6.7734 19.08-7.2127 1.6129-12.084 4.8315-17.471 9.4805 7.2948-0.15715 12.299-1.0502 16.891 4.2793-6.0512 5.0164-11.99 10.79-11.99 19.24 9.257-6.1688 12.495-5.9486 21.137-2.2012 1.2906-8.0996 2.3978-14.872 2.7869-16.435 2.4719-0.73247 3.5247-0.94807 5.9221-1.2938-2.1556-7.4281 1.0996-9.5176 2.4141-11.6l7.543 1.5059c-3.9093-6.1699 2.6565-12.483 7.1445-15.51-4.4474-7.2082-5.6649-11.558-7.377-16.797-11.198-8.2947-23.895-6.2742-34.66-1.1094z" style="fill:#ff90f4;"/><path d="m101.9 7.6408c-10.047 6.2416-12.441 28.646-12.131 33.289-6.9249-5.8258-7.8992-13.75-7.7695-19.203-9.6235 6.0158-10.666 14.421-9 23.943 1.1061 5.1411 2.3972 10.461 7.377 16.797 2e-3 -1e-3 4e-3 -3e-3 6e-3 -4e-3 2.7742 2.8742 5.4644 5.5941 8.3477 8.3574 0.41187-6.971 0.45449-13.622 7.1856-15.824 3.9532 2.8169 7.4123 5.9388 11.084 9.1035l10.559-10.25c5.6447 3.961 5.4531 6.5652 6.5215 14.104 2.153-1.7546 8.719-9.0037 15.844-10.139 0.98706 4.1261-0.99388 10.308-2.6387 13.621 0 0 14.32-11.846 15.195-27.971 0.33968-6.2599 0.2237-11.146-0.041-14.826-3.2125 5.5652-8.7118 8.7799-13.789 10.15-4.2715-9.2486-2.4785-21.435-0.48047-29.309-12.21 3.0195-20.932 18.337-22.172 25.07-9.2678-7.397-13.605-16.146-14.098-26.91z" style="fill:#ff90f4;"/><path d="m170.25 100c1.69 9.62-4.79 29.23-22.4 29.23-6.81 0-15-3.66-20.23-10-4.34-5.33-7.56-12.87-6.2-19.45 1.63-7.89 7.07-11.45 14.67-12.92a68.16 68.16 0 0 1 12.52-1c10.77 0 19.78 3.61 21.64 14.22z" style="fill:#00b5b4;stroke-width:3.99px;stroke:#000;"/><path d="m60.75 100c-1.69 9.62 4.79 29.23 22.4 29.23 6.81 0 15-3.66 20.23-10 4.34-5.33 7.56-12.87 6.2-19.45-1.63-7.89-7.07-11.45-14.67-12.92a68.16 68.16 0 0 0-12.52-1c-10.77 0-19.78 3.61-21.64 14.22z" style="fill:#00b5b4;stroke-width:3.99px;stroke:#000;"/><line x1="100.2" x2="130.8" y1="87.92" y2="87.92" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.99px;stroke:#000;"/><path d="m109.87 101.73c0-2.59 2.52-4.69 5.63-4.69s5.63 2.1 5.63 4.69" style="fill:none;stroke-width:3.99px;stroke:#000;"/><path d="m115.5 153.93a14 14 0 0 1-10.5-4.69 3.4209 3.4209 0 0 1 5-4.67l0.08 0.08 0.08 0.09a7.35 7.35 0 0 0 10.39 0.37l0.37-0.37a3.4206 3.4206 0 1 1 5.23 4.41l-0.08 0.09a14 14 0 0 1-10.53 4.69z" /><path d="m115.27 127.32c-7.6627-0.03-15.251 1.4419-20.646 5.1465-7.62 5.33-9.9053 11.512-14.127 18.109-3.4379 5.2447-9.326 10.024-13.467 6.334 25.425 29.755 71.409 29.786 96.875 0.0664-6.8104 3.9305-11.545-2.47-13.508-6.4004-10.697-17.605-14.115-22.656-35.127-23.256zm-0.26758 8.3984c7.457 0.0802 14.986 1.2966 17.146 5.9522 2.5765 11.319-7.5878 17.454-16.681 17.515-6.09-0.05-12.2-2.3802-15.26-7.7402-6.36-11.16 3.6349-15.607 14.795-15.727z" style="fill:#000;"/></svg>`

const ChooseAvatar: React.FC = () => {
  const avatarApi = 'https://api.multiavatar.com/4645646'
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [avatars, setAvatars] = useState<string[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState<number>()

  const toastErrorOptions: ToastOptions<{}> = {
    position: 'bottom-right',
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined)
      return toast.warning('Please choose an avatar', toastErrorOptions)

    const user = JSON.parse(localStorage.getItem('@chat-app-user')!)

    const { data } = await axios.post(`${ChooseAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    })

    if (data.isSet) {
      user.isAvatarImageSet = true
      user.avatarImage = data.image
      localStorage.setItem('@chat-app-user', JSON.stringify(user))
      return navigate('/')
    }

    if (!data.isSet)
      return toast.error(
        'Error setting avatar. Please try again',
        toastErrorOptions
      )
  }

  useEffect(() => {
    const limitCondition = avatars.length > 2

    if (limitCondition) setIsLoading(false)
    if (limitCondition) return

    const fetchAvatarImage = async () => {
      const image = await axios.get(
        `${avatarApi}/${Math.round(Math.random() * 1000)}`
      )
      const buffer = new Buffer(image.data)
      setAvatars([...avatars, buffer.toString('base64')])
    }

    fetchAvatarImage()
  }, [avatars])

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt='loader' className='loader' />
          <h1>Loading...</h1>
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>Pick an avatar as your profiler picture</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar: any, index: number) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? 'selected' : ''
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt='avatar'
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <Button onClick={setProfilePicture}>Set as Profile Picture</Button>
        </Container>
      )}
      <ToastContainer />
    </>
  )
}

export default ChooseAvatar
