const state = () => ({
    isLogin: false,
    userinfo: {
        uid: 0,
        username: undefined,
        avatar: undefined,
        token: undefined,
    },
    loginDate: undefined,
});

const getters = {
    isLogin: (state: UserState) => {
        return state.isLogin;
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
    getUserInfo: (state: UserState) => {
        return state.userinfo;
    }
};

const actions = {
    userLogin ({commit, state}: {commit: any, state: UserState}, {userinfo}: {userinfo: UserInfo}) {
        commit('userLogin', {
            userinfo: userinfo
        })
    },
    updateUserInfo ({commit}: {commit: any}, {userinfo}: {userinfo: UserInfo}) {
        commit('updateUserInfo', {
            userinfo: userinfo
        })
    }
};

const mutations = {
    userLogin (state: UserState, {userinfo}: {userinfo: UserInfo}) {
        state.isLogin = true;
        // state.userinfo = userinfo;
        state.userinfo.uid = userinfo.uid;
        state.userinfo.token = userinfo.token;
        state.userinfo.username = userinfo.username;
        state.userinfo.avatar = userinfo.avatar;
        state.loginDate = new Date();
    },
    userLogout (state: UserState) {
        state.isLogin = false;
        state.userinfo.uid = 0;
        state.userinfo.username = undefined;
        state.userinfo.avatar = undefined;
        state.loginDate = undefined;
    },
    updateUserInfo (state: UserState, {userinfo}: {userinfo: UserInfo}) {
        // state.userinfo = userinfo;
        state.userinfo.uid = userinfo.uid;
        state.userinfo.token = userinfo.token;
        state.userinfo.username = userinfo.username;
        state.userinfo.avatar = userinfo.avatar;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}