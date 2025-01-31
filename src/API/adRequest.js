import { APIInstance } from './config'

const adAPIFilters = () => {
  const create = async (pathStr, params) => {
    console.log(pathStr);
    
    return await APIInstance(`/ad${pathStr}`, {
      method: 'GET',
      params: params
    })
  }
  return { create }
}

export { adAPIFilters }
