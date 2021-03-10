/* 封装所有和storage相关的逻辑 播放列表 收藏 喜欢 个人收藏夹 都需要通过cache来实现 */

import storage from 'good-storage'

/* 搜索的key _ _双下划线的编码习惯 一般都是 比较内部的一个值 和外面冲突的个能性非常小 */
const SEARCH_KEY = '__search__'
/* 搜索列表最多缓存 15 条数据 超过15条就将最老的那个值删除 */
const SEARCH_MAX_LEN = 15

/* 浏览历史 */
const BROWSING_KEY = '__BrowsingHistory__'
const BROWSING_MAX_LEN = 200

/* 收藏 喜欢 */
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

/* 登录用户列表 */
const USER_KEY = '__user__'
const USER_MAX_LEN = 200
/* 当前用户 */
const CURRENT_USER_KEY = '__currentUser__'

/****
 * @description 封装的插入数组的方法
 * @param arr 存储arr的数组
 * @param val 要存的值
 * @param compare 比较函数 定义通过怎样的方式查找index
 * @param maxLen 最大存储的值
 *
 *  */
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  /* index===0 表示第一条数据 什么都不做原样返回  数组已经有这个数据了 */
  if (index === 0) {
    return
  }
  /* 数组中已经有了这条数据 而且不在第一个位置 首先就将之前的数据删掉 */
  if (index > 0) {
    arr.splice(index, 1)
  }
  /* 删掉已经存在的数据后 再将数据插入到数组第一个位置 */
  arr.unshift(val)
  /* 如果定义了最大存储值 并且数组arr的length已经超过最大值 就将数组末尾的值弹出 */
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
/* 删除数组中符合条件的元素 */
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

/* 保存所有搜索结果 返回新的数组 */
export function saveSearch (query) {
  const searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  /* 将存有检索词的数组 保存到 storage */
  storage.set(SEARCH_KEY, searches)
  /* 将存有检索词的数组返回 */
  return searches
}

/* 删除缓存列表中的数据 */
export function deleteSearch (query) {
  const searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

/* 清空历史记录 删除本地缓存 返回空数组 */
export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

/* 从本地读取 storage中数据 */
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

/* 保存浏览历史到本地缓存 */
export function saveBrowsing (song) {
  /* 从本地读取浏览历史 如果没有返回空数组 */
  console.log('actions调用saveBrowsingList', song.id);
  const songs = storage.get(BROWSING_KEY, [])
  console.log(songs);
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, BROWSING_MAX_LEN)
  /* 把新的数组缓存到本地 */
  storage.set(BROWSING_KEY, songs)
  /* 返回新的数组 */
  return songs
}
/* 从本地缓存读取浏览历史记录 */
export function loadBrowsing () {
  return storage.get(BROWSING_KEY, [])
}
/* 保存登录历史到本地缓存 */
export function saveUsers (user) {
  /* 从本地读取用户列表 如果没有返回空数组 */
  const users = storage.get(USER_KEY, [])
  insertArray(users, user, (item) => {
    /* 如果用户已经在用户列表中 直接返回 */
    return user.id === item.id
  }, USER_MAX_LEN)
  /* 把新的数组缓存到本地 */
  storage.set(USER_KEY, users)
  /* 返回新的数组 */
  return users
}
/* 从本地缓存读取浏览历史记录 */
export function loadUser () {
  return storage.get(USER_KEY, [])
}
export function saveUser (user) {
  /* 从本地读取当前登录用户 如果没有返回空对象 */
  const currentUser = storage.get(CURRENT_USER_KEY, {})
  storage.set(CURRENT_USER_KEY, user)
  /* 返回新的数组 */
  return currentUser
}
/* 从本地缓存读取当前登录的用户 */
export function loadCurrentUser () {
  return storage.get(CURRENT_USER_KEY, null)
}
/* 从本地缓存删除当前登录的用户 */
export function deleteCurrentUser () {
  storage.remove(CURRENT_USER_KEY)
  return null
}
/* 保存收藏列表到本地 */
export function saveFavorite (goods) {
  /* 先获取当前的收藏列表 */
  const goodsList = storage.get(FAVORITE_KEY, [])
  /* 商品插入到列表中 */
  insertArray(goodsList, goods, (item) => {
    /* 如果已经收藏了这个商品 */
    return goods.goodsId === item.goodsId
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, goodsList)
  return goodsList
}

export function deleteFavorite (goods) {
  const goodsList = storage.get(FAVORITE_KEY, [])
  deleteFromArray(goodsList, (item) => {
    return item.goodsId === goods.goodsId
  })
  storage.set(FAVORITE_KEY, goodsList)
  return goodsList
}

export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}
