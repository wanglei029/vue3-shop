<template>
  <div class='home-list-container'>
    <!-- 1:轮播图 -->
    <div class="swipe-wraper">
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="(activity, index) in activities"
                        :key="index">
          <a :href="activity.jumpUrl">
            <van-image class="active-img"
                       :src="activity.pic" />
          </a>
          <!-- <van-image class="active-img"
                     :src="activity.materialLink" /> -->
        </van-swipe-item>
      </van-swipe>
      <div class="bg-placeholder"></div>
    </div>
    <!-- 九宫格 -->
    <van-swipe class="grid-wrap"
               indicator-color="red">
      <van-swipe-item v-for="(page, index) in pages"
                      :key="index">
        <van-grid :column-num="5">
          <van-grid-item v-for="icon in page"
                         :key="icon.address">
            <template #icon>
              <van-image :src="icon.address"
                         fit="contain" />
            </template>
            <template #text>
              <div class="icon-text">{{icon.name}}</div>
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <!-- 每日爆品 直播推荐 -->
    <van-tabs v-model="active"
              class="tab-wrap"
              type="card"
              :sticky='true'>
      <van-tab title="每日优选">
        <youxuan-list></youxuan-list>
      </van-tab>
      <van-tab title="直播推荐">
        <zhibo-list></zhibo-list>
      </van-tab>
    </van-tabs>
    <!-- 返回顶部 -->
    <scroll-top ref="refScrollTop"
                v-show="isBackTopShow"
                @click="scrollTop"></scroll-top>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import ScrollTop from '@/components/scroll-top/scroll-top'
import {
  getActivity,
  getHotActivity,
  getGridIcons
} from '@/api/goods'
import YouxuanList from './youxuan-list/youxuan-list'
import ZhiboList from './zhibo-list/zhibo-list'
import { throttle, debounce } from 'lodash'
export default defineComponent({
  name: 'home-list',
  props: {},
  components: {
    YouxuanList,
    ZhiboList,
    ScrollTop
  },
  computed: {
    pages () {
      const pages = []
      this.gridIcons.forEach((item, index) => {
        const page = Math.floor(index / 10)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  setup () {
    const state = reactive({
      activities: [], // 幻灯片
      gridIcons: [], // 九宫格图标
      active: 0,
      isBackTopShow: false
    })
    /* 轮播图 */
    const loadActivity = async () => {
      const { data } = await getActivity({ pageId: '1' })
      // const { data } = await getHotActivity()
      console.log('活动', data)
      // const activities = data.data.slice(0, 5)
      const activities = data.data.config
      // activities.forEach((item, index, arr) => { })
      // activities.map((item) => { })
      state.activities = activities
    }
    /* 九宫格 */
    const loadGridIcons = async () => {
      const { data } = await getGridIcons()
      console.log(data)
      state.gridIcons = data.data.config.data
    }
    const scrollTop = () => {
      const wrapper = document.getElementsByClassName('home-list-container')
      // const offsetTop = wrapper[0].offsetTop
      // const scrollTop = wrapper[0].scrollTop
      // console.log(wrapper, offsetTop, scrollTop)
      wrapper[0].scrollTop = 0
    }

    const scroll = () => {
      const wrapper = document.getElementsByClassName('home-list-container')
      console.log('页面滚动', wrapper[0].scrollTop, wrapper)
      if (wrapper[0].scrollTop < 400) {
        state.isBackTopShow = false
      } else {
        state.isBackTopShow = true
      }
    }
    const bindScroll = () => {
      document.getElementsByClassName('home-list-container')[0]
        .addEventListener('scroll', debounce(() => { scroll() }, 200))
    }
    onMounted(() => {
      loadActivity()
      loadGridIcons()
      bindScroll()
    })
    return {
      ...toRefs(state),
      scrollTop
    }
  }
})

</script>
<style lang='less' scoped>
.home-list-container {
  /* 设置列表滚动内容固定定位
    左右完全撑开
    设置 顶部 底部距离
  */
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
  /deep/.van-tabs__nav {
    .van-tab--active {
      background-image: linear-gradient(to bottom, #fe204a, #fe3b35);
      color: #fff;
    }
  }
  .swipe-wraper {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 37.333333%;
    position: relative;
    .van-swipe {
      z-index: 1;
      .active-img {
        width: 355px;
        height: 140px;
        display: flex;
        margin: 0 auto;
        /deep/ .van-image__img {
          border-radius: 9px;
        }
      }
    }
    .bg-placeholder {
      width: 100%;
      height: 140px;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      background-color: #fe204a;
      // transform: translateY(-180px);
      position: absolute;
      top: 0;
    }
  }
  .grid-wrap {
    /* 使用padding-bottom提前占位防止图片加载后页面抖动 */
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 60.66667%;
    background: #fff;
    /deep/ .van-grid-item__icon-wrapper {
      width: 100%;
      height: 0;
      padding-bottom: 108.33333%;
      overflow: hidden;
    }
    /deep/ .van-grid-item__content {
      .icon-text {
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #333;
        overflow: hidden; /*内容超出后隐藏*/
        text-overflow: ellipsis; /*超出部分以省略号显示*/
        white-space: nowrap; /*文本不进行换行*/
      }
    }
    /deep/.van-swipe__indicators {
      position: absolute;
      bottom: 6px;
      .van-swipe__indicator {
        width: 16px;
        height: 3px;
        border-radius: 3px;
        background: #333;
      }
    }
  }
  /deep/ .tab-wrap {
    .van-sticky {
      height: 30px;
      line-height: 30px;
      top: 90px;
    }
  }
}
</style>
