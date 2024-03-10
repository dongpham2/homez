import axios, { type AxiosError, type AxiosResponse } from 'axios'
import Swal from 'sweetalert2'

const errorInterceptor = async (error: AxiosError<{ errors: string; message: string }>): Promise<string> => {
  if (error.response) {
    const statusCode = error.response.status
    const messageError = error.response.data.message
    if (statusCode) {
      await Swal.fire({
        title: `Error ${statusCode}!`,
        text: messageError || error.response.statusText,
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }
  return Promise.reject(error)
}

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

http.interceptors.response.use((res: AxiosResponse) => res, errorInterceptor)

export default http
