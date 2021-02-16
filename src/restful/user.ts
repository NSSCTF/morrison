import req from './api'

export const userLogin = (params: Object) => {
    return req.post('user/login', params);
}