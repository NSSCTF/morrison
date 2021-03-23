const state = () => ({
    info: {
        balderich: {
            total: {
                cpu: 34,
                ram: 47,
                rom: 58,
                cpus: 20,
                rams: 34,
                roms: 3072
            },
            serves: [{
                ip: '127.0.0.1',
                cpu: 45,
                ram: 36,
                rom: 38,
                cpus: 'i9-9900HQ 12core 3.2@GHZ',
                rams: '18G DDR4 2400mhz',
                roms: '2048GB SSD',
            },{
                ip: '127.0.0.2',
                cpu: 59,
                ram: 67,
                rom: 28,
                cpus: 'i7-7700HQ 8core 2.6@GHZ',
                rams: '16G DDR4 2400mhz',
                roms: '1024GB SSD',
            }]
        },
        anna: {
            total: {
                cpu: 12,
                ram: 23,
                rom: 36,
                cpus: 4,
                rams: 8,
                roms: 40,
                dockers: 12
            },
            serves: [{
                cpu: 36,
                ram: 49,
                rom: 76,
                cpus: 'i7-7700HQ 8core 2.6@GHZ',
                rams: '16G DDR4 2400mhz',
                roms: '1024GB SSD',
                dockers: 12
            }]
        }
    }
});

const getters = {
    getBalderichInfo: (state: AdminState) => {
        return state.info.balderich;
    },
    getAnnaInfo: (state: AdminState) => {
        return state.info.anna;
    }
};

const actions = {
    async updateStatisticsData ({commit, state}: {commit: any, state: NoteState}, {type}: {type: string}) {
        
    },
};

const mutations = {
    setSubmenus (state: NoteState) {
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}