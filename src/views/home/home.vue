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
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { getSuperCategory } from '@/api/goods'
export default defineComponent({
  name: 'home',
  setup () {
    const state = reactive({
      channels: []
    })
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
      ...toRefs(state)
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
