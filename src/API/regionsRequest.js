import { APIInstance } from './config'

const regionsAPI = () => {
  const regionList = async () => {
    return await APIInstance('/region')
  }

  return {
    regionList
  }
}

export { regionsAPI }
