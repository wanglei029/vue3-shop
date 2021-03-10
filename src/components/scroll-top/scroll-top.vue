<template>
  <div class='scroll-top-container'
       id="back">
    <span class="icon icon-weibiaoti33"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
  name: 'scrollTop',
  setup() {
    const state = reactive({
      canMove: false,
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang='less' scoped>
.scroll-top-container {
  position: fixed;
  right: 10px;
  bottom: 60px;
  z-index: 10;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 24px;
    color: #fff;
  }
}
</style>
