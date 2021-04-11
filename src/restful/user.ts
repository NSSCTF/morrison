import req from './api'

export const userLogin = (params: Object) => {
    return req.post('user/login/', params);
}

export const getUserInfoByIdOrName = (data: string) => {
    return req.get(`/user/info/${data}/`);
}

export const getUserRankListByPage = (page: number=1) => {
    return req.get(`/user/ranklist/${page}/`);
}

export const getUserSettingInfo = () => {
    return req.get(`/user/info/opt/setting/`);
}

export const getUserRankStatistics = (uid: number) => {
    return req.get(`/user/statistics/rank/${uid}/`);
}

export const getUserSolveStatistics = (uid: number) => {
    return req.get(`/user/statistics/solve/${uid}/`);
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

export const postUploadUserAvater = (form: any) => {
    return req.post('/user/avatar/update/', form);
}

export const postUpdateUserInfo = (config: any) => {
    return req.post('/user/info/opt/update/', {...config});
}

export const putFollowUser = (userId: number) => {
    return req.put(`/user/follow/${userId}/`);
}

export const putUnFollowUser = (userId: number) => {
    return req.put(`/user/unfollow/${userId}/`);
}