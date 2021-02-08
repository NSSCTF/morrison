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

export const userLogin = (params: Object) => {
    return Axios.post('user/login', params).then(res => res.data);
}

export default {
    get: (path: string, data=null) => instance.get(path, {params: data}),
    post: (path: string, data=null) => instance.post(path, data),
    put: (path: string, data=null) => instance.put(path, data),
    delete: (path: string, data=null) => instance.delete(path, {params: data})
}