import { APIInstance } from './configNew'

const useCategoriesAPI = () => {
  const create = async () => {
    return await APIInstance('/categories/read-all')
  }
  return {
    create
  }
}

export { useCategoriesAPI }
