import { APIInstance } from './configNew'

const useAdDelateApi = () => {
  const deleteAd = async (id) => {
    return await APIInstance(`/listings/delete?listingId=${id}`, {
      method: 'DELETE',
    })
  }
  return { deleteAd }
}

export { useAdDelateApi }
