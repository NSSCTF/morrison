import req from './api'

export const getProblemByTypeAndPage = (type: string, page: number) => {
    return req.get(`/problem/${type}/${page}/`);
}

export const getProblemByType = (type: string) => {
    return req.get(`/problem/${type}/`)
}