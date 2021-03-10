<template>
  <!-- 子路由出口 -->
  <!-- <keep-alive>
    <router-view></router-view>
  </keep-alive> -->
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <!-- 底部导航栏  开启路由模式 route-->
  <!-- placeholder 固定在底部时，是否在标签位置生成一个等高的占位元素 -->
  <van-tabbar v-model="active"
              active-color="#fe204a"
              inactive-color="#666">
    <van-tabbar-item to='/'>

      <span>首页</span>
      <template #icon="props">
        <van-icon class="iconfont"
                  class-prefix='icon'
                  :name="props.active ?'home-fill':'home1'"></van-icon>
      </template>
      <!-- <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template> -->
    </van-tabbar-item>
    <van-tabbar-item to="/nine"
                     icon-prefix="icon"
                     icon="991">9.9</van-tabbar-item>
    <van-tabbar-item to='/menu'>
      <span>分类</span>
      <template #icon="props">
        <van-icon class="iconfont"
                  class-prefix='icon'
                  :name="props.active ?'all-fill':'all'"></van-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to='/collection'>
      <span>收藏</span>
      <template #icon="props">
        <van-icon class="iconfont"
                  class-prefix='icon'
                  :name="props.active ?'favorites-fill':'favorites'"></van-icon>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to='/my'>
      <span>我的</span>
      <template #icon="props">
        <van-icon class="iconfont"
                  class-prefix='icon'
                  :name="props.active ?'account-fill':'account'"></van-icon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'layout',
  setup() {
    const active = ref(0)
    return {
      active,
    }
  },
})
</script>

<style lang="less" scoped>
/deep/ .van-tabbar-item__icon {
  .icon {
    font-size: 24px;
  }
}
</style>
