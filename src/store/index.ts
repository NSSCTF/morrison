import { createStore } from 'vuex'
import user from './modules/user'
import note from './modules/note'

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    note,
  },
  strict: debug,
  plugins: debug ? [] : [],
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
  }
})
