import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 3000
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

export default (method: string, url: string, data=null) => {
    method = method.toLowerCase()
    if (method === 'post') {
        return instance.post(url, data)
    } else if (method === 'get') {
        return instance.get(url, {params: data})
    } else if (method === 'delete') {
        return instance.delete(url, {params: data})
    } else if (method === 'put') {
        return instance.put(url, data)
    } else {
        return false
    }
}