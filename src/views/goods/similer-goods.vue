<template>
  <div class="container">
    <van-cell title="相似好物" />
    <van-list v-if="list"
              class="goods-list">
      <good-item v-for="item in list"
                 :goods="item"
                 :key="item.id"
                 class="goods-item"></good-item>
    </van-list>
  </div>
</template>

<script>
import GoodItem from '@/components/goods-item/goods-item'
export default {
  name: 'similerGoodsList',
  props: {
    category: {
      type: Object,
      required: false
    },
    list: {
      type: Array,
      required: false
    }
  },
  components: { GoodItem },
  data () {
    return {
    }
  },

  computed: {},
  methods: {},

  watch: {}
}
</script>
<style lang="less" scoped>
.container {
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
