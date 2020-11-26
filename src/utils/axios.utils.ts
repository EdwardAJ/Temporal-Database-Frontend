import axios, { AxiosInstance } from 'axios'

const customAxios: AxiosInstance = axios.create({
    baseURL: 'https://fatanugraha.xyz/api'
})

export { customAxios }
