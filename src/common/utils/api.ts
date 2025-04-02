import axios from 'axios'

import envs from '../constants/envs'

// const setInterceptors = (instance: AxiosInstance) => {
//   instance.interceptors.request.use(
//     (config) => {
//       const { token } = getAuthToken()

//       if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`
//       }
//       return config
//     },
//     (error) => {
//       Promise.reject(error)
//     },
//   )

//   return instance
// }

export const api = axios.create({
  baseURL: envs.BASE_URL,
  timeout: 15000,
})
