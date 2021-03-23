import req from './api'
import Axios from 'axios'

export const getNoteById = (id: Number) => {
    return req.get(`notebook/article/${id}`);
}

export const getNoteListBySetIdAndTypeId = (sid: Number, tid: Number = 0) => {
    return req.get(`notebook/list/${sid}/${tid}/`)
}

export const getCategoryByIdAndSubId = (cid: Number, scid: Number = 0) => {
    return req.get(`notebook/category/${cid}/${scid}/`)
}

export const getSetById = (id: Number) => {
    return req.get(`notebook/set/${id}/`)
}

export const getCommentById = (id: Number) => {
    return req.get(`notebook/article/${id}/comment/`)
}

export const getContentFromUrl = (url: string) => {
    return Axios.get(url);
}
// export const getNoteListById = (id: Number) => {
//     return Axios.get(`notebook/category/${id}`).then(res => res.data);
// }