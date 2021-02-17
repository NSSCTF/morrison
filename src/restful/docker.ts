import req from './api'

export const getDockerInfoById = (id: number) => {
    return req.get(`/docker/${id}/`);
}