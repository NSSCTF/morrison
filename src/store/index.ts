import { createStore } from 'vuex'
import user from './modules/user'
import note from './modules/note'
import problem from './modules/problem'
import admin from './modules/admin'

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user: user,
    note: note,
    problem: problem,
    admin: admin
  },
  strict: debug,
  plugins: debug ? [] : [],
})
