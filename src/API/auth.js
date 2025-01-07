import { APIInstance } from './config'

const authAPI = () => {
  const register = async (data) => {
    return await APIInstance('/user/register', {
      method: 'POST',
      body: data
    })
  }

  const login = async (credentials) => {
    return await APIInstance('/user/login', {
      method: 'POST',
      body: credentials
    })
  }

  return { register, login }
}

export { authAPI }
