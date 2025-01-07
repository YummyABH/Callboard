import { APIInstance } from './config'

export const categoriesAPI = {
  async create() {
    return await APIInstance('/category')
  }
}
// const useCategoriesAPI = async () => {

//   const create = async () => {
//     const url = '/category'
//     return await APIInstance(url, {
//       method: 'GET'
//     })
//   }

//   const deletet = async () => {
//     const url = '/category'
//     return await APIInstance(url, {
//       method: 'GET'
//     })
//   }

//   return {
//     create,
//     deletet
//   }
// }

// const [create, deletet] = useCategoriesAPI()

// create()
// deletet()
