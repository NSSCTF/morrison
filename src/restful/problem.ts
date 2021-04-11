import req from './api'

export const getProblemBySourceAndTypeAndPage = (source: number, type: number, page: number) => {
    return req.get(`/problem/set/${source}/${type}/${page}/`);
}

export const getProblemBySourceAndType = (source: number, type: number) => {
    return req.get(`/problem/set/${source}/${type}/`);
}

export const getProblemInfoById = (id: number) => {
    return req.get(`/problem/${id}/`);
}

export const getMyRateInfoById = (id: number) => {
    return req.get(`/problem/myrate/${id}/`);
}

export const postOpenHintById = (id: number) => {
    return req.post(`/problem/hint/buy/${id}/`);
}

export const postSubmitFlagById = (id: number, flag: string) => {
    return req.post(`/problem/submit/${id}/`, {flag: flag});
}

export const putProblemLevelById = (id: number, level: number) => {
    return req.put(`/problem/level/${id}/edit/`, {level: level});
}

export const postOpenDocker = (id: number) => {
    return req.post(`/problem/docker/${id}/open/`);
}

export const postCloseDocker = (id: number) => {
    return req.post(`/problem/docker/${id}/close/`);
}

export const postDelayDocker = (id: number) => {
    return req.post(`/problem/docker/${id}/delay/`);
}

export const getDockerInfo = (id: number) => {
    return req.get(`/problem/docker/${id}/`);
}

export const putProblemLikeState = (id: number, state: boolean) => {
    return req.put(`/problem/like/${id}/`, {state: state});
}