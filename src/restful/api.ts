import Axios from 'axios'
import {BALDERICH_URL} from '@/config'

const instance = Axios.create({
    baseURL: BALDERICH_URL,
    timeout: 30000,
    withCredentials: true,
})

instance.interceptors.request.use((config) => {
    return config
}, (err) => {
    console.log(err)
    return Promise.reject(err)
})

instance.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    console.log(err)
    return Promise.reject(err)
})

export default {
    get: (path: string, data: Object | null=null) => instance.get(path, {params: data}),
    post: (path: string, data: Object | null=null) => instance.post(path, data),
    put: (path: string, data: Object | null=null) => instance.put(path, data),
    delete: (path: string, data: Object | null=null) => instance.delete(path, {params: data})
}