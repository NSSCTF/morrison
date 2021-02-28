import req from './api'

export const userLogin = (params: Object) => {
    return req.post('user/login', params);
}

export const getUserInfoByIdOrName = (data: string) => {
    return req.get(`/user/info/${data}/`);
}

export const postCheckInviteCode = (code: string) => {
    return req.post('/user/register/check/', {code: code});
}

export const postRegisterUser = (data: Object) => {
    return req.post(`/user/register/active/`, data);
}

export const postRegisterSendVerifyCode = (data: Object) => {
    return req.post('/user/register/verify/', data);
}