import {
  loadUser,
  loadSearch,
  loadBrowsing,
  loadFavorite,
  loadCurrentUser
} from '@/utils/cache'
/* 管理所有的状态 */
const state = {
  user: loadCurrentUser(),
  userList: loadUser(),
  goods: {},
  /* 浏览历史列表 */
  browsingList: loadBrowsing(),
  /* 收藏列表 */
  favoriteList: loadFavorite(),
  /* 搜索历史列表 */
  searchHistory: loadSearch()
}
export default state
