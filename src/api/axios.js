import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
const csrf = async () => axios.get('/sanctum/csrf-cookie')
await csrf()

const user = () => axios.get('/api/user')

const login = (credentials) => axios.post('/login', credentials)

const logout = () => axios.post('/logout')

const register = (credentials) => axios.post('/register', credentials)

const password = {
  forgot: (credential) => axios.post('/forgot-password', credential ),
  reset: (credentials) => axios.post('/reset-password', credentials)
}

export default {
  login,
  logout,
  password,
  register,
  user,
}
