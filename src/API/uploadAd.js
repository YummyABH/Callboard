import { APIInstance } from './config'

const useAdPostApi = () => {
  const post = async (data) => {
    return await APIInstance(`/ad/create`, {
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "multipart/mixed"
      },
    })
  }
  return { post }
}

export { useAdPostApi }
