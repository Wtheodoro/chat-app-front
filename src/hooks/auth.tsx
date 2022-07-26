import React, { createContext, useState, useContext, ReactElement } from 'react'

interface IAuthContext {
  logged: boolean
  signIn: (user: string) => void
  singOut(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<any> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem('@chat-app-user')

    // 2 ! - if isLogged = true, if not isLogged = false
    return !!isLogged
  })

  const signIn = (user: string) => {
    localStorage.setItem('@chat-app-user', user)
    setLogged(true)
  }

  const singOut = () => {
    localStorage.removeItem('@chat-app-user')
    setLogged(false)
  }

  return (
    <AuthContext.Provider value={{ logged, signIn, singOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
