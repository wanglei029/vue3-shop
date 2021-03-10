<template>
  <div class="list-container">
    <van-pull-refresh v-model="isRefreshLoading"
                      :success-text="refreshSuccessText"
                      success-duration="1500"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="goods-list">
        <good-item v-for="(item,index) in goods"
                   :goods="item"
                   :key="`${index}-${item.id}`"
                   class="goods-item"></good-item>
        <!-- <div slot="loading"
             class="loading-container">
          <span>加载中……</span>
        </div> -->
      </van-list>
    </van-pull-refresh>
    <!-- 返回顶部 -->
    <scroll-top ref="refScrollTop"
                v-show="isBackTopShow"
                @click="scrollTop"></scroll-top>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
import GoodItem from '@/components/goods-item/goods-item'
import ScrollTop from '@/components/scroll-top/scroll-top'
import { throttle, debounce } from 'lodash'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'goodsList',
  components: {
    GoodItem,
    ScrollTop,
  },
  props: {
    cid: {
      type: Number,
      required: true,
    },
  },
  setup (props, context) {
    // console.log('setup', props.cid)

    // let goods: any[] = []
    const state = reactive({
      cids: props.cid,
      goods: [],
      loading: false,
      finished: false,
      pageId: null,
      isRefreshLoading: false, // 下拉刷新的loading状态
      refreshSuccessText: '',
      isBackTopShow: false,
    })
    const onLoad = async () => {
      // 异步更新数据
      const params = {
        cids: state.cids,
        pageId: state.pageId,
        pageSize: 10,
      }
      try {
        // console.log(params)
        const { data } = await getGoodsList(params)
        const { list, pageId } = data.data
        console.log(data)
        state.goods.push(...list)
        state.loading = false
        /* 如果还有下一页获取更新下一页的页码 */
        if (list.length > 0) {
          console.log(pageId)
          state.pageId = pageId
        } else {
          state.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    }
    const onRefresh = async () => {
      console.log('下拉刷新')
      const params = {
        cids: state.cids,
        pageId: state.pageId || 1,
        pageSize: 10,
      }
      const { data } = await getGoodsList(params)
      // eslint-disable-next-line no-unused-vars
      const { list, pageId } = data.data
      state.goods.push(...list)
      state.isRefreshLoading = false
      state.refreshSuccessText = `更新了${list.length}条数据`
    }
    /* 返回顶部 */
    const scrollTop = () => {
      const wrapper = document.getElementsByClassName('list-container')
      wrapper.forEach((item) => {
        item.scrollTop = 0
      })
      console.log('返回顶部', wrapper);
    }
    /* 绑定滚动事件 */
    const bindScroll = () => {
      const wrapper = document.getElementsByClassName('list-container')
      // console.log('页面滚动', wrapper)
      wrapper.forEach(item => {
        item.addEventListener('scroll', debounce(() => {
          console.log('页面滚动', item.scrollTop)
          if (item.scrollTop < 400) {
            state.isBackTopShow = false
          } else {
            state.isBackTopShow = true
          }
        }, 200))
      })
    }
    onMounted(() => {
      onLoad()
      bindScroll()
    })
    return {
      ...toRefs(state),
      onLoad,
      onRefresh,
      scrollTop,
    }
  },
})
</script>

<style lang="less" scoped>
.list-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
  .img-wrap {
    width: 60px;
    height: 80px;
    img {
      width: 100%;
    }
  }
  .goods-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // background: #c000e8;
    padding: 10px 10px;
    padding-top: 0px;
    .goods-item {
      width: 49%;
    }
    /deep/ .van-list__loading {
      width: 100%;
    }
  }
}
</style>

