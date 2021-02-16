import {getNoteListBySetIdAndTypeId, getSetById} from '@/restful/note'

const state = () => ({
    setData: {
        ctf: [],
        wp: [],
        balderich: []
    },
    submenus: {
        ctf: {},
        wp: {},
        balderich: {}
    },
    titles: {
        ctf: {},
        wp: {},
        balderich: {}
    },
});

const typeId = {
    ctf: 1,
    wp: 2,
    balderich: 3
}

const getters = {
    getSubmenusByTypeAndIndex: (state: NoteState)  => (type: NoteType) => (index: string) => {
        return state.submenus[type][index];
    },
    getSubmenusByType: (state: NoteState) => (type: NoteType) => {
        return state.submenus[type];
    },
    getSetDataByType: (state: NoteState) => (type: NoteType) => {
        return state.setData[type];
    },
    getTitlesByTypeAndId: (state: NoteState) => (type: NoteType) => (id: string) => {
        return state.titles[type][id];
    },
    getTitlesByType: (state: NoteState) => (type: NoteType) => {
        return state.titles[type];
    }
};

const actions = {
    async initSetData ({commit, state}: {commit: any, state: NoteState}, {type}: {type: NoteType}) {
        if (state.setData[type].length === 0) {
            await getSetById(typeId[type]).then(res => {
                commit('setSetData', {
                    type: type,
                    data: res.data
                });
                for (let item of res.data) {
                    commit('setTitlesByTypeAndIndex', {
                        type: type,
                        index: item.id,
                        data: item.title
                    });
                }
            });
        }
    },
    async displayList ({commit, state}: {commit: any, state: NoteState}, {type, index}: {type: NoteType, index: string}) {
        let indexs = index.split("-");
        if (state.submenus[type][index] !== undefined) {
        } else if (parseInt(indexs[0]) === 0) {
            commit('setSubmenus0', {type: type});
        } else if (indexs.length === 1){
            await getNoteListBySetIdAndTypeId(parseInt(indexs[0])).then(res => {
                commit('setSubmenus', {
                    type: type,
                    index: index,
                    data: res.data
                });
                for (let item of res.data) {
                    commit('setTitlesByTypeAndIndex', {
                        type: type,
                        index: index + '-' + item.id,
                        data: item.title
                    });
                }
            });
        } else {
            await getNoteListBySetIdAndTypeId(parseInt(indexs[0]), parseInt(indexs[1])).then(res => {
                commit('setSubmenus', {
                    type: type,
                    index: index,
                    data: res.data
                });
            });
        }
    }
};

const mutations = {
    setSubmenus (state: NoteState, {type, index, data}: {type: NoteType, index: string, data: NoteCategoryType[] | NoteArticleType[]}) {
        state.submenus[type][index] = data;
    },
    setSubmenus0 (state: NoteState, {type}: {type: NoteType}) {
        state.submenus[type][0] = state.setData[type];
    },
    setTitlesByTypeAndIndex (state: NoteState, {type, index, data}: {type: NoteType, index: string, data: string}) {
        state.titles[type][index] = data;
    },
    setSetData (state: NoteState, {type, data}: {type: NoteType, data: NoteCategoryType[]}) {
        state.setData[type] = data
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}