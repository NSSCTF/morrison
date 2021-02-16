import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'http://ctfer.vip:8000/',
    timeout: 30000
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