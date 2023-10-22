<template>
  <el-menu :default-active="$route.path" class="micro-main-menu" :collapse="appStore.collapse" router>
    <MenuItem v-for="item in appStore.menuList" :key="item.path" :item="item">
    </MenuItem>
  </el-menu>
</template>

<script setup lang='ts'>
import store from '@/store/index'
import MenuItem from './menuItem.vue';
import { useWindowSize } from '@vueuse/core'
import { watch } from 'vue';
defineOptions({
  name: 'AsideView',
});
const { appStore } = store
const { width } = useWindowSize()
// 宽度小于等于1400时 自动折叠菜单
watch(width, (value) => {
  if (value <= 1400) {
    appStore.toggleCollapse(true)
  }
}, {
  immediate: true
})
</script>

<style lang='scss' scoped>
.micro-main-menu {
  @include scrollStyle;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 61px;

  &:not(.jtlj-menu--collapse) {
    overflow-x: auto;
    width: 200px;
    min-width: 200px;
  }

  &.horizontal-collapse-transition {
    min-width: unset;
  }
}
</style>