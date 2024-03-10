// import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
// import Swal from 'sweetalert2'

// const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//   const userItem = localStorage.getItem('user')
//   const user: User | null = userItem ? (JSON.parse(userItem) as User) : null

//   const shopId = user?.user.data?.shop_id
//   const role = user?.user.data?.role

//   const modifiedConfig = { ...config }

//   // Ensure the URL exists and append the shop_id query parameter
//   if (config.url && shopId && role === OWNER) {
//     const url = new URL(config.url, import.meta.env.VITE_SERVER_URL)
//     url.searchParams.append('shop_id', String(shopId))
//     modifiedConfig.url = url.toString().replace(url.origin, '')
//   }

//   if (user?.user.access_token) {
//     // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//     modifiedConfig.headers = modifiedConfig.headers ?? {}
//     modifiedConfig.headers.Authorization = `Bearer ${user.user.access_token}`
//   }
//   return modifiedConfig
// }

// const errorInterceptor = async (error: AxiosError<{ errors: string; message: string }>): Promise<string> => {
//   if (error.response) {
//     const statusCode = error.response.status
//     const messageError = error.response.data.message
//     if (statusCode) {
//       await Swal.fire({
//         title: `エラーコード ${statusCode}!`,
//         text: messageError || error.response.statusText,
//         icon: 'error',
//         confirmButtonText: '閉じる',
//       })
//     }
//   }
//   return Promise.reject(error)
// }

// const http = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000,
// })

// http.interceptors.request.use(authInterceptor)
// http.interceptors.response.use((res: AxiosResponse) => res, errorInterceptor)

// export default http
