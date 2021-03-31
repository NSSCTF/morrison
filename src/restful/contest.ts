import req from './api'

export const getAllContestInfo = () => {
    return req.get('/contest/all/');
}

export const getContestProblemInfoListByCid = (cid: number) => {
    return req.get(`/contest/${cid}/problem/list/`);
}

export const getContestProblemInfoByCidAndId = (cid: number, id: number) => {
    return req.get(`/contest/${cid}/problem/${id}/`);
}

export const getContestInfoById = (cid: number) => {
    return req.get(`/contest/${cid}/info/`);
}

export const getContestRankListByCid = (cid: number) => {
    return req.get(`/contest/${cid}/rank/`);
}

export const postContestProblemFlag = (cid: number, cpid: number, flag: string) => {
    return req.post(`/contest/${cid}/problem/${cpid}/submit/`, {flag: flag});
}
