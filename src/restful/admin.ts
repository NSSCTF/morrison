import req from './api'

export const postAddProblem = (problem: object) => {
    return req.post(`/problem/add/`, {...problem});
}

export const getAllProblem = () => {
    return req.get(`/problem/all/`);
}

export const postQueryDockerName = (name: string) => {
    return req.post('/docker/query/name/', {name: name})
}

export const postUploadProblemAnnex = (form: any) => {
    return req.post('/problem/annex/upload/', form);
}