import { createStore, createLogger } from 'vuex'
// import Vue from 'vue'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
/* 通过mutation修改state的时候 createLogger 会在控制台打印log */
// import createLogger from 'vuex/dist/logger'
// Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default createStore({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
