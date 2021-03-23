const state = () => (sessionStorage.getItem('user_state') ? JSON.parse(sessionStorage.getItem('user_state') as string) : {
    isLogin: false,
    userinfo: {
        uid: 0,
        username: undefined,
        avatar: undefined,
        level: undefined,
        token: undefined,
    },
    loginDate: undefined,
});

const getters = {
    isLogin: (state: UserState) => {
        if (state.loginDate == undefined) {
            return false;
        }
        let isEx = (new Date().getTime() - state.loginDate)/1000 < 86400;
        return state.isLogin && isEx;
    },
    getUsername: (state: UserState) => {
        return state.userinfo.username;
    },
    getUid: (state: UserState) => {
        return state.userinfo.uid;
    },
    getAvatar: (state: UserState) => {
        return state.userinfo.avatar;
    },
    getRole: (state: UserState) => {
        return state.userinfo.level;
    },
    getUserInfo: (state: UserState) => {
        return state.userinfo;
    }
};

const actions = {
    async userLogin ({commit, state}: {commit: any, state: UserState}, {userinfo}: {userinfo: UserInfo}) {
        let ex = new Date();
        ex.setDate(ex.getDate()+1);
        // console.log(userinfo, document)
        document.cookie = `token=${userinfo.token}; expires=${ex.toUTCString()}; path=/`;
        commit('userLogin', {
            userinfo: userinfo
        })
    },
    async updateUserInfo ({commit}: {commit: any}, {userinfo}: {userinfo: UserInfo}) {
        let ex = new Date();
        ex.setDate(ex.getDate()+1);
        // console.log(userinfo, document)
        document.cookie = `token=${userinfo.token}; expires=${ex.toUTCString()}; path=/`;
        commit('updateUserInfo', {
            userinfo: userinfo
        })
    },
    userLogout ({commit}: {commit: any}) {
        commit('userLogout')
    }
};

const mutations = {
    userLogin (state: UserState, {userinfo}: {userinfo: UserInfo}) {
        state.isLogin = true;
        // state.userinfo = userinfo;
        state.userinfo.uid = userinfo.uid;
        state.userinfo.token = userinfo.token;
        state.userinfo.level = userinfo.level;
        state.userinfo.username = userinfo.username;
        state.userinfo.avatar = userinfo.avatar;
        state.loginDate = new Date().getTime();
    },
    userLogout (state: UserState) {
        state.isLogin = false;
        state.userinfo.uid = 0;
        state.userinfo.username = undefined;
        state.userinfo.level = undefined;
        state.userinfo.avatar = undefined;
        state.loginDate = undefined;
    },
    updateUserInfo (state: UserState, {userinfo}: {userinfo: UserInfo}) {
        // state.userinfo = userinfo;
        state.userinfo.uid = userinfo.uid;
        state.userinfo.token = userinfo.token;
        state.userinfo.level = userinfo.level;
        state.userinfo.username = userinfo.username;
        state.userinfo.avatar = userinfo.avatar;
        state.loginDate = new Date().getTime();
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}