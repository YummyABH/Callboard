// import { APIInstance } from './config'
import { APIInstance } from './configNew'

const adAPIFilters = () => {
  const create = async (pathStr, params) => {
    return await APIInstance(`/listings/read${pathStr}`, {
      method: 'GET',
      params: params
    })
  }
  return { create }
}

const requestUserApi = () => {
  const getAds = async () => {
    return await APIInstance(`/listings/userlistings`, {
      method: 'GET',
    })
  }
  return { getAds }
}

const requestUserAdApi = () => {
  const getAd = async (idAd) => {
    return await APIInstance(`/listings/userlisting?listingId=${idAd}`, {
      method: 'GET',
    })
  }
  return { getAd }
}

export { adAPIFilters, requestUserApi, requestUserAdApi }
