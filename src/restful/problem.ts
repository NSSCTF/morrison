import req from './api'

export const getProblemByTypeAndPage = (type: string, page: number) => {
    return req.get(`/problem/set/${type}/${page}/`);
}

export const getProblemByType = (type: string) => {
    return req.get(`/problem/set/${type}/`)
}

export const getProblemInfoById = (id: number) => {
    return req.get(`/problem/${id}/`)
}