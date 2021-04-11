import { getProblemBySourceAndTypeAndPage,getProblemBySourceAndType } from "@/restful/problem";

const state = () => ({
    tableData: {},
})

const getters = {
    getTableDataBySourceAndTypeAndPage: (state: ProblemState) => (source: number, type: number) => (page: number) => {
        return state.tableData[source][type][page];
    },
    getTableDataBySourceAndType: (state: ProblemState) => (source: number, type: number) => {
        return state.tableData[source][type].all;
    }
}

const actions = {
    async setTableDataBySourceAndTypeAndPage ({commit, state}: {commit: any, state: ProblemState}, {source, type, page}: {source: number, type: number, page: number}) {
        let res = await getProblemBySourceAndTypeAndPage(source, type, page);
        commit('setTableDataBySourceAndTypeAndPage', {
            source: source,
            type: type,
            data: res.data
        });
    },
    async setTableDataBySourceAndType ({commit, state}: {commit: any, state: ProblemState}, {source, type}: {source: number, type: number}) {
        if (state.tableData[source] &&
            state.tableData[source][type]) {
                return false;
            }
        let res = await getProblemBySourceAndType(source, type);
        commit('setTableDataBySourceAndType', {
            source: source,
            type: type,
            data: res.data
        });
    },
}

const mutations = {
    setTableDataBySourceAndTypeAndPage (state: ProblemState, {source, type, page, data}: {source: number, type: number, page: number, data: ProblemData[]}) {
        if (!state.tableData[source]) {
            state.tableData[source] = {}
        }
        if (!state.tableData[source][type]) {
            state.tableData[source][type] = {}
        }
        state.tableData[source][type][page] = data;
    },
    setTableDataBySourceAndType (state: ProblemState, {source, type, data}: {source: number, type: number, data: ProblemData[]}) {
        console.log(source, typeof source)
        if (!state.tableData[source]) {
            state.tableData[source] = {}
        }
        if (!state.tableData[source][type]) {
            state.tableData[source][type] = {}
        }
        state.tableData[source][type].all = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}