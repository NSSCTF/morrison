import req from './api'


export const getNoteById = (id: Number) => {
    return req('get', `notebook/article/${id}`)
}

// export const getNoteListById = (id: Number) => {
//     return Axios.get(`notebook/category/${id}`).then(res => res.data);
// }