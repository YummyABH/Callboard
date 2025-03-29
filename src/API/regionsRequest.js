import { APIInstance } from './configNew'

const regionsAPI = () => {
  const regionList = async () => {
    return await APIInstance('/cities/read-all')
  }

  return {
    regionList
  }
}

export { regionsAPI }
