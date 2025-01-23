import { APIInstance } from './config'

const useCategoriesAPI = () => {
  const create = async () => {
    return await APIInstance('/category')
  }

  return {
    create
  }
}

export { useCategoriesAPI }
