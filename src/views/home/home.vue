<template>
  <div class='container'>
    <van-nav-bar class="app-nav-bar">
      <!-- 通过插槽自定义中间的搜索按钮 -->
      <template #title>
        <van-button icon="search"
                    class="search-btn"
                    to="/search"
                    round>搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active"
              line-height='0'
              title-active-color='#fe204a'>
      <van-tab :title="channel.cname"
               v-for='channel in channels'
               :key="channel.cid">
        <!-- <home-list></home-list> -->
        <home-list v-if="channel.cid===-1"></home-list>
        <!-- 根据商品分类的不同id加载不同组件数据 -->
        <goods-list v-else
                    :cid='channel.cid'></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { getSuperCategory } from '@/api/goods'
import GoodsList from './components/goods-list'
import HomeList from './components/home-list'
export default defineComponent({
  name: 'home',
  components: {
    GoodsList,
    HomeList
  },
  setup () {
    const state = reactive({
      channels: []
    })
    /* ref 是一个函数，它接受一个参数，返回的就是一个神奇的 响应式对象 。
    我们初始化的这个 0 作为参数包裹到这个对象中去，
    在未来可以检测到改变并作出对应的相应。 */
    const active = ref(0)
    /* 获取商品分类 */
    const loadSuperCategory = async () => {
      const { data } = await getSuperCategory()
      state.channels = [{ cid: -1, cname: '精选' }, ...data.data]
      console.log(state);
    }
    onMounted(() => {
      loadSuperCategory()
    })
    return {
      ...toRefs(state),
      active
    }

  },
})
</script>

<style lang="less" scoped>
/* vant中定义的宽度为60% 需要手动覆盖 */
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/.search-btn {
  background: #f5f7f9;
  width: 277px;
  height: 32px;
  border: none;
  /* 搜索图标 */
  .van-icon {
    font-size: 18px;
    color: #fe204a;
  }
  .van-button__text {
    font-size: 14px;
    color: #ccc;
  }
}
/deep/.van-tab__pane {
  border: none !important;
}
</style>
