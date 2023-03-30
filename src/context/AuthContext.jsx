import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { default as api } from '../api/axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [errors, setErrors] = useState([])
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(null)

  const navigate = useNavigate()

  const getUser = () => {
    return new Promise(resolve => {
      api.user()
        .then(response => {
          setUser(response.data)
          resolve(response.data)
        })
        .catch(e => {
        })
    })
  }

  const login = ({ ...loginData }) => {
    return new Promise(() => {
      setErrors([])

      api.login(loginData)
        .then(() => {
          getUser().then(() => {
            navigate('/')
          })
        })
        .catch(e => {
          if (e.response.status === 422) {
            setErrors(e.response.data.errors)
          }
        })
    })
  }

  const register = ({ ...registerData }) => {
    return new Promise(() => {
      setErrors([])

      api.register(registerData)
        .then(() => {
          getUser().then(() => {
            navigate('/')
          })
        })
        .catch(e => {
          if (e.response.status === 422) {
            setErrors(e.response.data.errors)
          }
        })
    })
  }

  const passwordRessetRequest = (email) => {
    return new Promise(() => {
      setErrors([])
      setStatus(null)

      api.password.forgot({ email })
        .then(response => {
          setStatus(response.data.status)
        })
        .catch(e => {
          if (e.response.status === 422) {
            setErrors(e.response.data.errors)
          }
        })
    })
  }

  const resetPassword = ({ ...resetData }) => {
    return new Promise(() => {
      setErrors([])
      setStatus(null)

      api.password.reset(resetData)
        .then(response => {
          setStatus(response.data.status)
          navigate('/login')
        })
        .catch(e => {
          if (e.response.status === 422) {
            setErrors(e.response.data.errors)
          }
        })
    })
  }

  const logout = () => {
    api.logout().then(() => {
      setUser(null)
    })
  }

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={ { errors, user, status, login, logout, register, passwordRessetRequest, resetPassword } }>
      { children }
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  return useContext(AuthContext)
}
