import req from './api'

export const postAddProblem = (problem: object) => {
    return req.post(`/problem/add/`, {...problem});
}

export const getProblemByPage = (page: number, size: number=20) => {
    return req.get(`/problem/info/bypage/${page}/${size}/`);
}

export const getProblemTotal = () => {
    return req.get('/problem/total/');
}

export const postQueryDockerName = (name: string) => {
    return req.post('/docker/query/name/', {name: name})
}

export const postUploadProblemAnnex = (form: any) => {
    return req.post('/problem/annex/upload/', form);
}