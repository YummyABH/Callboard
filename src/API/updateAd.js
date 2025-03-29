import { APIInstance } from './configNew'

const useAdUpdateApi = () => {
  const update = async (data) => {
    return await APIInstance(`/listings/update`, {
      method: 'POST',
      headers: {
        'Content-Type': undefined, // Позволяем FormData установить Content-Type
      },
      body: data
    })
  }
  return { update }
}

export { useAdUpdateApi }
