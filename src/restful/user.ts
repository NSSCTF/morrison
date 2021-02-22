import req from './api'

export const userLogin = (params: Object) => {
    return req.post('user/login', params);
}

export const getUserInfoByIdOrName = (data: string) => {
    return req.get(`/user/info/${data}/`);
}