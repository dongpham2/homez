import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
})

export default http
