import { createStore } from 'vuex'
import user from './modules/user'
import note from './modules/note'
import problem from './modules/problem'

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    note,
    problem
  },
  strict: debug,
  plugins: debug ? [] : [],
})
