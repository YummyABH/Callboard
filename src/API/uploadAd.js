import { APIInstance } from './configNew'

const useAdPostApi = () => {
  const post = async (data) => {
    return await APIInstance(`/listings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': undefined, // Позволяем FormData установить Content-Type
      },
      body: data
    })
  }
  return { post }
}

export { useAdPostApi }
