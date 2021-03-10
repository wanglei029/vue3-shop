/* 定义修改的操作 */
import * as types from './mutation-types'
/* mutation相关的修改方法
  为什么使用mutation-types 为了便于书写方便
  以及一些lint工具是可以帮助检查写的对不对
*/
const mutations = {
  [types.SET_GOODS] (state, goods) {
    state.goods = goods
  },
  [types.SET_BROWSING_LIST] (state, list) {
    state.browsingList = list
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [types.SET_CURRENT_USER] (state, user) {
    state.user = user
  },
  [types.SET_USER_LIST] (state, list) {
    state.userList = list
  },
  [types.SET_SEARCH_HISTORY] (state, list) {
    state.searchHistory = list
  }
}
export default mutations
