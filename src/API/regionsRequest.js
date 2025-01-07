import { APIInstance } from './config'

const regionsAPI = () => {
  const create = async () => {
    return await APIInstance('/region')
  }

  return {
    create
  }
}

export { regionsAPI }
