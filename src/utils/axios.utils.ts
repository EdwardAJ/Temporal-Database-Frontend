import axios, { AxiosInstance } from 'axios'

const customAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export { customAxios }

// https://fatanugraha.xyz/api