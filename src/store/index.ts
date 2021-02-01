import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, user) {
      state.userInfo = user
    }
  },
  actions: {
    setUserInfo({commit}, user){
      commit('setUserInfo', user)
    }
  },
  modules: {
  }
})
