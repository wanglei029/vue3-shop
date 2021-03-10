<template>
  <div class="container">
    <van-list v-if="list"
              class="goods-list">
      <good-item v-for="item in list"
                 :goods="item"
                 :key="item.id"
                 class="goods-item"></good-item>
    </van-list>
    <van-pull-refresh v-else
                      v-model="isRefreshLoading"
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
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getLiveMaterialGoodsList } from '@/api/goods'
import GoodItem from '@/components/goods-item/goods-item'
import getNextDate from '@/utils/dayjs'
export default {
  name: 'ZhiBoList',
  props: {
    // category: {
    //   type: Object,
    //   required: false
    // },
    list: {
      type: Array,
      required: false
    }
  },
  components: { GoodItem },
  data () {
    return {
      goods: [],
      loading: false,
      finished: false,
      date: getNextDate(Date.now(), 0),
      isRefreshLoading: false, // 下拉刷新的loading状态
      refreshSuccessText: ''
    }
  },

  methods: {
    async onLoad () {
      // // 异步更新数据
      const params = {
        date: this.date,
        sort: 0 // 0-综合排序，1-商品上架时间从高到低
      }
      try {
        const { data } = await getLiveMaterialGoodsList(params)
        console.log(data)
        if (data.code === 0) {
          const { list } = data.data
          this.goods.push(...list)
          this.loading = false
          /* 如果还有下一页获取更新下一页的页码 */
          // if (list && list.length > 0) {
          //   console.log(this.date)
          // }
          this.date = getNextDate(this.date, -1)
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onRefresh () {
      console.log('下拉刷新')
      // const params = {
      //   cids: this.category.cid,
      //   pageId: this.pageId || 1,
      //   pageSize: 10
      // }
      const { data } = await getLiveMaterialGoodsList()
      // eslint-disable-next-line no-unused-vars
      const { list, pageId } = data.data
      this.goods.push(...list)
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${list.length}条数据`
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.container {
  // position: fixed;
  // left: 0;
  // right: 0;
  // top: 90px;
  // bottom: 50px;
  // overflow-y: auto;
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
  }
}
</style>
