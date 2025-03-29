import { APIInstance } from './configNew'

const useAdUpdateDateApi = () => {
  const updateDateAd = async (id, days) => {
    return await APIInstance(`/listings/extend`, {
      method: 'POST',
      body: {
        listingId: id,
        extendDays: days
      }
    })
  }
  return { updateDateAd }
}

export { useAdUpdateDateApi }
