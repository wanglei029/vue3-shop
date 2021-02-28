import request from '@/utils/request'

/**
 * 九宫格导航图标
 */
export function getGridIcons() {
  return request({
    method: 'GET',
    url:
      'http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new?entityId=4&modelId=26523&proModelId=2&source=3&version=v1&tuserId=1206917&isWechat=0'
  })
}
/**
 * 官方活动
 */
export function getActivity(params: any) {
  return request({
    method: 'GET',
    // url: '/api/category/get-tb-topic-list',
    url:
      'http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new?entityId=4&modelId=-1&proModelId=1&source=3&version=v1&tuserId=1206917&isWechat=0',
    params
  })
}
/**
 * 热门活动
 */
export function getHotActivity(params: any) {
  return request({
    method: 'GET',
    url: '/api/goods/activity/catalogue',
    params
  })
}
/**
 * 官方活动会场转链
 */
export function getActivityLink(params: any) {
  return request({
    method: 'GET',
    url: '/api/tb-service/activity-link',
    params
  })
}

/**
 * 获取商品列表
 */
export function getGoodsList(params: any) {
  return request({
    method: 'GET',
    url: '/api/goods/get-goods-list',
    params
  })
}
/**
 * 获取大淘客独家券商品
 */
export function getExclusiveGoodsList(params: any) {
  return request({
    method: 'GET',
    url: '/api/goods/exclusive-goods-list',
    params
  })
}
/**
 * 获取直播好货
 */
export function getLiveMaterialGoodsList(params: any) {
  return request({
    method: 'GET',
    url: '/api/goods/liveMaterial-goods-list',
    params
  })
}
/**
 * 获取爆款商品
 */
export function getExplosiveGoodsList(params: any) {
  return request({
    method: 'GET',
    url: 'api/goods/explosive-goods-list',
    params
  })
}
/**
 * 获取单品详情
 */
export const getGoodsDetails = (params: any) => {
  return request({
    method: 'GET',
    url: 'api/goods/get-goods-details',
    params
  })
}
/**
 * 获取相似商品 猜你喜欢
 */
export const getSimilerGoods = (params: any) => {
  return request({
    method: 'GET',
    url: '/api/goods/list-similer-goods-by-open',
    params
  })
}
/**
 * 获取我的收藏列表
 */
export function getCollectionList(params: any) {
  return request({
    method: 'GET',
    url: '/api/goods/get-collection-list',
    params
  })
}
/**
 * 获取超级分类
 */
export function getSuperCategory(params: any) {
  return request({
    method: 'GET',
    url: '/api/category/get-super-category',
    params
  })
}
/**
 * 获取搜索联想词
 */
export function getSearchSuggestions(params: any) {
  return request({
    method: 'GET',
    url: '/api/goods/search-suggestion',
    params
  })
}
/* 获取搜索结果 */
export const getSearchResult = (params: any) => {
  return request({
    method: 'GET',
    url: '/api/goods/get-dtk-search-goods',
    params
  })
}
/* 获取热搜记录 */
export const getHotSearch = () => {
  return request({
    method: 'GET',
    url: '/api/category/get-top100'
  })
}
/* 获取热搜记录 */
export const getRecommend = () => {
  return request({
    method: 'GET',
    url:
      'http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new?entityId=4&modelId=-1&proModelId=1&source=3&version=v1&tuserId=1206917&isWechat=0'
  })
}
/* 获取9.9商品列表 */
export const getNineGoods = (params: any) => {
  return request({
    method: 'GET',
    url: '/api/goods/nine/op-goods-list',
    params
  })
}
/* 获取咚咚锵商品 */
export const getDdqGoods = (params: any) => {
  return request({
    method: 'GET',
    url: '/api/category/ddq-goods-list',
    params
  })
}
