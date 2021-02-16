import { getProblemByTypeAndPage,getProblemByType } from "@/restful/problem";

const state = () => ({
    tableData: {
        web: {all: [{
            id: 1,
            title: 'test',
            author: 'admin',
            uid: 1,
            tag: ['123','sql','ad','aaa'],
            likes: 1,
            isLike: false,
        }]},
        pwn: {all: []},
        crypto: {all: []},
        reverse: {all: []},
        misc: {all: []}
    },
})

const getters = {
    getTableDataByTypeAndPage: (state: ProblemState) => (type: ProblemType) => (page: number) => {
        return state.tableData[type][page];
    },
    getTableDataByType: (state: ProblemState) => (type: ProblemType) => {
        return state.tableData[type].all;
    }
}

const actions = {
    async setTableDataByTypeAndPage ({commit, state}: {commit: any, state: ProblemState}, {type, page}: {type: ProblemType, page: number}) {
        await getProblemByTypeAndPage(type, page).then(res => {
            commit('setTableDataByTypeAndPage', {
                type: type,
                data: res.data
            })
        })
    },
    async setTableDataByType ({commit}: {commit: any}, {type}: {type: ProblemType}) {
        await getProblemByType(type).then(res => {
            commit('setTableDataByType', {
                type: type,
                data: res.data
            })
        })
    }
}

const mutations = {
    setTableDataByTypeAndPage (state: ProblemState, {type, page, data}: {type: ProblemType, page: number, data: ProblemData[]}) {
        state.tableData[type][page] = data;
    },
    setTableDataByType (state: ProblemState, {type, data}: {type: ProblemType, data: ProblemData[]}) {
        state.tableData[type].all = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}